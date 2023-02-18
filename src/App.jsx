import './App.css';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [value, setValue] = useState('');


  return (
    <div className="App">
      <div id="contBtn">
        <Button variant="outlined"  disabled={modalActive}  value="Москва" onClick={(e) => {setValue(e.target.value); setModalActive(true)}}>Позвонить в Москву</Button>
        <Button variant="outlined" disabled={modalActive} value="Санкт-Петербург" onClick={(e)=> {setValue(e.target.value); setModalActive(true)}}>Позвонить в Санкт-Петербург</Button>
      </div>
        <Modal value={value} active={modalActive} setActive={setModalActive} />
    </div>
  );
}

export default App;
