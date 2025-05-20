import Icons from "../Icons";
import type { bodykeys, Props } from "./Dropdown.type";
import styles from './Dropdown.module.scss';
import { useContext, useState } from "react";
import { NotificationProvider } from "../../../context/NotificationContext";
import { copyText } from "../../../utils/copyText";

const Dropdown = (props: Props) => {
  const { header, body } = props;
  const [active, setActive] = useState(false);
  const { setNotif } = useContext(NotificationProvider);

  const handleCopy = (text: string) => {
    copyText(text);

    return setNotif(true);
  }

  return (
    <div className={styles['dropdown']}>
      <header>
        <h5>{header}</h5>
        <Icons icon="chevron-bottom" onClick={() => setActive(!active)} className={active ? styles['rotate-on'] : styles['rotate-off']}  />
      </header>
      <div style={{ display: active ? 'block' : 'none' }}>
        {Object.keys(body).filter((key) => !['isSelf', 'message', 'publicKey'].includes(key)).map((value) => (
          <>
            {
              ['encryptedMessage', 'nonce'].includes(value) ? (
                <span>
                  <p key={value}><strong>{value}: </strong>{body[value as bodykeys]}</p>
                  <Icons icon="copy" onClick={() => handleCopy(body[value as bodykeys] as string)} />
                </span>
              ) : (
                <p key={value}><strong>{value}: </strong>{body[value as bodykeys]}</p>
              )
            }
          </>
        ))}
      </div>
    </div>
  )
}

export default Dropdown;
