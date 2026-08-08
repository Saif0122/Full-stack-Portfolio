import nodemailer from 'nodemailer';
import { EmailProvider } from './email.provider.js';

export class NodemailerProvider extends EmailProvider {
  constructor() {
    super();
    // Configure for Gmail or Mailtrap (development)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail({ to, subject, html }) {
    if (!process.env.SMTP_USER) {
      console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
      return;
    }

    await this.transporter.sendMail({
      from: `"Nexus Store" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  }

  async sendOrderConfirmation(order, user) {
    const html = `
      <h1>Thank you for your order!</h1>
      <p>Your order #${order._id} has been processed successfully.</p>
      <p>Total: $${order.total}</p>
      <p>You can access your digital downloads in your <a href="${process.env.FRONTEND_URL}/dashboard/downloads">Customer Dashboard</a>.</p>
    `;
    await this.sendEmail({ to: user.email, subject: `Order Confirmation #${order._id}`, html });
  }

  async sendLicenseDelivery(licenses, user) {
    const html = `
      <h1>Your License Keys</h1>
      <p>Here are your license keys for your recent purchase:</p>
      <ul>
        ${licenses.map(l => `<li><strong>${l.key}</strong></li>`).join('')}
      </ul>
    `;
    await this.sendEmail({ to: user.email, subject: 'Your License Keys', html });
  }
}
