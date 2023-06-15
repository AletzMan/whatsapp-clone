import React from "react"
import styles from "./resultsearch.module.css"

export function MessageResult({ message, search, color }) {
  const resultColor = message?.message?.replace(
    new RegExp(search, "gi"),
    `<strong style="color: ${color}">$&</strong>`
  )

  return (
    <span
      className={`${styles.message}`}
      dangerouslySetInnerHTML={{ __html: resultColor }}
    />
  )
}
