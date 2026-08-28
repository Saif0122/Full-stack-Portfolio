import { PaymentService } from '../services/payment.service.js';

const paymentService = new PaymentService();

import Product from '../models/product.model.js';
import { OrderRepository } from '../repositories/order.repository.js';

export const checkout = async (req, res, next) => {
  try {
    const { productId, licenseType, providerName = 'stripe' } = req.body;
    
    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    let product;
    const mockProducts = {
      'nexus-saas-boilerplate': {
        title: 'Nexus SaaS Boilerplate',
        price: 199,
        salePrice: 149,
        thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      },
      'chroma-ui-kit': {
        title: 'Chroma UI Kit',
        price: 79,
        salePrice: null,
        thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80'
      },
      'ai-prompt-engineer-pro': {
        title: 'AI Prompt Engineer Pro',
        price: 49,
        salePrice: 29,
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80'
      },
      'velocity-ecommerce-theme': {
        title: 'Velocity E-Commerce Theme',
        price: 249,
        salePrice: 199,
        thumbnail: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=800&q=80'
      }
    };

    if (mockProducts[productId]) {
      product = {
        _id: '000000000000000000000000', // Mock ObjectId
        ...mockProducts[productId]
      };
    } else {
      product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
    }

    // Determine price based on license type
    const basePrice = product.salePrice || product.price;
    const price = licenseType === 'extended' ? basePrice * 3 : basePrice;

    const orderRepo = new OrderRepository();
    let order = await orderRepo.create({
      user: req.user._id,
      items: [{
        product: product._id,
        price: price
      }],
      subtotal: price,
      total: price,
      status: 'pending'
    });

    // We must pass the fully populated product to PaymentService for Stripe line items
    const orderDataForStripe = {
      ...order.toObject(),
      userEmail: req.user.email,
      items: [{
        price: price,
        quantity: 1,
        product: {
          title: `${product.title} (${licenseType === 'extended' ? 'Extended' : 'Standard'} License)`,
          images: product.thumbnail ? [product.thumbnail] : []
        }
      }]
    };

    const result = await paymentService.createPayment(providerName, orderDataForStripe);
    
    // Save the checkout session ID
    await orderRepo.updateStatus(order._id, 'pending');
    
    res.status(200).json({ success: true, url: result.session.url });
  } catch (error) {
    next(error);
  }
};

export const webhook = async (req, res, next) => {
  try {
    const providerName = 'stripe'; // Or determine from headers
    const result = await paymentService.handleWebhook(providerName, req);
    res.status(200).send('Webhook handled');
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
