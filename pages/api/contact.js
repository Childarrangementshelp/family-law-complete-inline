import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  try {
    // 1. Create transporter for GMAIL
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g. "yourgmail@gmail.com"
        pass: process.env.EMAIL_PASS, // the 16-char app password
      },
    });

    // 2. The mail data
    const mailOptions = {
        from: `"Contact Form" <${process.env.EMAIL_USER}>`,
        replyTo: `${name} <${email}>`,
        to: process.env.RECEIVE_EMAIL,
        subject: `New contact form submission`,
        text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      `,
      };      


    // 3. Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Nodemailer(Gmail) error:', err);
    return res.status(500).json({ error: 'Error sending email.' });
  }
}
