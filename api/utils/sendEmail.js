import nodemailer from 'nodemailer';

const sendEmail = async (mailOptions) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASS
            }
        });

        await transporter.sendMail(mailOptions);
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email:', error.message);
        console.error('Error stack:', error.stack);
    }
};

export default sendEmail;
