import React from "react";
import styles from './Button.module.scss';

const Button = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>((props, ref) => {
  return <button className={styles['button']} type="button" {...props} ref={ref} />
})

export default Button;
