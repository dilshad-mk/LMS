const StudentProgress = require("../../models/Progress/progress");
const Session = require("../../models/Courses/session");
const Lesson = require("../../models/Courses/lesson");

exports.updateStudentProgress = async (req, res) => {
  try {
    const { studentId, courseId, currentSessionId, currentLessonId } = req.body;

    // --- 1. Validate required fields ---
    if (!studentId || !courseId || !currentSessionId || !currentLessonId) {
      return res.status(400).json({ error: "studentId, courseId, currentSessionId, and currentLessonId are required." });
    }

    // --- 2. Find-or-create the single progress record for this student+course ---
    let progress = await StudentProgress.findOne({ studentId, courseId });

    if (!progress) {
      progress = new StudentProgress({ studentId, courseId });
    }

    // --- 3. Mark currentLesson as completed (avoid duplicates with $addToSet logic) ---
    const lessonAlreadyDone = progress.completedLessons
      .map((id) => id.toString())
      .includes(currentLessonId.toString());

    if (!lessonAlreadyDone) {
      progress.completedLessons.push(currentLessonId);
    }

    // --- 4. Calculate SESSION progress ---
    // How many lessons exist in the current session?
    const totalLessonsInSession = await Lesson.countDocuments({
      sessionId: currentSessionId,
    });

    if (totalLessonsInSession === 0) {
      return res.status(400).json({ error: "No lessons found for this session." });
    }

    // How many of those lessons has this student completed?
    const completedLessonsInSession = progress.completedLessons.filter(
      async (lessonId) => {
        const lesson = await Lesson.findById(lessonId).select("sessionId");
        return lesson?.sessionId?.toString() === currentSessionId.toString();
      }
    );

    // Better approach: fetch all lesson IDs in this session, then intersect
    const sessionLessons = await Lesson.find(
      { sessionId: currentSessionId },
      "_id"
    );
    const sessionLessonIds = sessionLessons.map((l) => l._id.toString());

    const completedInSessionCount = progress.completedLessons.filter((id) =>
      sessionLessonIds.includes(id.toString())
    ).length;

    const sessionProgressData = (completedInSessionCount / totalLessonsInSession) * 100;

    // --- 5. If session is 100% done, mark it completed ---
    if (sessionProgressData === 100) {
      const sessionAlreadyDone = progress.completedSessions
        .map((id) => id.toString())
        .includes(currentSessionId.toString());

      if (!sessionAlreadyDone) {
        progress.completedSessions.push(currentSessionId);
      }
    }

    // --- 6. Calculate COURSE progress ---
    const totalSessionsInCourse = await Session.countDocuments({ courseId });

    if (totalSessionsInCourse === 0) {
      return res.status(400).json({ error: "No sessions found for this course." });
    }

    const courseProgressData =
      (progress.completedSessions.length / totalSessionsInCourse) * 100;

    // --- 7. Update current position + save ---
    progress.currentSessionId  = currentSessionId;
    progress.currentLessonId   = currentLessonId;
    progress.sessionProgress   = parseFloat(sessionProgressData.toFixed(2));
    progress.courseProgress    = parseFloat(courseProgressData.toFixed(2));

    await progress.save();

    res.status(200).json({
      message: "Progress updated successfully",
      progress: {
        courseProgress:   progress.courseProgress,
        sessionProgress:  progress.sessionProgress,
        completedLessons: progress.completedLessons.length,
        completedSessions: progress.completedSessions.length,
        currentSessionId: progress.currentSessionId,
        currentLessonId:  progress.currentLessonId,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};