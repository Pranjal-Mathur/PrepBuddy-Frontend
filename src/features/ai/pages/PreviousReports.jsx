import React, { useEffect, useState } from "react";
import { FileText, CalendarDays, Eye } from "lucide-react";
import { useNavigate } from "react-router";

const PreviousReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/interview/reports", {
          credentials: "include",
        });

        const data = await res.json();

        setReports(data.reports || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Previous Reports
      </h1>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <FileText size={50} className="mx-auto text-gray-400"/>
          <p className="mt-4 text-gray-500">
            No previous reports found
          </p>
        </div>
      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {reports.map((report)=>(
            <div
              key={report._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >

              <div className="flex items-center gap-3 mb-4">
                <FileText className="text-blue-600"/>
                <h2 className="font-semibold text-lg">
                  {report.jobTitle || "Resume Analysis"}
                </h2>
              </div>


              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <CalendarDays size={16}/>
                {new Date(report.createdAt).toLocaleDateString()}
              </div>


              <div className="mt-5">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Score: {report.matchScore}%
                </span>
              </div>


              <button
                onClick={()=>navigate(`/interview/${report._id}`)}
                className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                <Eye size={18}/>
                View Report
              </button>


            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default PreviousReports;