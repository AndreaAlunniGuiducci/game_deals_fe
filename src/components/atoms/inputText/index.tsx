import React from "react";
import styles from "./inputText.module.scss";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputText: React.FC<InputTextProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.inputText}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.field} {...props} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputText;
