import SchemaRegistry from '../services/schema-registry.service.js';
import SchemaValidator from '../services/schema-validator.service.js';
import Post from '../models/post.model.js';
import Product from '../models/product.model.js';
import Project from '../models/project.model.js';
// other models could be imported

export const generateSchema = async (req, res) => {
  const { type, id } = req.query;

  try {
    let entity = null;
    
    // Fetch entity if an ID is provided and it's a content-specific schema
    if (id) {
      if (type === 'Article' || type === 'BlogPosting') {
        entity = await Post.findById(id).populate('seo');
      } else if (type === 'Product') {
        entity = await Product.findById(id).populate('seo');
      } else if (type === 'Project') {
        entity = await Project.findById(id).populate('seo');
      }
      
      if (!entity) {
        return res.status(404).json({ success: false, message: 'Entity not found' });
      }
    }

    const generator = SchemaRegistry.getGenerator(type);
    
    if (!generator) {
      return res.status(400).json({ success: false, message: `No generator found for schema type: ${type}` });
    }

    const schema = await generator(entity);
    const validation = SchemaValidator.validate(schema);

    res.status(200).json({
      success: true,
      data: schema,
      validation
    });
  } catch (error) {
    console.error(`Error generating schema for ${type}:`, error);
    res.status(500).json({ success: false, message: 'Server Error generating schema' });
  }
};

export const getSupportedSchemas = (req, res) => {
  const types = SchemaRegistry.getRegisteredTypes();
  res.status(200).json({ success: true, data: types });
};
