import { createContext, useState } from "react";
import styles from './ModalContext.module.scss';
import Button from "../../components/elements/Button";

type ModalContextType = {
  modal: Modal;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}

type Modal = {
  title: string;
  description: React.ReactNode | null;
  isShow: boolean;
}

const ModalProvider = createContext<ModalContextType>({
  modal: {
    title: '',
    description: null,
    isShow: false
  },
  setModal: () => {}
});

const ModalContext = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<Modal>({
    title: '',
    description: null,
    isShow: false
  });
  return (
    <ModalProvider.Provider value={{ modal, setModal }}>
      {modal.isShow ? (
        <div className={styles['modal-context']}> 
          <section>
            <header>
              <h3>{modal.title}</h3>
            </header>
            <div>
              {modal.description}
            </div>
            <Button onClick={() => setModal({ title: '', description: null, isShow: false })}>Close</Button>
          </section>
        </div>
      ) : null}
      {children}
    </ModalProvider.Provider>
  )
};

export { ModalProvider, ModalContext };
