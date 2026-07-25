import { ProjectService } from '../services/project.service.js';

const projectService = new ProjectService();

export const getAllProjects = async (req, res, next) => {
  try {
    const data = await projectService.getAllProjects();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await projectService.getProjectById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const data = await projectService.createProject(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await projectService.updateProject(id, req.body);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    await projectService.deleteProject(id);
    res.status(200).json({ success: true, message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
};
