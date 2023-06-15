import {
  BackStatusFixedIcon,
  BackStatusIcon,
  CloseIcon,
  LockIcon,
  NotFoundImageProfile,
} from "@/app/constants/constants"
import { getProfilePhotoUrl } from "@/app/firebase/firebase"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useEffect } from "react"
import styles from "./modal.module.css"

function Profile({ user, index }) {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState()

  useEffect(() => {
    const getData = async () => {
      const url = await getProfilePhotoUrl(user?.photo)
      setProfilePhotoUrl(url)
    }
    getData()
  }, [])
  return (
    <div className={styles.containerProfileContact}>
      <div className={styles.profile}>
        {index === 0 && <span className={styles.state}>RECIENTE</span>}
        <div className={styles.containerPhotoStatus}>
          <div className={styles.containerPhoto}>
            {(profilePhotoUrl && (
              <Image
                className={styles.photo}
                src={profilePhotoUrl}
                width={40}
                height={40}
              />
            )) || <NotFoundImageProfile className={styles.photo} />}
          </div>
          <BackStatusIcon className={styles.profileStatus} />
        </div>
        <span className={styles.user}>{user.name}</span>
        <span className={styles.date}>{user.status}</span>
      </div>
    </div>
  )
}

export function ModalStatuses({ userData, setViewStatuses }) {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.status}>
          <div className={styles.containerProfile}>
            <div className={styles.profileFixed}>
              <NotFoundImageProfile className={styles.photo} />
              <span className={styles.user}>Mi estado</span>
              <span className={styles.date}>No hay actualizaciones</span>
            </div>
          </div>
          {userData.map((user, index) => (
            <Profile key={user.id} index={index} user={user} />
          ))}
          <div className={styles.footer}>
            <LockIcon className={styles.footerIcon} />
            <p className={styles.footerText}>
              Tus actualizaciones de estado están
            </p>
          </div>
          <Link className={styles.footerLink} href={""}>
            cifrados de extremo a extremo
          </Link>
        </div>

        <div className={styles.description}>
          <BackStatusFixedIcon className={styles.descriptionIcon} />
          <button
            className={styles.descriptionCloseButton}
            onClick={() => setViewStatuses(false)}
          >
            <CloseIcon className={styles.descriptionClose} />
          </button>
          <p className={styles.descriptionText}>
            Haz clic en un contacto para ver sus actualizaciones de estado.
          </p>
        </div>
      </section>
    </main>
  )
}
