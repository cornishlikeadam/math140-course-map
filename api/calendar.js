// 📅 10-week planner: JSON milestones, or ?format=ics for Apple / Google calendars.
import { COURSE_INFO, generateMilestones, buildICS } from "../course-data.js";

const DEFAULT_START = "2026-09-28";

export default function handler(req, res) {
  const raw = String(req.query?.startDate || DEFAULT_START);
  const startDate = /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : DEFAULT_START;
  const milestones = generateMilestones(startDate);

  if (req.query?.format === "ics") {
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="math140-study-calendar.ics"');
    return res.status(200).send(buildICS(milestones));
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    course: `${COURSE_INFO.code} - ${COURSE_INFO.title}`,
    startDate,
    totalWeeks: COURSE_INFO.quarterLengthWeeks,
    milestones,
  });
}
