import Image from "next/image"
import styles from "./viewchat.module.css"
import {
  ClipIcon,
  CloseIcon,
  EmojiIcon,
  GetHourMessage,
  GetTimeMessage,
  GIFIcon,
  MicroIcon,
  PlusIcon,
  reactFirstEmojis,
  ReactIcon,
  SendIcon,
  StickerEmojiIcon,
  TriangleIcon,
  VieWedIcon,
} from "@/app/constants/constants"
import { Montserrat } from "next/font/google"
import { Fragment, useEffect, useRef, useState } from "react"
import { uid } from "uid"
import { Menu } from "../../Menu/Menu"
import { AttachMenu } from "./components/AttachMenu"
import { EmojiWindow } from "./components/EmojiWindow/EmojiWindow"
import { ReactEmojiContainer } from "./components/ReactEmoji/ReactEmojiContainer"
import { Message } from "./components/Message/Message"
import { getConversation, updateConversation } from "@/app/firebase/firebase"
import { GetResponseOpenAI } from "@/app/services/openAI"
const monserrat = Montserrat({ subsets: ["latin"] })

export function ViewChat({ userData, setWriteStatus }) {
  const [message, setMessage] = useState("")
  const [conversation, setConversation] = useState(userData)
  const textareaRef = useRef(null)
  const chatRef = useRef(null)
  const buttonRef = useRef(null)
  const buttonSendRef = useRef(null)
  const [viewMenu, setViewMenu] = useState(false)
  const [viewEmojis, setViewEmojis] = useState(false)
  const [emojiSelected, setEmojiSelected] = useState("")
  useEffect(() => {
    setConversation(userData)
  }, [userData])

  useEffect(() => {
    const textarea = textareaRef.current

    const handleInput = () => {
      textarea.style.height = "auto"
      textarea.style.height = `${textarea.scrollHeight}px`
    }

    textarea.addEventListener("input", handleInput)

    return () => {
      textarea.removeEventListener("input", handleInput)
    }
  }, [])

  useEffect(() => {
    const { current: target } = chatRef
    target.scroll({ top: target.scrollHeight })
  }, [conversation])

  useEffect(() => {
    if (chatRef) {
      const { current: target } = chatRef
      const handleScroll = (event) => {
        target.scroll({ top: target.scrollHeight })
      }
      buttonSendRef.current?.addEventListener("mousedown", handleScroll)
      return () => {
        buttonSendRef.current?.removeEventListener("mousedown", handleScroll)
      }
    }
  }, [message])

  useEffect(() => {
    let newMessage = message
    setMessage(newMessage + emojiSelected)
    //setEmojiSelected("")
  }, [emojiSelected])

  const HandleChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  const HandleOpenMenu = (e) => {
    setViewMenu((prev) => !prev)
  }
  const HandleViewEmojis = (status) => {
    setViewEmojis(status)
  }
  const HandleSendMessage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
    }
    if ((e.key === "Enter" || e === "Send") && message !== "") {
      SendMessageToConversation(message, "Me")
      setWriteStatus("Escribiendo...")
      const getData = async () => {
        const data = await GetResponseOpenAI(message, conversation.name)
        SendMessageToConversation(data, conversation.name)
        setWriteStatus("En línea")
      }
      getData()
    }
  }

  function SendMessageToConversation(newMessage, person) {
    const prevConversation = { ...conversation }
    const newConversation = {
      date: new Date().toString(),
      firstMessageOfTheDay: false,
      message: newMessage,
      react: 6,
      sender: person,
      viewed: true,
    }
    prevConversation.messages.push(newConversation)
    setConversation(prevConversation)
    setMessage("")
    UpdateConversation(prevConversation)
  }

  const UpdateConversation = async (newConversation) => {
    await updateConversation(newConversation)
  }
  //console.log(conversation)
  return (
    <>
      {/*<span className={styles.dateTop}>{`AYER`}</span>*/}
      <section className={styles.section} ref={chatRef}>
        {conversation?.messages?.length > 0 &&
          conversation?.messages?.map((message, index) => (
            <Message
              key={uid()}
              userData={conversation}
              message={message}
              index={index}
            />
          ))}
      </section>
      <footer className={styles.footer}>
        {
          <div
            className={`${styles.emojiContainer} ${
              viewEmojis && styles.viewEmojis
            }`}
          >
            <EmojiWindow setEmojiSelected={setEmojiSelected} />
          </div>
        }
        <div className={styles.sendContainer}>
          {viewEmojis && (
            <button
              className={styles.footerButton}
              onClick={() => HandleViewEmojis(false)}
            >
              <CloseIcon className={styles.close} />
            </button>
          )}
          <button
            className={styles.footerButton}
            onClick={() => HandleViewEmojis(true)}
          >
            <EmojiIcon
              className={`${styles.emoji}  ${
                viewEmojis && styles.buttonActive
              }`}
            />
          </button>
          {viewEmojis && (
            <button className={`${styles.footerButton}`}>
              <GIFIcon className={styles.gifEmoji} />
            </button>
          )}
          {viewEmojis && (
            <button className={`${styles.footerButton}`}>
              <StickerEmojiIcon className={styles.stickerEmoji} />
            </button>
          )}
          <button
            className={`${styles.footerButton} ${styles.attachButton} `}
            title="Adjuntar"
            onClick={HandleOpenMenu}
            ref={buttonRef}
          >
            <ClipIcon className={`${styles.attach}`} />
          </button>
          <div className={styles.writeContainer}>
            <textarea
              rows={1}
              ref={textareaRef}
              className={`${styles.write} ${monserrat.className}`}
              value={message}
              onChange={HandleChangeMessage}
              placeholder="Escribe un mensaje aquí"
              onKeyDown={(e) => HandleSendMessage(e)}
            />
          </div>
          <button
            className={`${styles.footerButton} ${styles.sendButton}`}
            ref={buttonSendRef}
            onClick={() => HandleSendMessage("Send")}
          >
            {message === "" && <MicroIcon className={styles.micro} />}
            {message !== "" && <SendIcon className={styles.send} />}
          </button>
        </div>
        {viewMenu && <AttachMenu viewMenu={viewMenu} buttonRef={buttonRef} />}
      </footer>
    </>
  )
}
