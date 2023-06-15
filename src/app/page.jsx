import styles from "./page.module.css"
import { InitView } from "./whatsapp/components/InitView"

export default function Home() {
  return (
    <main className={styles.main}>
      <InitView />
    </main>
  )
}
