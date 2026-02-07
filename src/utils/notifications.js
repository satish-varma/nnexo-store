const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

// Initialize Firebase (Assuming config is provided in .env)
if (process.env.FIREBASE_PROJECT_ID) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        })
    });
}

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    const message = {
        from: `${process.env.FROM_NAME || 'NNEXO Store'} <${process.env.FROM_EMAIL || 'noreply@nnexo.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html
    };

    const info = await transporter.sendMail(message);
    console.log('Message sent: %s', info.messageId);
};

const sendPushNotification = async (tokens, payload) => {
    if (!tokens || tokens.length === 0) return;

    const message = {
        notification: {
            title: payload.title,
            body: payload.body
        },
        data: payload.data || {},
        tokens: tokens
    };

    try {
        const response = await admin.messaging().sendMulticast(message);
        console.log(`${response.successCount} messages were sent successfully`);
    } catch (error) {
        console.error('Error sending push notification:', error);
    }
};

module.exports = {
    sendEmail,
    sendPushNotification
};
