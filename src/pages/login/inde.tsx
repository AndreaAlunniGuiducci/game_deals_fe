import { useEffect, useState } from "react";
import Button from "../../components/atoms/button";
import InputText from "../../components/atoms/inputText";
import { loginUser } from "../../services/services";
import styles from "./login.module.scss";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/organisms/loader";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (username && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, password]);

  return (
    <div className={styles.loginPage}>
      {loader && <Loader />}
      <h2>Login</h2>
      <div className={styles.inputWrapper}>
        <InputText
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={loginError}
        />
      </div>
      <p>
        You don't have an account? Register <a href="/register">here</a>
      </p>
      <Button
        onClick={async () => {
          setLoader(true);
          const data = await loginUser({ username, password });
          setLoader(false);
          if (data?.error) {
            setLoginError(data.error);
            return;
          } else {
            navigate("/");
          }
        }}
        disabled={buttonDisabled}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
