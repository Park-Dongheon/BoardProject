import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BoardDetail = () => {
    const { id } = useParams();
    const [board, setBoard] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoard = async () => {
            await fetch(`http://localhost:8080/board/${id}`)
                        .then(resp => {
                            return resp.json();
                        })
                        .then(result => {
                            setBoard(result);
                        })
                        .catch(error => {
                            console.error('Error fetching Board:', error);
                        });
        };

        fetchBoard();
    }, [id]);

    const handleDeleteBoard = async (id) => {
        await fetch(`http://localhost:8080/board/${id}`,{
            method: 'DELETE',
        })
                    .then(resp => {
                        return resp.json();
                    })
                    .then(result => {
                        navigate('/');
                    })
                    .catch(error => {
                        console.error('게시글 삭제 오류: ', error);
                    })
    }


    return (
        <div align='center'>
            {board ? (
                <div>
                    <table align='center'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>TITLE</th>
                                <th>WRITER</th>
                                <th>CONTENT</th>
                                <th>CREATEDATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{board.id}</td>
                                <td>{board.title}</td>
                                <td>{board.writer}</td>
                                <td>{board.content}</td>
                                <td>{board.createDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={() => navigate(`/board/${id}/edit`)}>
                        수정
                    </button>
                    <button onClick={() => handleDeleteBoard(board.id)}>
                        삭제
                    </button>
                    <button onClick={() => navigate(`/`)}>
                        뒤로가기
                    </button>
                </div>
            ) : (
                <p>게시글을 찾을 수 없습니다.</p>
            )}
        </div>
    );

};

export default BoardDetail;