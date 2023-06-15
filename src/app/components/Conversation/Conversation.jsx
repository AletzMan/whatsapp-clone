"use client"
import Image from "next/image"
import styles from "./conversation.module.css"
import { chatConstants, SearchIcon } from "@/app/constants/constants"
import cr7Profile from "@/assets/cr7_profile.jpg"
import { Menu } from "../Menu/Menu"
import { useEffect, useState } from "react"
import { ViewInfo } from "./ViewInfo/ViewInfo"
import { useStore } from "@/app/store/store"
import { ViewChat } from "./ViewChat/ViewChat"
import { getConversation, getProfilePhotoUrl } from "@/app/firebase/firebase"

const menuOptions = [
  "Info. del contacto",
  "Seleccionar mensajes",
  "Cerrar chat",
  "Mensajes temporales",
  "Vaciar mensajes",
]

export function Conversation({ writeStatus, setWriteStatus }) {
  const [openViewSearch, setOpenViewSearch] = useState(false)
  const selectedChat = useStore((state) => state.selectedChat)
  const setSelectedChat = useStore((state) => state.setSelectedChat)
  const [userData, setUserData] = useState([])
  const [typeWindow, setTypeWindow] = useState("")
  const [profilePhotoUrl, setProfilePhotoUrl] = useState()

  //const userData = chatConstants.find((chat) => chat.id == selectedChat)
  useEffect(() => {
    const getData = async () => {
      const data = await getConversation()
      const user = data.find((chat) => chat.id == selectedChat)
      const url = await getProfilePhotoUrl(user.photo)
      setUserData(user)
      setProfilePhotoUrl(url)
    }
    getData()
  }, [selectedChat])

  useEffect(() => {
    setOpenViewSearch(false)
  }, [selectedChat])
  const date = new Date().toLocaleDateString("mx-Es", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const HandleOpenWindow = (type) => {
    setOpenViewSearch(true)
    setTypeWindow(type)
  }

  const InfoContact = {
    name: userData?.name,
    photo: profilePhotoUrl,
    phone: userData?.phone,
  }

  return (
    <main className={styles.section}>
      <header className={styles.header}>
        <div
          className={styles.containerProfile}
          onClick={() => HandleOpenWindow("Info")}
        >
          <div className={styles.imageProfileContainer}>
            <Image
              className={styles.imageProfile}
              src={profilePhotoUrl}
              width={60}
              height={60}
              alt={`photo profile ${profilePhotoUrl}`}
            />
          </div>
          <div>
            <h1 className={styles.profileName}>{userData?.name}</h1>
            <p className={styles.profileMembers}>{writeStatus}</p>
          </div>
        </div>
        <button
          className={styles.button}
          onClick={() => HandleOpenWindow("Search")}
        >
          <SearchIcon />
        </button>
        <Menu options={menuOptions} />
      </header>
      {
        <ViewInfo
          setOpenView={setOpenViewSearch}
          openView={openViewSearch}
          userData={userData}
          type={typeWindow}
          InfoContact={InfoContact}
        />
      }
      <ViewChat userData={userData} setWriteStatus={setWriteStatus} />
    </main>
  )
}
