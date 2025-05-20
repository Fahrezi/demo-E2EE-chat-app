import { useEffect, useState } from "react";
import type { Props } from "./Select.type";
import styles from './Select.module.scss';
import Icons from "../Icons";

const Select = (props: Props) => {
  const { data, placeholder="", onChange } = props;
  const [value, setValue]  = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange(value);
  }, [value]);

  const handleSelect = (value: string) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <div className={styles['select']}>
      <button style={{ color: data.find(item => item.value === value)?.label ? '' : '#757e7e'}} onClick={() => setOpen(!open)}>
        <span>
          {data.find(item => item.value === value)?.label ?? placeholder}
        </span>
        <Icons icon="chevron-bottom" />
      </button>
      {open ? (
        <ul>
          {
            data.map((value, index) => (
              <li key={index} onClick={() => handleSelect(value.value)}>
                {value.label}
              </li>
            ))
          }
        </ul>
      ) : null}
    </div>
  )
}

export default Select;
