import React from "react";
import styles from "../../styles/Article.module.css";
const Article = ({ title, time, content, category, url, cover, id }) => {
  return (
    <article
      className={[styles.post_list_show, styles.post_list_thumb].join(" ")}
      key={id}
    >
      <div className={styles.post_thumb}>
        <img
          src={cover}
          alt={title}
          className={styles.post_thumb_img}
          loading="lazy"
        />
      </div>
      <div className={styles.post_content_wrap}>
        <div className="title">{title}</div>
        <div className="time">{time}</div>
        <div className="content">{content}</div>
        <div className="category">{category}</div>
        <div className="url">{url}</div>
      </div>
    </article>
  );
};

export default Article;
