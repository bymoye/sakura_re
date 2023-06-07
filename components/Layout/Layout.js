import React from "react";
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Navigation from "../Navigation";
import styles from "../../styles/Layout.module.css";
import SvgBackground from "./background";
const Layout = ({ children }) => {
  const [shouldAddStyle, setShouldAddStyle] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // 获取滚动位置
      // 根据滚动位置来判断是否添加样式
      if (scrollPosition > 20) {
        setShouldAddStyle(true);
      } else {
        setShouldAddStyle(false);
      }
    };

    window.addEventListener("scroll", handleScroll); // 监听页面滚动事件

    return () => {
      window.removeEventListener("scroll", handleScroll); // 清除事件监听
    };
  }, []);

  // svgBackground();

  let containerClassName = ""; // 初始类名

  if (shouldAddStyle) {
    containerClassName += ` ${styles.otherClass}`; // 根据 shouldAddStyle 状态拼接额外的类名
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main id="target" className={containerClassName}>
        <SvgBackground />
        {children}
      </main>
      {/* 可以在这里添加页脚组件 */}
    </div>
  );
};

export default Layout;
