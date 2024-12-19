/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const nodemailer = require('nodemailer');

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
 * Send email with attachment
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.body - Email body in HTML format
 * @param {string} [options.attachment] - Base64 string of the screenshot (optional)
 */
const sendMail = async ({ to, subject, body, attachment }) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html: body,
        attachments: attachment
            ? [
                {
                    filename: 'screenshot.png',
                    content: attachment.split(',')[1],
                    encoding: 'base64',
                },
            ]
            : [],
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info.response);
            }
        });
    });
};

module.exports = { sendMail };
