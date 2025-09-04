import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/atoms/button";
import InputText from "../../components/atoms/inputText";
import { registerUser } from "../../services/services";
import styles from "./register.module.scss";
import { setLoading } from "../../store/slices/loadingSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonDisableed, setButtonDisabled] = useState(true);
  const [registerError, setRegisterError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (
      username &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      setButtonDisabled(false);
    } else if (confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords don't match");
    } else {
      setButtonDisabled(true);
    }
  }, [username, password, confirmPassword]);

  return (
    <div className={styles.registerPage}>
      <h2>Register</h2>
      <div className={styles.inputWrapper}>
        <InputText
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={registerError}
        />
        <InputText
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputText
          label="Password"
          placeholder="Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={passwordError}
        />
      </div>
      <p>
        Already have an account? Login <a href="/login">here</a>
      </p>
      <Button
        onClick={async () => {
          dispatch(setLoading(true));
          const register = await registerUser({ username, password });
          dispatch(setLoading(false));
          setRegisterError(register || "");
        }}
        disabled={buttonDisableed}
      >
        Register
      </Button>
    </div>
  );
};

export default Register;
