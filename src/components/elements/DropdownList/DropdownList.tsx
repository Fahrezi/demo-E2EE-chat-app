import Dropdown from "../Dropdown/Dropdown";
import type { Props } from "./DropdownList.type";
import styles from './DropdownList.module.scss';

const DropdownList = (props: Props) => {
  const { title, messages } = props; 

  return (
    <div className={styles['dropdown-list']}>
      <header>
        <h3>{title}</h3>
      </header>
      <section style={{ borderColor: messages.length === 0 ? '#cdcdcd' : '' }}>
        {
          messages.length > 0 ? (
            messages.map((message) => (
              <Dropdown header={message.message} body={message} />
            ))
          ) : (
            <h3 style={{ textAlign: 'center', marginBottom: 8, fontWeight: 400 }}>
              Encrypted Messages will show here!
            </h3>
          )
        }
      </section>
    </div>
  )
}

export default DropdownList;
