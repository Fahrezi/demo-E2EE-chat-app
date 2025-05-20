import { createContext, useEffect, useState } from "react";
import styles from './NotificationContext.module.scss';

type NotificationContextType = {
  notif: boolean;
  setNotif: React.Dispatch<React.SetStateAction<boolean>>
}

const NotificationProvider = createContext<NotificationContextType>({
  notif: false,
  setNotif: () => {}
});

const NotificationContext = ({ children }: { children: React.ReactNode }) => {
  const [notif, setNotif] = useState(false);

  useEffect(() => {
    if (notif) {
      setNotifToFalse()
    }
  }, [notif]);

  const setNotifToFalse = () => {
    return setTimeout(() => {
        setNotif(false);
        console.log('notif set to false')
      }, 3000);
  }

  return (
    <NotificationProvider.Provider value={{ notif, setNotif }}>
      <div className={styles['notification-context']}>
        <header aria-label={notif ? 'visible' : 'hidden'}>
          <h3>Text is copied !</h3>
        </header>
        {children}
      </div>
    </NotificationProvider.Provider>
  )
};

export { NotificationProvider, NotificationContext};
