import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const SKILLS = [
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "C",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Nodemon",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodemon/nodemon-original.svg",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg",
  },
  {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  },
  {
  name: "TypeScript",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
  name: "Next.js",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
  name: "Vercel",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
  },
  {
  name: "Gemini",
  logo: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Google%20Gemini%20icon%202025.svg",
  },
];

const ROWS = [
  [
    {
      title: "Programming Languages",
      items: ["Python", "C", "Java"],
    },
    {
      title: "Web Technologies",
      items: ["HTML", "CSS", "JavaScript"],
    },
    {
      title: "Databases & Tools",
      items: ["MySQL", "MongoDB", "Git"],
    },
    {
      title: "Frameworks & Libraries",
      items: ["React.js", "Node.js", "Bootstrap", "Express.js"],
    },
  ],
  [
    {
      title: "Core Concepts",
      items: [
        "Data Structures & Algorithms",
        "Object Oriented Programming",
        "Database Management System",
        "Software Engineering",
        "Explainable AI (XAI)",
      ],
    },
    {
      title: "Soft Skills",
      items: [
        "Teamwork",
        "Problem Solving",
        "Creativity",
        "Adaptability",
        "Communication",
      ],
    },
  ],
];

export default function Skills() {
  const stageRef = useRef(null);

  // Store currently running floating animations
  const animationsRef = useRef([]);

  // Store information about the bubble being dragged
  const dragRef = useRef({
    active: false,
    element: null,
    offsetX: 0,
    offsetY: 0,
  });

  /*
   * ---------------------------------------------------------
   * INITIAL BUBBLE POSITIONING + FLOATING ANIMATION
   * ---------------------------------------------------------
   */
  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const circles = Array.from(
      stage.querySelectorAll(".skill-circle")
    );

    const rect = stage.getBoundingClientRect();

    const placed = [];

    const isOverlapping = (x, y, size) =>
      placed.some((p) => {
        const dx = p.x - x;
        const dy = p.y - y;

        return (
          Math.sqrt(dx * dx + dy * dy) <
          p.size / 2 + size / 2 + 40
        );
      });

    circles.forEach((circle) => {
      const size = circle.offsetWidth;

      let x;
      let y;
      let tries = 0;

      do {
        x = Math.random() * Math.max(0, rect.width - size - 20);
        y = Math.random() * Math.max(0, rect.height - size - 20);

        tries++;
      } while (
        isOverlapping(x, y, size) &&
        tries < 150
      );

      placed.push({
        x,
        y,
        size,
      });

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      /*
       * Create the floating animation.
       *
       * This animation is paused/cancelled when the
       * user starts dragging the bubble.
       */
      const dx = (Math.random() - 0.5) * 100;
      const dy = (Math.random() - 0.5) * 100;

      const animation = circle.animate(
        [
          {
            transform: "translate(0px, 0px)",
          },
          {
            transform: `translate(${dx}px, ${dy}px)`,
          },
        ],
        {
          duration: 5000 + Math.random() * 2000,
          direction: "alternate",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );

      animationsRef.current.push(animation);
    });

    /*
     * Cleanup animations when component is removed.
     */
    return () => {
      animationsRef.current.forEach((animation) => {
        animation.cancel();
      });

      animationsRef.current = [];
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * POINTER DOWN
   * ---------------------------------------------------------
   *
   * Works with:
   * - Mouse
   * - Touch
   * - Stylus
   */
  const handlePointerDown = (event) => {
    const bubble = event.currentTarget;
    const stage = stageRef.current;

    if (!stage) return;

    event.preventDefault();

    const stageRect = stage.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();

    /*
     * Stop the floating animation for this bubble.
     */
    const index = Array.from(
      stage.querySelectorAll(".skill-circle")
    ).indexOf(bubble);

    const animation = animationsRef.current[index];

    if (animation) {
      animation.cancel();
    }

    /*
     * Calculate exactly where inside the bubble
     * the user touched/clicked.
     */
    dragRef.current = {
      active: true,
      element: bubble,
      offsetX:
        event.clientX -
        bubbleRect.left,
      offsetY:
        event.clientY -
        bubbleRect.top,
    };

    bubble.style.zIndex = "1000";
    bubble.style.cursor = "grabbing";

    bubble.classList.add("is-dragging");

    /*
     * Capture pointer so dragging continues even if
     * the pointer temporarily moves outside the bubble.
     */
    bubble.setPointerCapture?.(event.pointerId);
  };

  /*
   * ---------------------------------------------------------
   * POINTER MOVE
   * ---------------------------------------------------------
   */
  const handlePointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag.active || !drag.element) return;

    const stage = stageRef.current;

    if (!stage) return;

    event.preventDefault();

    const bubble = drag.element;
    const stageRect = stage.getBoundingClientRect();

    const bubbleWidth = bubble.offsetWidth;
    const bubbleHeight = bubble.offsetHeight;

    /*
     * Calculate new position.
     */
    let x =
      event.clientX -
      stageRect.left -
      drag.offsetX;

    let y =
      event.clientY -
      stageRect.top -
      drag.offsetY;

    /*
     * Keep the bubble inside the Skills container.
     */
    const maxX = stage.clientWidth - bubbleWidth;
    const maxY = stage.clientHeight - bubbleHeight;

    x = Math.max(0, Math.min(x, maxX));
    y = Math.max(0, Math.min(y, maxY));

    /*
     * Move bubble.
     */
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
  };

  /*
   * ---------------------------------------------------------
   * POINTER UP
   * ---------------------------------------------------------
   */
  const handlePointerUp = (event) => {
    const drag = dragRef.current;

    if (!drag.active || !drag.element) return;

    const bubble = drag.element;

    bubble.releasePointerCapture?.(event.pointerId);

    bubble.style.cursor = "grab";
    bubble.style.zIndex = "10";

    bubble.classList.remove("is-dragging");

    /*
     * Clear drag state.
     */
    dragRef.current = {
      active: false,
      element: null,
      offsetX: 0,
      offsetY: 0,
    };

    /*
     * Restart floating animation from the bubble's
     * new position.
     */
    const stage = stageRef.current;

    if (!stage) return;

    const index = Array.from(
      stage.querySelectorAll(".skill-circle")
    ).indexOf(bubble);

    const dx = (Math.random() - 0.5) * 80;
    const dy = (Math.random() - 0.5) * 80;

    const animation = bubble.animate(
      [
        {
          transform: "translate(0px, 0px)",
        },
        {
          transform: `translate(${dx}px, ${dy}px)`,
        },
      ],
      {
        duration: 5000 + Math.random() * 2000,
        direction: "alternate",
        iterations: Infinity,
        easing: "ease-in-out",
      }
    );

    animationsRef.current[index] = animation;
  };

  return (
    <section
      className="skills-container"
      id="skills"
    >
      {/* Header */}

      <motion.div
        className="skills-header"
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <h2 className="text-5xl text-cyan-400 font-semibold mb-3">
          My Skills
        </h2>

        <div className="w-28 h-[2px] bg-cyan-400 mx-auto mb-6" />

        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          ✨ Technical expertise blended with creativity —
          explore my core competencies below.
        </p>
      </motion.div>

      {/* Floating Skill Bubbles */}

      <motion.div
        className="skills-stage relative mx-auto mb-20"
        ref={stageRef}
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
        style={{
          width: "100%",
          height: "550px",
          borderRadius: "25px",
          background:
            "radial-gradient(circle at 50% 50%, #0a0a0a, #101010)",
          overflow: "hidden",
          boxShadow:
            "inset 0 0 60px rgba(0,255,255,0.07)",
          position: "relative",

          /*
           * IMPORTANT FOR MOBILE DRAGGING
           */
          touchAction: "none",
          userSelect: "none",
        }}
        onPointerMove={handlePointerMove}
      >
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            className="skill-circle"
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: i * 0.08,
              duration: 0.6,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.15,
              boxShadow:
                "0 0 35px 10px rgba(0,255,255,0.6)",
              background:
                "rgba(0,255,255,0.12)",
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "50%",
              position: "absolute",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              background:
                "rgba(0,255,255,0.06)",

              border:
                "1px solid rgba(0,255,255,0.25)",

              backdropFilter: "blur(8px)",

              cursor: "grab",

              transition:
                "box-shadow 0.4s ease, background 0.4s ease",

              /*
               * Prevent browser touch gestures
               * from interfering with dragging.
               */
              touchAction: "none",

              userSelect: "none",
            }}
          >
            <motion.img
              src={s.logo}
              alt={s.name}
              draggable={false}
              style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",

                filter:
                  "drop-shadow(0 0 8px rgba(0,255,255,0.4)) brightness(1.2)",

                marginBottom: "5px",

                pointerEvents: "none",
              }}
              whileHover={{
                filter:
                  "drop-shadow(0 0 12px rgba(0,255,255,0.9)) brightness(1.6)",

                rotate: [0, 6, -6, 0],

                transition: {
                  duration: 0.5,
                },
              }}
            />

            <span
              style={{
                color:
                  "rgba(180,255,255,0.9)",

                fontSize: "13px",

                fontWeight: 500,

                letterSpacing: "0.3px",

                pointerEvents: "none",
              }}
            >
              {s.name}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Table */}

      <div className="skills-table">
        {ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="skills-row"
          >
            {row.map((col, colIndex) => (
              <motion.div
                key={col.title}
                className="skill-box"
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                transition={{
                  duration: 0.6,
                  delay:
                    (rowIndex + colIndex) * 0.1,
                }}
              >
                <h3>{col.title}</h3>

                <ul>
                  {col.items.map((item, i) => (
                    <motion.li
                      key={i}
                      whileHover={{
                        x: 6,
                        color: "#00ffc8",
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}