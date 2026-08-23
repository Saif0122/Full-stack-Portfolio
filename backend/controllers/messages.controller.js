import nodemailer from 'nodemailer';
import { asyncHandler } from '../middleware/async.js';
import { ErrorResponse } from '../utils/errorResponse.js';
import { config } from '../config/env.config.js';

export const submitContactForm = asyncHandler(async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorResponse('Please provide name, email, and message', 400));
  }

  // Create transporter (assuming SMTP credentials in .env, falling back to a dummy setup if missing for demo)
  const transporter = nodemailer.createTransport({
    host: config.smtp?.host || process.env.SMTP_HOST || 'smtp.gmail.com',
    port: config.smtp?.port || process.env.SMTP_PORT || 587,
    secure: config.smtp?.secure || false,
    auth: {
      user: config.smtp?.user || process.env.SMTP_USER,
      pass: config.smtp?.password || process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Send email to the site owner
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL || 'saifulislam@gmail.com', 
      subject: `Portfolio Contact Form: ${subject || 'New Message'}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Email send error:', error);
    return next(new ErrorResponse('Message could not be sent. Please configure SMTP credentials.', 500));
  }
});
