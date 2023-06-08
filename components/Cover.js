import styles from "../styles/SiteCover.module.css";
const SiteCover = () => {
  return (
    <figure className={styles.site_cover}>
      <div className={styles.focus_info}>
        <div>
          <img
            src="https://www.nazo.run/wp-content/uploads/2022/03/illust_65428259_20171016_002622-scaled-e1648370671156.jpg"
            className={styles.avatar}
          />
        </div>
        <div className={styles.focus_info_text}>沉淪在無盡的深淵中...</div>
      </div>
    </figure>
  );
};

export default SiteCover;
