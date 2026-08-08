import { NodemailerProvider } from './nodemailer.provider.js';

export class EmailFactory {
  static getProvider(providerName = process.env.EMAIL_PROVIDER || 'nodemailer') {
    switch (providerName) {
      case 'nodemailer':
        return new NodemailerProvider();
      case 'resend':
        throw new Error('Resend Email Provider not implemented yet');
      default:
        throw new Error(`Unsupported email provider: ${providerName}`);
    }
  }
}
