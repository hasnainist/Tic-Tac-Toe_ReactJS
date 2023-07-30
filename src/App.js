import './App.css';
import React, { useState } from 'react';
import Confetti from 'react-confetti';



export default function App(){
  const [myArray, setMyArray] = useState(Array(9).fill(null));
  const [whoisnext,setwhoisnext]=useState(true)
  const [sign,setsign]=useState('O')
  const [winner,setwinner]=useState('F')
  const [historylog, sethistorylog] = useState(Array(9).fill(null));
  const [movemade,setmovemade]=useState(false)


  function handlereverse()
  {
    setMyArray(historylog)
    setwhoisnext(!whoisnext)

    if (sign==='O'){
      setsign('X')
    }
    if (sign==='X')
    {
      setsign('O')
    }
  }

  function handlegameover()
  {
    setMyArray(Array(9).fill(null))
    setsign('O')
    setwinner('F')
    setwhoisnext(true)
    setmovemade(false)
  }

  function checkWin(board) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]; // returns 'X' or 'O'
        }
    }

    // Check if all cells in the board are filled, if so, it's a draw
    if (!board.includes(null)) {
        return 'D';
    }

    return 'F';
}



  const clickgivenbyparent = (num) => {
   if(winner==='F' && myArray[num]!=='O'&& myArray[num]!=='X'){
    if(whoisnext===true)
    {
      setsign('X')
    }
    else
    {
      setsign('O')
    }
    setwhoisnext(!whoisnext)
    setmovemade(true)

    let newArray = [...myArray]; 
   
    let historyCopy = [...historylog];
    historyCopy=[...myArray];
    sethistorylog(historyCopy);
    newArray[num] = sign; 

    setMyArray(newArray);
    
    if(checkWin(newArray)==='X')
    {
      setwinner('X')
    }
    else if(checkWin(newArray)==='O')
    {
      setwinner('O')
    }
    else if (checkWin(newArray)==='D'){
      setwinner('D')
    }
  }
   
  }
   
    return(
      <div>
        <h1 className='main'>TIC-TAC-TOE</h1>
        {winner === 'X' || winner === 'O' ? (
    <>
      <h1 className='main'>Winner: {winner}</h1>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  ) : winner === 'D' ? (
    <h2 className='main'>And it's a draw.....</h2>
  ) : (
    <h2 className='main'>{sign}'s Turn</h2>
  )}


      <div className='row main'>
          <Block index={0} symbol={myArray[0]} handleclick={clickgivenbyparent}/>
          <Block index={1} symbol={myArray[1]} handleclick={clickgivenbyparent}/>
          <Block index={2} symbol={myArray[2]} handleclick={clickgivenbyparent}/>
        </div>
          <div className='row main'>
          <Block index={3} symbol={myArray[3]} handleclick={clickgivenbyparent}/>
          <Block index={4} symbol={myArray[4]} handleclick={clickgivenbyparent}/>
          <Block index={5} symbol={myArray[5]} handleclick={clickgivenbyparent}/>
      </div>
        <div className='row main'>
        <Block index={6} symbol={myArray[6]} handleclick={clickgivenbyparent}/>
        <Block index={7} symbol={myArray[7]} handleclick={clickgivenbyparent}/>
        <Block index={8} symbol={myArray[8]} handleclick={clickgivenbyparent}/>
    </div>
    {winner !== 'F' && (
    <div className='row main'>
        <button className='button' onClick={handlegameover}>Play Again</button>
    </div>
)}

{movemade===true && winner==='F' &&(
    <div className='row main'>
    <button className='button' onClick={handlereverse}>Reverse Move</button>
    </div>)
}
    </div>
    )
}


function Block(props){
    return(<div className='block' onClick={() => props.handleclick(props.index)}>{props.symbol}</div>)
}


