import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const navigate = useNavigate();

    const handleStartChat = () => {
        navigate('/chat');
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-myOra'>
            <h1 className='text-4xl font-bold text-myIndigo mb-8'>Welcome to Tech Support</h1>
            <button 
                onClick={handleStartChat}
                className='bg-myGreen text-white px-6 py-3 rounded-lg text-xl hover:bg-myHeaderGreen'>
                How Can I Help You
            </button>
        </div>
    );
}

export default StartPage;
