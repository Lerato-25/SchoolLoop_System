
"use client";

import { useState } from "react";
import type { ReactNode, FormEvent } from "react";

const subjects = [
  { name: "Mathematics", assessment: "Test 3", mark: 78 },
  { name: "English", assessment: "Essay", mark: 69 },
  { name: "Natural Science", assessment: "Practical", mark: 83 },
  { name: "Geography", assessment: "Assignment", mark: 74 },
  { name: "Life Orientation", assessment: "Assessment", mark: 91 },
];

const sections = [
  "Dashboard",
  "Results",
  "Attendance",
  "Teachers",
  "Messages",
  "Profile",
  "Calendar",
  "Timetable",
] as const;

type Section = (typeof sections)[number];

const learner = {
  name: "Yamkela Mgcubhe",
  initials: "YM",
  grade: "Grade 9A",
  studentNumber: "222050221",
  parent: "Mrs Mgcubhe",
  attendance: 87,
  average: 74,
};

const events = [
  { title: "Parent Meeting", date: "2026-10-23", time: "15:00", type: "Meeting", location: "School Hall" },
  { title: "Mathematics Test", date: "2026-10-26", time: "09:00", type: "Assessment", location: "Room 12" },
  { title: "Sports Day", date: "2026-10-28", time: "09:00", type: "School Event", location: "School Sports Ground" },
];

const announcements = [
  {
    title: "Winter Uniform Reminder",
    detail: "Learners should wear full winter uniform from Monday.",
  },
  {
    title: "Report Collection",
    detail: "Term reports will be available from 20 August.",
  },
  {
    title: "School Fees",
    detail: "Kindly ensure all outstanding fees are settled before month-end.",
  },
];

const timetable = [
  {
    day: "Monday",
    lessons: [
      { time: "08:00–09:00", subject: "Mathematics", room: "Room 12" },
      { time: "09:00–10:00", subject: "English", room: "Room 8" },
      { time: "10:30–11:30", subject: "Natural Science", room: "Science Lab" },
      { time: "11:30–12:30", subject: "Geography", room: "Room 10" },
    ],
  },
  {
    day: "Tuesday",
    lessons: [
      { time: "08:00–09:00", subject: "English", room: "Room 8" },
      { time: "09:00–10:00", subject: "Mathematics", room: "Room 12" },
      { time: "10:30–11:30", subject: "Life Orientation", room: "Room 6" },
      { time: "11:30–12:30", subject: "Natural Science", room: "Science Lab" },
    ],
  },
  {
    day: "Wednesday",
    lessons: [
      { time: "08:00–09:00", subject: "Natural Science", room: "Science Lab" },
      { time: "09:00–10:00", subject: "Geography", room: "Room 10" },
      { time: "10:30–11:30", subject: "Mathematics", room: "Room 12" },
      { time: "11:30–12:30", subject: "English", room: "Room 8" },
    ],
  },
  {
    day: "Thursday",
    lessons: [
      { time: "08:00–09:00", subject: "Mathematics", room: "Room 12" },
      { time: "09:00–10:00", subject: "Life Orientation", room: "Room 6" },
      { time: "10:30–11:30", subject: "English", room: "Room 8" },
      { time: "11:30–12:30", subject: "Geography", room: "Room 10" },
    ],
  },
  {
    day: "Friday",
    lessons: [
      { time: "08:00–09:00", subject: "English", room: "Room 8" },
      { time: "09:00–10:00", subject: "Natural Science", room: "Science Lab" },
      { time: "10:30–11:30", subject: "Mathematics", room: "Room 12" },
      { time: "11:30–12:30", subject: "Life Orientation", room: "Room 6" },
    ],
  },
];

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-8 ${className}`}>
      {children}
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-6 text-xl font-bold text-gray-800 sm:text-2xl">
      {children}
    </h2>
  );
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ParentPortal() {
  const [activeSection, setActiveSection] = useState<Section>("Dashboard");
  const [messageDraft, setMessageDraft] = useState("");
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 9, 1));
  const [selectedDate, setSelectedDate] = useState("2026-10-23");
  const [selectedDay, setSelectedDay] = useState("Monday");

  function navigate(section: Section) {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function downloadReport() {
    const report = [
      "SCHOOLLOOP PARENT PORTAL",
      "LEARNER REPORT",
      "========================",
      `Learner: ${learner.name}`,
      `Grade: ${learner.grade}`,
      `Student Number: ${learner.studentNumber}`,
      `Parent: ${learner.parent}`,
      "",
      `Attendance: ${learner.attendance}%`,
      `Term Average: ${learner.average}%`,
      "",
      "SUBJECT RESULTS",
      "---------------",
      ...subjects.map((s) => `${s.name} - ${s.assessment}: ${s.mark}%`),
      "",
      "Note: This report uses sample information. Confirm official information with the school.",
    ].join("\n");

    const file = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SchoolLoop-Learner-Report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = messageDraft.trim();

    if (!message) return;

    setSentMessages((previous) => [message, ...previous]);
    setMessageDraft("");
  }

  const monthName = calendarMonth.toLocaleDateString("en-ZA", {
    month: "long",
    year: "numeric",
  });

  const firstWeekday = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0
  ).getDate();

  function dateKey(day: number) {
    const year = calendarMonth.getFullYear();
    const month = String(calendarMonth.getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");

    return `${year}-${month}-${date}`;
  }

  const selectedEvents = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-[#6B4FA0] to-[#8B70D8] shadow-lg">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-lg text-purple-100">WELCOME BACK</p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">
              Parent Portal
            </h1>
            <p className="mt-3 text-purple-100">
              Stay connected to your child&apos;s academic journey.
            </p>
          </div>

          <div
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20"
            aria-label="Notifications"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="w-full shrink-0 bg-[#4F3D97] text-white shadow-lg md:min-h-screen md:w-64">
          <div className="border-b border-purple-400 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4F3D97"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold">SchoolLoop</h2>
                <p className="text-sm text-purple-200">Parent Portal</p>
              </div>
            </div>
          </div>

          <nav
            className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 md:grid-cols-1 md:space-y-3"
            aria-label="Parent portal navigation"
          >
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => navigate(section)}
                aria-current={activeSection === section ? "page" : undefined}
                className={`rounded-xl px-3 py-3 text-left text-sm font-semibold transition sm:px-4 sm:text-base ${
                  activeSection === section
                    ? "bg-white text-[#4F3D97]"
                    : "text-white hover:bg-purple-600"
                }`}
              >
                {section}
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
          {activeSection === "Dashboard" && (
            <div className="space-y-6 sm:space-y-8">
              <Card>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#6B4FA0] text-2xl font-bold text-white sm:h-24 sm:w-24 sm:text-3xl">
                      {learner.initials}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                        {learner.name}
                      </h2>
                      <p className="mt-2 text-gray-500">{learner.grade}</p>
                      <p className="break-words text-gray-500">
                        Student Number: {learner.studentNumber}
                      </p>
                      <p className="text-gray-500">Parent: {learner.parent}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={downloadReport}
                    className="w-full rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87] sm:w-auto"
                  >
                    Download Report
                  </button>
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { title: "Attendance", value: `${learner.attendance}%`, color: "text-green-600" },
                  { title: "Term Average", value: `${learner.average}%`, color: "text-blue-600" },
                  { title: "Subjects", value: String(subjects.length), color: "text-purple-600" },
                  { title: "Behaviour", value: "Excellent", color: "text-orange-500" },
                ].map((item) => (
                  <Card key={item.title} className="p-6">
                    <h3 className="text-sm text-gray-500">{item.title}</h3>
                    <p className={`mt-3 text-3xl font-bold sm:text-4xl ${item.color}`}>
                      {item.value}
                    </p>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <Heading>Attendance Overview</Heading>
                  <div className="flex justify-center">
                    <div className="flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-green-500">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-green-600">
                          {learner.attendance}%
                        </p>
                        <p className="text-gray-500">Present</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("Attendance")}
                    className="mt-6 w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                  >
                    View Attendance Details
                  </button>
                </Card>

                <Card>
                  <Heading>Notifications</Heading>
                  <div className="space-y-5">
                    {[
                      { title: "Attendance Updated", detail: "Attendance is currently 87%.", color: "border-green-500" },
                      { title: "Mathematics Test", detail: "A result is listed in the sample results.", color: "border-blue-500" },
                      { title: "Parent Meeting", detail: "Friday • 15:00", color: "border-purple-500" },
                    ].map((item) => (
                      <div key={item.title} className={`border-l-4 pl-4 ${item.color}`}>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Card>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Heading>Subject Performance</Heading>
                  <button
                    type="button"
                    onClick={() => navigate("Results")}
                    className="mb-6 text-left text-sm font-semibold text-[#6B4FA0] hover:underline"
                  >
                    View all results
                  </button>
                </div>

                <div className="space-y-6">
                  {subjects.map((subject) => (
                    <div key={subject.name}>
                      <div className="mb-2 flex justify-between gap-3">
                        <span className="font-medium text-gray-700">{subject.name}</span>
                        <span className="font-bold text-[#6B4FA0]">{subject.mark}%</span>
                      </div>
                      <div
                        className="h-3 w-full rounded-full bg-gray-200"
                        role="progressbar"
                        aria-label={`${subject.name} mark`}
                        aria-valuenow={subject.mark}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-3 rounded-full bg-[#6B4FA0]"
                          style={{ width: `${subject.mark}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <Heading>Recent Results</Heading>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[430px] text-left">
                      <thead>
                        <tr className="border-b text-sm text-gray-500">
                          <th className="pb-3 pr-4">Subject</th>
                          <th className="pb-3 pr-4">Assessment</th>
                          <th className="pb-3">Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.slice(0, 4).map((subject) => (
                          <tr key={subject.name} className="border-b last:border-0">
                            <td className="py-4 pr-4">{subject.name}</td>
                            <td className="py-4 pr-4">{subject.assessment}</td>
                            <td className="py-4 font-bold text-green-600">{subject.mark}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card>
                  <Heading>Quick Actions</Heading>
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={downloadReport}
                      className="w-full rounded-xl bg-[#6B4FA0] py-3 text-white hover:bg-[#563c87]"
                    >
                      Download Report
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Teachers")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      Contact Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Calendar")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      School Calendar
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate("Timetable")}
                      className="w-full rounded-xl border border-[#6B4FA0] py-3 text-[#6B4FA0] hover:bg-purple-50"
                    >
                      View Timetable
                    </button>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <div className="flex items-center justify-between gap-3">
                    <Heading>Upcoming Events</Heading>
                    <button
                      type="button"
                      onClick={() => navigate("Calendar")}
                      className="mb-6 text-sm font-semibold text-[#6B4FA0] hover:underline"
                    >
                      Open Calendar
                    </button>
                  </div>
                  <div className="space-y-5">
                    {events.map((event) => (
                      <div
                        key={event.title}
                        className="flex flex-col justify-between gap-2 border-b pb-4 last:border-0 sm:flex-row sm:items-center"
                      >
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(event.date)} • {event.time}
                          </p>
                        </div>
                        <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm text-[#6B4FA0]">
                          {event.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <Heading>School Announcements</Heading>
                  <div className="space-y-6">
                    {announcements.map((item) => (
                      <div key={item.title}>
                        <h3 className="font-semibold text-[#6B4FA0]">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeSection === "Calendar" && (
            <div className="space-y-6">
              <Card>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#6B4FA0]">
                      School events
                    </p>
                    <Heading>School Calendar</Heading>
                    <p className="text-sm text-gray-500">
                      Choose a date to see its scheduled events.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate("Timetable")}
                    className="rounded-xl bg-[#6B4FA0] px-5 py-3 text-white hover:bg-[#563c87]"
                  >
                    View Timetable
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))}
                    className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-[#6B4FA0] hover:bg-purple-50"
                  >
                    ← Previous
                  </button>
                  <h3 className="text-center text-lg font-bold text-gray-800 sm:text-xl">
                    {monthName}
                  </h3>
                  <button
                    type="button"
                    aria-label="Next month"
                    onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))}
                    className="rounded-xl border border-gray-200 px-4 py-2 font-semibold text-[#6B4FA0] hover:bg-purple-50"
                  >
                    Next →
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-7 gap-1 sm:gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-bold text-gray-500 sm:text-sm">
                      {day}
                    </div>
                  ))}

                  {Array.from({ length: firstWeekday }, (_, index) => (
                    <div key={`empty-${index}`} className="min-h-12 rounded-lg sm:min-h-20" />
                  ))}

                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const key = dateKey(day);
                    const dayEvents = events.filter((event) => event.date === key);
                    const selected = selectedDate === key;

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSelectedDate(key)}
                        aria-pressed={selected}
                        className={`flex min-h-12 min-w-0 flex-col items-center rounded-lg border p-1 text-sm transition sm:min-h-20 sm:p-2 ${
                          selected
                            ? "border-[#6B4FA0] bg-purple-100 font-bold text-[#4F3D97]"
                            : "border-gray-100 hover:border-purple-300 hover:bg-purple-50"
                        }`}
                      >
                        <span>{day}</span>
                        {dayEvents.length > 0 && (
                          <span className="mt-1 h-2 w-2 rounded-full bg-[#6B4FA0]" aria-label={`${dayEvents.length} event(s)`} />
                        )}
                        {dayEvents.length > 0 && (
                          <span className="hidden text-center text-[10px] leading-tight sm:block">
                            {dayEvents[0].title}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <Heading>Events for {formatDate(selectedDate)}</Heading>
                {selectedEvents.length === 0 ? (
                  <p className="rounded-xl bg-gray-50 p-5 text-gray-500">
                    No sample events are listed for this date.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {selectedEvents.map((event) => (
                      <div key={event.title} className="rounded-2xl border border-purple-100 p-4 sm:p-5">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                            <p className="mt-1 text-gray-500">{event.time}</p>
                            <p className="mt-1 text-sm text-gray-500">Location: {event.location}</p>
                          </div>
                          <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-sm text-[#6B4FA0]">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}

          {activeSection === "Timetable" && (
            <div className="space-y-6">
              <Card>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6B4FA0]">
                  Weekly schedule
                </p>
                <Heading>Class Timetable</Heading>
                <p className="mb-6 text-gray-600">
                  {learner.name} • {learner.grade}
                </p>

                <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {timetable.map(({ day }) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      aria-pressed={selectedDay === day}
                      className={`rounded-xl px-3 py-3 text-sm font-semibold transition sm:text-base ${
                        selectedDay === day
                          ? "bg-[#6B4FA0] text-white"
                          : "border border-gray-200 text-gray-700 hover:bg-purple-50"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {timetable.find((day) => day.day === selectedDay)?.lessons.map((lesson) => (
                    <div
                      key={`${lesson.time}-${lesson.subject}`}
                      className="grid grid-cols-1 gap-2 rounded-2xl border border-gray-100 p-4 sm:grid-cols-[140px_1fr_auto] sm:items-center sm:gap-4"
                    >
                      <div className="font-semibold text-[#6B4FA0]">{lesson.time}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">{lesson.subject}</h3>
                        <p className="text-sm text-gray-500">{lesson.room}</p>
                      </div>
                      <span className="w-fit rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-[#6B4FA0]">
                        Lesson
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => navigate("Calendar")}
                  className="mt-5 w-full rounded-xl border border-[#6B4FA0] px-5 py-3 font-semibold text-[#6B4FA0] hover:bg-purple-50 sm:w-auto"
                >
                  Open School Calendar
                </button>
              </Card>
            </div>
          )}

          {activeSection === "Results" && (
            <div className="space-y-6">
              <Card>
                <Heading>Academic Results</Heading>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-sm text-gray-600">Term Average</p>
                    <p className="mt-2 text-3xl font-bold text-blue-600">
                      {learner.average}%
                    </p>
                  </div>
                  <div className="rounded-2xl bg-purple-50 p-5">
                    <p className="text-sm text-gray-600">Subjects Listed</p>
                    <p className="mt-2 text-3xl font-bold text-[#6B4FA0]">
                      {subjects.length}
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[430px] text-left">
                    <thead>
                      <tr className="border-b text-sm text-gray-500">
                        <th className="pb-3 pr-4">Subject</th>
                        <th className="pb-3 pr-4">Assessment</th>
                        <th className="pb-3">Mark</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((s) => (
                        <tr key={s.name} className="border-b last:border-0">
                          <td className="py-4 pr-4">{s.name}</td>
                          <td className="py-4 pr-4">{s.assessment}</td>
                          <td className="py-4 font-bold text-[#6B4FA0]">{s.mark}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  type="button"
                  onClick={downloadReport}
                  className="mt-6 rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
                >
                  Download Report
                </button>
              </Card>
            </div>
          )}

          {activeSection === "Attendance" && (
            <Card>
              <Heading>Attendance Overview</Heading>

              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-[14px] border-green-500">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-green-600">
                      {learner.attendance}%
                    </p>
                    <p className="text-gray-500">Present</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Attendance Summary
                  </h3>
                  <p className="mt-2 text-gray-600">
                    The displayed attendance rate is {learner.attendance}%.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Daily attendance records are not connected to this sample dashboard.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {activeSection === "Teachers" && (
            <Card>
              <Heading>Teachers</Heading>
              <p className="mb-6 text-gray-600">
                Use the message form to prepare a message for your learner&apos;s teacher.
              </p>

              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
                <h3 className="font-semibold text-gray-800">
                  Teacher Contact Information
                </h3>
                <p className="mt-2 text-gray-600">
                  Teacher names, email addresses, and phone numbers have not been supplied to this page yet.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("Messages")}
                  className="mt-4 rounded-xl bg-[#6B4FA0] px-5 py-3 text-white hover:bg-[#563c87]"
                >
                  Go to Messages
                </button>
              </div>
            </Card>
          )}

          {activeSection === "Messages" && (
            <div className="space-y-6">
              <Card>
                <Heading>Messages</Heading>
                <p className="mb-6 text-gray-600">
                  Write and keep a local draft message in this page.
                </p>

                <form onSubmit={sendMessage} className="space-y-4">
                  <label htmlFor="message" className="block font-medium text-gray-700">
                    Your message
                  </label>
                  <textarea
                    id="message"
                    value={messageDraft}
                    onChange={(event) => setMessageDraft(event.target.value)}
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#6B4FA0] focus:ring-2 focus:ring-purple-100"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
                  >
                    Save Message
                  </button>
                </form>
              </Card>

              <Card>
                <Heading>Saved Messages</Heading>
                {sentMessages.length === 0 ? (
                  <p className="text-gray-500">You have not saved any messages yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {sentMessages.map((message, index) => (
                      <li
                        key={`${index}-${message}`}
                        className="whitespace-pre-wrap rounded-xl border border-gray-200 p-4 text-gray-700"
                      >
                        {message}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          )}

          {activeSection === "Profile" && (
            <Card>
              <Heading>Profile Information</Heading>

              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#6B4FA0] text-2xl font-bold text-white">
                  {learner.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{learner.name}</h3>
                  <p className="text-gray-500">{learner.grade}</p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-gray-100">
                {[
                  ["Learner Name", learner.name],
                  ["Grade", learner.grade],
                  ["Student Number", learner.studentNumber],
                  ["Parent / Guardian", learner.parent],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-2 sm:gap-4"
                  >
                    <dt className="font-medium text-gray-500">{label}</dt>
                    <dd className="break-words text-gray-800">{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={downloadReport}
                className="mt-6 rounded-xl bg-[#6B4FA0] px-6 py-3 text-white hover:bg-[#563c87]"
              >
                Download Learner Report
              </button>
            </Card>
          )}

          <footer className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800">
              SchoolLoop Parent Portal
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Empowering parents through better communication.
            </p>
            <p className="mt-4 text-sm text-gray-400">
              © 2026 SchoolLoop • South Africa 🇿🇦
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
