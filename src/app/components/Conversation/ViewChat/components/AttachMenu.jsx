import {
  CameraIcon,
  ContactIcon,
  DocumentIcon,
  PhotoAndVideoIcon,
  StickerIcon,
  SurveyIcon,
} from "@/app/constants/constants"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import styles from "./attachmenu.module.css"

const menuOptions = [
  {
    name: "Encuesta",
    icon: <SurveyIcon />,
    class: styles.survey,
    classOut: styles.surveyOut,
  },
  {
    name: "Contacto",
    icon: <ContactIcon />,
    class: styles.contact,
    classOut: styles.contactOut,
  },
  {
    name: "Documento",
    icon: <DocumentIcon />,
    class: styles.document,
    classOut: styles.documentOut,
  },
  {
    name: "Cámara",
    icon: <CameraIcon />,
    class: styles.camera,
    classOut: styles.cameraOut,
  },
  {
    name: "Nuevo sticker",
    icon: <StickerIcon />,
    class: styles.sticker,
    classOut: styles.stickerOut,
  },
  {
    name: "Fotos y videos",
    icon: <PhotoAndVideoIcon />,
    class: styles.photoAndVideos,
    classOut: styles.photoAndVideosOut,
  },
]

export function AttachMenu({ viewMenu, buttonRef }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    setIsOpen((prev) => !prev)
  }, [viewMenu])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [])

  return (
    <nav className={styles.navigation}>
      <ul
        className={`${styles.list} ${isOpen && styles.viewMenu} ${
          !isOpen && styles.notViewMenu
        }`}
        ref={menuRef}
      >
        {menuOptions.map((option) => (
          <li className={styles.option} key={uid()}>
            <div className={`${styles.optionContainer}`}>
              <button
                className={`${styles.optionButton} ${isOpen && option.class} ${
                  !isOpen && option.classOut
                }`}
              >
                {option.icon}
              </button>
              <span className={styles.optionName}>{option.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </nav>
  )
}
