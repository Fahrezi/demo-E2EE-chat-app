import React from "react";
import styles from './Input.module.scss';

const Input = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea"> & { minHeight?: number, withoutShadow?: boolean }>((props, ref) => {
  return <textarea className={[styles['input'], props.withoutShadow && styles['input_without-shadow']].filter(Boolean).join(' ')} style={{ minHeight: props.minHeight }} {...props} ref={ref} />
})

export default Input;
