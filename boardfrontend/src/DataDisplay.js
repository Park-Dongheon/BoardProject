import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataDisplay = () => {
    const [dataBoard, setDataBoard] = useState([]);
    const [newBoard, setNewBoard] = useState({ title: '', writer: '', content: '', });
    
    useEffect(() => {
        loadBoard();
    }, []);

    // 게시글 목록 조회
    const loadBoard = async () => {
        await fetch('http://localhost:8080/board')
                    .then(resp => {
                        return resp.json();
                    })
                    .then(result => {
                        setDataBoard(result);
                    })
                    .catch(error => {
                        console.error("Error fetching Board:", error);
                    });
    };

    // 게시글 추가
    const handleAddBoard = async () => {
        await fetch('http://localhost:8080/board', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBoard)
        })
                    .then(resp => {
                        return resp.json();
                    })
                    .then(result => {
                        setDataBoard([...dataBoard, result]);
                        setNewBoard({ title: '', writer: '', content: ''});
                    })
                    .catch(error => {
                        console.error("Error fetching Board:", error);
                    })
    };

    const handleInputChange = (event) => {
        setNewBoard({...newBoard, 
            [event.target.name]: event.target.value });
    }

    // 게시글 목록 렌더링
    const renderBoardList = () => {
        return (
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
                    {dataBoard.map(board => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>
                                <Link to={`/board/${board.id}`}>
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.writer}</td>
                            <td>{board.content}</td>
                            <td>{board.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderAddBoardForm = () => {
        return (
            <div>
                <input 
                    type='text' 
                    placeholder='제목' 
                    name='title'
                    value={newBoard.title} 
                    onChange={handleInputChange} />
                <input 
                    type='text'
                    placeholder='작성자'
                    name='writer'
                    value={newBoard.writer}
                    onChange={handleInputChange} />
                <input 
                    type='text'
                    placeholder='내용'
                    name='content'
                    value={newBoard.content}
                    onChange={handleInputChange} />
                <button onClick={handleAddBoard}>등록</button>
            </div>
        )
    }

    return (
        <div align='center'>
            <h2>Data Display</h2>
            <button onClick={() => loadBoard()}>Board</button>
            <div>{renderAddBoardForm()}</div>
            <div>{renderBoardList()}</div>
        </div>
    );
}

export default DataDisplay;