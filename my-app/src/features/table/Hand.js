import React from 'react'
import styles from './Deck.module.css'

export default function Hand({ hand }) {
  if (hand) {
    return hand.map((item) => {
      return (
        <div key={item.face} className={styles.card}>
          {item.face} {item.suite}
        </div>
      )
    })
  }
}
