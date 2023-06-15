"use client"
import { WhatsAppIcon } from "@/app/constants/constants"
import { LinearProgress, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from "./initview.module.css"

export function InitView() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          console.log(oldProgress)
          //return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])
  useEffect(() => {
    if (progress === 100) {
      router.push("/whatsapp")
    }
  }, [progress])
  return (
    <section className={styles.section}>
      <WhatsAppIcon />
      <Stack
        sx={{
          width: "30%",
          color: "#00a884",
          borderRadius: "10px",
          margin: "2em 0 1em 0",
        }}
        spacing={2}
      >
        <LinearProgress
          variant="determinate"
          color="inherit"
          value={progress}
        />
      </Stack>
      <h1 className={styles.title}>WhatsApp</h1>
      <div className={styles.message}>Cifrado de extremo a extremo</div>
    </section>
  )
}
