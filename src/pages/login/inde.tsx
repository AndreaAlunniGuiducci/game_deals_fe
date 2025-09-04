import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../components/atoms/button";
import InputText from "../../components/atoms/inputText";
import { loginUser } from "../../services/services";
import { setLoading } from "../../store/slices/loadingSlice";
import styles from "./login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (username && password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [username, password]);

  return (
    <div className={styles.loginPage}>
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
          dispatch(setLoading(true));
          const data = await loginUser({ username, password });
          dispatch(setLoading(false));
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
