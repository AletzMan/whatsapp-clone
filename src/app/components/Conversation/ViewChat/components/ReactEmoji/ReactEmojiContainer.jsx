import {
  PlusIcon,
  reactFirstEmojis,
  ReactIcon,
} from "@/app/constants/constants"
import { useState } from "react"
import styles from "./reactemoji.module.css"

export function ReactEmojiContainer({
  userData,
  message,
  setSelectedReactEmoji,
}) {
  const [viewReactEmojis, setViewReactEmojis] = useState(false)

  const HandleSetEmojiMessage = (index) => {
    setSelectedReactEmoji((prev) => (prev === index ? null : index))
  }

  return (
    <div
      className={`${
        userData.name === message.sender
          ? styles.reactIconInner
          : styles.reactIconOuter
      } ${styles.reactIcon}`}
      onMouseLeave={() => setViewReactEmojis(false)}
    >
      <button
        className={styles.reactButton}
        onClick={() => setViewReactEmojis((prev) => !prev)}
      >
        <ReactIcon />
      </button>
      {viewReactEmojis && (
        <div className={styles.reactEmojis}>
          {reactFirstEmojis.map((emoji, index) => (
            <button
              key={emoji.description}
              className={styles.reactEmojisButton}
              onClick={() => HandleSetEmojiMessage(index)}
            >
              <span className={styles.reactEmojisEmoji}>{emoji.emoji}</span>
            </button>
          ))}
          <button className={styles.reactEmojisButton}>
            <PlusIcon />
          </button>
        </div>
      )}
    </div>
  )
}
