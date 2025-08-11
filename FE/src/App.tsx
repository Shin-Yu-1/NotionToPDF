import { useEffect, useState } from 'react';
import './styles/App.css';
import { apiClient } from './api/apiClient';

function App() {
  const [notionUrl, setNotionUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient.get('/');
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotionUrl(e.target.value);
  };

  const handleClick = async () => {
    if (!notionUrl) return;

    try {
      const res = await apiClient.post(
        '/api/convert',
        {
          data: { notionUrl },
        },
        { responseType: 'blob' }
      );

      if (res.data) {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);

        // a 태그 만들어 다운로드 처리
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.pdf'; // 저장할 파일명
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      }
    } catch {
      alert('PDF 생성을 할 수 없습니다.');
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Notion → PDF 변환기</h1>
      <p className="subtitle">Notion 페이지 URL을 입력하고 PDF로 변환하세요.</p>

      <div className="form-group">
        <input type="text" onChange={handleChange} className="input" />
        <button onClick={handleClick} className="button">
          변환하기
        </button>
      </div>
    </div>
  );
}

export default App;
