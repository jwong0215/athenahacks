import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// ─── INITIAL DATA ──────────────────────────────────────────────────────────────

const initialChatMessages = [
  {
    id: 1,
    sender: "You",
    text: "what are you doing",
    isSelf: true,
  },
];

// ─── SESSION SCREEN ────────────────────────────────────────────────────────────
//
//  This screen contains three major visual panels:
//
//  ┌───────────────────────────────────────────────────────────┐
//  │  1. LEFT PANEL  — VideoArea                               │
//  │     • Two live video feeds (Traveler + Tommy Trojan)      │
//  │     • Name labels, mic status indicators                  │
//  │     • Bottom mic/video toggle buttons                     │
//  │     • Top-left exit button → navigates back to /dashboard │
//  │     Located: "LEFT PANEL — VideoArea" section below       │
//  ├──────────────────────────────────────────────────────────-┤
//  │  2. TOP-RIGHT PANEL — Participants                        │
//  │     • Participant rows with avatar, name, optional badge  │
//  │     Located: "TOP-RIGHT PANEL — Participants" section     │
//  ├───────────────────────────────────────────────────────────┤
//  │  3. BOTTOM-RIGHT PANEL — Chat                             │
//  │     • Sliding tab bar: User Chat ↔ AI Chat                │
//  │     • Scrollable message list                             │
//  │     • Zoom-style input: [photo icon][divider][cursor]     │
//  │     • Send on Enter key or airplane button                │
//  │     Located: "BOTTOM-RIGHT PANEL — Chat" section below    │
//  └───────────────────────────────────────────────────────────┘
//
// ──────────────────────────────────────────────────────────────────────────────

export const Session = (): JSX.Element => {
  const navigate = useNavigate();

  // ── Video / Audio state ───────────────────────────────────────────────────
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [streamError, setStreamError] = useState<string | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  // Request camera + mic on mount; clean up on unmount
  useEffect(() => {
    let stream: MediaStream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // apply initial states
        stream.getAudioTracks().forEach((t) => (t.enabled = micOn));
        stream.getVideoTracks().forEach((t) => (t.enabled = camOn));
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setStreamError(msg);
      }
    })();
    return () => {
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMic = useCallback(() => {
    setMicOn((prev) => {
      const next = !prev;
      localStreamRef.current?.getAudioTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, []);

  const toggleCam = useCallback(() => {
    setCamOn((prev) => {
      const next = !prev;
      localStreamRef.current?.getVideoTracks().forEach((t) => (t.enabled = next));
      return next;
    });
  }, []);

  // Hidden file input ref for image import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active chat tab
  const [activeTab, setActiveTab] = useState<"user" | "ai">("user");

  // Chat messages
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const nextIdRef = useRef(initialChatMessages.length + 1);

  // Focus the real <input> when clicking the styled chat bar
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll the message list to bottom on new messages
  const chatScrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = () => {
    const text = messageInput.trim();
    if (!text) return;
    setChatMessages((prev) => [
      ...prev,
      { id: nextIdRef.current++, sender: "You", text, isSelf: true },
    ]);
    setMessageInput("");
    chatInputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Switch tab with animated slider ──────────────────────────────────────
  const switchTab = (tab: "user" | "ai") => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  // ── Layout constants (match original Figma pixel positions) ──────────────
  // Chat panel: top=311, left=726, width=525, height=477
  // Input row is 45px tall, 13px from bottom of panel → bottom of input = 311+477-13 = 775px from top
  // Input top = 775 - 45 = 730px from page top
  // Send button: width=45, right edge of panel = 726+525 = 1251, button left = 1251-45-0 = 1206
  // But we nest it inside the panel so relative layout is easier — see below.

  return (
    <div className="bg-white overflow-hidden w-full min-w-[1280px] min-h-[832px] relative">
      {/* Background */}
      <img
        className="absolute top-0 left-0 w-[1300px] h-[832px]"
        alt="Rectangle"
        src="https://c.animaapp.com/mnc46sj2fe3S0e/img/rectangle-4.svg"
      />

      {/* ── NAVIGATION BAR ────────────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 w-full h-[68px] bg-[#375cac]" />

      {/* Logo */}
      <div className="absolute top-1 left-4 w-40 h-[60px]">
        <img
          className="absolute top-0 left-0 w-[60px] h-[60px]"
          alt="Anchor logo"
          src="https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-2.png"
        />
        <div className="absolute top-[5px] left-[52px] [font-family:'Retro_Sugar_-_Demo_Version-Black',Helvetica] font-black text-white text-[32.8px] tracking-[0] leading-[normal]">
          ANCHOR
        </div>
      </div>

      {/* Profile — semi-transparent, turns fully white on hover */}
      <div
        onClick={() => navigate("/profile")}
        className="absolute top-[19px] left-[688px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors select-none"
      >
        Profile
      </div>

      {/* Dashboard — always white (active page); no hover color change */}
      <div
        onClick={() => navigate("/dashboard")}
        className="absolute top-[19px] left-[837px] [font-family:'Inter',Helvetica] font-normal text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer select-none"
      >
        Dashboard
      </div>

      {/* Session History — semi-transparent, turns fully white on hover */}
      <div
        onClick={() => navigate("/session-history")}
        className="absolute top-[19px] left-[1039px] [font-family:'Inter',Helvetica] font-normal text-[#ffffffb2] hover:text-white text-[25px] tracking-[0] leading-[normal] whitespace-nowrap cursor-pointer transition-colors select-none"
      >
        Session History
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LEFT PANEL — VideoArea
          Contains: exit button (top-left, returns to /dashboard), session
          title, two stacked video feeds with name labels and mic status
          indicators, and mic/video control buttons at the bottom.
          ↳ src/screens/Session/Session.tsx  §  "LEFT PANEL — VideoArea"
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Card shell */}
      <div className="absolute top-[119px] left-[57px] w-[631px] h-[660px] bg-white rounded-[15px]" />

      {/* Header bar */}
      <div className="absolute top-[119px] left-[57px] w-[631px] h-[50px] bg-[#375cac] rounded-[15px_15px_0px_0px]" />

      {/* Exit button — top-left corner; returns to /dashboard */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-[119px] left-[57px] w-[86px] h-[50px] bg-[#063261] hover:bg-[#0a4a8f] active:bg-[#041e3d] rounded-[15px_0px_0px_0px] transition-colors cursor-pointer flex items-center justify-center gap-[5px]"
        aria-label="Exit session and return to dashboard"
      >
        <img
          className="w-[17px] h-[17px]"
          alt="Exit"
          src="https://c.animaapp.com/mnc46sj2fe3S0e/img/icon.svg"
        />
        <span className="[font-family:'Inter',Helvetica] font-normal text-white text-[15px] leading-[normal]">
          exit
        </span>
      </button>

      {/* Session title (centered in header, right of exit btn) */}
      <div className="absolute top-[136px] left-[143px] w-[480px] flex items-center justify-center pointer-events-none">
        <span className="[font-family:'Inter',Helvetica] font-bold text-white text-[18.1px] tracking-[0] leading-[18.1px] whitespace-nowrap">
          studying for cs104!!!
        </span>
      </div>

      {/*
        Video area — vertically centered inside the card body (50px header + 610px body = 660px total card).
        Body available height = 660 - 50 = 610px.
        Two feeds (239px each) + gap (16px) + controls row (47px) + gap (12px) = 553px total.
        Top offset within body = (610 - 553) / 2 = ~28px → absolute top = 119 + 50 + 28 = 197px.
      */}

      {/* ── YOUR live camera feed (top slot) ───────────────────────────── */}
      <div className="absolute top-[197px] left-[125px] w-[502px] h-[239px] rounded-[20px] overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
        {/* video element — always mounted; hidden when cam is off */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: camOn && !streamError ? "block" : "none", transform: "scaleX(-1)" }}
        />
        {/* Cam-off / error fallback */}
        {(!camOn || streamError) && (
          <div className="flex flex-col items-center justify-center gap-2">
            <img className="w-[80px] h-[80px] opacity-40" alt="Camera off" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/person.svg" />
            {streamError && (
              <span className="text-[#ff8080] text-[12px] text-center px-4" style={{ fontFamily: "'Inter', Helvetica" }}>
                Camera unavailable
              </span>
            )}
          </div>
        )}
      </div>
      {/* Your name label */}
      <div className="absolute top-[386px] left-[143px] flex items-center">
        <div className="relative h-[37px] px-[15px] flex items-center">
          <div className="absolute inset-0 bg-[#8d8d8d99] rounded-full" />
          <span className="relative [font-family:'Inter',Helvetica] font-medium text-white text-[15.6px] leading-[15.6px] whitespace-nowrap">
            You
          </span>
        </div>
      </div>
      {/* Mic indicator — your feed */}
      <div
        className="absolute top-[386px] left-[571px] w-[41px] h-[41px] flex items-center justify-center rounded-full transition-colors"
        style={{ background: micOn ? "#d9d9d9" : "#ecd0d0" }}
      >
        <img
          className="w-[22px] h-[22px]"
          alt={micOn ? "Mic on" : "Mic off"}
          src={micOn
            ? "https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-3.png"
            : "https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-4.png"}
        />
      </div>

      {/* ── Remote participant slot (bottom) — static placeholder ───────── */}
      <div className="absolute top-[452px] left-[125px] w-[502px] h-[239px] bg-[#d9d9d9] rounded-[20px] flex items-center justify-center">
        <img className="w-[146px] h-[146px]" alt="Tommy Trojan — camera off" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/person.svg" />
      </div>
      {/* Tommy Trojan name label */}
      <div className="absolute top-[641px] left-[143px] flex items-center">
        <div className="relative w-[136px] h-[37px]">
          <div className="absolute inset-0 bg-[#8d8d8d99] rounded-full" />
          <span className="absolute top-[11px] left-[15px] [font-family:'Inter',Helvetica] font-medium text-white text-[15.6px] leading-[15.6px] whitespace-nowrap">
            Tommy Trojan
          </span>
        </div>
      </div>
      {/* Mic indicator — Tommy Trojan (muted = pink, static) */}
      <div className="absolute top-[641px] left-[571px] w-[41px] h-[41px] flex items-center justify-center bg-[#ecd0d0] rounded-full">
        <img className="w-[22px] h-[22px]" alt="Mic off" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-4.png" />
      </div>

      {/* ── Bottom controls: Mic toggle + Cam toggle ─────────────────────── */}
      <div className="absolute top-[703px] left-[79px] w-[502px] flex items-center justify-center gap-[16px]">
        {/* Mic toggle */}
        <button
          onClick={toggleMic}
          title={micOn ? "Mute microphone" : "Unmute microphone"}
          className="w-[47px] h-[47px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity border-none outline-none"
          style={{ background: micOn ? "#d9d9d9" : "#ecd0d0" }}
        >
          <img
            className="w-[25px] h-[25px]"
            alt={micOn ? "Mic on" : "Mic off"}
            src={micOn
              ? "https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-3.png"
              : "https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group.png"}
          />
        </button>
        {/* Cam toggle */}
        <button
          onClick={toggleCam}
          title={camOn ? "Turn off camera" : "Turn on camera"}
          className="w-[47px] h-[47px] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity border-none outline-none"
          style={{ background: camOn ? "#d9d9d9" : "#ecd0d0" }}
        >
          <img className="w-[43px] h-[43px] mt-[9px] transform translate-x-[7px]" alt={camOn ? "Cam on" : "Cam off"} src="https://c.animaapp.com/mnc46sj2fe3S0e/img/video.svg" />
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TOP-RIGHT PANEL — Participants
          Contains: "Participants" heading, list rows with avatar image, name
          text, and an optional anchor badge svg for the host/top user.
          ↳ src/screens/Session/Session.tsx  §  "TOP-RIGHT PANEL — Participants"
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Card shell */}
      <div className="absolute top-[119px] left-[726px] w-[525px] h-[161px] bg-white rounded-[15px]" />

      {/* Heading */}
      <div className="absolute top-[141px] left-[754px] [font-family:'Inter',Helvetica] font-bold text-[#375cac] text-[18.1px] leading-[18.1px] whitespace-nowrap">
        Participants
      </div>

      {/* Row — Traveler (has anchor badge) */}
      <div className="absolute top-[171px] left-[748px] flex items-center gap-[10px]">
        <img className="w-[45px] h-[45px]" alt="Traveler avatar" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/person.svg" />
        <span className="[font-family:'Inter',Helvetica] font-medium text-[#375cac] text-[18px] leading-[18px] whitespace-nowrap">
          Traveler
        </span>
        <img className="w-6 h-6" alt="Anchor badge" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/mask-group-1.png" />
      </div>

      {/* Row — Tommy Trojan */}
      <div className="absolute top-[221px] left-[748px] flex items-center gap-[10px]">
        <img className="w-[45px] h-[45px]" alt="Tommy Trojan avatar" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/person.svg" />
        <span className="[font-family:'Inter',Helvetica] font-medium text-[#375cac] text-[18px] leading-[18px] whitespace-nowrap">
          Tommy Trojan
        </span>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM-RIGHT PANEL — Chat
          Contains:
            • Animated tab bar (User Chat ↔ AI Chat):
                – Blue pill (#c0cdea) slides behind the active tab (CSS transition)
                – Active tab text = dark blue (#063261); inactive = gray (#8d8d8d)
                – Switching tabs reverses both colors simultaneously
            • Scrollable message list (auto-scrolls to newest message)
            • Zoom-style input row:
                [photo icon] [gray divider line] [text input — cursor starts here] [send btn]
                Clicking anywhere in the white bar focuses the real <input> element.
            • Sending: press Enter key OR click the airplane (send) button
          ↳ src/screens/Session/Session.tsx  §  "BOTTOM-RIGHT PANEL — Chat"
         ══════════════════════════════════════════════════════════════════════ */}

      {/* Outer card — blue background, fixed size, positioned absolutely */}
      <div className="absolute top-[311px] left-[726px] w-[525px] h-[477px] bg-[#375cac] rounded-[15px] flex flex-col overflow-hidden">

        {/* ── Tab bar ──────────────────────────────────────────────────────── */}
        <div className="relative mx-[13px] mt-[14px] h-12 bg-white rounded-[10px] flex-shrink-0 overflow-hidden">
          {/*
            Animated blue pill slider.
            When activeTab === "user": left = 9px  (User Chat side)
            When activeTab === "ai":  left = calc(100% - 239px)  (AI Chat side)
            CSS transition animates the slide.
          */}
          <div
            className="absolute top-[7px] h-[34px] w-[230px] bg-[#c0cdea] rounded-[10px]"
            style={{
              left: activeTab === "user" ? "9px" : "calc(100% - 239px)",
              transition: "left 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {/* User Chat button */}
          <button
            onClick={() => switchTab("user")}
            className="absolute left-0 top-0 w-1/2 h-full flex items-center justify-center z-10 cursor-pointer"
            style={{
              fontFamily: "'Inter', Helvetica",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "15px",
              letterSpacing: 0,
              whiteSpace: "nowrap",
              color: activeTab === "user" ? "#063261" : "#8d8d8d",
              transition: "color 300ms ease",
              background: "transparent",
              border: "none",
              outline: "none",
            }}
          >
            User Chat
          </button>

          {/* AI Chat button */}
          <button
            onClick={() => switchTab("ai")}
            className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center z-10 cursor-pointer"
            style={{
              fontFamily: "'Inter', Helvetica",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "15px",
              letterSpacing: 0,
              whiteSpace: "nowrap",
              color: activeTab === "ai" ? "#063261" : "#8d8d8d",
              transition: "color 300ms ease",
              background: "transparent",
              border: "none",
              outline: "none",
            }}
          >
            AI Chat
          </button>
        </div>

        {/* ── Scrollable messages ───────────────────────────────────────── */}
        <div
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto px-[13px] pt-[8px] pb-[6px]"
          style={{ scrollbarWidth: "none" }}
        >
          {activeTab === "user" ? (
            chatMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 400, color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
                  No messages yet.
                </span>
              </div>
            ) : (
              chatMessages.map((msg) =>
                msg.isSelf ? (
                  /* Self message — right-aligned, white bubble, blue text */
                  <div key={msg.id} className="flex flex-col items-end mb-[14px]">
                    <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 500, color: "#ffffff", fontSize: "15px", lineHeight: "15px", marginBottom: "6px" }}>
                      You
                    </span>
                    <div style={{ background: "#ffffff", borderRadius: "15px 0px 15px 15px", padding: "10px 14px", maxWidth: "80%" }}>
                      <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 500, color: "#0d2559", fontSize: "15px", lineHeight: "15px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {msg.text}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Other user message — left-aligned, translucent bubble */
                  <div key={msg.id} className="flex flex-col items-start mb-[14px]">
                    <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 500, color: "#c0cdea", fontSize: "15px", lineHeight: "15px", marginBottom: "6px" }}>
                      {msg.sender}
                    </span>
                    <div style={{ background: "rgba(255,255,255,0.18)", borderRadius: "0px 15px 15px 15px", padding: "10px 14px", maxWidth: "80%" }}>
                      <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 500, color: "#ffffff", fontSize: "15px", lineHeight: "15px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                        {msg.text}
                      </span>
                    </div>
                  </div>
                )
              )
            )
          ) : (
            /* AI Chat placeholder */
            <div className="flex items-center justify-center h-full mt-[40px]">
              <span style={{ fontFamily: "'Inter', Helvetica", fontWeight: 400, color: "rgba(255,255,255,0.55)", fontSize: "14px", textAlign: "center" }}>
                AI Chat coming soon&#8230;
              </span>
            </div>
          )}
        </div>

        {/* ── Zoom-style input row ──────────────────────────────────────────
            Layout (left → right):
              [ photo/image icon (31px) ]  ← same left margin as outer box edge
              [ 1px gray vertical divider ]
              [ text <input> — cursor appears immediately after the divider ]
              [ send button (45×45, dark blue rounded) ]

            Clicking the white bar or divider focuses the hidden <input> so the
            cursor always appears right after the divider line.
        ─────────────────────────────────────────────────────────────────── */}
        <div
          className="flex-shrink-0 flex items-center gap-0 mx-[13px] mb-[13px]"
          style={{ height: "45px" }}
        >
          {/* White input bar (photo icon + divider + text field) */}
          <div
            className="flex flex-1 items-center h-full bg-white rounded-[10.7px] cursor-text overflow-hidden"
            onClick={() => chatInputRef.current?.focus()}
          >
            {/* Hidden file input for image import */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              aria-label="Import image"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // TODO: handle the imported image (e.g. send as message, preview, upload)
                  console.log("Image selected:", file.name);
                }
                e.target.value = "";
              }}
            />
            {/* Photo/image icon — click opens file picker */}
            <div
              className="flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
              style={{ width: "47px", height: "100%", flexShrink: 0 }}
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              title="Import image"
            >
              <img
                className="w-[26px] h-[26px]"
                alt="Attach image"
                src="https://c.animaapp.com/mnc46sj2fe3S0e/img/image.svg"
              />
            </div>

            {/* Gray vertical divider — same left margin as in Zoom chat */}
            <div
              style={{
                width: "1px",
                alignSelf: "stretch",
                background: "#d9d9d9",
                marginTop: "7px",
                marginBottom: "7px",
                flexShrink: 0,
              }}
            />

            {/* Actual text input — cursor appears immediately after the divider */}
            <input
              ref={chatInputRef}
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message…"
              aria-label="Chat message"
              style={{
                flex: 1,
                height: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "0 10px",
                fontFamily: "'Inter', Helvetica",
                fontWeight: 400,
                fontSize: "14px",
                color: "#1a1a1a",
                caretColor: "#375cac",
                lineHeight: "normal",
              }}
            />
          </div>

          {/* Send button — dark blue pill on the right, separated by a small gap */}
          <button
            onClick={sendMessage}
            aria-label="Send message"
            style={{
              width: "45px",
              height: "45px",
              background: "#063261",
              borderRadius: "10.7px",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginLeft: "0px",
              transition: "background 150ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0a4a8f")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#063261")}
          >
            <img className="w-[28px] h-[28px]" alt="Send" src="https://c.animaapp.com/mnc46sj2fe3S0e/img/send.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};
