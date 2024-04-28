const nodemailer = require("nodemailer");

class EmailService {
    static async sendEmail(email, verifyCode) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "anhhocfullstack@gmail.com",
                pass: "dkzc gqko wvye rgmt",
            },
        });


        async function main() {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Coding Social" <anhhocfullstack@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Verify Coding Social Account", // Subject line
                text: "Hi! Welcome to Coiding Social. Click the link below to verify your account", // plain text body
                html: `<a href="http://localhost:8080/v1/api/user/verify/${verifyCode}">Click me to verify your account!</a>`,
            });

            console.log("Message sent: %s", info.messageId);
        }
        main().catch(console.error);
    }
}

module.exports = EmailService