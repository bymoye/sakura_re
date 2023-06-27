import { useEffect, useState } from "react";
import styles from "@/styles/ToTop.module.css";
import debounce from "components/utils/debounce";
const ToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if ((document.documentElement.scrollTop || document.body.scrollTop) > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    toggleVisibility();
    const handleScroll = debounce(toggleVisibility, 300);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      className={styles.go_top}
      style={{
        transform: isVisible ? "scale(1)" : "scale(0)",
      }}
    >
      <i className={styles.back_top_svg} />
    </div>
  );
};

export default ToTop;
