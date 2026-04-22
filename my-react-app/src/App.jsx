import { useState, useEffect, useRef, useCallback } from "react";

const TEDDY = `(っ◔◡◔)っ ♥`;

function Firework({ x, y, id }) {
  const colors = [
    "#ff6b9d",
    "#ff9de2",
    "#ffb3c6",
    "#ffd6e0",
    "#ff4d8b",
    "#ff85b3",
    "#ffe066",
    "#ff6ec7",
  ];
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * 2 * Math.PI;
    const dist = 60 + Math.random() * 60;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = 6 + Math.random() * 8;
    const shape = Math.random() > 0.5 ? "♥" : "✦";
    return { tx, ty, color, size, shape, delay: Math.random() * 0.2 };
  });

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            fontSize: p.size,
            color: p.color,
            animation: `fireworkParticle 1.2s ease-out ${p.delay}s forwards`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            transform: "translate(-50%, -50%)",
            left: 0,
            top: 0,
            textShadow: `0 0 8px ${p.color}`,
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  );
}

function FloatingHeart({ style }) {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        animation: "floatUp 4s ease-in infinite",
        ...style,
      }}
    >
      ♥
    </div>
  );
}

export default function LoveGame() {
  const [bdaPressed, setBdaPressed] = useState(false);
  const [fireworks, setFireworks] = useState([]);
  const [nunuPos, setNunuPos] = useState({ x: null, y: null });
  const [btnRendered, setBtnRendered] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const fireworkId = useRef(0);
  const [hearts, setHearts] = useState([]);
  const [teddyAnim, setTeddyAnim] = useState(false);

  useEffect(() => {
    const h = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 90}%`,
      animationDelay: `${Math.random() * 4}s`,
      fontSize: `${16 + Math.random() * 18}px`,
      opacity: 0.25 + Math.random() * 0.35,
      color: ["#ff6b9d", "#ff9de2", "#ffb3c6", "#ff4d8b"][
        Math.floor(Math.random() * 4)
      ],
    }));
    setHearts(h);
  }, []);

  const launchFireworks = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const newFws = Array.from({ length: 8 }, (_, i) => ({
      id: fireworkId.current++,
      x: cx + (Math.random() - 0.5) * 200,
      y: cy + (Math.random() - 0.5) * 300,
    }));
    setFireworks((prev) => [...prev, ...newFws]);
    setTimeout(() => {
      setFireworks((prev) =>
        prev.filter((fw) => !newFws.find((n) => n.id === fw.id)),
      );
    }, 1600);
    setBdaPressed(true);
    setTeddyAnim(true);
  }, []);

  const handleNunuMouseEnter = useCallback(() => {
    if (!btnRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const bw = 140;
    const bh = 54;
    let nx = Math.random() * (vw - bw);
    let ny = Math.random() * (vh - bh);
    nx = Math.max(10, Math.min(nx, vw - bw - 10));
    ny = Math.max(10, Math.min(ny, vh - bh - 10));
    setNunuPos({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    if (btnRef.current && nunuPos.x !== null) {
      btnRef.current.style.left = `${nunuPos.x}px`;
      btnRef.current.style.top = `${nunuPos.y}px`;
    }
  }, [nunuPos]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(145deg, #1a0a12 0%, #2d0a1e 40%, #1a0a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Dancing+Script:wght@600&display=swap');

        @keyframes fireworkParticle {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes teddyBounce {
          0%, 100% { transform: scale(1) rotate(-3deg); }
          25% { transform: scale(1.12) rotate(3deg); }
          50% { transform: scale(1.18) rotate(-2deg); }
          75% { transform: scale(1.1) rotate(2deg); }
        }
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 20px #ff6b9d, 0 0 40px #ff4d8b; }
          50% { text-shadow: 0 0 40px #ff9de2, 0 0 80px #ff6b9d, 0 0 100px #ff4d8b; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heartRain {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(20deg); opacity: 0; }
        }
        @keyframes textReveal {
          from { opacity: 0; transform: scale(0.5) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes bdaGlow {
          0%, 100% { box-shadow: 0 0 30px #ff6b9d, 0 0 60px #ff4d8b, inset 0 0 20px rgba(255,107,157,0.2); }
          50% { box-shadow: 0 0 60px #ff9de2, 0 0 120px #ff6b9d, 0 0 180px #ff4d8b, inset 0 0 40px rgba(255,107,157,0.4); }
        }
        @keyframes teddyHug {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          80% { transform: scale(0.95) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Floating background hearts */}
      {hearts.map((h) => (
        <FloatingHeart
          key={h.id}
          style={{
            left: h.left,
            bottom: "-30px",
            fontSize: h.fontSize,
            color: h.color,
            opacity: h.opacity,
            animationDelay: h.animationDelay,
          }}
        />
      ))}

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <Firework key={fw.id} x={fw.x} y={fw.y} id={fw.id} />
      ))}

      {/* Nunu button - floats freely */}
      {!bdaPressed && (
        <button
          ref={btnRef}
          onMouseEnter={handleNunuMouseEnter}
          onTouchStart={handleNunuMouseEnter}
          style={{
            position: "fixed",
            left: nunuPos.x !== null ? nunuPos.x : "20%",
            top: nunuPos.y !== null ? nunuPos.y : "72%",
            zIndex: 1000,
            padding: "14px 32px",
            borderRadius: "50px",
            border: "2px solid rgba(180,100,130,0.5)",
            background: "rgba(60,20,40,0.7)",
            color: "#c07090",
            fontSize: "17px",
            fontFamily: "'Dancing Script', cursive",
            cursor: "not-allowed",
            backdropFilter: "blur(8px)",
            transition:
              "left 0.15s cubic-bezier(.17,.67,.83,.67), top 0.15s cubic-bezier(.17,.67,.83,.67)",
            userSelect: "none",
            pointerEvents: "auto",
            letterSpacing: "1px",
          }}
        >
          🙈 Nunuii
        </button>
      )}

      {/* Main card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          borderRadius: "32px",
          border: "1px solid rgba(255,107,157,0.2)",
          padding: "48px 32px 40px",
          maxWidth: "380px",
          width: "100%",
          textAlign: "center",
          boxShadow:
            "0 20px 80px rgba(255,75,140,0.15), 0 0 0 1px rgba(255,107,157,0.08)",
          animation: "slideIn 0.8s ease-out",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Sparkles */}
        {["10%", "85%", "50%"].map((left, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${10 + i * 25}%`,
              left,
              fontSize: "14px",
              animation: `sparkle ${1.5 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
              color: "#ff9de2",
            }}
          >
            ✦
          </div>
        ))}

        {!bdaPressed ? (
          <>
            {/* Question */}
            <div
              style={{
                fontSize: "42px",
                marginBottom: "8px",
                animation: "pulse 2s ease-in-out infinite",
              }}
            >
              💕
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px",
                fontWeight: "700",
                color: "#ffd6e0",
                marginBottom: "8px",
                letterSpacing: "0.5px",
                lineHeight: 1.4,
                animation: "glow 3s ease-in-out infinite",
              }}
            >
              Whom do you love more?
            </h1>
            <p
              style={{
                color: "rgba(255,180,200,0.5)",
                fontSize: "13px",
                marginBottom: "48px",
                fontStyle: "italic",
                letterSpacing: "1px",
              }}
            >
              choose wisely, darling ♥
            </p>

            {/* Bda Button */}
            <button
              onClick={launchFireworks}
              style={{
                display: "block",
                width: "80%",
                margin: "0 auto 20px",
                padding: "18px 32px",
                borderRadius: "50px",
                border: "none",
                background:
                  "linear-gradient(135deg, #ff4d8b 0%, #ff85b3 50%, #ff6b9d 100%)",
                color: "white",
                fontSize: "20px",
                fontFamily: "'Dancing Script', cursive",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "1.5px",
                animation: "bdaGlow 2s ease-in-out infinite",
                transition: "transform 0.1s",
                position: "relative",
                zIndex: 20,
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.96)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              💖 Bda
            </button>

            <p
              style={{
                color: "rgba(255,150,180,0.35)",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginTop: "28px",
              }}
            >
              (try the other one if you dare 😏)
            </p>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div style={{ animation: "slideIn 0.6s ease-out" }}>
            <div
              style={{
                fontSize: "70px",
                marginBottom: "16px",
                animation:
                  "teddyHug 0.8s cubic-bezier(.17,.67,.83,.67) forwards, teddyBounce 1.5s ease-in-out 0.8s infinite",
                display: "block",
                lineHeight: 1,
              }}
            >
              🧸
            </div>
            <div
              style={{
                fontSize: "26px",
                marginBottom: "12px",
                animation: "pulse 1s ease-in-out infinite",
                letterSpacing: "4px",
              }}
            >
              ♥ ♥ ♥
            </div>

            <h2
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "32px",
                fontWeight: "600",
                background:
                  "linear-gradient(135deg, #ff6b9d, #ffb3c6, #ff4d8b, #ff9de2)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation:
                  "shimmer 3s linear infinite, glow 2s ease-in-out infinite",
                marginBottom: "10px",
                letterSpacing: "1px",
              }}
            >
              Ka Ring Rengah
            </h2>

            <p
              style={{
                color: "rgba(255,180,210,0.75)",
                fontSize: "14px",
                fontStyle: "italic",
                fontFamily: "'Dancing Script', cursive",
                letterSpacing: "1px",
                marginBottom: "20px",
              }}
            >
              Bda loves you endlessly 💕
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                fontSize: "22px",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            >
              {"♥ ♥ ♥ ♥ ♥".split(" ").map((h, i) => (
                <span
                  key={i}
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    display: "inline-block",
                    color: [
                      "#ff6b9d",
                      "#ff9de2",
                      "#ffb3c6",
                      "#ff4d8b",
                      "#ffd6e0",
                    ][i],
                    animation: `pulse ${1 + i * 0.1}s ease-in-out ${i * 0.15}s infinite`,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            <div
              style={{
                marginTop: "28px",
                padding: "12px 20px",
                background: "rgba(255,107,157,0.1)",
                borderRadius: "16px",
                border: "1px solid rgba(255,107,157,0.2)",
              }}
            >
              <p
                style={{
                  color: "#ffb3c6",
                  fontSize: "13px",
                  fontFamily: "'Dancing Script', cursive",
                  letterSpacing: "1px",
                  margin: 0,
                }}
              >
                {TEDDY}
              </p>
              <p
                style={{
                  color: "rgba(255,180,200,0.6)",
                  fontSize: "11px",
                  marginTop: "6px",
                  fontStyle: "italic",
                  letterSpacing: "0.5px",
                }}
              >
                your teddy gives you the biggest hug 🤍
              </p>
            </div>

            <button
              onClick={() => {
                setBdaPressed(false);
                setNunuPos({ x: null, y: null });
                setTeddyAnim(false);
              }}
              style={{
                marginTop: "24px",
                padding: "10px 28px",
                borderRadius: "50px",
                border: "1px solid rgba(255,107,157,0.3)",
                background: "transparent",
                color: "rgba(255,150,180,0.7)",
                fontSize: "13px",
                fontFamily: "'Dancing Script', cursive",
                cursor: "pointer",
                letterSpacing: "1px",
              }}
            >
              play again ♥
            </button>
          </div>
        )}
      </div>

      {/* Bottom sparkle line */}
      <div
        style={{
          marginTop: "24px",
          color: "rgba(255,107,157,0.3)",
          fontSize: "12px",
          letterSpacing: "4px",
          fontFamily: "'Dancing Script', cursive",
        }}
      >
        ✦ made with love ✦
      </div>
    </div>
  );
}
