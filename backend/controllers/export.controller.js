import { Parser } from 'json2csv';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

const getModel = (resource) => {
  switch (resource) {
    case 'orders': return Order;
    case 'products': return Product;
    case 'users': return User;
    default: return null;
  }
};

export const exportData = async (req, res, next) => {
  try {
    const { resource, format } = req.query; // resource: orders, products, users. format: csv, excel, pdf
    
    const Model = getModel(resource);
    if (!Model) {
      return res.status(400).json({ success: false, message: 'Invalid resource for export' });
    }

    const data = await Model.find().lean();
    
    if (data.length === 0) {
      return res.status(404).json({ success: false, message: 'No data to export' });
    }

    if (format === 'csv') {
      const fields = Object.keys(data[0]).filter(k => k !== '__v');
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(data);
      
      res.header('Content-Type', 'text/csv');
      res.attachment(`${resource}-export.csv`);
      return res.send(csv);
    } 
    
    if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(resource);
      
      const fields = Object.keys(data[0]).filter(k => k !== '__v');
      worksheet.columns = fields.map(f => ({ header: f, key: f, width: 20 }));
      
      data.forEach(item => worksheet.addRow(item));
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment(`${resource}-export.xlsx`);
      
      await workbook.xlsx.write(res);
      return res.end();
    }
    
    if (format === 'pdf') {
      const doc = new PDFDocument();
      res.header('Content-Type', 'application/pdf');
      res.attachment(`${resource}-export.pdf`);
      
      doc.pipe(res);
      doc.fontSize(16).text(`${resource.toUpperCase()} Export`, { align: 'center' });
      doc.moveDown();
      
      data.forEach((item, index) => {
        doc.fontSize(10).text(`Record ${index + 1}: ${JSON.stringify(item)}`);
        doc.moveDown(0.5);
      });
      
      doc.end();
      return;
    }
    
    return res.status(400).json({ success: false, message: 'Invalid format requested' });
  } catch (error) {
    next(error);
  }
};
