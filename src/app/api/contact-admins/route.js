import { sendMail } from '@/lib/sendMail';  // Import your updated sendMail function

export const config = {
    api: {
        bodyParser: false,  // Disable body parser to handle files manually
    },
};

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method not allowed' });
        }

        const busboy = (await import('busboy')).default;
        const bb = busboy({ headers: req.headers });
        const formData = {};

        bb.on('field', (fieldname, value) => {
            formData[fieldname] = value;
        });

        bb.on('close', async () => {
            // Check if required fields are provided
            if (!formData.name || !formData.email || !formData.message) {
                return res.status(400).json({
                    message: 'All fields (name, email, and message) are required.',
                });
            }

            console.log('Received form data:', formData);

            try {
                // Send email with form data (no attachment)
                await sendMail({
                    to: formData.email,  // Send to the address provided in the form
                    subject: 'New Contact Form Submission',
                    body: `
                        <p>Name: ${formData.name}</p>
                        <p>Email: ${formData.email}</p>
                        <p>Message: ${formData.message}</p>
                    `,
                });

                return res.status(200).json({ message: 'Message received and email sent successfully!' });
            } catch (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Failed to send email', error: error.message });
            }
        });

        req.pipe(bb);
    } catch (error) {
        console.error('Error processing contact form:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
