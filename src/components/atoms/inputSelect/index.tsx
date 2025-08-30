import React from "react";
import styles from "./inputSelect.module.scss";

interface Option {
  value: string;
  label: string;
}

interface InputSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

const InputSelect: React.FC<InputSelectProps> = ({
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputSelect}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={styles.field} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputSelect;
