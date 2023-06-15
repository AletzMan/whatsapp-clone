"use client"
import { ArrowIcon, LoadingIcon, SearchIcon } from "@/app/constants/constants"
import { useEffect, useRef, useState } from "react"
import styles from "./inputsearch.module.css"

export function InputSearch({ placeholder, inputValue, setInputValue }) {
  const [searchView, setSearchView] = useState(false)
  const buttonRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        if (inputValue.trim() === "") {
          setSearchView(false)
        }
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [inputValue])

  useEffect(() => {
    if (searchView) {
      inputRef.current.focus()
    }
  }, [searchView])

  const HandlerView = (value) => {
    if (!value) {
      setInputValue("")
    }

    setSearchView(value)
  }
  return (
    <div className={styles.search}>
      <button
        className={styles.searchButton}
        onClick={() => HandlerView(!searchView)}
        ref={buttonRef}
      >
        {!searchView && <SearchIcon className={styles.searchIcon} />}
        {searchView && <ArrowIcon className={styles.arrowIcon} />}
      </button>
      <input
        className={styles.searchInput}
        value={inputValue}
        ref={inputRef}
        placeholder={placeholder}
        type="search"
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={(e) => HandlerView(true)}
        autoFocus={searchView}
        title={"Cuadro de texto para introducir la búsqueda"}
      />
      {searchView && <LoadingIcon />}
    </div>
  )
}
