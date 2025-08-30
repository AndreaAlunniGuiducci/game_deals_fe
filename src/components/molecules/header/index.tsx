import React from 'react';
import styles from "./header.module.scss";

interface HeaderProps {
  title: string;
  links?: { label: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{title}</div>
      <nav className={styles.nav}>
        {/* {links.map((link, index) => (
          <a key={index} href={link.href} className={styles.header}__nav-link">
            {link.label}
          </a>
        ))} */}
      </nav>
    </header>
  );
};

export default Header;
