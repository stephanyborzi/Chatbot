import React from 'react';
import './index.css';
import Chatbot from './Chatbot';

function App() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4 text-black-800">Chatbot de Fórmula E</h1>
            <Chatbot/>
        </div>
    );
}

export default App;

