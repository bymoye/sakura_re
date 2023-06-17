import styles from "@/styles/Scrollbar.module.css";
import { useEffect, useState } from "react";
const Scrollbar = () => {
  const [color, setColor] = useState("#00BCD4");
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const colorMap = new Map([
      [20, "#50bcb6"],
      [40, "#00BCD4"],
      [60, "#85c440"],
      [80, "#FF0000"],
      [100, "#5aaadb"],
    ]);

    const getNearestKey = (percent: number) => {
      let nearestKey = 100;
      for (const key of colorMap.keys()) {
        if (percent < key) {
          nearestKey = key;
          break;
        }
      }
      return nearestKey;
    };

    let animationFrameId = null;

    const handleScroll = () => {
      if (animationFrameId) {
        return; // 防止重复调度
      }

      const updateProgress = () => {
        const scrollPosition = window.scrollY;
        const scrollHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;

        const scrollPercent =
          (scrollPosition / (scrollHeight - windowHeight)) * 100;
        const nearestKey = getNearestKey(scrollPercent);

        setWidth(scrollPercent);
        setColor(colorMap.get(nearestKey));

        animationFrameId = null;
      };

      const requestUpdate = () => {
        animationFrameId = requestAnimationFrame(() => {
          updateProgress();
        });
      };
      requestUpdate();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <div
      className={styles.scrollbar}
      style={{
        backgroundColor: color,
        width: `${width}%`,
      }}
    ></div>
  );
};

export default Scrollbar;
