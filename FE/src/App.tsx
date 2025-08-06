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
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;

    try {
      const res = await apiClient.post('/api/convert');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <input type="text" ref={inputRef} onChange={handleChange} />
      </div>
    </>
  );
}

export default App;
