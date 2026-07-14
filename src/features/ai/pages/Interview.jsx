import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CheckCircle,
  AlertTriangle,
  CalendarDays,
  Code,
  Users,
  LogOut,
} from "lucide-react";

import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";

const Interview = () => {
  const { interviewid } = useParams();
  const { loading, report, getReportById } = useInterview();
  const { user, handleLogout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (interviewid) {
      getReportById(interviewid);
    }
  }, [interviewid]);

  if (loading || !report) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#070707]">
        <h1 className="text-3xl font-semibold text-white animate-pulse">
          Loading Interview Report...
        </h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      {/* Navbar */}
      <header className="bg-[#111111] border-b border-zinc-800">

  <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

    <h1
      onClick={() => navigate("/")}
      className="text-3xl font-bold text-emerald-400 cursor-pointer"
    >
      Prep Buddy
    </h1>

    <div className="flex items-center gap-3">

      <button
        onClick={() => navigate("/")}
        className="cursor-pointer px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
      >
        Home
      </button>

      

      {!user ? (
        <>
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-4 py-2 rounded-lg text-white hover:bg-zinc-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="cursor-pointer px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition"
          >
            Register
          </button>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2.5 rounded-lg"
        >
          <LogOut size={18} />
          Logout
        </button>
      )}

    </div>

  </div>

</header>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Report Header */}
        <div className="bg-[#171717] border border-zinc-700 rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-4xl font-bold text-white">Interview Report</h1>
              

              <div className="mt-6 space-y-2">
                <p className="text-zinc-300">
                  <span className="font-semibold text-white">Role :</span>{" "}
                  {report.title || report.jobRole || "Software Engineer"}
                </p>

                <p className="text-zinc-300">
                  <span className="font-semibold text-white">Generated :</span>{" "}
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-emerald-400 rounded-xl px-6 py-4 text-center shadow-lg">
  <p className="text-black font-semibold text-sm"> Match Score</p>
  <h1 className="text-3xl font-bold text-black mt-1">
    {report.matchScore}%
  </h1>
</div>
          </div>
        </div>

        {/* Technical Questions */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-8">
            <Code className="text-emerald-400" />
            <h2 className="text-3xl font-bold text-white">Technical Questions</h2>
          </div>

          <div className="space-y-6">
            {report.technicalQuestions?.map((item, index) => (
              <div
                key={index}
                className="bg-[#171717] border border-zinc-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-semibold text-white">
                    Question {index + 1}
                  </h3>
                  <span className="bg-emerald-500/20 text-emerald-400 px-4 py-1 rounded-full text-sm">
                    Technical
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                    Question
                  </h4>
                  <p className="text-zinc-300 leading-8">{item.question}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Interviewer's Intention
                  </h4>
                  <p className="text-zinc-300 leading-8">{item.intention}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Suggested Answer
                  </h4>
                  <p className="text-zinc-300 whitespace-pre-wrap leading-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Behavioral Questions */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-8">
            <Users className="text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Behavioral Questions</h2>
          </div>

          <div className="space-y-6">
            {report.behavioralQuestions?.map((item, index) => (
              <div
                key={index}
                className="bg-[#171717] border border-zinc-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-2xl font-semibold text-white">
                    Question {index + 1}
                  </h3>
                  <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-sm">
                    Behavioral
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-blue-400 mb-2">
                    Question
                  </h4>
                  <p className="text-zinc-300 leading-8">{item.question}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                    Interviewer's Intention
                  </h4>
                  <p className="text-zinc-300 leading-8">{item.intention}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-2">
                    Suggested Answer
                  </h4>
                  <p className="text-zinc-300 whitespace-pre-wrap leading-8">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skill Gaps */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="text-yellow-400" />
            <h2 className="text-3xl font-bold text-white">Skill Gaps</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {report.skillGaps?.map((skill, index) => (
              <div
                key={index}
                className="bg-[#171717] border border-zinc-700 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-semibold text-white">
                    {skill.skill}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      skill.severity === "high"
                        ? "bg-red-500/20 text-red-400"
                        : skill.severity === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {skill.severity}
                  </span>
                </div>

                <p className="text-zinc-400 leading-7">
                  Focus on strengthening this skill before your interview to
                  improve your chances of success.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Plan */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-8">
            <CalendarDays className="text-purple-400" />
            <h2 className="text-3xl font-bold text-white">Preparation Plan</h2>
          </div>

          <div className="space-y-6">
            {report.preparationPlan?.map((day) => (
              <div
                key={day.day}
                className="bg-[#171717] border border-zinc-700 rounded-2xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <h3 className="text-2xl font-bold text-white">Day {day.day}</h3>
                  <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full w-fit">
                    {day.focus}
                  </span>
                </div>

                <ul className="space-y-4">
                  {day.tasks?.map((task, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-zinc-300 leading-7"
                    >
                      <CheckCircle
                        size={20}
                        className="text-emerald-400 mt-1 shrink-0"
                      />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-16 border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              
              
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Interview;