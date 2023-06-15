import { Menu } from "@/app/components/Menu/Menu"
import {
  GetHourMessage,
  GetTimeMessage,
  reactFirstEmojis,
  TriangleIcon,
  VieWedIcon,
} from "@/app/constants/constants"
import { Fragment, useEffect, useState } from "react"
import { uid } from "uid"
import { ReactEmojiContainer } from "../ReactEmoji/ReactEmojiContainer"
import emojiRegex from "emoji-regex"
import styles from "./message.module.css"
import { updateConversation } from "@/app/firebase/firebase"

const menuOptions = [
  "Responder",
  "React",
  "Reenviar",
  "Destacar",
  "Reportar",
  "Eliminar",
]

const EmojiWrapper = ({ text, className }) => {
  const regexEmoji = emojiRegex()
  if (text !== "") {
    const emojis = text?.match(regexEmoji)

    const onlyEmoji = text?.split(regexEmoji).find((part) => part !== "")
    if (!emojis) return <p className={className}>{text}</p>
    let numberEmoji = 0
    //console.log(emojis)
    const wrapEmojis = (text) => {
      return text.split(regexEmoji).map((part, index) => {
        //console.log(part, index)
        if (part === "") {
          const element = (
            <span
              style={onlyEmoji ? { fontSize: "1.6em" } : { fontSize: "2.6em" }}
              key={index}
            >
              {emojis[numberEmoji]}
            </span>
          )
          numberEmoji++
          return element
        }
        return <span key={index}>{part}</span>
      })
    }

    const wrappedText = wrapEmojis(text)

    return <p className={className}>{wrappedText}</p>
  }
}

export function Message({ userData, message, index }) {
  const [selectedReactEmoji, setSelectedReactEmoji] = useState(message.react)
  const [currentMessage, setCurrentMessage] = useState(message)

  useEffect(() => {
    if (selectedReactEmoji) {
      const prevConversation = { ...userData }
      const newConversation = {
        date: message.date,
        firstMessageOfTheDay: message.firstMessageOfTheDay,
        message: message.message,
        react: selectedReactEmoji,
        sender: message.sender,
        viewed: message.viewed,
      }
      prevConversation.messages[index] = newConversation
      updateConversation(prevConversation)
    }
  }, [selectedReactEmoji])

  return (
    <>
      <Fragment key={uid()}>
        {currentMessage?.firstMessageOfTheDay && (
          <span key={uid()} className={styles.dateMessages}>
            {GetTimeMessage(currentMessage?.date).date}
          </span>
        )}
        <div
          key={uid()}
          className={`${
            userData?.name === currentMessage?.sender
              ? styles.messageContainerInner
              : styles.messageContainerOuter
          } ${styles.messageContainer} ${
            currentMessage?.sender !== userData?.messages[index + 1]?.sender
              ? styles.messageSpacing
              : styles.messageSpacingNormal
          } ${userData?.messages[index]?.react !== 6 && styles.spacingReact}`}
        >
          <EmojiWrapper
            className={styles.message}
            text={currentMessage?.message}
          />
          <TriangleIcon
            className={
              userData?.name === currentMessage?.sender
                ? styles.triangleInner
                : styles.triangleOuter
            }
          />
          <div className={styles.messageTimeContainer}>
            <span className={styles.messageHour}>
              {GetHourMessage(currentMessage?.date)}
            </span>
            {userData.name !== currentMessage?.sender && (
              <span className={styles.messageViewed}>
                <VieWedIcon />
              </span>
            )}
          </div>
          <ReactEmojiContainer
            userData={userData}
            message={currentMessage}
            setSelectedReactEmoji={setSelectedReactEmoji}
          />
          <Menu
            className={styles.menu}
            options={menuOptions}
            isChat
            isPositionArrow
            notMove
          />
          {reactFirstEmojis[selectedReactEmoji] && (
            <span
              className={`${styles.reactMessage} ${
                userData.name === currentMessage?.sender
                  ? styles.reactMessageInner
                  : styles.reactMessageOuter
              }`}
            >
              {reactFirstEmojis[selectedReactEmoji]?.emoji}
            </span>
          )}
        </div>
      </Fragment>
    </>
  )
}
