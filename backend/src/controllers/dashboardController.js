import { getResumesByUserId } from '../repositories/resumeRepository.js'
import { findAnalysisByResumeId } from '../repositories/analysisRepository.js'
import { Notification } from '../models/Notification.js'

/**
 * Fetch dashboard dashboard metrics, averages, recent activities, and notifications.
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user.id
    
    // Get recent resumes
    const { items: resumes } = await getResumesByUserId(userId, {}, { page: 1, limit: 10, sort: 'createdAt', order: 'desc' })
    
    let totalScore = 0
    let analyzedCount = 0
    const recentAnalyses = []

    for (const resume of resumes) {
      const analysis = await findAnalysisByResumeId(resume._id)
      if (analysis) {
        totalScore += analysis.atsScore
        analyzedCount++
        recentAnalyses.push({
          id: resume._id,
          name: resume.originalFileName,
          role: 'Software Engineer',
          date: new Date(resume.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          score: analysis.atsScore,
          status: resume.status
        })
      }
    }

    const averageAtsScore = analyzedCount > 0 ? Math.round(totalScore / analyzedCount) : 84
    
    // Fetch real notifications
    const dbNotifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(5)
    
    const notifications = dbNotifications.map(n => {
      // Calculate time string (e.g. "2 hours ago")
      const diffMs = Date.now() - new Date(n.createdAt).getTime();
      const diffMins = Math.round(diffMs / 60000);
      let timeStr = 'Just now';
      if (diffMins >= 60 * 24) timeStr = `${Math.round(diffMins / (60 * 24))} days ago`;
      else if (diffMins >= 60) timeStr = `${Math.round(diffMins / 60)} hours ago`;
      else if (diffMins > 0) timeStr = `${diffMins} minutes ago`;

      return {
        id: n._id.toString(),
        title: n.title,
        body: n.message,
        time: timeStr
      };
    });

    res.status(200).json({
      success: true,
      data: {
        statistics: {
          totalResumes: resumes.length,
          averageAtsScore,
          parsedSuccess: resumes.filter((r) => r.status === 'analyzed').length,
          creditsRemaining: 15
        },
        recentAnalyses: recentAnalyses.slice(0, 4),
        activity: [
          { label: 'Keyword fit', value: 87 },
          { label: 'Narrative clarity', value: 82 },
          { label: 'Leadership signal', value: 90 }
        ],
        notifications
      }
    })
  } catch (error) {
    next(error)
  }
}
export default getDashboardStats
