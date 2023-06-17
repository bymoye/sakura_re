import React from "react";
import Head from "next/head";
import Navigation from "../Navigation";
import styles from "@/styles/Layout.module.css";
import SvgBackground from "./SvgBackground";
import Scrollbar from "./Scrollbar";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sakura_re</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Scrollbar />
      <Navigation />
      <main>
        <SvgBackground />
        {children}
      </main>
      {/* footer */}
    </div>
  );
};

export default Layout;
