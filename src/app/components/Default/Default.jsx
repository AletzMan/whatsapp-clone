"use client"
import { LockIcon } from "@/app/constants/constants"
import Image from "next/image"
import styles from "./default.module.css"
import imageDefault from "@/assets/image_default.svg"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
export function Default() {
  const router = useRouter()
  useEffect(() => {
    //router.push("/")
  }, [])
  return (
    <main className={styles.section}>
      <Image
        src={imageDefault}
        width={400}
        height={250}
        alt="image from computer and mobil"
      />
      <h2 className={styles.title}>WhatsApp Web</h2>
      <p className={styles.paragraph}>
        Envía y recibe mensajes sin necesidad de tener tu teléfono conectado.
      </p>
      <p className={styles.paragraph}>
        Usa WhatsApp en hasta 4 dispositivos vinculados y 1 teléfono a la vez.
      </p>
      <span className={styles.text}>
        <LockIcon /> Cifrado de extremo a extremo
      </span>
      <div className={styles.slash}></div>
    </main>
  )
}
