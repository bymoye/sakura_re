import React, { useRef, useEffect } from "react";
import styles from "../../styles/Article.module.css";

const Article = ({ title, time, content, category, url, cover, id }) => {
  const articleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.post_list_show);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // 视口中元素的可见度达到 50% 时触发回调函数
    );

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => {
      if (articleRef.current) {
        observer.unobserve(articleRef.current);
      }
    };
  }, []);

  return (
    <article ref={articleRef} className={styles.post_list_thumb} key={id}>
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
