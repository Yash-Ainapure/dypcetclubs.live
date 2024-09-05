// import React from 'react'
// import user_icon from '../assets/user_icon.png';
// import password_icon from '../assets/password_icon.png';

// const ClubLogin = () => {
//   return (
//     <div className=' flex flex-col mx-auto justify-center items-center w-full h-[100vh]  '>
//       {/* <div className='p-10'></div> */}
//       <h2 className="text-3xl font-semibold mb-5">Please Login To Continue</h2>
//       <div className='w-1/3 h-[60%] flex flex-col p-6 border-solid border-2 border-indigo-600 bg-white'>

//         <h1 className='text-5xl flex justify-center mt-2  font-bold'>Sign In</h1>


//         <form className=' mt-10 h-full  w-full  gap-2.5 flex flex-col mx-auto p-2 justify-center border-solid border-2 border-black'>

//           <div className='  h-12 w-[80%] mb-7 flex mx-auto items-center flex flex-row rounded-md border-solid border-black border-2'>
//             <img src={user_icon} alt='email' className='h-6 m-3'></img>
//             <input type="text" className='h-full w-full border-0 outline-none text-1xl'></input>
//           </div>

//           <div className='  h-12 w-[80%] mb-7 flex mx-auto items-center flex flex-row rounded-md border-solid border-black border-2'>
//             <img src={password_icon} alt='password' className='h-6 m-3'></img>
//             <input type="password" className='h-full w-full border-0 outline-none text-1xl'></input>
//           </div>

//           <div className='flex flex-row p-2 mx-auto items-center w-[80%] h-18   space-x-5'>
//             <button className="px-2 h-full w-[50%] pb-2 bg-blue-500 text-white rounded  text-3xl font-semibold ">Sign in</button>
//             <button className="px-2 h-full w-[50%] py- bg-green-500 text-white rounded  text-3xl font-semibold ">Sign up</button>
//           </div>

//         </form>
//       </div>
//     </div>
//   )
// }

// export default ClubLogin
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import user_icon from '../assets/user_icon.png';
import password_icon from '../assets/password_icon.png';

const ClubLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill in all details.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setErrorMessage('');
        setSuccessMessage('Login successful! 🎉');
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
          navigate('/App'); // Navigate to the dashboard or another page after successful login
        }, 5000); // 5-second delay
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('An error occurred during login.');
      }
    }
  };

  return (
    <div className='flex flex-col mx-auto justify-center items-center w-full h-[100vh]'>
      <h2 className="text-3xl font-semibold mb-5">Please Login To Continue</h2>
      <div className='w-1/3 h-[60%] flex flex-col p-6 border-solid border-2 border-indigo-600 bg-white'>
        <h1 className='text-5xl flex justify-center mt-2 font-bold'>Sign In</h1>
        <form className='mt-10 h-full w-full gap-2.5 flex flex-col mx-auto p-2 justify-center border-solid border-2 border-black' onSubmit={handleLogin}>
          <div className='h-12 w-[80%] mb-7 flex mx-auto items-center flex flex-row rounded-md border-solid border-black border-2'>
            <img src={user_icon} alt='email' className='h-6 m-3' />
            <input type="text" className='h-full w-full border-0 outline-none text-1xl' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='h-12 w-[80%] mb-7 flex mx-auto items-center flex flex-row rounded-md border-solid border-black border-2'>
            <img src={password_icon} alt='password' className='h-6 m-3' />
            <input type="password" className='h-full w-full border-0 outline-none text-1xl' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-500 text-center mb-4">
              {successMessage}
            </div>
          )}
          {showAnimation && (
            <div className="flex justify-center items-center mb-4">
              {/* Replace this with your actual celebration animation */}
              <div className="animate-pulse text-3xl font-bold">🎉🎉🎉</div>
            </div>
          )}
          <div className='flex flex-row p-2 mx-auto items-center w-[80%] h-18 space-x-5'>
            <button className="px-2 h-full w-[50%] pb-2 bg-blue-500 text-white rounded text-3xl font-semibold" type="submit">Sign in</button>
            <button className="px-2 h-full w-[50%] py- bg-green-500 text-white rounded text-3xl font-semibold" onClick={() => navigate('/registerClub')}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClubLogin;
