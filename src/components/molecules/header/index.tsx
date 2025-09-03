import React from "react";
import styles from "./header.module.scss";

interface HeaderProps {
  isLoggedIn?: boolean;
  title: string;
  links?: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, title, links }) => {
  return (
    <header
      className={`${styles.header} ${isLoggedIn ? "" : styles.anonymous}`}
    >
      <div className={styles.logo}>{title}</div>
      {isLoggedIn && (
        <nav className={styles.nav}>
          {/* {links.map((link, index) => (
          <a key={index} href={link.href} className={styles.header}__nav-link">
            {link.label}
          </a>
        ))} */}
        </nav>
      )}
    </header>
  );
};

export default Header;
