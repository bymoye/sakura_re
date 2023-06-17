import React from "react";
import SiteCover from "../components/Cover";
import Layout from "../components/Layout/Layout";
import ArticleIndex from "../components/article_index";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <SiteCover></SiteCover>
      <ArticleIndex></ArticleIndex>
    </Layout>
  );
}
