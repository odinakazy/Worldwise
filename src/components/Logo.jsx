import React from "react";
import styles from "./Logo.module.css";
import Logoimage from "../assets/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <img src={Logoimage} alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
