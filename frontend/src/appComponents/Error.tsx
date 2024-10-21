import React from 'react';
import { useNavigate } from 'react-router-dom';
import errorPage from '../assets/cat-error-page.png'
import { Button } from "@/components/ui/button";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };
    const handleGoEvent = () => {
        navigate('/events');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen fixed top-0 z-50 bg-gray-100 text-center">
        <p className='flex mb-2 gap-2 font-bold text-3xl md:text-4xl'>
            <span className="text-blue-800">WE DIDN'T MANAGE </span>
            <span> TO FETCH THIS PAGE.</span>
        </p>
        <div className='flex justify-center items-center h-[50vh] w-full md:w-[50vw]'>
            <div className='h-[40vh] w-[20vw] mb-3 md:h-[45vh] md:w-[25vw]'>
                <img className='h-full w-full object-cover' src={errorPage} alt="Error Page" />
            </div>
            <div className='font-bold text-lg md:text-xl mx-4'>
                <h2 className='mb-6'>Here are a few Options</h2>
                <Button
                    onClick={handleGoHome}
                    className="bg-white font-semibold text-gray-900 mx-2 hover:bg-gray-200">Go To Home</Button>
                <Button
                    onClick={handleGoEvent}
                    className="bg-white font-semibold text-gray-900 mx-2 hover:bg-gray-200">Go To Events</Button>
            </div>
        </div>
        <hr className='mt-4' />
    </div>
    );
};

export default ErrorPage;