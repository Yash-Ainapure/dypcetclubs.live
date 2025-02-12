import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axiosInstance from "./axiosInstance";
import microBG from "../assets/micro1.avif";
import {
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowLeftToLine,
} from "lucide-react";
import * as XLSX from "xlsx";

const ViewEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loadingResponses, setLoadingResponses] = useState(true);
  const [responseError, setResponseError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const navigate = useNavigate();

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosInstance.get(
          `/api/events/getSingleEventData?EventID=${id}`
        );
        setEventData(response.data);

        // After getting event data, fetch responses if there's a form link
        if (response.data.Link) {
          const formId = response.data.Link.split("/")[5];
          fetchFormResponses(formId);
        } else {
          setLoadingResponses(false);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    const fetchFormResponses = async (formId: string) => {
      try {
        const response = await axiosInstance.get(
          `/api/events/forms/${formId}/responses`
        );
        setResponses(response.data.responses);
      } catch (error) {
        console.error("Error fetching responses:", error);
        setResponseError("Failed to load form responses");
      } finally {
        setLoadingResponses(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  const ResponsesSection = () => {
    if (!eventData.Link) {
      return (
        <div className="bg-white/90 backdrop-blur-sm mt-4 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Form Responses</h2>
          <div className="mt-2">
            <p className="text-gray-600">
              No form is associated with this event.
            </p>
          </div>
        </div>
      );
    }

    if (loadingResponses) {
      return (
        <div className="bg-white/90 backdrop-blur-sm mt-4 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Loading Responses...</h2>
          <div className="mt-2 space-y-2">
            <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      );
    }

    if (responseError) {
      return (
        <div className="bg-white/90 backdrop-blur-sm mt-4 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-red-500">
            Error Loading Responses
          </h2>
          <div className="mt-2">
            <p className="text-gray-600">{responseError}</p>
          </div>
        </div>
      );
    }

    if (!responses.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm mt-4 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">Form Responses</h2>
          <div className="mt-2">
            <p className="text-gray-600">No responses received yet.</p>
          </div>
        </div>
      );
    }

    const exportToExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(
        responses.map((response) => ({
          "Submission Time": new Date(response.createTime).toLocaleString(),
          ...response.answers,
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
      XLSX.writeFile(workbook, `${eventData.EventName}-responses.xlsx`);
    };

    // Filter responses based on search term
    const filteredResponses = responses.filter((response) =>
      Object.values(response.answers).some((answer) =>
        String(answer).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    // Sort responses
    const sortedResponses = [...filteredResponses].sort((a, b) => {
      if (!sortConfig) return 0;

      const aValue =
        sortConfig.key === "Submission Time"
          ? new Date(a.createTime).getTime()
          : a.answers[sortConfig.key];
      const bValue =
        sortConfig.key === "Submission Time"
          ? new Date(b.createTime).getTime()
          : b.answers[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedResponses.length / itemsPerPage);
    const paginatedResponses = sortedResponses.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    // Get all unique question keys from responses
    const questions = Array.from(
      new Set(responses.flatMap((response) => Object.keys(response.answers)))
    );

    const handleSort = (key: string) => {
      setSortConfig((current) => ({
        key,
        direction:
          current?.key === key && current.direction === "asc" ? "desc" : "asc",
      }));
    };

    return (
      <div className="bg-white/90 backdrop-blur-sm mt-4 p-4 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Form Responses ({responses.length})
          </h2>
          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search responses..."
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Export Button */}
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Download className="h-4 w-4" />
              Export to Excel
            </button>
          </div>
        </div>

        {/* Items per page selector */}
        <div className="mb-4 flex items-center gap-2">
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1"
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("Submission Time")}
                  className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Submission Time
                  {sortConfig?.key === "Submission Time" && (
                    <span className="ml-1">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
                {questions.map((question) => (
                  <th
                    key={question}
                    onClick={() => handleSort(question)}
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    {question}
                    {sortConfig?.key === question && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedResponses.map((response) => (
                <tr key={response.responseId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(response.createTime).toLocaleString()}
                  </td>
                  {questions.map((question) => (
                    <td key={question} className="px-6 py-4 whitespace-nowrap">
                      {response.answers[question] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredResponses.length)} of{" "}
            {filteredResponses.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === pageNum ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-md disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (eventData === null) return <div>Loading...</div>;

  return (
    <div
      style={{
        backgroundImage: `url(${microBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="rounded-tl-2xl p-4 w-full min-h-screen"
    >
      <button
        onClick={() => {
          navigate("/clubAdmin/events");
        }}
        className="fixed top-6 right-8 px-4 py-2 bg-green-600 text-white rounded-md z-10 border hover:bg-green-700 flex items-center gap-2"
      >
        <ArrowLeftToLine className="h-4 w-4"/>
        <p>Back</p>
      </button>

      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold">Event Information</h2>
        <div className="mt-2 space-y-2">
          <p>Event ID: {eventData.EventID}</p>
          <p>Name: {eventData.EventName}</p>
          <p>Description: {eventData.Description}</p>
          <p>Location: {eventData.Location}</p>
          <p className="flex items-center gap-2">
            Link:{" "}
            <a
              target="_blank"
              href={eventData.Link}
              className="text-blue-700 font-semibold"
            >
              google forms link
            </a>{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(eventData.Link);
                alert("Link copied to clipboard!");
              }}
              className="ml-2 p-2 bg-blue-500 text-white font-semibold rounded-sm"
            >
              Copy Link
            </button>
          </p>
        </div>
      </div>

      <ResponsesSection />
    </div>
  );
};

export default ViewEvent;
