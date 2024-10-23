import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const ViewSession = () => {
  const location = useLocation();
  const { session } = location.state;
  const navigate = useNavigate();

  const [positions, setPositions] = useState<{ name: string }[]>([
    { name: "Media Team" },
    { name: "Tech Team" },
    { name: "Logistics Team" },
    { name: "Marketing Team" },
    { name: "Finance Team" },
  ]);

  const [newPosition, setNewPosition] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddPosition = () => {
    if (newPosition.trim() !== "") {
      if (editIndex !== null) {
        const updatedPositions = [...positions];
        updatedPositions[editIndex].name = newPosition;
        setPositions(updatedPositions);
        setEditIndex(null);
      } else {
        setPositions([...positions, { name: newPosition }]);
      }
      setNewPosition("");
    }
  };

  const handleDeletePosition = (index: number) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
  };

  const handleEditPosition = (index: number) => {
    setNewPosition(positions[index].name);
    setEditIndex(index);
  };

  return (
    <div className="bg-green-500 w-full h-full rounded-tl-2xl p-4 relative">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="bg-white p-2 rounded-md absolute top-4 right-4"
      >
        {"<--- Back"}
      </button>
      <h1>Title: {session.Title}</h1>
      <p>Description: {session.Description}</p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(session.StartDate).toLocaleString()}
      </p>
      <p>
        <strong>End Date:</strong> {new Date(session.EndDate).toLocaleString()}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">Positions</h2>

        <ul className="mt-4 space-y-2">
          {positions.map((position, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{position.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditPosition(index)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePosition(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter new position"
            value={newPosition}
            onChange={(e) => setNewPosition(e.target.value)}
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleAddPosition}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editIndex !== null ? "Update Position" : "Add Position"}
          </button>
        </div>
      </div>
    </div>
  );
};
