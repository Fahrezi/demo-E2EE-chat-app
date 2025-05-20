import Icons from "../Icons";
import type { Props } from "./HeaderInfo.type";
import styles from './HeaderInfo.module.scss';
import { ModalProvider } from "../../../context/ModalContext";
import { useContext } from "react";

const HeaderInfo = (props: Props) => {
  const { header, data } = props;
  const { setModal } = useContext(ModalProvider);

  const checkInfo = () => {
    setModal({
      title: header,
      description: (
        <>
          {
            Object.keys(data).map((value) => (
              <>
                <h2 key={value}>{value}:</h2>
                <p>{data[value]}</p>
              </>
            ))
          }
        </>
      ),
      isShow: true 
    });
  }

  return (
    <div className={styles['header-info']}>
      <h2>{header}</h2>
      <Icons icon="info" fill="#9CFF97" onClick={checkInfo}/>
    </div>
  )
}

export default HeaderInfo;
