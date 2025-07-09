// app/lib/emailTemplates.js

/**
 * Templates d'emails réutilisables pour Audelweiss
 */

// Template de base pour tous les emails
const baseTemplate = (content, title = '') => `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .email-container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #4a90e2;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #4a90e2;
            margin-bottom: 10px;
        }
        .content {
            margin-bottom: 30px;
        }
        .footer {
            border-top: 1px solid #eee;
            padding-top: 20px;
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background-color: #4a90e2;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #357abd;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo">🌸 Audelweiss</div>
            <p>Créations artisanales des Hautes-Alpes</p>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>Merci de votre confiance,<br><strong>L'équipe Audelweiss</strong></p>
            <p>
                <small>
                    Audelweiss - Créations artisanales<br>
                    Hautes-Alpes, France<br>
                    <a href="mailto:contact@audelweiss.fr">contact@audelweiss.fr</a>
                </small>
            </p>
        </div>
    </div>
</body>
</html>
`;



// Template de notification de contact
export const contactNotificationTemplate = (contactData) => {
    const { name, email, subject: contactSubject, message, phone } = contactData;
    
    const content = `
        <h2 style="color: #4a90e2;">Nouveau message de contact 📧</h2>
        <p>Un nouveau message a été envoyé depuis le formulaire de contact du site.</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
            <p><strong>Sujet :</strong> ${contactSubject}</p>
        </div>
        
        <h3>Message :</h3>
        <div style="background-color: white; border-left: 4px solid #4a90e2; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-line;">${message}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${email}?subject=Re: ${contactSubject}" class="button">
                Répondre directement
            </a>
        </div>
    `;
    
    return baseTemplate(content, `Nouveau contact de ${name}`);
};

export default {
    contactNotificationTemplate,
    baseTemplate
}; 