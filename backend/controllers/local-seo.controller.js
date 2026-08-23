import { LocalSEOService } from '../services/local-seo.service.js';

export const localSeoController = {
  // Profiles
  getProfiles: async (req, res) => {
    try {
      const data = await LocalSEOService.getProfiles();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  createProfile: async (req, res) => {
    try {
      const data = await LocalSEOService.createProfile(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const data = await LocalSEOService.updateProfile(req.params.id, req.body);
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Locations
  getLocations: async (req, res) => {
    try {
      const data = await LocalSEOService.getLocations();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  createLocation: async (req, res) => {
    try {
      const data = await LocalSEOService.createLocation(req.body);
      res.status(201).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Citations
  getCitations: async (req, res) => {
    try {
      const data = await LocalSEOService.getCitations();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  
  // Keywords
  getKeywords: async (req, res) => {
    try {
      const data = await LocalSEOService.getKeywords();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Audit
  getAuditStatus: async (req, res) => {
    try {
      const audit = await LocalSEOService.calculateAuditScore();
      res.json({ success: true, data: audit });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Migrate
  triggerMigration: async (req, res) => {
    try {
      const result = await LocalSEOService.migrateNapDataIfNeeded();
      res.json(result);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
