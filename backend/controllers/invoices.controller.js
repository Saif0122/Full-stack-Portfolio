import { InvoiceService } from '../services/invoice.service.js';

const invoiceService = new InvoiceService();

export const getUserInvoices = async (req, res, next) => {
  try {
    const data = await invoiceService.getUserInvoices(req.user._id);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const data = await invoiceService.getInvoiceByNumber(req.params.invoiceNumber);
    if (!data) return res.status(404).json({ success: false, message: 'Invoice not found' });
    
    // Ensure user owns invoice
    if (data.user.toString() !== req.user._id.toString() && req.user.role?.name !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
