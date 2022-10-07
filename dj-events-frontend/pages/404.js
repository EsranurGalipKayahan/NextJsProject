import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Layout } from "../components/Layout";
import Link from "next/link";
import styles from "@/styles/NotFound.module.css";

const NotFoundPage = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle size={"40px"} color={"red"} />
          404
        </h1>
        <h4>Sorry, there is nothing here</h4>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
