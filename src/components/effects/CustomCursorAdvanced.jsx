import { useEffect, useRef } from "react";

/**
 * CustomCursorAdvanced
 * -------------------------------------------------------------
 * A "scanner reticle" cursor built for the ARCHIVES / HJ.DEV look:
 * a thin amber ring that trails the pointer, and — on hovering any
 * interactive element — the ring dissolves into four HUD corner
 * brackets that snap to that element's bounding box, like a
 * targeting system locking onto a card. Click gives a short
 * amber ripple instead of a generic scale-down.
 *
 * Drop-in replacement for the previous CustomCursorAdvanced.
 * Swap ACCENT below to match your theme token if you have one
 * (e.g. var(--accent-gold)).
 */

const ACCENT = "#f2b632"; // archive-terminal amber, matches the site's active-tab/eyebrow color
const DOT_SIZE = 6;
const RING_SIZE = 34;
const BRACKET_SIZE = 14; // length of each corner bracket arm
const BRACKET_GAP = 10; // spacing between hovered element edge and bracket

const lerp = (start, end, factor) => start + (end - start) * factor;

const CustomCursorAdvanced = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rippleRef = useRef(null);
  const bracketRefs = useRef([]); // TL, TR, BR, BL

  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const current = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const velocity = useRef({ x: 0, y: 0 });

  const hovering = useRef(false);
  const hoveredElement = useRef(null);
  const morph = useRef(0); // 0 = ring, 1 = fully locked brackets, animated with lerp

  useEffect(() => {
    if (window.innerWidth < 768 || "ontouchstart" in window) {
      return undefined;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    const brackets = bracketRefs.current;

    if (!dot || !ring || !ripple || brackets.some((b) => !b)) return undefined;

    document.body.style.cursor = "none";

    //----------------------------------
    // Mouse position + visibility
    //----------------------------------

    const handleMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const setVisible = (visible) => {
      const opacity = visible ? "1" : "0";
      dot.style.opacity = opacity;
      ring.style.opacity = opacity;
    };

    const hide = () => setVisible(false);
    const show = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    //----------------------------------
    // Hover detection
    //----------------------------------

    const interactiveSelector = `
      a,
      button,
      input,
      textarea,
      select,
      [role='button'],
      .cursor-hover
    `;

    const handlePointerOver = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (!target) return;
      hovering.current = true;
      hoveredElement.current = target;
    };

    const handlePointerOut = (e) => {
      const target = e.target.closest(interactiveSelector);
      if (target && target === hoveredElement.current) {
        hovering.current = false;
        hoveredElement.current = null;
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    //----------------------------------
    // Click: amber ripple instead of scale
    //----------------------------------

    const triggerRipple = (x, y) => {
      ripple.style.transition = "none";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.opacity = "1";
      ripple.style.transform = "translate(-50%, -50%) scale(0.3)";

      // Force reflow so the next transition actually runs
      void ripple.offsetWidth;

      ripple.style.transition = "transform .5s cubic-bezier(.16,1,.3,1), opacity .5s ease";
      ripple.style.transform = "translate(-50%, -50%) scale(1.6)";
      ripple.style.opacity = "0";
    };

    const down = (e) => {
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(0.6)`;
      triggerRipple(e.clientX, e.clientY);
    };

    const up = () => {
      // scale is restored on the very next animate() tick
    };

    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    //----------------------------------
    // Animation loop
    //----------------------------------

    let frame;

    const animate = () => {
      current.current.x = lerp(current.current.x, mouse.current.x, 0.16);
      current.current.y = lerp(current.current.y, mouse.current.y, 0.16);

      velocity.current.x = mouse.current.x - current.current.x;
      velocity.current.y = mouse.current.y - current.current.y;

      const targetMorph = hovering.current && hoveredElement.current ? 1 : 0;
      morph.current = lerp(morph.current, targetMorph, 0.18);

      dot.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;

      if (hovering.current && hoveredElement.current) {
        const rect = hoveredElement.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        current.current.x = lerp(current.current.x, centerX, 0.1);
        current.current.y = lerp(current.current.y, centerY, 0.1);

        // Ring shrinks away as the brackets take over
        const ringScale = 1 - morph.current;
        ring.style.opacity = `${ringScale}`;
        ring.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%) scale(${0.4 + ringScale * 0.6})`;

        const halfW = Math.min(rect.width / 2 + BRACKET_GAP, 140);
        const halfH = Math.min(rect.height / 2 + BRACKET_GAP, 90);

        // Corners lock to the element's box, easing in from the ring's position
        const corners = [
          { x: centerX - halfW, y: centerY - halfH, rotate: 0 }, // TL
          { x: centerX + halfW, y: centerY - halfH, rotate: 90 }, // TR
          { x: centerX + halfW, y: centerY + halfH, rotate: 180 }, // BR
          { x: centerX - halfW, y: centerY + halfH, rotate: 270 }, // BL
        ];

        corners.forEach((c, i) => {
          const el = brackets[i];
          const bx = lerp(current.current.x, c.x, morph.current);
          const by = lerp(current.current.y, c.y, morph.current);
          el.style.opacity = `${morph.current}`;
          el.style.transform = `translate3d(${bx}px, ${by}px, 0) rotate(${c.rotate}deg) scale(${0.5 + morph.current * 0.5})`;
        });
      } else {
        ring.style.opacity = "1";
        ring.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
        brackets.forEach((el) => {
          el.style.opacity = `${morph.current}`;
        });
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, []);

  const bracketStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: `${BRACKET_SIZE}px`,
    height: `${BRACKET_SIZE}px`,
    pointerEvents: "none",
    zIndex: 9998,
    opacity: 0,
    willChange: "transform, opacity",
    borderTop: `2px solid ${ACCENT}`,
    borderLeft: `2px solid ${ACCENT}`,
    filter: `drop-shadow(0 0 4px ${ACCENT}aa)`,
  };

  return (
    <>
      {/* Ambient reticle ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: `${RING_SIZE}px`,
          height: `${RING_SIZE}px`,
          borderRadius: "999px",
          border: `1px solid ${ACCENT}66`,
          boxShadow: `inset 0 0 8px ${ACCENT}22, 0 0 14px ${ACCENT}22`,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          willChange: "transform, opacity",
          transform: "translate(-50%, -50%)",
          transition: "opacity .25s ease",
        }}
      >
        {/* faint crosshair ticks so it reads as a scanner, not a plain ring */}
        <span
          style={{
            position: "absolute",
            top: "-4px",
            left: "50%",
            width: "1px",
            height: "4px",
            background: `${ACCENT}99`,
            transform: "translateX(-50%)",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-4px",
            left: "50%",
            width: "1px",
            height: "4px",
            background: `${ACCENT}99`,
            transform: "translateX(-50%)",
          }}
        />
      </div>

      {/* Four HUD corner brackets, hidden until a target is locked */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => (bracketRefs.current[i] = el)}
          style={bracketStyle}
        />
      ))}

      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "999px",
          border: `1.5px solid ${ACCENT}`,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* Core dot, always sharp and instant */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: `${DOT_SIZE}px`,
          height: `${DOT_SIZE}px`,
          borderRadius: "999px",
          background: ACCENT,
          boxShadow: `0 0 6px ${ACCENT}, 0 0 14px ${ACCENT}66`,
          willChange: "transform",
          transition: "opacity .2s ease",
        }}
      />
    </>
  );
};

export default CustomCursorAdvanced;