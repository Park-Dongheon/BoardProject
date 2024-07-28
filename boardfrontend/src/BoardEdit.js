import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const BoardEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState();

    useEffect(() => {
        // 게시글 정보 가져오기
        const fetchBoard = async () => {
            await fetch(`http://localhost:8080/board/${id}`)
                        .then(resp => {
                            return resp.json();
                        })
                        .then(result => {
                            setBoard(result);
                        })
                        .catch(error => {
                            console.error('Error fetching Board: ', error);
                        })
        }

        fetchBoard();
    }, [id]);

    const handleUpdateBoard = async (e) => {
        e.preventDefault();
        // 수정된 데이터를 백엔드로 전송하고, 성공하면 목록 페이지로 이동
        await fetch(`http://localhost:8080/board/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        })
                    .then(resp => {
                        return resp.json();
                    })
                    .then(result => {
                        navigate(-1);
                    })
                    .catch(error => {
                        console.error('게시글 수정 오류: ', error)
                    })
    };

    return (
        <div className="flex items-center justify-center">
            {board ? (
                <form 
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleUpdateBoard}>
                    <div className="mb-4 items-center">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            제목
                        </label>
                        <input
                            className="border rounded w-full py-2 px-3 text-gray-700 " 
                            type='text' 
                            value={board.title} 
                            onChange={(e) => setBoard({ ...board, title: e.target.value })} />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            내용
                        </label>
                        <textarea
                            className="border rounded w-full py-2 px-3 text-gray-700 h-32"
                            value={board.content}
                            onChange={(e) => setBoard({ ...board, content: e.target.value })} />             
                    </div>
                    <div className="flex items-center justify-center">
                        <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type='submit'>수정</button>
                        <button onClick={() => navigate(`/board/${id}`)}>뒤로가기</button>        
                    </div>
                </form>
            ) : (
                <p>게시글을 찾을 수 없습니다.</p>
            )}
        </div>
    );

}

export default BoardEdit;