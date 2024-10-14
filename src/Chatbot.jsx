import React, { useState } from 'react';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);

        try {
            const response = await fetch('http://127.0.0.1:5000/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: input })
            });
            const data = await response.json();
            const botMessage = { text: data.response, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Erro ao obter resposta do chatbot:', error);
            const errorMessage = { text: 'Desculpe, não consegui obter uma resposta.', sender: 'bot' };
            setMessages((prev) => [...prev, errorMessage]);
        }

        setInput('');
    };

    return (
        <div className="flex flex-col h-[500px] w-[300px] border border-gray-300 rounded p-4">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === 'user' ? 'text-right text-blue-600' : 'text-left text-green-600'}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
                    className="flex-1 border border-gray-300 rounded p-2 mr-2"
                    placeholder="Digite sua pergunta..."
                />
                <button onClick={handleSend} className="bg-blue-600 text-white rounded p-2">
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
