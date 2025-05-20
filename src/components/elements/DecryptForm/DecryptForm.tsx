import { useState } from 'react';
import Button from '../Button';
import styles from './DecryptForm.module.scss';
import type { Data, Party } from './DecryptForm.test';
import Select from '../Select';
import Input from '../Input';
import useCrypto from '../../../hooks/useCrypto';

const DecryptForm = () => {
  const [isOpenForm, SetIsOpenForm] = useState(false);
  const [data, setData] = useState<Data>({
    encryptedMessage: '',
    from: '',
    to: '',
    nonce: ''
  });
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const { decryptMessage } = useCrypto();

  const dataSelect = [
    { label: 'Kripto', value: 'kripto' },
    { label: 'Grafi', value: 'grafi' }
  ];

  const handleMessage = (type: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      [type]: value
    }))
  };

  const handleSubmit = async () => {
    const decryptedMessage = await decryptMessage(
      data.from as Party,
      data.to as never,
      data.encryptedMessage,
      data.nonce
    );
  
    setDecryptedMessage(decryptedMessage);
  }

  return (
    <>
      {isOpenForm ? (
        <form className={styles['form']} onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}>
          <h2>Decrypt Message</h2>
          <Select placeholder="Siapa yang mengirim" data={dataSelect} onChange={(value) => handleMessage('from', value)} />
          <Select placeholder="Siapa yang menerima" data={dataSelect.filter(item => item.value !== data.from)} onChange={(value) => handleMessage('to', value)} />
          <Input name="noonce" withoutShadow placeholder='Nonce' minHeight={80} onChange={(event) => handleMessage('nonce', event.target.value)} />
          <Input name="message" withoutShadow placeholder="Pesan Dienkripsi" minHeight={80} onChange={(event) => handleMessage('encryptedMessage', event.target.value)} />
          {decryptedMessage ? <p>{decryptedMessage}</p> : ''}
          <div aria-label="button-container">
            <Button className={[styles['button'], styles['button-submit']].filter(Boolean).join(' ')} type="submit">Decrypt Message</Button>
            <Button className={styles['button']} type="button" onClick={() => SetIsOpenForm(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <Button className={styles['button']} onClick={() => SetIsOpenForm(true)}>
          Open Decrypt Form
        </Button>
      )}
    </>
  )
}

export default DecryptForm;
