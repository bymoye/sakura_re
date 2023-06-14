import React from "react";
import styles from "../styles/Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
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
