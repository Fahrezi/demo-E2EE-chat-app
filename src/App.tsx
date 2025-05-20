import { useState } from 'react';
import './App.scss'
import Chats from './components/elements/Chats'
import type { Data } from './type';
import DropdownList from './components/elements/DropdownList';
import HeaderInfo from './components/elements/HeaderInfo';
import Input from './components/elements/Input';
import Button from './components/elements/Button';
import useCrypto from './hooks/useCrypto';
import ContextIndex from './context';
import DecryptForm from './components/elements/DecryptForm';

function App() {
  const [chats, setChats] = useState<Data[]>([]);
  const [message, setMessage] = useState<{[key in 'kripto' | 'grafi']: string }>({
    kripto: '',
    grafi: ''
  });
  const { publicKey, encryptMessage } = useCrypto();
  const userData = {
    kripto: {
      name: 'Kripto',
      id: 1
    },
    grafi: {
      name: 'Grafi',
      id: 2
    }
  }

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value
    })
  };

  const sendMessage = async (from: 'kripto' | 'grafi') => {
    if (message[from] === '') return;
    
    const to = from === 'kripto' ? 'grafi' : 'kripto';
    const isSelf = from === 'grafi';
    const { encryptedMessage, nonce } = await encryptMessage(from, to, message[from]);

    const data: Data = {
      isSelf,
      message: message[from],
      nonce: nonce,
      publicKey: publicKey[from],
      userId: userData[from].id,
      encryptedMessage: encryptedMessage
    }

    setChats(prevChats => ([...prevChats, data]))
    setMessage(prevMessages => ({...prevMessages, [from]: ''}));
  };

  return (
    <ContextIndex>
      <div className="container">
        <div>
          <DropdownList messages={chats.filter((item) => !item.isSelf)} title="Encrypted Messages" />
          <HeaderInfo header="Kripto" data={{ ...userData['kripto'], 'Public Key': publicKey['kripto']}} />
          <Input style={{ marginBottom: 48 }} placeholder="Enter your message" name="kripto" onChange={handleMessage} value={message.kripto} />
          <Button onClick={() => sendMessage('kripto')}>Send Message</Button>
        </div>
        <div>
          <Chats data={chats} />
          <DecryptForm />
        </div>
        <div>
          <DropdownList messages={chats.filter((item) => item.isSelf)} title="Encrypted Messages" />
          <HeaderInfo header="Grafi" data={{ ...userData['grafi'], 'Public Key': publicKey['grafi']}} />
          <Input style={{ marginBottom: 48 }} placeholder="Enter your message" name="grafi" onChange={handleMessage} value={message.grafi} />
          <Button onClick={() => sendMessage('grafi')}>Send Message</Button>
        </div>
      </div>
    </ContextIndex>
  )
}

export default App;
