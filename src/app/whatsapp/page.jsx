"use client"
import { useState } from "react"
import { Chats } from "../components/Chats/Chats"
import { Conversation } from "../components/Conversation/Conversation"
import { Default } from "../components/Default/Default"
import { useStore } from "../store/store"
import styles from "./whatsapp.module.css"

export default function Home() {
  const selectedChat = useStore((state) => state.selectedChat)
  const setSelectedChat = useStore((state) => state.setSelectedChat)
  const [writeStatus, setWriteStatus] = useState("En línea")

  return (
    <main className={styles.main}>
      <Chats writeStatus={writeStatus} setWriteStatus={setWriteStatus} />
      {selectedChat && (
        <Conversation
          writeStatus={writeStatus}
          setWriteStatus={setWriteStatus}
        />
      )}
      {!selectedChat && <Default />}
    </main>
  )
}
