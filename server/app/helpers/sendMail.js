const nodemailer = require('nodemailer');

const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'SendGrid',
            auth: {
                api_key: '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',
                authMethod: 'SG'
            }
        });

        let mailOptions = {
            from: 'kumarravi32832@gmail.com',
            to: to,
            subject: subject,
            html: html
        };

        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error(err);
    }
}

module.exports = sendMail;