import { useEffect, useRef } from 'react';
import './styles/App.css';
import { apiClient } from './api/apiClient';

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/');
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <input type="text" ref={inputRef} />
      </div>
    </>
  );
}

export default App;
