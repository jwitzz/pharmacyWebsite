const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { getMaxListeners } = require('nodemailer/lib/xoauth2');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/refill',async(req, res) => {
    const {name, email, rx} = req.body;

    const pharmacyMessage = {
      from: 'axccentz@gmail.com',
      to: 'axccentz@gmail.com',
      subject: 'New refill request',
      text: `Name: ${name}\nEmail: ${email}\nPrescription Number: ${rx}`
    };

    const customerMessage = {
        from: 'axccentz@gmail.com',
        to: email,
        subject: 'Refill request received',
        text: `Hi ${name},\n\nWe have received your refill request #${rx}. We will notify you when it is ready.\n\n- Your Pharmacy`
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    try {
        await transporter.sendMail(pharmacyMessage);
        await transporter.sendMail(customerMessage);

        res.json({ message: 'Emails sent succesfully' });

    }   catch (err) {

        console.error(err)
        res.status(500).json({ message: 'Error sending Email '});
    }

});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));