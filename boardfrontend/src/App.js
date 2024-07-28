import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataDisplay from './DataDisplay';
import BoardDetail from './BoardDetail'; // 상세보기 컴포넌트
import BoardEdit from './BoardEdit';     // 수정 페이지 컴포넌트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< DataDisplay />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path='/board/:id/edit' element={<BoardEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
