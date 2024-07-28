package edu.pnu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pnu.domain.Board;
import edu.pnu.service.BoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class BoardController {
	private final BoardService boardService;
	
	@GetMapping("/board")
	public ResponseEntity<?> getBoard() {
		log.info("getBoard: All");
		return ResponseEntity.ok(boardService.getBoards());
	}
	
	@GetMapping("/board/{id}")
	public ResponseEntity<?> getBoard(@PathVariable Long id) {
		log.info("getBoard: " + id);
		Board board = boardService.getBoard(id);
		
		if (board == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(board);
	}
	
	@PostMapping("/board")
	public ResponseEntity<?> createBoard(@RequestBody Board board) {
		log.info("createBoard: " + board);
		boardService.saveBoard(board);
		return ResponseEntity.ok(boardService.getBoards());
	}
	
	@PutMapping("/board/{id}")
	public ResponseEntity<?> updateBoard(@PathVariable Long id, @RequestBody Board updateBoard) {
		log.info("updateBoard: " + id);
		
		Board board = boardService.updateBoard(id, updateBoard);
		
		if (board == null) {
			return ResponseEntity.notFound().build();
		}
		
		return ResponseEntity.ok(board);
	}
	
	@DeleteMapping("/board/{id}")
	public ResponseEntity<?> deleteBoard(@PathVariable Long id) {
		boardService.deleteBoard(id);
		return ResponseEntity.noContent().build();
	}
	
}
