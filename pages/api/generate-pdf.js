// pages/api/generate-pdf.js
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, userEmail, wantsFollowUp } = req.body;
    // messages: [{ role: 'user'|'assistant', content: '...' }, ...]
    // userEmail: the user's email address
    // wantsFollowUp: boolean

    if (!userEmail || !messages) {
      return res.status(400).json({ error: 'Missing userEmail or messages.' });
    }

    // 1. Summarize the chat with GPT (Optional)
    //    We'll call the GPT API to get a summary. If you'd rather skip,
    //    you can just build the PDF from the raw messages.
    const summary = await getGptSummary(messages);

    // 2. Build the PDF
    const pdfBuffer = await buildPdf(summary, messages, wantsFollowUp);

    // 3. Email PDF to user and to your own address
    await emailPdf(pdfBuffer, userEmail, wantsFollowUp);

    return res.status(200).json({ message: 'PDF emailed successfully!' });
  } catch (err) {
    console.error('Generate PDF error:', err);
    return res.status(500).json({ error: 'Error generating or sending PDF.' });
  }
}

/**
 * Summarize the entire chat array with GPT, returning a short summary string.
 */
async function getGptSummary(messages) {
  try {
    // Build userMessage with the entire chat
    const conversationText = messages.map((msg) => {
      return `${msg.role.toUpperCase()}: ${msg.content}`;
    }).join('\n');

    const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
    const openai = new OpenAIApi(config);

    // Example prompt (customize as you like)
    const prompt = `Please summarize this conversation in a concise, professional manner:\n\n${conversationText}`;

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful summarizer for family law chats.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error summarizing chat:', error);
    return 'Summary not available.';
  }
}

/**
 * Build a PDF (summary + full chat + "SALES PLACEHOLDER HERE").
 * Return a Buffer containing the PDF data.
 */
function buildPdf(summary, messages, wantsFollowUp) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', (data) => buffers.push(data));
    doc.on('error', reject);
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    // 1) Title
    doc.fontSize(18).text('Chat Transcript & Advice', { underline: true });
    doc.moveDown();

    // 2) GPT Summary
    doc.fontSize(14).text('GPT Summary:', { bold: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(summary);
    doc.moveDown(1);

    // 3) Full Conversation
    doc.fontSize(14).text('Full Conversation:', { bold: true });
    doc.moveDown(0.5);
    messages.forEach((msg) => {
      doc.fontSize(12).text(`${msg.role.toUpperCase()}: ${msg.content}`);
      doc.moveDown(0.5);
    });
    doc.moveDown(1);

    // 4) Sales Placeholder
    doc.fontSize(14).text('SALES PLACEHOLDER HERE:', { bold: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text('We offer additional services to assist with your family law case...');
    if (wantsFollowUp) {
      doc.moveDown(1);
      doc.fillColor('green').text('You indicated you want a follow-up from us. We will be in touch soon!', { bold: true });
    }

    doc.end(); // finalize
  });
}

/**
 * Email the PDF to the user and cc your own email.
 */
async function emailPdf(pdfBuffer, userEmail, wantsFollowUp) {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or your chosen service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2) Send mail
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    cc: process.env.RECEIVE_EMAIL, // also send to you
    subject: 'Your Chat Summary and Transcript',
    text: wantsFollowUp
      ? 'Here is your chat PDF. We will follow up with you soon!'
      : 'Here is your chat PDF.',
    attachments: [
      {
        filename: 'chat.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}
