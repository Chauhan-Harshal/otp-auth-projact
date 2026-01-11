import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendMail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"OTP Verification" <rohitpakhre281@gmail.com>`,
            to,
            subject,
            html
        });

        return info;
    } catch (error) {
        console.log("There is an error in sending email.");
    }
};