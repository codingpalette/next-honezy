'use client';

import { useState, useEffect } from 'react';
import { X, Circle } from 'lucide-react'; // X와 O를 위한 아이콘

export function TicTacToeBox() {
  // 3x3 보드 상태 (null: 빈칸, 'X', 'O')
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  // 현재 플레이어 (X: 사용자, O: 컴퓨터)
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  // 승리자 상태
  const [winner, setWinner] = useState<string | null>(null);
  // 게임 종료 여부
  const [gameOver, setGameOver] = useState(false);
  // 시작 모달 상태
  const [showStartModal, setShowStartModal] = useState(true);
  // 종료 모달 상태
  const [showEndModal, setShowEndModal] = useState(false);

  // 승리 조건 (가로, 세로, 대각선)
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
    [0, 4, 8], [2, 4, 6], // 대각선
  ];

  // 승리자 확인
  const checkWinner = (board: (string | null)[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // 무승부 확인
  const checkDraw = (board: (string | null)[]) => {
    return board.every(cell => cell !== null);
  };

  // 컴퓨터가 빈 칸 중 랜덤으로 선택
  const computerMove = (currentBoard: (string | null)[]) => {
    const emptyCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter(index => index !== null) as number[];

    if (emptyCells.length === 0) return;

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = [...currentBoard];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameOver(true);
    } else if (checkDraw(newBoard)) {
      setGameOver(true);
    } else {
      setCurrentPlayer('X'); // 다시 사용자 턴으로 전환
    }
  };

  // 셀 클릭 핸들러 (사용자 턴)
  const handleCellClick = (index: number) => {
    if (currentPlayer !== 'X' || board[index] || winner || gameOver) return; // 사용자 턴이 아니거나 이미 채워졌거나 게임 종료 시 클릭 불가

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setGameOver(true);
    } else if (checkDraw(newBoard)) {
      setGameOver(true);
    } else {
      setCurrentPlayer('O'); // 컴퓨터 턴으로 전환
    }
  };

  // 컴퓨터 턴 자동 실행
  useEffect(() => {
    if (currentPlayer === 'O' && !winner && !gameOver) {
      setTimeout(() => {
        computerMove(board);
      }, 500); // 0.5초 지연으로 자연스러운 턴 전환
    }
  }, [currentPlayer, board, winner, gameOver]);

  // 게임 리셋
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
    setShowEndModal(false); // 종료 모달 닫기
  };

  // 게임 시작 시 시작 모달 표시
  useEffect(() => {
    setShowStartModal(true);
  }, []);

  // 게임 종료 시 종료 모달 표시
  useEffect(() => {
    if (winner || gameOver) {
      setShowEndModal(true);
      console.log(winner ? `${winner} wins!` : 'Draw!');
    }
  }, [winner, gameOver]);

  return (
    <>
      <div className="overflow-auto">
        <div className="relative w-full h-full flex items-center justify-center bg-base-200 max-w-[1600px] max-h-[900px] aspect-3/2 min-w-[1000px]">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0">
            <img
              src="/tictactoe.png"
              alt="TicTacToe Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 틱택토 게임 보드 */}
          <div className="absolute z-10 left-1/2 transform -translate-x-1/2 rounded-lg p-4 top-[18%] rotate-345">
            {/* 게임 보드 */}
            <div className="grid grid-cols-3 gap-2">
              {board.map((cell, index) => (
                <button
                  key={index}
                  className={`btn btn-square btn-md flex items-center justify-center text-2xl font-bold border-2 border-blue-500 rounded-md transition-all duration-200 ${cell ? 'btn-disabled' : 'hover:bg-blue-100'
                    }`}
                  onClick={() => handleCellClick(index)}
                  disabled={currentPlayer !== 'X' || !!cell || gameOver}
                >
                  {cell === 'X' ? (
                    <X className="w-6 h-6 text-blue-500" />
                  ) : cell === 'O' ? (
                    <Circle className="w-6 h-6 text-red-500" />
                  ) : (
                    ''
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 시작 모달 */}
          <input type="checkbox" id="start-modal" className="modal-toggle" checked={showStartModal} onChange={() => { }} />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">Tic-Tac-Toe</h3>
              <p className="py-4 text-center">게임을 시작하시겠습니까?</p>
              <div className="modal-action flex justify-center">
                <label
                  htmlFor="start-modal"
                  className="btn btn-primary"
                  onClick={() => setShowStartModal(false)}
                >
                  시작
                </label>
              </div>
            </div>
          </div>

          {/* 종료 모달 */}
          <input type="checkbox" id="end-modal" className="modal-toggle" checked={showEndModal} onChange={() => { }} />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-center">게임 종료</h3>
              <p className="py-4 text-center">
                {winner ? (winner === 'X' ? 'You Win!' : 'Computer Wins!') : "It's a Draw!"}
              </p>
              <div className="modal-action flex justify-center">
                <button className="btn btn-primary" onClick={resetGame}>
                  Reset Game
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
