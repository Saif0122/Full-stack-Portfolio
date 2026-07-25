import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'paid', 'void', 'refunded'], default: 'paid' },
  pdfUrl: { type: String }, // Link to generated PDF if any
  billingDetails: {
    name: String,
    email: String,
    address: String,
    country: String,
  }
}, { timestamps: true });

const Invoice = mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
export default Invoice;
