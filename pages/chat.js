import { useState } from 'react';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();

    setMessages([...messages, { user: input, bot: data.result }]);
    setInput('');
  };

  return (
    <div>
      <h1>Chat with Bot</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <p><strong>You:</strong> {msg.user}</p>
            <p><strong>Bot:</strong> {msg.bot}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your symptoms or choose an option..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}