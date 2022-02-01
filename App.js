import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native';



// Create board
function Board() {
  // Create board for history
  const [squares, setSquares] = useState(Array(9).fill(null))
  // turn of the player
  const [player, setPlayer] = useState(true)
 
  // Ccheck winner
  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  var winner = calculateWinner(squares)
  let status
  // check winner
  { winner 
    ? status = 'Winner ' + winner 
    : !squares.includes(null) 
    ? status = 'Tie Game' 
    : status = `Current Player:  ${player ? 'X' : 'O'}` }
  

  // turnhandleing function
  const turnHandle = (x) => {
    const newSquares = [...squares]
    if (calculateWinner(squares) || newSquares[x]){
      return 
    }
     
    console.log(x)
   
    newSquares[x] = player ? 'X' : 'O'
   
    setSquares(newSquares)
    player ? setPlayer(false) : setPlayer(true)
    console.log(player)
    return newSquares[x]
    
  }
  console.log(squares)

  const reset = () => {
    setSquares(Array(9).fill(null))
    winner = calculateWinner(squares)
  }

  if (winner || !squares.includes(null)){

      return (
      <View>  
        
        <Text style={styles.player}>{status}</Text>
        <TouchableOpacity onPress={() => reset()}><Text>RESET GAME</Text></TouchableOpacity>
     </View>
  )}
  return (
    <View>  
      
      <Text style={styles.player}>{status}</Text>
      
   
      <View style={{flexDirection: 'row'}}>
        <Square value={0} turnHandle={() => turnHandle(0)} />
        <Square value={1} turnHandle={() => turnHandle(1)} />
        <Square value={2} turnHandle={() => turnHandle(2)} />
      </View>
      
      <View style={{flexDirection: 'row'}}>
      <Square value={3} turnHandle={() => turnHandle(3)}  />
        <Square value={4} turnHandle={() => turnHandle(4)}  />
        <Square value={5} turnHandle={() => turnHandle(5)} />
      </View>
      
      <View style={{flexDirection: 'row'}}>
      <Square value={6} turnHandle={() => turnHandle(6)} />
        <Square value={7} turnHandle={() => turnHandle(7)} />
        <Square value={8} turnHandle={() => turnHandle(8)}  />
      </View>
    </View>
  )
  
}

// create square
function Square(props) {
  var [owner, setOwner] = useState('')


  return (
   // use touchableopacity as button has limited css
    <TouchableOpacity style={styles.square} onPress={() => props.turnHandle() ? setOwner(props.turnHandle()) : ''}>
      <Text> {owner}</Text>
    </TouchableOpacity>
  
  )  
}


export default function App() {

  return (

      <View style={styles.container}>
        
        <Board />
      
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    borderWidth: 1,
    width: 50,
    height: 50,
    margin: 5,
    padding: 5,
  },
  player: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    textAlign: 'center',
  }
});
