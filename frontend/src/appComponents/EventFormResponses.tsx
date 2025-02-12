import { useState, useEffect } from "react";

const EventFormResponses = ({ event }: any) => {
  interface Response {
    responseId: string;
    createTime: string;
    answers: { [key: string]: string };
  }

  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      if (!event.Link) return;

      try {
        // Extract formId from the Google Form URL
        const formId = event.Link.split("/")[5];
        const response = await fetch(`/api/forms/${formId}/responses`);

        if (!response.ok) {
          throw new Error("Failed to fetch responses");
        }   

        const data = await response.json();
        setResponses(data.responses);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [event.Link]);

  if (loading) {
    return (
      <div className="w-full border rounded shadow p-4">
        <h2 className="text-lg font-bold mb-4">Loading Responses...</h2>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full border rounded shadow p-4">
        <h2 className="text-red-500 flex items-center gap-2">
          <span>Error Loading Responses</span>
        </h2>
        <div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!responses.length) {
    return (
      <div className="w-full border rounded shadow p-4">
        <h2>{event.EventName} - Responses</h2>
        <div>
          <p className="text-gray-600">No responses yet for this event.</p>
        </div>
      </div>
    );
  }

  // Get all unique question keys from responses
  const questions = Array.from(
    new Set(responses.flatMap((response) => Object.keys(response.answers)))
  );

  return (
    <div className="w-full border rounded shadow p-4">
      <h2>
        {event.EventName} - Responses ({responses.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th>Submission Time</th>
              {questions.map((question) => (
                <th key={question}>{question}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {responses.map((response) => (
              <tr key={response.responseId}>
                <td>{new Date(response.createTime).toLocaleString()}</td>
                {questions.map((question) => (
                  <td key={question}>{response.answers[question] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventFormResponses;
