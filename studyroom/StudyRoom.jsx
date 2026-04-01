// src/components/studyroom/StudyRoom.jsx
import { useState, useEffect } from "react";

export default function StudyRoom() {
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [activeTab, setActiveTab] = useState("user"); // "user" or "ai"
  const [messages, setMessages] = useState([
    { id: 1, sender: "You", text: "what are you doing" },
    { id: 2, sender: "You", text: "hello" },
    { id: 3, sender: "You", text: "this is a test run!!!" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  // Timer
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  const sendToAI = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: newMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Keep going! You've been focused for a while.",
        "Good job! Would you like a 5-minute break suggestion?",
        "Remember to stay hydrated while studying CS104!",
        "You're doing great. Focus mode activated 🔥"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { id: Date.now(), sender: "AI Assistant", text: randomResponse }]);
    }, 800);

    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-[#E0F2FE] flex flex-col">
      {/* Top Navigation */}
      <header className="bg-[#1E40AF] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚓</span>
          <span className="font-bold text-xl">ANCHOR</span>
        </div>
        <div className="flex gap-8 text-sm font-medium">
          <span className="text-white/70 cursor-pointer">Profile</span>
          <span className="text-white/70 cursor-pointer">Dashboard</span>
          <span className="text-white cursor-pointer border-b-2 border-white pb-1">Session History</span>
        </div>
      </header>

      <div className="flex flex-1 p-6 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Main Video Area */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
              ← exit
            </button>
            <h1 className="font-semibold text-lg">studying for cs104!!!</h1>
            <div className="text-right">
              <div className="text-2xl font-mono font-bold text-indigo-600">{formatTime(time)}</div>
              <div className="text-xs text-gray-500">Study Timer</div>
            </div>
          </div>

          {/* Video Grid */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm p-6 flex flex-col">
            {/* Your Video */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="You" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">You</div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-black/60 p-2 rounded-full text-white">🎤</button>
                <button className="bg-black/60 p-2 rounded-full text-white">📹</button>
              </div>
            </div>

            {/* Other Participant */}
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-5xl text-gray-500">
                  👤
                </div>
                <p className="mt-4 font-medium text-gray-700">Tommy Trojan</p>
              </div>
              <div className="absolute bottom-4 right-4 text-red-500">🎤</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-96 flex flex-col gap-4">

          {/* Participants */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold mb-4">Participants</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">👤</div>
                <div>
                  <p className="font-medium">Traveler</p>
                  <p className="text-xs text-emerald-600">● Host</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">👤</div>
                <p className="font-medium">Tommy Trojan</p>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
            {/* Chat Tabs */}
            <div className="flex border-b">
              <button 
                onClick={() => setActiveTab("user")}
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "user" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"}`}
              >
                User Chat
              </button>
              <button 
                onClick={() => setActiveTab("ai")}
                className={`flex-1 py-3 text-sm font-medium ${activeTab === "ai" ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500"}`}
              >
                AI Chat
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === "You" 
                      ? "bg-indigo-600 text-white" 
                      : "bg-white border"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (activeTab === "user" ? sendMessage() : sendToAI())}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-2xl focus:outline-none focus:bg-white border"
                />
                <button 
                  onClick={activeTab === "user" ? sendMessage : sendToAI}
                  className="bg-indigo-600 text-white px-5 rounded-2xl hover:bg-indigo-700"
                >
                  ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
