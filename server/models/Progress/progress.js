const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  currentSessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
  },
  currentLessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },

  // Track completed IDs — this is what makes progress calculation correct
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  completedSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],

  sessionProgress: { type: Number, default: 0 },
  courseProgress:  { type: Number, default: 0 },
});

// One progress record per student per course
studentProgressSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("StudentProgress", studentProgressSchema);