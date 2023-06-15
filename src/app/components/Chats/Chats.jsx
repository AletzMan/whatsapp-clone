"use client"
import { chatConstants, FilterIcon } from "@/app/constants/constants"
import { getConversation, getProfilePhotoUrl } from "@/app/firebase/firebase"
import { useStore } from "@/app/store/store"
import { useEffect } from "react"
import { useState } from "react"
import { InputSearch } from "../InputSearch/InputSearch"
import ModalNotifications from "../ModalNotifications/ModalNotifications"
import styles from "./chat.module.css"
import { Chat } from "./components/Chat/Chat"
import { HeaderChat } from "./components/HeaderChat"
import { ModalStatuses } from "./components/ModalStatuses/ModalStatuses"

export function Chats({ writeStatus, setWriteStatus }) {
  const [viewFilters, setViewFilter] = useState(false)
  //const [selectedChat, setSelectedChat] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [userData, setUserData] = useState([])
  const [viewStatuses, setViewStatuses] = useState(false)
  const selectedChat = useStore((state) => state.selectedChat)
  const setSelectedChat = useStore((state) => state.setSelectedChat)

  useEffect(() => {
    const getData = async () => {
      const userData = await getConversation()
      setUserData(userData)
    }
    getData()
  }, [selectedChat])

  return (
    <>
      <section className={styles.section}>
        <HeaderChat setViewStatuses={setViewStatuses} />
        <div className={styles.optionFilters}>
          <InputSearch
            placeholder={"Busca un chat o inicia uno nuevo"}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <button
            className={`${styles.buttonFilter} ${
              viewFilters && styles.buttonFilterActive
            }`}
            title={"Filtro de chats no leídos"}
            onClick={() => setViewFilter((prev) => !prev)}
          >
            <FilterIcon />
          </button>
        </div>
        {viewFilters && (
          <div className={styles.messagesFilter}>FILTRADO POR NO LEíDOS</div>
        )}
        <div className={styles.chatsSection}>
          {userData?.map((chat) => (
            <Chat
              key={chat.id}
              chat={chat}
              setSelectedChat={setSelectedChat}
              selectedChat={selectedChat}
              writeStatus={writeStatus}
            />
          ))}
        </div>
      </section>
      {viewStatuses && (
        <ModalStatuses userData={userData} setViewStatuses={setViewStatuses} />
      )}
    </>
  )
}
