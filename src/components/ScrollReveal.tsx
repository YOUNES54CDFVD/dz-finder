import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "zoom";
  delay?: number;
};

const getVariants = (direction: Props["direction"]) => {
  const common = { opacity: 0 };
  switch (direction) {
    case "left":
      return { initial: { ...common, x: -40 }, animate: { opacity: 1, x: 0 } };
    case "right":
      return { initial: { ...common, x: 40 }, animate: { opacity: 1, x: 0 } };
    case "up":
      return { initial: { ...common, y: 40 }, animate: { opacity: 1, y: 0 } };
    case "down":
      return { initial: { ...common, y: -40 }, animate: { opacity: 1, y: 0 } };
    case "zoom":
      return { initial: { ...common, scale: 0.9 }, animate: { opacity: 1, scale: 1 } };
    default:
      return { initial: common, animate: { opacity: 1 } };
  }
};

const ScrollReveal = ({ children, direction = "up", delay = 0 }: Props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start({ ...getVariants(direction).animate, transition: { duration: 0.6, delay } });
    }
  }, [inView, controls, direction, delay]);

  return (
    <motion.div
      ref={ref}
      initial={getVariants(direction).initial}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
