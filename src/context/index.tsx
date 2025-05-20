import { ModalContext } from "./ModalContext";
import { NotificationContext } from "./NotificationContext";

const ContextIndex = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContext>
      <NotificationContext>
        {children}
      </NotificationContext>
    </ModalContext>
  )
}

export default ContextIndex;
