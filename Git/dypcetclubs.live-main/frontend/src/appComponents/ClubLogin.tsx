import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import user_icon from "../assets/user_icon.png";
import password_icon from "../assets/password_icon.png";
import { useAuth } from "../context/AuthContext";
import {Eye, EyeOff} from "lucide-react"
import ClipLoader from "react-spinners/ClipLoader";

const ClubLogin: React.FC<any> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all details.");
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        setSuccessMessage("Login successful! 🎉");
        setTimeout(() => {
          navigate("/clubAdmin");
        }, 1000);
      } else {
        setErrorMessage("Email or password is incorrect.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
      <div className="bg-white rounded-lg px-4 relative border-2 py-8 md:w-1/2 flex flex-col justify-center gap-4 items-center ">
        <p
          className="cursor-pointer absolute p-2 rounded-md top-0 right-2 text-red-600 font-semibold"
          onClick={() => {
            onClose(false);
          }}
        >
          X
        </p>
        <p className="text-2xl font-bold flex justify-center">
          {" "}
          Club Admin Login
        </p>
        <div className="items-center flex flex-row rounded-md border-black border-2 w-full">
          <img src={user_icon} alt="email" className="h-6 m-3" />
          <input
            type="text"
            className="h-full w-full border-0 outline-none text-1xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="items-center flex flex-row rounded-md border-solid border-black border-2 w-full relative">
          <img src={password_icon} alt="password" className="h-6 m-3" />
          <input
            type={hidden ? "password" : "text"}
            className="h-full w-full border-0 outline-none text-1xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="absolute right-4" onClick={()=>setHidden(!hidden)}>
            {
              hidden ? <EyeOff /> : <Eye />
            }
          </button>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-green-500 text-center mb-4">
            {successMessage}
          </div>
        )}
        <div className="w-full flex gap-2">
          <button
            disabled={loading}
            className={`text-white rounded text-lg font-semibold p-2 w-1/2 bg-black`}
            onClick={handleLogin}
          >
            {loading ? "" : "Log in"}
            <ClipLoader loading={loading} color="#ffffff" />
          </button>
          <button
            className="text-black border border-black rounded text-lg font-semibold p-2 w-1/2"
            onClick={() => {
              onClose(false);
              navigate("/registerClub");
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubLogin;
