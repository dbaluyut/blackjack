import React, { useState, useEffect } from 'react'
import styles from './Deck.module.css'
import Hand from './Hand'

export function Deck() {
  const [house, setHouse] = useState({ total: 0, count: 0, hand: [] })
  const [player, setPlayer] = useState({ total: 0, count: 0, hand: [] })
  useEffect(() => {
    console.log(player, house)
    // setHouseVal(reduceHand(house.hand))
    // setPlayerVal(reduceHand(player.hand))

    if (house.total >= 17) {
      if (house.total > player.total && house.total <= 21) {
        setMessage('house wins')

        setTimeout(function () {
          setMessage('')
          newHand()
        }, 1500)
      }
    }
    if (house.total < player.total && player.total < 21) {
      setMessage('player wins')

      setTimeout(function () {
        let winnings = pot * 2
        setPlayerBank(playerBank + winnings)
        setPot(0)
        setMessage('')
        newHand()
      }, 1500)
      newHand()
    } else if (player.total === 21) {
      setMessage('player wins')
      setTimeout(function () {
        let winnings = pot * 2.5
        setPlayerBank(playerBank + winnings)
        setPot(0)
        setMessage('')
        newHand()
      }, 1500)
    } else if (player.total > 21) {
      setMessage('player lost')

      setTimeout(function () {
        setPot(0)
        setMessage('')
        newHand()
      }, 1500)
    }
  }, [player, house])

  function shuffleCards(deckSz) {
    const deck = [
      { face: 'A', val: 11, suite: 'cloves' },
      { face: '2', val: 2, suite: 'cloves' },
      { face: '3', val: 3, suite: 'cloves' },
      { face: '4', val: 4, suite: 'cloves' },
      { face: '5', val: 5, suite: 'cloves' },
      { face: '6', val: 6, suite: 'cloves' },
      { face: '7', val: 7, suite: 'cloves' },
      { face: '8', val: 8, suite: 'cloves' },
      { face: '9', val: 9, suite: 'cloves' },
      { face: '10', val: 10, suite: 'cloves' },
      { face: 'J', val: 10, suite: 'cloves' },
      { face: 'Q', val: 10, suite: 'cloves' },
      { face: 'K', val: 10, suite: 'cloves' },
      { face: 'A', val: 11, suite: 'hearts' },
      { face: '2', val: 2, suite: 'hearts' },
      { face: '3', val: 3, suite: 'hearts' },
      { face: '4', val: 4, suite: 'hearts' },
      { face: '5', val: 5, suite: 'hearts' },
      { face: '6', val: 6, suite: 'hearts' },
      { face: '7', val: 7, suite: 'hearts' },
      { face: '8', val: 8, suite: 'hearts' },
      { face: '9', val: 9, suite: 'hearts' },
      { face: '10', val: 10, suite: 'hearts' },
      { face: 'J', val: 10, suite: 'hearts' },
      { face: 'Q', val: 10, suite: 'hearts' },
      { face: 'K', val: 10, suite: 'hearts' },
      { face: 'A', val: 11, suite: 'diamonds' },
      { face: '2', val: 2, suite: 'diamonds' },
      { face: '3', val: 3, suite: 'diamonds' },
      { face: '4', val: 4, suite: 'diamonds' },
      { face: '5', val: 5, suite: 'diamonds' },
      { face: '6', val: 6, suite: 'diamonds' },
      { face: '7', val: 7, suite: 'diamonds' },
      { face: '8', val: 8, suite: 'diamonds' },
      { face: '9', val: 9, suite: 'diamonds' },
      { face: '10', val: 10, suite: 'diamonds' },
      { face: 'J', val: 10, suite: 'diamonds' },
      { face: 'Q', val: 10, suite: 'diamonds' },
      { face: 'K', val: 10, suite: 'diamonds' },
      { face: 'A', val: 11, suite: 'spades' },
      { face: '2', val: 2, suite: 'spades' },
      { face: '3', val: 3, suite: 'spades' },
      { face: '4', val: 4, suite: 'spades' },
      { face: '5', val: 5, suite: 'spades' },
      { face: '6', val: 6, suite: 'spades' },
      { face: '7', val: 7, suite: 'spades' },
      { face: '8', val: 8, suite: 'spades' },
      { face: '9', val: 9, suite: 'spades' },
      { face: '10', val: 10, suite: 'spades' },
      { face: 'J', val: 10, suite: 'spades' },
      { face: 'Q', val: 10, suite: 'spades' },
      { face: 'K', val: 10, suite: 'spades' },
    ]
    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      return array
    }

    function replicate(arr, times) {
      var al = arr.length,
        rl = al * times,
        res = new Array(rl)
      for (var i = 0; i < rl; i++) res[i] = arr[i % al]
      return res
    }
    let allDecks = replicate(deck, deckSz)
    return shuffle(allDecks)
  }

  function deal() {
    let playerCard = shuffled.shift()
    setPlayer({
      total: player.total + 10,
      hand: [...player.hand, playerCard],
    })

    let houseCard = shuffled.shift()
    setHouse({
      total: house.total + houseCard.val,
      total: house.total + 2,
      hand: [...house.hand, houseCard],
    })

    // setPlayer({ hand: [...player.hand, shuffled.shift()] })
  }
  function newHand() {
    let playerCard = shuffled.shift()

    setPlayer({ hand: playerCard, total: playerCard.val })
    let houseCard = shuffled.shift()

    setHouse({ hand: houseCard, total: playerCard.val })
  }
  function hit() {
    let playerCard = shuffled.shift()

    setPlayer({
      hand: [...player.hand, playerCard],
      total: playerCard.val + player.total,
    })
  }
  // function reduceHand(arr) {
  //   console.log(arr)
  //   let val = 0
  //   if (arr) {
  //     arr.forEach((item) => {
  //       val += item
  //       console.log(val)
  //     })
  //   }
  //   return val
  // }

  // function getCount(player) {
  //   console.log(player)
  //   let count = 0
  //   if (player.hand) {
  //     player.hand.forEach((item) => {
  //       if (
  //         item.face == 'J' ||
  //         item.face == 'K' ||
  //         item.face == 'Q' ||
  //         item.face == 'A' ||
  //         item.face == '10'
  //       ) {
  //         count--
  //       } else if (
  //         item.face == '2' ||
  //         item.face == '3' ||
  //         item.face == '4' ||
  //         item.face == '5' ||
  //         item.face == '6'
  //       ) {
  //         count++
  //       }
  //       console.log(count)
  //     })
  //   }
  //   return count
  // }

  function onSubmitBet(e) {
    e.preventDefault()
    setPlayerBank(playerBank - bet)
    setPot(bet)
  }

  const [shuffled] = useState(shuffleCards(1))

  const [playerBank, setPlayerBank] = useState(200)
  const [bet, setBet] = useState(0)
  const [pot, setPot] = useState(0)
  const [houseHist] = useState([])
  const [playerHist] = useState([])
  // const [houseVal, setHouseVal] = useState(0)
  // const [playerVal, setPlayerVal] = useState(0)
  const [message, setMessage] = useState('')
  return (
    <div>
      <div className={styles.houseBox}>
        <li>house</li>
        <li>value {house.total}</li>
        <li>running count {house.count}</li>
        <Hand hand={house.hand} />
      </div>
      <div className={styles.playerBox}>
        <li>player</li>
        <li>value {player.total}</li>
        <li>running count {player.count}</li>
        <Hand hand={player.hand} />
      </div>
      <button onClick={() => deal()}>deal</button>
      <button onClick={() => hit()}>hit</button>
      <form>
        <input onChange={(e) => setBet(e.target.value)} type='number'></input>
        <button onClick={onSubmitBet}>bet</button>
      </form>
      <h3>{playerBank}</h3>
      <h3>pot {pot}</h3>
      <h1>{message}</h1>
    </div>
  )
}
