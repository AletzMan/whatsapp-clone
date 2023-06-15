"use client"
import {
  ComunitiesIcon,
  NewChatIcon,
  NotFoundImageProfile,
  StatesIcon,
} from "@/app/constants/constants"
import { Menu } from "../../Menu/Menu"
import styles from "./header.module.css"

const menuOptions = [
  "Nuevo grupo",
  "Nueva comunidad",
  "Mensajes destacados",
  "Seleccionar chats",
  "Configuración",
  "Cerrar sesión",
]
export function HeaderChat({ setViewStatuses }) {
  return (
    <header className={styles.header}>
      <NotFoundImageProfile className={styles.imageProfile} />
      <button className={styles.buttonHeader} title="Comunidades">
        <ComunitiesIcon />
      </button>
      <button
        className={styles.buttonHeader}
        title="Estados"
        onClick={() => setViewStatuses(true)}
      >
        <StatesIcon />
      </button>
      <button className={styles.buttonHeader} title="Nuevo chat">
        <NewChatIcon />
      </button>
      <Menu options={menuOptions} />
    </header>
  )
}
