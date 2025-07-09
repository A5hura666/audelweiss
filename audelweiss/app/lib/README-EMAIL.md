# Service d'Email Audelweiss - Documentation

## Vue d'ensemble

Le service d'email d'Audelweiss est conçu sur une architecture modulaire pour gérer l'envoi d'emails de manière robuste et extensible.

## Architecture

### Composants principaux

1. **EmailHandlerFactory** - Pattern Factory pour créer le handler de contact
2. **BaseEmailHandler** - Classe abstraite définissant l'interface commune
3. **ContactNotificationHandler** - Handler spécialisé pour les notifications de contact
4. **EmailService** - Service principal avec configuration SMTP
5. **EmailValidator** - Utilitaires de validation
6. **ContactNotificationTemplate** - Template HTML professionnel pour le contact

## Configuration

### Variables d'environnement requises

```env
# Configuration SMTP obligatoire
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app

# Configuration optionnelle
EMAIL_FROM=noreply@audelweiss.fr - Email d'envoi
ADMIN_EMAIL=admin@audelweiss.fr - Email de reception
```

### Vérification de la configuration

```javascript
import { emailService } from './email.js';

// Tester la configuration
const status = await emailService.verifyConfiguration();
console.log('Configuration:', status);
```

## Utilisation

### Via l'API Route

```javascript
// POST /api/email/send
const response = await fetch('/api/email/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'contact',
    adminEmail: 'admin@audelweiss.fr',
    contactData: {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      subject: 'Question produit',
      message: 'Bonjour, j\'aimerais...'
    }
  })
});
```

## Types d'emails supportés

| Type | Description | Données requises |
|------|-------------|------------------|
| `contact` | Notification de contact admin | `adminEmail`, `contactData` |

## Extension du système (si nécessaire)

Le système est conçu pour être facilement extensible. Si vous souhaitez ajouter d'autres types d'emails :

### 1. Créer un nouveau handler

```javascript
// Dans emailHandlers.js
class NewsletterHandler extends BaseEmailHandler {
    validate(data) {
        if (!data.to || !data.subject) {
            throw new Error('Email et sujet requis');
        }
    }

    async execute(data) {
        return await emailService.sendEmail(data);
    }
}
```

### 2. Enregistrer le handler

```javascript
// Dans EmailHandlerFactory
EmailHandlerFactory.registerHandler('newsletter', NewsletterHandler);
```

### 3. Créer le template correspondant

```javascript
// Dans emailTemplates.js
export const newsletterTemplate = (data) => {
    return baseTemplate(
        'Newsletter',
        `<p>Contenu newsletter avec ${data.content}</p>`
    );
};
```

## Gestion d'erreurs

Le service utilise une gestion d'erreurs en cascade :

1. **Validation** : Erreurs de données manquantes/invalides
2. **Configuration** : Erreurs de configuration SMTP
3. **Transport** : Erreurs de connexion/envoi
4. **Application** : Erreurs métier spécifiques

```javascript
try {
    await emailService.sendWelcomeEmail(email, name);
} catch (error) {
    if (error.message.includes('Configuration')) {
        // Problème de configuration
        console.error('Config SMTP:', error);
    } else if (error.message.includes('requis')) {
        // Erreur de validation
        console.error('Données invalides:', error);
    } else {
        // Erreur d'envoi
        console.error('Erreur envoi:', error);
    }
}
```

## Bonnes pratiques

### Sécurité
- Valider tous les inputs avant l'envoi

### Performance
- Le service utilise un pool de connexions
- Réutilise les connexions existantes

### Monitoring
- Tous les envois sont loggés avec timestamp
- Headers personnalisés pour le tracking
- Gestion détaillée des erreurs

### Tests
```javascript
// Tester la configuration
const configOk = await emailService.verifyConfiguration();

// Fermer proprement les connexions
emailService.close();
```

## Dépannage

### Erreurs courantes

1. **"Variables d'environnement manquantes"**
   - Vérifier que toutes les variables EMAIL_* sont définies

2. **"Configuration SMTP invalide"**
   - Tester avec `emailService.verifyConfiguration()`
   - Vérifier les credentials et la connexion réseau

3. **"Format d'email invalide"**
   - Vérifier le format des adresses email
   - Utiliser la validation `EmailValidator.isValidEmail()`

4. **"Authentification requise"**
   - Ajouter le header `Authorization: Bearer <token>`
   - Vérifier que le token JWT est valide

### Debug

```javascript
// Activer les logs détaillés
process.env.NODE_ENV = 'development';

// Vérifier la configuration
const status = await emailService.verifyConfiguration();
console.log('Status:', status);

// Tester l'envoi
try {
    const result = await emailService.sendEmail({
        to: 'test@example.com',
        subject: 'Test',
        text: 'Test message'
    });
    console.log('Envoi réussi:', result.messageId);
} catch (error) {
    console.error('Erreur détaillée:', error);
}
```

## Support

Pour toute question sur le service d'email :
1. Consulter cette documentation
2. Vérifier les logs d'erreur
3. Tester la configuration avec `verifyConfiguration()`
4. Examiner les templates HTML dans `emailTemplates.js` 