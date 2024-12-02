import React, { useState } from 'react';
import './Chatbot.css'; // Import the CSS file for styling
import { FaCommentDots, FaTimes } from 'react-icons/fa'; // FontAwesome icons for the chat button

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat window

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (input.trim()) {
      setMessages([...messages, { text: input, fromUser: true }]);
      setInput('');

      try {
        const res = await fetch('http://127.0.0.1:8080/test_query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            namespace: 'ptesting',
            query: {
              question: input,
            },
          }),
        });

        // const res = await fetch('https://catfact.ninja/fact',{
        //   method: 'GET'
        // });

        // const res = await fetch('http://localhost:5000/health',{
        //   method: 'GET'
        // });

        const data = await res.json();

        console.log(data);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.health, fromUser: false },
        ]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to get a response.', fromUser: false },
        ]);
      }
    }
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button className="chat-button" onClick={() => setIsChatOpen(true)}>
          <FaCommentDots size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Vartalap.AI</h3>
            <button
              className="close-button"
              onClick={() => setIsChatOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-window">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.fromUser ? 'user-message' : 'bot-message'}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field"
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
