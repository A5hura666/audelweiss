// app/api/email/send/route.js

/**
 * API Route pour l'envoi d'emails
 * 
 * Cette route utilise le pattern Strategy via EmailHandlerFactory
 * pour gérer différents types d'emails de manière modulaire et extensible.
 * 
 * Principes appliqués :
 * - Single Responsibility Principle : Chaque handler a une responsabilité unique
 * - Open/Closed Principle : Facile d'ajouter de nouveaux types sans modifier le code existant
 * - Dependency Inversion : Dépend des abstractions (BaseEmailHandler) pas des implémentations
 */

import { NextResponse } from 'next/server';
import EmailHandlerFactory from '../../../lib/emailHandlers.js';



/**
 * Gère l'envoi d'emails via POST
 * 
 * Format de la requête :
 * {
 *   "type": "welcome|order-confirmation|password-reset|contact|order-status|custom",
 *   ...données spécifiques au type
 * }
 * 
 * @param {Request} request - La requête HTTP
 * @returns {Response} - Réponse JSON avec le résultat
 */
export async function POST(request) {
    try {
        // Validation de base du JSON de la requête
        let body;
        try {
            body = await request.json();
        } catch (jsonError) {
            return NextResponse.json(
                { 
                    error: 'Format JSON invalide',
                    details: 'Le corps de la requête doit être un JSON valide'
                },
                { status: 400 }
            );
        }

        const { type, ...emailData } = body;

        // Validation du type d'email
        if (!type) {
            return NextResponse.json(
                { 
                    error: 'Type d\'email requis',
                    supportedTypes: EmailHandlerFactory.getSupportedTypes()
                },
                { status: 400 }
            );
        }

        // Création et exécution du handler approprié
        const handler = EmailHandlerFactory.createHandler(type);
        const result = await handler.handle(emailData);

        return NextResponse.json(
            { 
                message: 'Email envoyé avec succès',
                messageId: result.messageId 
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);

        // Gestion spécifique des erreurs de validation
        if (error.message.includes('Type d\'email non supporté') || 
            error.message.includes('requis') ||
            error.message.includes('valide') ||
            error.message.includes('Authentification')) {
            
            return NextResponse.json(
                { 
                    error: error.message,
                    type: 'validation_error'
                },
                { status: 400 }
            );
        }

        // Erreur générique du serveur
        return NextResponse.json(
            { 
                error: 'Erreur interne du serveur',
                type: 'server_error'
            },
            { status: 500 }
        );
    }
}

// Route GET pour tester la configuration email
export async function GET() {
    try {
        // Vérification de la configuration
        const requiredEnvVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            return NextResponse.json(
                { 
                    error: 'Configuration email incomplète',
                    missingVariables: missingVars
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { 
                message: 'Service email configuré et prêt',
                configuration: {
                    service: process.env.EMAIL_SERVICE || 'gmail',
                    user: process.env.EMAIL_USER,
                    from: process.env.EMAIL_FROM || process.env.EMAIL_USER
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Erreur lors de la vérification de la configuration email:', error);
        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
} 