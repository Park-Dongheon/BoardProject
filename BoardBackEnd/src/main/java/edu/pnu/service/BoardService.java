package edu.pnu.service;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.pnu.domain.Board;
import edu.pnu.persistence.BoardRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	private final BoardRepository boardRepo;
	
	public List<Board> getBoards() {
		return boardRepo.findAll();
	}
	
	public Board getBoard(Long id) {
		return boardRepo.findById(id).get();
	}

	public void saveBoard(Board board) {
		boardRepo.save(board);
	}
	
	public Board updateBoard(Long id, Board board) {
		Board findBoard = boardRepo.findById(id).get();
		
		findBoard.setTitle(board.getTitle());
		findBoard.setContent(board.getContent());
		return boardRepo.save(findBoard);
	}

	public void deleteBoard(Long id) {
		boardRepo.deleteById(id);
	}
	
	
}
