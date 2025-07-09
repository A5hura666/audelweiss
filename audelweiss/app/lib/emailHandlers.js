// app/lib/emailHandlers.js

/**
 * Handlers modulaires pour les différents types d'emails
 * Chaque handler encapsule la validation et la logique métier spécifique
 * 
 * Chaque handler a une seule responsabilité
 */

import { emailService } from './email.js';

/**
 * Classe de base pour la validation des données communes
 */
class EmailValidator {
    /**
     * Valide une adresse email
     * @param {string} email - L'adresse email à valider
     * @returns {boolean} - True si l'email est valide
     */
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valide qu'une chaîne n'est pas vide
     * @param {string} value - La valeur à valider
     * @returns {boolean} - True si la valeur n'est pas vide
     */
    static isNotEmpty(value) {
        return value && value.trim().length > 0;
    }

    /**
     * Valide qu'un tableau n'est pas vide
     * @param {Array} array - Le tableau à valider
     * @returns {boolean} - True si le tableau n'est pas vide
     */
    static isNotEmptyArray(array) {
        return Array.isArray(array) && array.length > 0;
    }
}

/**
 * Interface commune pour tous les handlers d'email
 * Principe appliqué : Interface Segregation Principle (ISP)
 */
class BaseEmailHandler {
    /**
     * Valide les données d'entrée
     * @param {Object} data - Les données à valider
     * @throws {Error} - Lance une erreur si les données sont invalides
     */
    validate(data) {
        throw new Error('La méthode validate doit être implémentée');
    }

    /**
     * Exécute l'envoi de l'email
     * @param {Object} data - Les données pour l'envoi
     * @returns {Promise<Object>} - Le résultat de l'envoi
     */
    async execute(data) {
        throw new Error('La méthode execute doit être implémentée');
    }

    /**
     * Point d'entrée principal qui orchestre validation et exécution
     * @param {Object} data - Les données pour l'envoi
     * @returns {Promise<Object>} - Le résultat de l'envoi
     */
    async handle(data) {
        this.validate(data);
        return await this.execute(data);
    }
}



/**
 * Handler pour les notifications de contact
 * Responsabilité : Gérer l'envoi de notifications d'administration pour les contacts
 */
class ContactNotificationHandler extends BaseEmailHandler {
    /**
     * Valide les données pour une notification de contact
     * @param {Object} data - Les données à valider
     * @param {string} data.adminEmail - Email de l'administrateur
     * @param {Object} data.contactData - Données du formulaire de contact
     * @throws {Error} - Si les données sont invalides
     */
    validate(data) {
        const { adminEmail, contactData } = data;

        if (!EmailValidator.isValidEmail(adminEmail)) {
            throw new Error('L\'adresse email de l\'administrateur n\'est pas valide');
        }

        if (!contactData || typeof contactData !== 'object') {
            throw new Error('Les données de contact sont requises');
        }

        const { name, email, subject, message } = contactData;

        if (!EmailValidator.isNotEmpty(name)) {
            throw new Error('Le nom du contact est requis');
        }

        if (!EmailValidator.isValidEmail(email)) {
            throw new Error('L\'adresse email du contact n\'est pas valide');
        }

        if (!EmailValidator.isNotEmpty(subject)) {
            throw new Error('Le sujet du contact est requis');
        }

        if (!EmailValidator.isNotEmpty(message)) {
            throw new Error('Le message du contact est requis');
        }
    }

    /**
     * Exécute l'envoi de la notification de contact
     * @param {Object} data - Les données pour l'envoi
     * @returns {Promise<Object>} - Le résultat de l'envoi
     */
    async execute(data) {
        const { adminEmail, contactData } = data;
        return await emailService.sendContactNotification(adminEmail, contactData);
    }
}



/**
 * Factory pattern pour créer les handlers appropriés
 * Principe appliqué : Open/Closed Principle (OCP) et Factory Pattern
 * 
 * Cette classe permet d'ajouter facilement de nouveaux types d'emails
 * sans modifier le code existant
 */
class EmailHandlerFactory {
    /**
     * Map des types d'emails vers leurs handlers
     * @private
     */
    static #handlers = new Map([
        ['contact', ContactNotificationHandler],
    ]);

    /**
     * Crée un handler pour le type d'email spécifié
     * @param {string} type - Le type d'email
     * @returns {BaseEmailHandler} - L'instance du handler approprié
     * @throws {Error} - Si le type d'email n'est pas supporté
     */
    static createHandler(type) {
        const HandlerClass = this.#handlers.get(type);
        
        if (!HandlerClass) {
            const supportedTypes = Array.from(this.#handlers.keys()).join(', ');
            throw new Error(`Type d'email non supporté: ${type}. Types supportés: ${supportedTypes}`);
        }

        return new HandlerClass();
    }

    /**
     * Retourne la liste des types d'emails supportés
     * @returns {string[]} - Liste des types supportés
     */
    static getSupportedTypes() {
        return Array.from(this.#handlers.keys());
    }

    /**
     * Enregistre un nouveau handler (pour l'extensibilité)
     * @param {string} type - Le type d'email
     * @param {Function} handlerClass - La classe du handler
     */
    static registerHandler(type, handlerClass) {
        if (!(handlerClass.prototype instanceof BaseEmailHandler)) {
            throw new Error('Le handler doit hériter de BaseEmailHandler');
        }
        this.#handlers.set(type, handlerClass);
    }
}

// Exports pour l'utilisation externe
export {
    EmailHandlerFactory,
    BaseEmailHandler,
    EmailValidator,
    ContactNotificationHandler
};

export default EmailHandlerFactory; 