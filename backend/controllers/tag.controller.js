import { TagService } from '../services/tag.service.js';

const tagService = new TagService();

export const getAllTags = async (req, res, next) => {
  try {
    const data = await tagService.getAllTags();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await tagService.getTagById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Tag not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const data = await tagService.createTag(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await tagService.updateTag(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tagService.deleteTag(id);
    res.status(200).json({ success: true, message: 'Tag deleted' });
  } catch (error) {
    next(error);
  }
};
