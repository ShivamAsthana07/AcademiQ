import { useState, useRef, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const SUGGESTIONS = [
  { icon: "⚛️", text: "Explain quantum entanglement" },
  { icon: "∫",  text: "Help me understand calculus" },
  { icon: "🧬", text: "How does DNA replication work?" },
  { icon: "📜", text: "Summarise the French Revolution" },
];

export default function App() {
  const { user, logout } = useAuth();

  // ── all hooks first ──
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dark, setDark] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // ── redirect after all hooks ──
  const isLoading = user === undefined;
  const isLoggedOut = user === null;

  useEffect(() => {
    if (user) {
      axios.get("/api/chats").then(r => setChats(r.data)).catch(() => {});
    }
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
    }
  }, [input]);

  if (isLoading) return (
    <div style={{
      minHeight: "100vh",
      background: "#09090b",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "IBM Plex Sans, sans-serif",
      color: "rgba(255,255,255,0.2)",
      fontSize: "14px",
      letterSpacing: "0.05em"
    }}>
      Loading...
    </div>
  );

  if (isLoggedOut) return <Navigate to="/login" replace />;

  // ── functions ──
  async function newChat() {
    const res = await axios.post("/api/chats");
    const chat = res.data;
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat._id);
    setMessages([]);
    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 100);
  }

  async function switchChat(id) {
    if (id === activeChatId) return;
    setChatLoading(true);
    const res = await axios.get(`/api/chats/${id}`);
    setActiveChatId(id);
    setMessages(res.data.messages);
    setInput("");
    setChatLoading(false);
  }

  async function deleteChat(e, id) {
    e.stopPropagation();
    await axios.delete(`/api/chats/${id}`);
    setChats(prev => prev.filter(c => c._id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
      setMessages([]);
    }
  }

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const content = input.trim();
    setInput("");
    setLoading(true);

    let chatId = activeChatId;

    if (!chatId) {
      const res = await axios.post("/api/chats");
      chatId = res.data._id;
      setChats(prev => [res.data, ...prev]);
      setActiveChatId(chatId);
    }

    setMessages(prev => [...prev, { role: "user", content }]);

    try {
      const res = await axios.post(`/api/chats/${chatId}/message`, { content });
      setMessages(res.data.chat.messages);
      setChats(prev => prev.map(c =>
        c._id === chatId ? { ...c, title: res.data.chat.title } : c
      ));
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    }

    setLoading(false);
  }

  const d = dark;
  const activeChat = chats.find(c => c._id === activeChatId);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'IBM Plex Sans', sans-serif; }
        .font-garamond { font-family: 'EB Garamond', serif; }
        .scrollbar-thin::-webkit-scrollbar { width: 3px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(128,128,128,0.2); border-radius: 99px; }
        .typing-dot { animation: bounce 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: .18s; }
        .typing-dot:nth-child(3) { animation-delay: .36s; }
        @keyframes bounce { 0%,60%,100%{opacity:.2;transform:translateY(0)} 30%{opacity:1;transform:translateY(-4px)} }
        .msg-in { animation: msgIn .28s ease forwards; }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .theme-toggle { position: relative; width: 44px; height: 24px; }
        .theme-toggle input { opacity: 0; width: 0; height: 0; }
        .toggle-track { position: absolute; inset: 0; border-radius: 99px; cursor: pointer; transition: background .3s; }
        .toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform .3s; display: flex; align-items: center; justify-content: center; font-size: 10px; }
        input:checked + .toggle-track .toggle-thumb { transform: translateX(20px); }
        .chat-item-actions { opacity: 0; transition: opacity .15s; }
        .chat-item:hover .chat-item-actions { opacity: 1; }
      `}</style>

      <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${d ? "bg-[#09090b] text-[#e4e4e7]" : "bg-[#f5f4f0] text-[#1c1917]"}`}>

        {/* ── Sidebar ── */}
        <aside className={`
          flex flex-col flex-shrink-0 border-r transition-all duration-300 overflow-hidden
          ${d ? "bg-[#0e0e11] border-white/[0.07]" : "bg-[#eeeae3] border-stone-200"}
          ${sidebarOpen ? "w-[272px]" : "w-0"}
        `}>

          {/* Logo */}
          <div className="flex items-center gap-3 px-5 pt-6 pb-4 flex-shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[15px] flex-shrink-0 border
              ${d ? "bg-amber-500/15 border-amber-500/25" : "bg-amber-100 border-amber-300"}`}>
              🎓
            </div>
            <span className={`font-garamond text-[20px] tracking-wide whitespace-nowrap ${d ? "text-white" : "text-stone-800"}`}>
              AcademiQ
            </span>
          </div>

          {/* New chat */}
          <div className="px-3 pb-3 flex-shrink-0">
            <button onClick={newChat} className={`
              w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 whitespace-nowrap border
              ${d ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/18 hover:border-amber-500/35"
                  : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"}
            `}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              New conversation
            </button>
          </div>

          <div className={`mx-4 border-t mb-2 flex-shrink-0 ${d ? "border-white/[0.06]" : "border-stone-200"}`}/>

          {/* Chat list */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-2 min-h-0">
            <p className={`text-[10px] font-medium tracking-[0.12em] uppercase px-3 mb-1.5 ${d ? "text-white/20" : "text-stone-400"}`}>
              Recent
            </p>
            {chats.length === 0 && (
              <p className={`text-[12px] px-3 py-2 ${d ? "text-white/20" : "text-stone-400"}`}>
                No conversations yet
              </p>
            )}
            {chats.map(chat => (
              <div
                key={chat._id}
                onClick={() => switchChat(chat._id)}
                className={`
                  chat-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-0.5 cursor-pointer transition-all duration-150
                  ${chat._id === activeChatId
                    ? d ? "bg-white/[0.07] text-white" : "bg-stone-200/80 text-stone-800"
                    : d ? "text-white/35 hover:bg-white/[0.04] hover:text-white/65" : "text-stone-400 hover:bg-stone-200/50 hover:text-stone-700"}
                `}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="flex-shrink-0 opacity-50">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="text-[13px] truncate flex-1">{chat.title}</span>
                <button
                  onClick={e => deleteChat(e, chat._id)}
                  className={`chat-item-actions flex-shrink-0 w-5 h-5 flex items-center justify-center rounded hover:text-red-400 transition-colors
                    ${d ? "text-white/30" : "text-stone-400"}`}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                    <path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`px-4 py-4 border-t flex-shrink-0 ${d ? "border-white/[0.06]" : "border-stone-200"}`}>
            {/* Theme toggle */}
            <div className="flex items-center justify-between mb-3.5">
              <span className={`text-[12px] font-medium ${d ? "text-white/30" : "text-stone-400"}`}>
                {d ? "Dark mode" : "Light mode"}
              </span>
              <label className="theme-toggle">
                <input type="checkbox" checked={dark} onChange={() => setDark(o => !o)}/>
                <div className={`toggle-track ${d ? "bg-amber-500/40" : "bg-stone-300"}`}>
                  <div className={`toggle-thumb ${d ? "bg-amber-300" : "bg-white"}`}>
                    {d ? "🌙" : "☀️"}
                  </div>
                </div>
              </label>
            </div>

            {/* User info + sign out */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {user?.avatar
                  ? <img src={user.avatar} alt="" className="w-7 h-7 rounded-full flex-shrink-0 object-cover"/>
                  : <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium flex-shrink-0
                      ${d ? "bg-white/10 text-white/50" : "bg-stone-300 text-stone-600"}`}>
                      {user?.name?.[0]}
                    </div>
                }
                <div>
                  <p className={`text-[12px] font-medium leading-tight ${d ? "text-white/55" : "text-stone-600"}`}>{user?.name}</p>
                  <p className={`text-[10px] leading-tight ${d ? "text-white/20" : "text-stone-400"}`}>{user?.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all duration-200
                  ${d ? "border-white/[0.08] text-white/25 hover:text-white/60 hover:border-white/20"
                      : "border-stone-200 text-stone-400 hover:text-stone-600"}`}
              >
                Sign out
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Navbar */}
          <header className={`
            flex items-center gap-3 px-5 h-[58px] border-b flex-shrink-0 transition-colors duration-300
            ${d ? "bg-[#0e0e11] border-white/[0.07]" : "bg-[#eeeae3] border-stone-200"}
          `}>
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all duration-200 flex-shrink-0
                ${d ? "border-white/[0.08] text-white/35 hover:bg-white/[0.05] hover:text-white/70"
                    : "border-stone-300 text-stone-400 hover:bg-stone-200 hover:text-stone-700"}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <p className={`font-garamond text-[16px] flex-1 truncate ${d ? "text-white/75" : "text-stone-700"}`}>
              {activeChat?.title || "AcademiQ"}
            </p>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium tracking-wide
                ${d ? "bg-white/[0.04] border-white/[0.07] text-white/30" : "bg-stone-100 border-stone-200 text-stone-400"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"/>
                Llama 3.3 · Groq
              </span>
              {!sidebarOpen && (
                <button
                  onClick={() => setDark(o => !o)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border text-[14px] transition-all duration-200
                    ${d ? "border-white/[0.08] hover:bg-white/[0.05]" : "border-stone-300 hover:bg-stone-200"}`}
                >
                  {d ? "☀️" : "🌙"}
                </button>
              )}
              <button
                onClick={newChat}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium transition-all duration-200
                  ${d ? "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20"
                      : "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"}`}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New
              </button>
            </div>
          </header>

          {/* Chat area */}
          <div className={`flex-1 overflow-y-auto scrollbar-thin transition-colors duration-300 ${d ? "bg-[#09090b]" : "bg-[#f5f4f0]"}`}>

            {/* Empty state */}
            {!activeChatId && (
              <div className="max-w-2xl mx-auto px-6 pt-16 pb-8">
                <div className="text-center mb-10">
                  <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl border
                    ${d ? "bg-amber-500/10 border-amber-500/15" : "bg-amber-50 border-amber-200"}`}>
                    🎓
                  </div>
                  <h1 className={`font-garamond text-[32px] leading-tight mb-3 ${d ? "text-white" : "text-stone-800"}`}>
                    What would you like<br/>
                    <em className={d ? "text-amber-300/80" : "text-amber-600"}>to explore today?</em>
                  </h1>
                  <p className={`text-[14px] max-w-sm mx-auto leading-relaxed ${d ? "text-white/35" : "text-stone-400"}`}>
                    Ask anything about your studies, research, or coursework. Clear, accurate answers every time.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s.text}
                      onClick={() => { setInput(s.text); textareaRef.current?.focus(); }}
                      className={`flex items-start gap-3 p-4 rounded-xl text-left border transition-all duration-200 group
                        ${d ? "bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.13]"
                            : "bg-white border-stone-200 hover:bg-stone-50 hover:border-stone-300 shadow-sm"}`}
                    >
                      <span className="text-lg mt-0.5 flex-shrink-0">{s.icon}</span>
                      <span className={`text-[13px] leading-relaxed transition-colors
                        ${d ? "text-white/45 group-hover:text-white/70" : "text-stone-500 group-hover:text-stone-700"}`}>
                        {s.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading chat */}
            {chatLoading && (
              <div className="flex items-center justify-center h-full">
                <p className={`text-[13px] ${d ? "text-white/25" : "text-stone-400"}`}>Loading conversation...</p>
              </div>
            )}

            {/* Messages */}
            {!chatLoading && activeChatId && (
              <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
                {messages.length === 0 && (
                  <p className={`text-center text-[13px] ${d ? "text-white/20" : "text-stone-400"}`}>
                    Start the conversation below
                  </p>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3.5 items-start msg-in ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[13px] border
                      ${m.role === "assistant"
                        ? d ? "bg-amber-500/10 border-amber-500/20 text-amber-400 font-garamond"
                            : "bg-amber-50 border-amber-200 text-amber-600 font-garamond"
                        : d ? "bg-white/[0.06] border-white/[0.1] text-white/45"
                            : "bg-stone-100 border-stone-200 text-stone-500"}
                    `}>
                      {m.role === "assistant" ? "A" : user?.name?.[0] || "U"}
                    </div>
                    <div className={`
                      max-w-[82%] px-4 py-3 rounded-2xl text-[14px] leading-[1.85] whitespace-pre-wrap break-words border
                      ${m.role === "assistant"
                        ? d ? "bg-[#111115] border-white/[0.07] text-white/80 rounded-tl-sm"
                            : "bg-white border-stone-200 text-stone-700 rounded-tl-sm shadow-sm"
                        : d ? "bg-[#18181f] border-white/[0.08] text-white/75 rounded-tr-sm"
                            : "bg-stone-100 border-stone-200 text-stone-700 rounded-tr-sm"}
                    `}>
                      {m.content}
                    </div>
                  </div>
                ))}

                {/* Thinking dots */}
                {loading && (
                  <div className="flex gap-3.5 items-start msg-in">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border font-garamond text-[13px]
                      ${d ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-amber-50 border-amber-200 text-amber-600"}`}>
                      A
                    </div>
                    <div className={`px-4 py-4 rounded-2xl rounded-tl-sm border flex items-center gap-1.5
                      ${d ? "bg-[#111115] border-white/[0.07]" : "bg-white border-stone-200 shadow-sm"}`}>
                      <div className={`typing-dot w-1.5 h-1.5 rounded-full ${d ? "bg-amber-400" : "bg-amber-500"}`}/>
                      <div className={`typing-dot w-1.5 h-1.5 rounded-full ${d ? "bg-amber-400" : "bg-amber-500"}`}/>
                      <div className={`typing-dot w-1.5 h-1.5 rounded-full ${d ? "bg-amber-400" : "bg-amber-500"}`}/>
                    </div>
                  </div>
                )}
                <div ref={bottomRef}/>
              </div>
            )}
          </div>

          {/* Input area */}
          <div className={`px-6 pb-6 pt-3 flex-shrink-0 border-t transition-colors duration-300
            ${d ? "bg-[#09090b] border-white/[0.06]" : "bg-[#f5f4f0] border-stone-200"}`}>
            <div className="max-w-2xl mx-auto">
              <div className={`
                flex items-end gap-3 rounded-2xl px-4 py-3 border transition-colors duration-200
                ${d ? "bg-[#111115] border-white/[0.08] focus-within:border-amber-500/30"
                    : "bg-white border-stone-200 focus-within:border-amber-400 shadow-sm"}
              `}>
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask an academic question..."
                  className={`flex-1 bg-transparent text-[14px] outline-none resize-none leading-relaxed max-h-[160px] overflow-y-auto scrollbar-thin
                    ${d ? "text-white/80 placeholder-white/20" : "text-stone-700 placeholder-stone-300"}`}
                  style={{ minHeight: "24px" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:hover:scale-100 disabled:opacity-30 disabled:cursor-not-allowed
                    ${d ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-amber-500 text-white hover:bg-amber-600"}`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
              <p className={`text-center text-[11px] mt-2.5 tracking-wide ${d ? "text-white/15" : "text-stone-300"}`}>
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}