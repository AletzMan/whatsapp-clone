import {
  ArrowIcon,
  BlockedIcon,
  CloseIcon,
  DislikeIcon,
  LockIcon,
  NotificationIcon,
  ScrapIcon,
  SearchIcon,
  StarIcon,
  TimerIcon,
} from "@/app/constants/constants"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import { InputSearch } from "../../InputSearch/InputSearch"
import { ResultSearchChat } from "./Components/ResultSearchChat"
import styles from "./viewinfo.module.css"

export function ViewInfo({
  setOpenView,
  openView,
  userData,
  type,
  InfoContact,
}) {
  const [inputValue, setInputValue] = useState("")
  const [searchResults, setSearchResults] = useState("")
  useEffect(() => {
    if (inputValue.length > 1) {
      const results = userData?.messages?.filter((message) =>
        message?.message?.toLowerCase()?.includes(inputValue.toLowerCase())
      )
      setSearchResults(results)
    }
  }, [inputValue])

  useEffect(() => {
    setInputValue("")
  }, [userData])

  const HandleCloseViewSearch = () => {
    setOpenView(false)
    setInputValue("")
  }
  console.log(type)
  return (
    <section className={`${styles.view} ${openView && styles.viewOpen}`}>
      <header className={styles.viewHeader}>
        <button className={styles.viewClose} onClick={HandleCloseViewSearch}>
          <CloseIcon />
        </button>
        <span className={styles.viewTitle}>
          {type === "Search" ? "Buscar mensajes" : "Info. del contacto"}
        </span>
      </header>

      {type === "Search" && (
        <div className={styles.resultArea}>
          <InputSearch
            placeholder={"Buscar..."}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <div className={styles.resultSearch}>
            {inputValue == "" && (
              <span className={styles.searchText}>
                {`Buscar mensajes con ${userData?.name || "este mismo número"}`}
              </span>
            )}
            {searchResults &&
              inputValue?.length > 2 &&
              searchResults?.map((result) => (
                <ResultSearchChat
                  key={uid()}
                  message={result}
                  search={inputValue}
                  setOpenView={HandleCloseViewSearch}
                />
              ))}
          </div>
        </div>
      )}
      {type === "Info" && (
        <div className={styles.content}>
          <div className={styles.infoProfile}>
            <div className={styles.photoContainer}>
              <Image
                className={styles.photo}
                src={InfoContact.photo}
                alt={`photo of ${InfoContact.name}`}
                width={200}
                height={200}
              />
            </div>
            <span className={styles.name}>{InfoContact.name}</span>
            <span className={styles.phone}>{InfoContact.phone}</span>
          </div>
          <div className={styles.attach}>
            <span className={styles.attachTitle}>
              Archivos, enlaces y documentos
            </span>
            <span className={styles.attachNumber}>0</span>
          </div>
          <div className={styles.config}>
            <div className={styles.option}>
              <StarIcon />
              <span className={styles.text}>Mensajes destacados</span>
            </div>
            <div className={styles.option}>
              <NotificationIcon />
              <span className={styles.text}>Silenciar notificaciones</span>
            </div>
            <div className={styles.option}>
              <TimerIcon />
              <span className={styles.text}>Mensajes temporales</span>
            </div>
            <div className={styles.option}>
              <LockIcon className={styles.icon} />
              <span className={styles.text}>Cifrado</span>
            </div>
            <div className={styles.option}>
              <BlockedIcon className={styles.icon} />
              <span className={styles.textRed}>
                {`Bloquear a ${InfoContact.phone}`}
              </span>
            </div>
            <div className={styles.option}>
              <DislikeIcon className={styles.icon} />
              <span className={styles.textRed}>
                {`Reportar a ${InfoContact.phone}`}
              </span>
            </div>
            <div className={styles.option}>
              <ScrapIcon className={styles.icon} />
              <span className={styles.textRed}>{`Eliminar chat`}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
