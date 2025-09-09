import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../../utils/deleteUser";
import { getUsername } from "../../../utils/getJwt";
import { routePath } from "../../../utils/routePath";
import Button from "../../atoms/button";
import styles from "./header.module.scss";

interface HeaderProps {
  isLoggedIn?: boolean;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, title }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [userBannerToggle, setUserBannerToggle] = useState(false);

  useEffect(() => {
    const username = getUsername();
    if (username) setUsername(username);
  }, [isLoggedIn]);

  return (
    <header
      className={`${styles.header} ${isLoggedIn ? "" : styles.anonymous}`}
    >
      <div className={styles.logo} onClick={() => navigate(routePath.home)}>
        {title}
      </div>
      {isLoggedIn && username && (
        <div className={styles.userContainer}>
          <div
            className={styles.userBanner}
            onClick={() => {
              setUserBannerToggle(!userBannerToggle);
            }}
          >
            {username[0].toUpperCase()}
          </div>
          {userBannerToggle && (
            <div className={styles.userDetail}>
              <p>{username}</p>
              <Button
                variant="secondary"
                onClick={() => {
                  deleteUser();
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
