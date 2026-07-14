import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Upload, FileText, LogOut } from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";

const Home = () => {
  const {
    loading,
    generateReport,
    reports,
    getAllReports,
  } = useInterview();

  const { handleLogout } = useAuth();

  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeName, setResumeName] = useState("");

  const resumeInputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllReports();
  }, []);

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];

    if (!jobDescription.trim()) {
      alert("Please enter the Job Description.");
      return;
    }

    if (!resumeFile) {
      alert("Please upload your Resume.");
      return;
    }

    if (!selfDescription.trim()) {
      alert("Please enter your Professional Self Description.");
      return;
    }

    const data = await generateReport({
      jobDescription,
      selfDescription,
      resume: resumeFile,
    });

    if (data?._id) {
      navigate(`/interview/${data._id}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <h1 className="text-3xl font-semibold text-white animate-pulse">
          Generating Interview Report...
        </h1>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707]">

      {/* Top Navbar */}

      <header className="bg-[#111111] border-b border-zinc-800">

        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">

          <h1 className="text-3xl font-bold text-emerald-400">
            Prep Buddy
          </h1>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2.5 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </header>

      <main className="py-10">

        <div className="max-w-5xl mx-auto px-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            Job Application
          </h1>

          <p className="text-zinc-400 mb-10">
            Complete your professional profile to generate an AI-powered interview report.
            Fields marked with <span className="text-red-500">*</span> are mandatory.
          </p>

          {/* Job Description */}
          <div className="mb-10">

<h2 className="text-xs tracking-widest text-white uppercase mb-3">
  Job Description <span className="text-red-500">*</span>
</h2>

<textarea
  rows={7}
  value={jobDescription}
  onChange={(e) => setJobDescription(e.target.value)}
  placeholder="Paste the complete Job Description here..."
  className="w-full rounded-xl bg-white text-black p-5 outline-none focus:ring-2 focus:ring-emerald-400"
/>

</div>

{/* Resume Upload */}

<div className="mb-10">

<h2 className="text-xs tracking-widest text-white uppercase mb-3">
  Resume Upload (PDF) <span className="text-red-500">*</span>
</h2>

<label className="cursor-pointer border border-zinc-700 rounded-xl bg-[#1b1b1b] h-72 flex flex-col justify-center items-center hover:border-emerald-400 transition">

  <Upload
    size={55}
    className="text-emerald-400 mb-5"
  />

  <h3 className="text-white text-lg font-semibold">
    Click to upload or drag & drop
  </h3>

  <p className="text-zinc-400 mt-2">
    PDF only (Max 5 MB)
  </p>

  {resumeName && (

    <div className="mt-5 flex items-center gap-2 text-emerald-400">

      <FileText size={18} />

      <span className="truncate max-w-sm">
        {resumeName}
      </span>

    </div>

  )}

  <input
    hidden
    ref={resumeInputRef}
    type="file"
    accept=".pdf"
    onChange={(e) => {
      if (e.target.files.length > 0) {
        setResumeName(e.target.files[0].name);
      }
    }}
  />

</label>

</div>

{/* Professional Self Description */}
<div className="mb-12">

<h2 className="text-xs tracking-widest text-white uppercase mb-3">
  Professional Self Description{" "}
  <span className="text-red-500">*</span>
</h2>

<textarea
  rows={6}
  value={selfDescription}
  onChange={(e) => setSelfDescription(e.target.value)}
  placeholder="Describe yourself, your projects, technical skills, internships, achievements and career goals..."
  className="w-full rounded-xl bg-white text-black p-5 outline-none focus:ring-2 focus:ring-emerald-400"
/>

</div>

{/* Generate Report Button */}

<div className="flex justify-center">

<button
  onClick={handleGenerateReport}
  disabled={
    !jobDescription.trim() ||
    !selfDescription.trim() ||
    !resumeName
  }
  className={`px-14 py-4 rounded-lg text-lg font-semibold transition-all duration-200 ${
    !jobDescription.trim() ||
    !selfDescription.trim() ||
    !resumeName
      ? "bg-zinc-600 text-zinc-400 cursor-not-allowed"
      : "bg-emerald-400 text-black hover:bg-emerald-500 hover:scale-105 cursor-pointer shadow-lg shadow-emerald-500/20"
  }`}
>
  Generate Report
</button>

</div>

<p className="text-center text-sm text-zinc-400 mt-5">
Your resume is processed securely and used only for generating your interview report.
</p>

{/* Previous Reports */}

{reports?.length > 0 && (

<div className="mt-20">

  <h2 className="text-3xl font-bold text-white mb-8">
    Previous Reports
  </h2>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {reports.map((report) => (

<div
  key={report._id}
  onClick={() => navigate(`/interview/${report._id}`)}
  className="cursor-pointer rounded-2xl bg-[#171717] border border-zinc-700 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
>

  <h3 className="text-xl font-semibold text-white line-clamp-2">

    {report.title ||
      report.jobRole ||
      report.jobDescription?.split("\n")[0] ||
      "Interview Report"}

  </h3>

  <p className="mt-4 text-zinc-400 text-sm">
    Generated on{" "}
    {new Date(report.createdAt).toLocaleDateString()}
  </p>

  <div className="mt-5 flex items-center justify-between">

    <span className="text-zinc-400">
       Match Score
    </span>

    <span className="text-emerald-400 font-bold text-lg">
      {report.matchScore}%
    </span>

  </div>

</div>

))}

</div>

</div>

)}

</div>

</main>

</div>
);
};

export default Home;