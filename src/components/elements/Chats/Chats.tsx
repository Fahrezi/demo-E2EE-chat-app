import styles from './Chats.module.scss';
import type { Props } from "./Chats.type";

const Chats = ({ data }: Props) => {
  return (
    <div className={styles['chats']}>
      <header>
        <h2>Conversation</h2>
      </header>
      <section>
        {
          data.length > 0 ? (
            data.map((item, index) => {
              return (
                <div key={index} aria-label={item.isSelf ? 'right' : 'left'}>
                  <p>{item.message}</p>
                </div>
              )
            })
          ) : (
          <>
            <h2 style={{ textAlign: 'center', marginBottom: 8 }}>No Messages</h2>
            <p style={{ textAlign: 'center', margin: 0, marginBottom: 8 }}>Start Chat to see Messages</p>
          </>
          )
        }
      </section>
    </div>
  )
}

export default Chats
