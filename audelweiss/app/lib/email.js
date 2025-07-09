// app/lib/email.js

/**
 * Service d'envoi d'emails pour Audelweiss
 * 
 * Ce service centralise toute la logique d'envoi d'emails en utilisant nodemailer
 * et des templates HTML professionnels. Il fournit une interface simple et cohérente
 * pour tous les types d'emails de l'application.
 * 
 * Fonctionnalités :
 * - Configuration automatique du transporteur SMTP
 * - Templates HTML responsives et professionnels
 * - Gestion d'erreurs robuste
 * - Support de différents fournisseurs SMTP
 * - Logging des envois pour le debugging
 * 
 * Configuration requise :
 * - EMAIL_HOST : Serveur SMTP (ex: smtp.gmail.com)
 * - EMAIL_PORT : Port SMTP (587 pour TLS, 465 pour SSL)
 * - EMAIL_USER : Adresse email d'expédition
 * - EMAIL_PASSWORD : Mot de passe d'application
 * - EMAIL_FROM : Adresse d'expéditeur (optionnel, utilise EMAIL_USER par défaut)
 */

import nodemailer from 'nodemailer';
import {
    contactNotificationTemplate
} from './emailTemplates.js';

/**
 * Configuration et validation des variables d'environnement
 */
class EmailConfig {
    /**
     * Valide que toutes les variables d'environnement requises sont présentes
     * @throws {Error} Si une variable requise est manquante
     */
    static validateConfig() {
        const requiredVars = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_USER', 'EMAIL_PASSWORD'];
        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            throw new Error(
                `Variables d'environnement manquantes pour l'email: ${missingVars.join(', ')}`
            );
        }
    }

    /**
     * Retourne la configuration SMTP
     * @returns {Object} Configuration nodemailer
     */
    static getTransportConfig() {
        this.validateConfig();
        
        return {
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT, 10),
            secure: process.env.EMAIL_PORT === '465', // true pour port 465, false pour autres ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            // Configuration avancée pour améliorer la fiabilité
            pool: true, // Utilise un pool de connexions
            maxConnections: 5, // Limite le nombre de connexions simultanées
            maxMessages: 100, // Limite le nombre de messages par connexion
        };
    }
}

/**
 * Classe utilitaire pour la création et gestion du transporteur SMTP
 */
class EmailTransporter {
    static #transporter = null;

    /**
     * Crée ou retourne l'instance unique du transporteur (Singleton)
     * @returns {Object} Instance nodemailer transporter
     */
    static getTransporter() {
        if (!this.#transporter) {
            this.#transporter = nodemailer.createTransport(EmailConfig.getTransportConfig());
        }
        return this.#transporter;
    }

    /**
     * Vérifie la configuration SMTP
     * @returns {Promise<boolean>} True si la configuration est valide
     * @throws {Error} Si la configuration est invalide
     */
    static async verifyConfiguration() {
        try {
            const transporter = this.getTransporter();
            await transporter.verify();
            return true;
        } catch (error) {
            throw new Error(`Configuration SMTP invalide: ${error.message}`);
        }
    }

    /**
     * Ferme les connexions du transporteur (pour les tests ou l'arrêt propre)
     */
    static close() {
        if (this.#transporter) {
            this.#transporter.close();
            this.#transporter = null;
        }
    }
}

/**
 * Service principal d'envoi d'emails
 * 
 * Utilise le pattern Facade pour simplifier l'utilisation des fonctionnalités d'email
 * et encapsule la complexité de nodemailer et des templates.
 */
export const emailService = {
    /**
     * Méthode générique d'envoi d'email
     * 
     * Cette méthode est utilisée par toutes les autres méthodes spécialisées.
     * Elle gère la configuration, l'envoi et la gestion d'erreurs de manière centralisée.
     * 
     * @param {Object} options - Options de l'email
     * @param {string} options.to - Adresse email du destinataire
     * @param {string} options.subject - Sujet de l'email
     * @param {string} options.html - Contenu HTML de l'email
     * @param {string} [options.replyTo] - Adresse de réponse (optionnel)
     * @param {Array<Object>} [options.attachments] - Fichiers joints (optionnel)
     * 
     * @returns {Promise<Object>} Résultat de l'envoi avec messageId et success
     * 
     * @throws {Error} Si l'envoi échoue ou si la configuration est invalide
     * 
     * @example
     * const result = await emailService.sendEmail({
     *   to: 'client@example.com',
     *   subject: 'Bienvenue !',
     *   text: 'Merci de votre inscription',
     *   html: '<h1>Merci de votre inscription</h1>'
     * });
     */
    async sendEmail({ to, subject, text, html, replyTo, attachments }) {
        try {
            // Validation des paramètres obligatoires
            if (!to || !subject || !html) {
                throw new Error('Destinataire, sujet et contenu HTML sont requis');
            }

            // Obtention du transporteur configuré
            const transporter = EmailTransporter.getTransporter();
            
            // Construction des options de l'email
            const mailOptions = {
                from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
                to,
                subject,
                text,
                html,
                replyTo,
                attachments,
                // Headers personnalisés pour le tracking et debugging
                headers: {
                    'X-Application': 'Audelweiss',
                    'X-Environment': process.env.NODE_ENV || 'development',
                    'X-Timestamp': new Date().toISOString(),
                }
            };

            // Envoi de l'email
            const result = await transporter.sendMail(mailOptions);
            
            // Logging détaillé pour le debugging
            console.log(`✅ Email envoyé avec succès:`, {
                messageId: result.messageId,
                to,
                subject,
                timestamp: new Date().toISOString(),
                env: process.env.NODE_ENV
            });

            return {
                success: true,
                messageId: result.messageId,
                timestamp: new Date().toISOString(),
            };

        } catch (error) {
            // Logging détaillé de l'erreur
            console.error(`❌ Erreur lors de l'envoi de l'email:`, {
                error: error.message,
                to,
                subject,
                timestamp: new Date().toISOString(),
                stack: error.stack
            });

            // Re-lancement de l'erreur avec plus de contexte
            throw new Error(`Échec de l'envoi de l'email vers ${to}: ${error.message}`);
        }
    },



    /**
     * Envoie une notification de contact à l'équipe administrative
     * 
     * Cette méthode est appelée lorsqu'un visiteur remplit le formulaire de contact
     * sur le site. Elle notifie l'équipe admin du nouveau message reçu.
     * 
     * @param {string} to - Adresse email de l'administrateur qui recevra la notification
     * @param {Object} contactData - Données complètes du formulaire de contact
     * @param {string} contactData.name - Nom du visiteur
     * @param {string} contactData.email - Email du visiteur pour la réponse
     * @param {string} contactData.subject - Sujet/type de demande
     * @param {string} contactData.message - Message détaillé du visiteur
     * @param {string} [contactData.phone] - Téléphone du visiteur (optionnel)
     * 
     * @returns {Promise<Object>} Résultat de l'envoi avec messageId
     * 
     * @throws {Error} Si les données de contact sont incomplètes ou invalides
     * 
     * @example
     * await emailService.sendContactNotification('admin@audelweiss.fr', {
     *   name: 'Jean Dupont',
     *   email: 'jean@example.com',
     *   subject: 'Question sur un produit',
     *   message: 'Je souhaiterais plus d\'informations...'
     * });
     */
    async sendContactNotification(to, contactData) {
        // Validation robuste des données de contact
        if (!to) {
            throw new Error('Adresse email de l\'administrateur requise');
        }

        if (!contactData || typeof contactData !== 'object') {
            throw new Error('Données de contact requises');
        }

        const { name, email, subject: contactSubject, message, phone } = contactData;

        // Validation de chaque champ requis
        const missingFields = [];
        if (!name?.trim()) missingFields.push('nom');
        if (!email?.trim()) missingFields.push('email');
        if (!contactSubject?.trim()) missingFields.push('sujet');
        if (!message?.trim()) missingFields.push('message');

        if (missingFields.length > 0) {
            throw new Error(`Champs manquants dans le formulaire de contact: ${missingFields.join(', ')}`);
        }

        // Validation format email du visiteur
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Format d\'email invalide pour le visiteur');
        }

        const subject = `🔔 Nouveau contact: ${contactSubject} - ${name}`;
        
        // Version HTML avec template professionnel
        const html = contactNotificationTemplate(contactData);

        // Configuration de l'email avec réponse automatique vers le visiteur
        return this.sendEmail({ 
            to, 
            subject, 
            html,
            replyTo: email // Permet à l'admin de répondre directement au visiteur
        });
    },



    /**
     * Vérifie la configuration du service d'email
     * 
     * Utile pour les tests de configuration et le debugging.
     * Teste la connexion SMTP sans envoyer d'email.
     * 
     * @returns {Promise<Object>} Statut de la configuration
     * 
     * @throws {Error} Si la configuration est invalide
     * 
     * @example
     * const status = await emailService.verifyConfiguration();
     * console.log('Configuration OK:', status.success);
     */
    async verifyConfiguration() {
        try {
            EmailConfig.validateConfig();
            await EmailTransporter.verifyConfiguration();
            
            return {
                success: true,
                message: 'Configuration email valide',
                timestamp: new Date().toISOString(),
                config: {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    user: process.env.EMAIL_USER,
                    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
                    secure: process.env.EMAIL_PORT === '465'
                }
            };
        } catch (error) {
            return {
                success: false,
                message: error.message,
                timestamp: new Date().toISOString()
            };
        }
    },

    /**
     * Ferme proprement les connexions du service d'email
     * 
     * À utiliser lors de l'arrêt de l'application ou dans les tests
     * pour éviter les connexions pendantes.
     * 
     * @example
     * // Dans un script de fermeture
     * process.on('SIGTERM', () => {
     *   emailService.close();
     * });
     */
    close() {
        EmailTransporter.close();
    },

    /**
     * Retourne les types d'emails supportés
     * 
     * @returns {Object} Informations sur les types d'emails disponibles
     */
    getSupportedEmailTypes() {
        return {
            types: [
                'contact'
            ],
            templates: [
                'contactNotificationTemplate'
            ],
            description: 'Service d\'email simple pour les notifications de contact Audelweiss'
        };
    }
};

/**
 * Export par défaut du service d'email
 * 
 * Utilisation recommandée :
 * import { emailService } from './email.js';
 * ou
 * import emailService from './email.js';
 */
export default emailService; 