const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

// Configuración de CORS con origen específico
const corsOptions = {
    origin: 'https://jhonny-9z29t0gqv-jhonnychems-projects.vercel.app',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions)); 
app.use(express.json());  

app.options('/send-email', cors(corsOptions));  

app.post('/send-email', async (req, res) => {
    const { name, email, subject, affair, phone } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEP,
            subject: subject,
            text: `Nombre: ${name}\nTeléfono: ${phone}\nEmail: ${email}\nAsunto: ${affair}`,
        });

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});