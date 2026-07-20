import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COMMAND = "> npm run portfolio";
const WELCOME = "Welcome.";

const KEY_LAYOUT = [
  [
    { label: "esc", code: "esc", flex: 1.25, wide: true },
    { label: "1", code: "1", flex: 1 },
    { label: "2", code: "2", flex: 1 },
    { label: "3", code: "3", flex: 1 },
    { label: "4", code: "4", flex: 1 },
    { label: "5", code: "5", flex: 1 },
    { label: "6", code: "6", flex: 1 },
    { label: "7", code: "7", flex: 1 },
    { label: "8", code: "8", flex: 1 },
    { label: "9", code: "9", flex: 1 },
    { label: "0", code: "0", flex: 1 },
    { label: "-", code: "-", flex: 1 },
    { label: "=", code: "=", flex: 1 },
    { label: "backspace", code: "backspace", flex: 2.2, wide: true },
  ],
  [
    { label: "tab", code: "tab", flex: 1.6, wide: true },
    { label: "q", code: "q", flex: 1 },
    { label: "w", code: "w", flex: 1 },
    { label: "e", code: "e", flex: 1 },
    { label: "r", code: "r", flex: 1 },
    { label: "t", code: "t", flex: 1 },
    { label: "y", code: "y", flex: 1 },
    { label: "u", code: "u", flex: 1 },
    { label: "i", code: "i", flex: 1 },
    { label: "o", code: "o", flex: 1 },
    { label: "p", code: "p", flex: 1 },
    { label: "[", code: "[", flex: 1 },
    { label: "]", code: "]", flex: 1 },
    { label: "\\", code: "\\", flex: 1.25, wide: true },
  ],
  [
    { label: "caps", code: "caps", flex: 1.85, wide: true },
    { label: "a", code: "a", flex: 1 },
    { label: "s", code: "s", flex: 1 },
    { label: "d", code: "d", flex: 1 },
    { label: "f", code: "f", flex: 1 },
    { label: "g", code: "g", flex: 1 },
    { label: "h", code: "h", flex: 1 },
    { label: "j", code: "j", flex: 1 },
    { label: "k", code: "k", flex: 1 },
    { label: "l", code: "l", flex: 1 },
    { label: ";", code: ";", flex: 1 },
    { label: "'", code: "'", flex: 1 },
    { label: "enter", code: "enter", flex: 2.25, wide: true },
  ],
  [
    { label: "shift", code: "shift-left", flex: 2.35, wide: true },
    { label: "z", code: "z", flex: 1 },
    { label: "x", code: "x", flex: 1 },
    { label: "c", code: "c", flex: 1 },
    { label: "v", code: "v", flex: 1 },
    { label: "b", code: "b", flex: 1 },
    { label: "n", code: "n", flex: 1 },
    { label: "m", code: "m", flex: 1 },
    { label: ",", code: ",", flex: 1 },
    { label: ".", code: ".", flex: 1 },
    { label: "/", code: "/", flex: 1 },
    { label: "shift", code: "shift-right", flex: 2.75, wide: true },
  ],
  [
    { label: "ctrl", code: "ctrl-left", flex: 1.35, wide: true },
    { label: "fn", code: "fn", flex: 1.1, wide: true },
    { label: "alt", code: "alt-left", flex: 1.2, wide: true },
    { label: "cmd", code: "cmd-left", flex: 1.25, wide: true },
    { label: "space", code: "space", flex: 5.85, wide: true },
    { label: "cmd", code: "cmd-right", flex: 1.25, wide: true },
    { label: "alt", code: "alt-right", flex: 1.2, wide: true },
    { label: "ctrl", code: "ctrl-right", flex: 1.35, wide: true },
  ],
];

const PARTICLE_COUNT = 28;

const Loader = ({ loading }) => {
  const [typedCommand, setTypedCommand] = useState("");
  const [typedWelcome, setTypedWelcome] = useState("");
  const [showLineOne, setShowLineOne] = useState(false);
  const [showLineTwo, setShowLineTwo] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [activeKey, setActiveKey] = useState("");

  const getKeyCode = (char) => {
    if (char === " ") return "space";
    if (char === ">") return "shift-left";
    if (char === "/") return "/";
    if (char === ".") return ".";
    return char.toLowerCase();
  };

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
        id: index,
        left: 14 + (index % 7) * 12,
        top: 30 + (index % 4) * 11,
        x: (index % 2 === 0 ? -1 : 1) * (8 + (index % 5) * 3),
        y: -20 - (index % 6) * 5,
        delay: index * 0.012,
        duration: 0.9 + (index % 4) * 0.12,
      })),
    [],
  );

  useEffect(() => {
    if (!loading) return undefined;

    const timers = [];
    const commandChars = COMMAND.split("");
    const welcomeChars = WELCOME.split("");

    commandChars.forEach((char, index) => {
      timers.push(
        setTimeout(() => {
          setTypedCommand((prev) => prev + char);
          setActiveKey(getKeyCode(char));
        }, index * 28),
      );
    });

    const commandEnd = commandChars.length * 28 + 80;
    timers.push(setTimeout(() => setShowLineOne(true), commandEnd + 40));
    timers.push(setTimeout(() => setShowLineTwo(true), commandEnd + 210));

    welcomeChars.forEach((char, index) => {
      timers.push(
        setTimeout(
          () => {
            setTypedWelcome((prev) => prev + char);
            const keyName = char === "." ? "." : char.toLowerCase();
            setActiveKey(keyName);
          },
          commandEnd + 320 + index * 34,
        ),
      );
    });

    const welcomeEnd = commandEnd + 320 + welcomeChars.length * 34;
    timers.push(setTimeout(() => setActiveKey("enter"), welcomeEnd + 60));
    timers.push(setTimeout(() => setShowFlash(true), welcomeEnd + 100));
    timers.push(setTimeout(() => setShowParticles(true), welcomeEnd + 150));
    timers.push(setTimeout(() => setShowFlash(false), welcomeEnd + 280));
    timers.push(setTimeout(() => setActiveKey(""), welcomeEnd + 360));

    return () => timers.forEach(clearTimeout);
  }, [loading]);

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-100 bg-black text-white"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,169,55,0.08)_0%,rgba(0,0,0,0.7)_36%,rgba(0,0,0,1)_75%)]" />
          <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0,transparent_40%),radial-gradient(circle_at_20%_20%,rgba(212,169,55,0.08)_0,transparent_22%),radial-gradient(circle_at_80%_30%,rgba(212,169,55,0.05)_0,transparent_18%)]" />

          <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-8 sm:py-10">
            <div className="flex w-full max-w-6xl flex-col items-center gap-14 sm:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-3xl rounded-[28px] border border-white/10 bg-[#070707]/95 p-4 sm:p-5 shadow-[0_0_0_1px_rgba(212,169,55,0.08),0_24px_60px_rgba(0,0,0,0.75)] backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/35 font-mono">
                  <span>Developer Session</span>
                  <span>Initializing</span>
                </div>

                <div className="rounded-[22px] border border-amber-400/10 bg-black/80 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="flex items-center justify-center">
                    <div
                      className="relative mx-auto w-full overflow-visible rounded-3xl border border-[#2d2410] bg-linear-to-b from-[#151515] via-[#0e0e0e] to-[#050505] p-4 sm:p-5 shadow-[0_18px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)]"
                      style={{
                        perspective: 1200,
                        width: "min(46vw, 760px)",
                        minWidth: "520px",
                        maxWidth: "760px",
                      }}
                    >
                      <motion.div
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative overflow-visible"
                      >
                        <div className="absolute inset-x-6 top-2 h-px rounded-full bg-linear-to-r from-transparent via-amber-300/35 to-transparent" />
                        <div
                          className="mx-auto flex w-full flex-col gap-2 rounded-[18px] border border-white/10 bg-[#0a0a0a] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                          style={{
                            transform: "translate3d(0,0,0) rotateX(18deg)",
                            transformOrigin: "top center",
                          }}
                        >
                          <div className="grid gap-2">
                            {KEY_LAYOUT.map((row, rowIndex) => (
                              <div
                                key={rowIndex}
                                className="flex w-full items-center gap-2"
                              >
                                {row.map((key) => {
                                  const isActive = activeKey === key.code;
                                  const isWide = !!key.wide;

                                  return (
                                    <motion.button
                                      key={key.code}
                                      type="button"
                                      animate={{
                                        y: isActive ? 5 : 0,
                                        scale: isActive ? 0.98 : 1,
                                        boxShadow: isActive
                                          ? "0 0 0 1px rgba(212,169,55,0.42), 0 6px 14px rgba(0,0,0,0.42), 0 0 18px rgba(212,169,55,0.18)"
                                          : "0 1px 0 rgba(255,255,255,0.06), 0 7px 16px rgba(0,0,0,0.34)",
                                        backgroundColor: isActive
                                          ? "rgba(212,169,55,0.17)"
                                          : "rgba(13,13,13,0.96)",
                                        borderColor: isActive
                                          ? "rgba(212,169,55,0.62)"
                                          : "rgba(255,255,255,0.08)",
                                      }}
                                      transition={{
                                        duration: 0.13,
                                        ease: "easeOut",
                                      }}
                                      className={`relative flex h-11 items-center justify-center rounded-xl border text-[9px] font-mono uppercase tracking-[0.18em] text-white/70 ${isWide ? "px-3" : "px-2"} overflow-hidden`}
                                      style={{
                                        flex: key.flex,
                                        transform: "translate3d(0,0,0)",
                                        background:
                                          "linear-gradient(180deg, rgba(28,28,28,0.98), rgba(7,7,7,0.98))",
                                        borderStyle: "solid",
                                        minWidth: 0,
                                      }}
                                    >
                                      <span className="relative z-10 whitespace-nowrap">
                                        {key.label}
                                      </span>
                                      <span className="pointer-events-none absolute inset-x-1 top-1 h-px rounded-full bg-white/12" />
                                    </motion.button>
                                  );
                                })}
                              </div>
                            ))}
                          </div>
                        </div>

                        {showParticles ? (
                          <div className="pointer-events-none absolute inset-0">
                            {particles.map((particle) => (
                              <motion.span
                                key={particle.id}
                                initial={{ opacity: 0, y: 0, x: 0, scale: 1 }}
                                animate={{
                                  opacity: [0, 0.8, 0],
                                  y: particle.y,
                                  x: particle.x,
                                  scale: [1, 1.15, 0.7],
                                }}
                                transition={{
                                  delay: particle.delay,
                                  duration: particle.duration,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                className="absolute rounded-full bg-amber-300/90 blur-[1px]"
                                style={{
                                  left: `${particle.left}%`,
                                  top: `${particle.top}%`,
                                  width: particle.id % 3 === 0 ? 3 : 2,
                                  height: particle.id % 3 === 0 ? 3 : 2,
                                  boxShadow: "0 0 10px rgba(212,169,55,0.55)",
                                }}
                              />
                            ))}
                          </div>
                        ) : null}

                        {showFlash ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{
                              opacity: [0, 0.75, 0],
                              scale: [0.96, 1, 1.02],
                            }}
                            transition={{ duration: 0.24, ease: "easeOut" }}
                            className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle,rgba(212,169,55,0.35)_0%,transparent_60%)]"
                          />
                        ) : null}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="w-full max-w-3xl font-mono text-[13px] sm:text-[15px] leading-relaxed tracking-normal text-white/90 sm:text-left text-center mt-2 sm:mt-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-0.5 whitespace-pre-wrap">
                    <span className="text-amber-300">&gt;</span>
                    <span>{typedCommand}</span>
                    <span className="ml-0.5 inline-block h-4 w-px bg-amber-300/80 animate-pulse" />
                  </div>

                  <AnimatePresence>
                    {showLineOne ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="text-white/80"
                      >
                        <span className="text-emerald-300">✓</span> Loading UI
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showLineTwo ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="text-white/80"
                      >
                        <span className="text-emerald-300">✓</span> Rendering
                        Experience
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center gap-0.5 whitespace-pre-wrap pt-1 text-[#f6d46b]">
                    <span>{typedWelcome}</span>
                    {typedWelcome.length < WELCOME.length ? (
                      <span className="ml-0.5 inline-block h-4 w-px bg-[#f6d46b]/80 animate-pulse" />
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.45em] text-white/30 text-center">
                Boot sequence complete
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Loader;
