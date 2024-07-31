import { useState } from "react"

const TURN = {
  X: 'x',
  O: 'o'
}

const Square = ({children, uploadBoard, index, isSelected}) => {
  const className = isSelected ? 'square is-selected' : 'square'
  
  return (
    <div onClick={() => uploadBoard(index)} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]



function App() {
  const [board, setBoard] = useState(() => {
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(TURN.X)
  const [winner, setWinner] = useState(null)

  const uploadBoard = (index) => {
    if(winner || board[index]) {
      return 
    }
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    
    const nextTurn = turn === TURN.X ? TURN.O : TURN.X
    const newWinner = checkWinner(newBoard)
    
    if(newWinner) {
      setWinner(() => {return newWinner})
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }
    setTurn(nextTurn)

  }

  const checkEndGame = (board) => board.every(square => square !== null)

  const checkWinner = (board) => {  
    for(const check of WINNER_COMBOS) {
      const [a,b,c] = check
      if(board[a] &&
        board[a] === board[b] &&
        board[b] === board[c] 
      ) {
        return board[a]
      } 
    }
  }

  const reset = () => {
    setBoard(() => {
      return Array(9).fill(null)
    })
    setTurn(TURN.X)
    setWinner(null)
  }

  

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <section className="game">
        {board.map((square, index) => (
          <Square 
            key={index}
            index={index}
            uploadBoard={uploadBoard}>
              {square}
          </Square>
        ))}
      </section>
      <section className="turn">
       <Square isSelected={turn === TURN.X ? true : false}>{TURN.X}</Square>
       <Square isSelected={turn === TURN.O ? true : false}>{TURN.O}</Square>
      </section>
       {winner !== null ? (
        <section className="winner">
         <div className="text">
          {winner !== false ? (
            <div>
              <h2>el ganador es:</h2>
              <header className="win">
                <Square>{winner}</Square>
              </header>
            </div>
          ) : 
            <div>
              <h2>Empate</h2>
            </div>
          }

        <footer>
          <button onClick={reset}>Reset</button>
        </footer>
       </div>
      </section>
       ) : ''}
    </main>
  )
}

export default App
