import { useLocation, useNavigate } from "react-router-dom";

export const ViewSession = () => {
    const location = useLocation();
    const { session } = location.state;
    const navigate=useNavigate();
    return (
        <div className="bg-green-500 w-full h-full rounded-tl-2xl p-4 relative">
            <button onClick={()=>{
                navigate(-1);
            }} className="bg-white p-2 rounded-md absolute top-4 right-4">{"<--- Back"}</button>
            <h1>Title: {session.Title}</h1>
            <p>Description: {session.Description}</p>
            <p>
                <strong>Start Date:</strong> {new Date(session.StartDate).toLocaleString()}
            </p>
            <p>
                <strong>End Date:</strong> {new Date(session.EndDate).toLocaleString()}
            </p>


            {/* Display positions here which were previously added and add a option to add/edit/delete positions */}
        </div>
    );
};