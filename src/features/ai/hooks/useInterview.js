import { useContext } from "react";
import {
  generateInterviewReport,
  getAllInterviewReports,
  getInterviewReportById,
} from "../services/interview.api";

import { InterviewContext } from "../interviewContext";

export const useInterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used inside InterviewContext");
  }

  const {
    isGenerating,
    setIsGenerating,
    reportsLoading,
    setReportsLoading,
    reportLoading,
    setReportLoading,
    report,
    setReport,
    reports,
    setReports,
  } = context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resume,
  }) => {
    setIsGenerating(true);

    try {
      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume,
      });

      console.log("Generate Report Response:", response);

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (err) {
      console.error("Generate Report Error:", err);
      console.error(err?.response?.data);

      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const getReportById = async (interviewId) => {
    setReportLoading(true);

    try {
      const response = await getInterviewReportById(interviewId);

      console.log("Get Report:", response);

      setReport(response.interviewReport);

      return response.interviewReport;
    } catch (err) {
      console.error("Get Report Error:", err);
      console.error(err?.response?.data);

      return null;
    } finally {
      setReportLoading(false);
    }
  };

  const getAllReports = async () => {
    setReportsLoading(true);

    try {
      const response = await getAllInterviewReports();

      console.log("All Reports:", response);

      setReports(response.interviewReports || []);

      return response.interviewReports || [];
    } catch (err) {
      console.error("Get All Reports Error:", err);
      console.error(err?.response?.data);

      return [];
    } finally {
      setReportsLoading(false);
    }
  };

  return {
    isGenerating,
    reportsLoading,
    reportLoading,
    loading: isGenerating, // backwards compatibility
    report,
    reports,
    generateReport,
    getReportById,
    getAllReports,
  };
};