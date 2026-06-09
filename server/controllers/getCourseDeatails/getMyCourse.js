const Course = require("../../models/Courses/course");
const Session = require("../../models/Courses/session");
const Lesson = require("../../models/Courses/lesson");

exports.getUserCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Get course
    const course = await Course.findById(courseId).lean();

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Get all sessions
    const sessions = await Session.find({ courseId })
      .sort({ sessionOrder: 1 })
      .lean();

    // Extract session ids
    const sessionIds = sessions.map((session) => session._id);

    // Get all lessons in one query
    const lessons = await Lesson.find({
      sessionId: { $in: sessionIds },
    })
      .sort({ lessonOrder: 1 })
      .lean();

    // Group lessons by session
    const lessonsMap = {};

    for (const lesson of lessons) {
      const sessionId = lesson.sessionId.toString();

      if (!lessonsMap[sessionId]) {
        lessonsMap[sessionId] = [];
      }

      lessonsMap[sessionId].push(lesson);
    }

    // Attach lessons to sessions
    const sessionsWithLessons = sessions.map((session) => ({
      ...session,
      lessons: lessonsMap[session._id.toString()] || [],
    }));

    res.status(200).json({
      ...course,
      sessions: sessionsWithLessons,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Server error",
    });
  }
};