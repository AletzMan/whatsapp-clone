import { Menu } from "@/app/components/Menu/Menu"
import ModalNotifications from "@/app/components/ModalNotifications/ModalNotifications"
import SnackBar from "@/app/components/SnackBar/SnackBar"
import {
  ArrowDownIcon,
  GetTimeElapsed,
  NotSoundIcon,
} from "@/app/constants/constants"
import { getProfilePhotoUrl } from "@/app/firebase/firebase"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "./chat.module.css"

export function Chat({ chat, setSelectedChat, selectedChat, writeStatus }) {
  const date = GetTimeElapsed(chat?.messages[chat?.messages.length - 1]?.date)
  const [selectedItemMenu, setSelectedItemMenu] = useState(null)
  const [unreadMessage, setUnreadMessage] = useState(false)
  const [notificationON, setNotificationON] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [profilePhotoUrl, setProfilePhotoUrl] = useState()

  const [menuOptions, setMenuOptions] = useState([
    "Archivar chat",
    "Silenciar notificaciones",
    "Eliminar chat",
    "Fijar chat",
    "Marcar como no leído",
  ])

  const HandleClickChat = (e, id) => {
    if (
      e.target.nodeName !== "DIV" &&
      e.target.nodeName !== "svg" &&
      e.target.nodeName !== "path" &&
      e.target.nodeName !== "UL" &&
      e.target.nodeName !== "LI"
    ) {
      setUnreadMessage(false)
      setSelectedChat(id)
    }
  }

  useEffect(() => {
    if (selectedItemMenu === 1) {
      if (menuOptions[1] === "Silenciar notificaciones") {
        setViewModal(true)
      } else {
        setNotificationON(false)
      }
    }
    if (selectedItemMenu === 4) {
      setUnreadMessage((prev) => !prev)
    }
    setTimeout(() => {
      setSelectedItemMenu(null)
    }, 6100)
  }, [selectedItemMenu])

  useEffect(() => {
    if (notificationON) {
      let newOptions = [...menuOptions]
      newOptions[1] = "Desactivar Silenciar notificaciones"
      setMenuOptions(newOptions)
    } else {
      let newOptions = [...menuOptions]
      newOptions[1] = "Silenciar notificaciones"
      setMenuOptions(newOptions)
    }
  }, [notificationON])

  useEffect(() => {
    if (unreadMessage) {
      let newOptions = [...menuOptions]
      newOptions[4] = "Marcar como leído"
      setMenuOptions(newOptions)
    } else {
      let newOptions = [...menuOptions]
      newOptions[4] = "Marcar como no leído"
      setMenuOptions(newOptions)
    }
  }, [unreadMessage])

  useEffect(() => {
    const getData = async () => {
      const url = await getProfilePhotoUrl(chat?.photo)
      setProfilePhotoUrl(url)
    }
    getData()
  }, [])

  return (
    <article
      className={`${styles.chat} ${
        selectedChat === chat?.id && styles.chatActive
      }`}
      onClick={(e) => HandleClickChat(e, chat?.id)}
    >
      <div className={styles.chatStatus}>
        <div className={`${styles.chatImageContainer}`}>
          <Image
            className={styles.chatImage}
            src={profilePhotoUrl}
            width={60}
            height={70}
            alt="image profile"
          />
        </div>
      </div>
      <section className={styles.chatDescription}>
        <h2
          className={`${styles.chatTitle} ${
            unreadMessage && styles.unreadMessage
          }`}
        >
          {chat?.name}
        </h2>
        <span
          className={`${styles.chatDate} ${
            unreadMessage && styles.chatDateUnread
          }`}
        >
          {date}
        </span>
        {
          <span
            className={`${styles.chatLastMessage} ${
              unreadMessage && styles.unreadMessage
            } ${
              writeStatus !== "En línea" &&
              chat?.id === selectedChat &&
              styles.writeMessage
            }`}
          >
            {writeStatus !== "En línea" && chat?.id === selectedChat
              ? writeStatus
              : chat?.messages[chat?.messages.length - 1]?.message}
          </span>
        }
        <div className={styles.chatOptions}>
          {notificationON && (
            <NotSoundIcon className={`${styles.silentNotification} `} />
          )}
          {unreadMessage && (
            <span className={`${styles.numberNotification} `}></span>
          )}
        </div>
        <Menu
          className={`${styles.buttonArrow} ${
            notificationON && styles.notificationON
          } ${unreadMessage && styles.unreadMessage}`}
          options={menuOptions}
          isChat
          selectedItem={setSelectedItemMenu}
        />
      </section>
      {notificationON && (
        <SnackBar
          selectedItem={selectedItemMenu}
          message={menuOptions[selectedItemMenu]}
          notificationON={notificationON}
        />
      )}
      {viewModal && (
        <ModalNotifications
          viewModal={viewModal}
          setViewModal={setViewModal}
          setNotificationON={setNotificationON}
        />
      )}
    </article>
  )
}
