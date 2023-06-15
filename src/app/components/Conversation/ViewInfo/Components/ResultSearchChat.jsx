import { GetTimeElapsed } from "@/app/constants/constants"
import { MessageResult } from "./MessageResult"
import styles from "./resultsearch.module.css"

export function ResultSearchChat({ message, search, setOpenView }) {
  return (
    <article
      className={`${styles.containerMessage}`}
      onClick={() => setOpenView()}
    >
      <span className={`${styles.date}`}>{GetTimeElapsed(message.date)}</span>
      <MessageResult message={message} search={search} color="#00a884" />
    </article>
  )
}
