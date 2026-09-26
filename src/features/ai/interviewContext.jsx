import { useState, createContext } from "react";

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportsLoading, setReportsLoading] = useState(false);
    const [reportLoading, setReportLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [reports, setReports] = useState(null);

    return (
        <InterviewContext.Provider
            value={{
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
            }}
        >
            {children}
        </InterviewContext.Provider>
    );
};
