/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const nodemailer = require('nodemailer');

// Create the transporter using Gmail
const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.body - Email body in HTML format
 */
const sendMail = async ({ to, subject, body }) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: body,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = { sendMail };
