import { useEffect, useRef } from "react";
import styles from "@/styles/Navigation.module.css";
import debounce from "./utils/debounce";

const Navigation = () => {
  const navRef = useRef(null); // 获取 DOM 节点

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY; // 获取滚动位置
      if (scrollPosition > 20) {
        navRef.current.classList.add(styles.ceil_nav);
      } else {
        navRef.current.classList.remove(styles.ceil_nav);
      }
    };

    const handleScroll = debounce(updateProgress, 100);

    window.addEventListener("scroll", handleScroll); // 监听页面滚动事件

    return () => {
      window.removeEventListener("scroll", handleScroll); // 清除事件监听
    };
  });
  return (
    <nav ref={navRef} className={styles.nav}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/users">Users</a>
        </li>
      </ul>
      <div className={styles.login}>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
};

export default Navigation;
