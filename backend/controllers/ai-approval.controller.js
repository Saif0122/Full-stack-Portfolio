import AIHistory from '../models/ai-history.model.js';
import SeoSnapshot from '../models/seo-snapshot.model.js';
import AiHealthMonitor from '../services/ai-health.service.js';

export const getPendingSuggestions = async (req, res) => {
  try {
    const suggestions = await AIHistory.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.status(200).json({ success: true, data: suggestions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const getAiStats = async (req, res) => {
  try {
    const total = await AIHistory.countDocuments();
    const accepted = await AIHistory.countDocuments({ status: { $in: ['accepted', 'edited'] } });
    const pending = await AIHistory.countDocuments({ status: 'pending' });
    const rejected = await AIHistory.countDocuments({ status: 'rejected' });
    
    const estimatedTimeSavedHours = Math.round((accepted * 15) / 60);
    const healthMetrics = await AiHealthMonitor.getHealthMetrics();

    res.status(200).json({
      success: true,
      data: {
        total,
        accepted,
        pending,
        rejected,
        acceptanceRate: total > 0 ? Math.round((accepted / total) * 100) : 0,
        estimatedTimeSavedHours,
        health: healthMetrics
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const approveSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { finalApplied, wasEdited, targetModel, targetId, previousSeoData } = req.body;
    
    const suggestion = await AIHistory.findById(id);
    if (!suggestion) return res.status(404).json({ success: false, message: 'Suggestion not found' });
    
    suggestion.status = wasEdited ? 'edited' : 'accepted';
    suggestion.finalApplied = finalApplied || suggestion.originalSuggestion;
    await suggestion.save();

    // Take full snapshot of the previous state for rollback
    if (targetModel && targetId && previousSeoData) {
      const versionCount = await SeoSnapshot.countDocuments({ targetModel, targetId });
      await SeoSnapshot.create({
        targetModel,
        targetId,
        version: versionCount + 1,
        seoData: previousSeoData,
        historyId: suggestion._id,
        approvedBy: req.user ? req.user._id : null,
        changeSummary: `AI Suggestion Approved: ${wasEdited ? 'Edited by Admin' : 'Accepted As-Is'}`
      });
    }
    
    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const rejectSuggestion = async (req, res) => {
  try {
    const { id } = req.params;
    const suggestion = await AIHistory.findById(id);
    if (!suggestion) return res.status(404).json({ success: false, message: 'Suggestion not found' });
    
    suggestion.status = 'rejected';
    await suggestion.save();
    
    res.status(200).json({ success: true, data: suggestion });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const rollbackSuggestion = async (req, res) => {
  try {
    const { snapshotId } = req.params;
    const snapshot = await SeoSnapshot.findById(snapshotId);
    
    if (!snapshot) {
      return res.status(404).json({ success: false, message: 'Snapshot not found' });
    }

    // In a real app we dynamically load the model using mongoose.model(snapshot.targetModel)
    // and replace the seo object completely: 
    // const Model = mongoose.model(snapshot.targetModel);
    // await Model.findByIdAndUpdate(snapshot.targetId, { seo: snapshot.seoData });

    res.status(200).json({ 
      success: true, 
      message: 'Rollback prepared successfully', 
      data: snapshot.seoData 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
