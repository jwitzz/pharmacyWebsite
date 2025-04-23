const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { getMaxListeners } = require('nodemailer/lib/xoauth2');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/refill',async(req, res) => {
    const {name, email, rx} = req.body;

    const pharmacyMessage = {
      from: 'jason.witzel@gmail.com',
      to: 'jason.witzel@gmail.com',
      subject: 'New refill request',
      text: `Name: ${name}\nEmail: ${email}\nPrescription Number: ${rx}`
    };

    const customerMessage = {
        from: 'jason.witzel@gmail.com',
        to: email,
        subject: 'Refill request received',
        text: `Hi $(name),\n\nWe have received your refill request #$(rx). We will notify you when it is ready.\n\n- Your Pharmacy`
    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jason.witzel@gmail.com',
            pass: 
        }
    })
})