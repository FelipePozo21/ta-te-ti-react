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
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURN.X)
  
  const uploadBoard = (index) => {
    checkWinner()
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const nextTurn = turn === TURN.X ? TURN.O : TURN.X

    setTurn(nextTurn)
  }

  const checkWinner = (index) => {
    const [a,b,c] = WINNER_COMBOS
    
    for(const check of WINNER_COMBOS) {
      if(check[a] === board[index] &&
        check[a] === check[b] &&
        check[b] === check[c] 
      ) {
        console.log('win')
      }
    }
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
    </main>
  )
}

export default App
