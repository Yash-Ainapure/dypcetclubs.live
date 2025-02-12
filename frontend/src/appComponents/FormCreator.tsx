import { useEffect, useState } from "react";
import axios from "./axiosInstance";

type FieldType =
  | "shortAnswer"
  | "paragraph"
  | "multipleChoice"
  | "checkbox"
  | "dropdown";

interface FormField {
  id: string;
  type: FieldType;
  question: string;
  options?: string[]; // For multiple choice, checkboxes, and dropdowns
}

interface FormCreatorProps {
  eventID: any;
  setEventID:any
}

const FormCreator = ({ eventID,setEventID }: FormCreatorProps) => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formTitle, setFormTitle] = useState<string>("");

  useEffect(() => {
    console.log(eventID);
  }, []);
  const addField = (type: FieldType) => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type,
        question: "",
        options:
          type === "shortAnswer" || type === "paragraph" ? undefined : [],
      },
    ]);
  };

  const updateField = (id: string, newQuestion: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, question: newQuestion } : field
      )
    );
  };

  const updateOptions = (id: string, newOptions: string[]) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, options: newOptions } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const submitForm = async () => {
    console.log({ formTitle, fields });
    try {
      const response = await axios.post("/api/events/create-form", {
        eventID: eventID,
        title: formTitle,
        fields,
      });

      alert(`Google Form Created! Link: ${response.data.formUrl}`);
      setEventID(null);
    } catch (error) {
      console.error("Error creating form", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 border rounded-lg shadow overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        Now Create a Google Form for your event registration:
      </h2>

      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        required
        onChange={(e) => setFormTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {fields.map((field) => (
        <div key={field.id} className="p-3 border mb-3">
          <input
            type="text"
            placeholder="Question"
            value={field.question}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full p-2 border rounded"
          />

          {field.type !== "shortAnswer" && field.type !== "paragraph" && (
            <div className="mt-2">
              {field.options!.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...field.options!];
                      newOptions[index] = e.target.value;
                      updateOptions(field.id, newOptions);
                    }}
                    className="p-2 border rounded w-full"
                  />
                  <button
                    onClick={() => {
                      const newOptions = field.options!.filter(
                        (_, i) => i !== index
                      );
                      updateOptions(field.id, newOptions);
                    }}
                    className="text-red-500"
                  >
                    ✖
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateOptions(field.id, [...field.options!, ""])}
                className="mt-2 bg-gray-200 p-1 rounded"
              >
                Add Option
              </button>
            </div>
          )}

          <button
            onClick={() => removeField(field.id)}
            className="text-red-600 mt-2"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex gap-3 my-4">
        <button
          onClick={() => addField("shortAnswer")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Short Answer
        </button>
        <button
          onClick={() => addField("paragraph")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Paragraph
        </button>
        <button
          onClick={() => addField("multipleChoice")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Multiple Choice
        </button>
        <button
          onClick={() => addField("checkbox")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Checkboxes
        </button>
        <button
          onClick={() => addField("dropdown")}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Dropdown
        </button>
      </div>

      <button
        onClick={submitForm}
        className="bg-green-500 text-white p-3 rounded w-full"
      >
        Create Google Form
      </button>
    </div>
  );
};

export default FormCreator;
