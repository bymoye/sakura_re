import styles from "../../styles/ArticleIndex.module.css";
import Article from "./Article";
const ArticleIndex = () => {
  const data = [
    {
      id: 1,
      url: "https://www.baidu.com",
      title: "百度",
      time: "2021-01-01",
      content: "百度一下，你就知道",
      category: "搜索引擎",
      cover:
        "https://fp1.fghrsh.net/2020/01/14/7249e2902b45b4620019519a82db1d2e.jpg!q80.webp",
    },
    {
      id: 2,
      url: "https://www.google.com",
      title: "谷歌",
      time: "2021-01-01",
      content: "谷歌一下，你就知道",
      category: "搜索引擎",
      cover:
        "https://fp1.fghrsh.net/2020/01/14/7249e2902b45b4620019519a82db1d2e.jpg!q80.webp",
    },
  ];
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        {data.map((item) => (
          <Article
            key={item.id}
            title={item.title}
            time={item.time}
            content={item.content}
            category={item.category}
            url={item.url}
            cover={item.cover}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleIndex;
