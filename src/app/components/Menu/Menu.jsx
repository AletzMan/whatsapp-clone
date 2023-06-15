"use client"
import { ArrowDownIcon, ArrowIcon, MenuIcon } from "@/app/constants/constants"
import { useEffect, useRef, useState } from "react"
import { uid } from "uid"
import styles from "./menu.module.css"

export function Menu({
  options,
  isChat,
  className,
  selectedItem,
  isPositionArrow,
  notMove,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const menuRef = useRef(null)

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
  const HandleSelectedItemMenu = (index) => {
    selectedItem(index)
    setIsOpen(false)
  }

  const HandleOpenMenu = () => {
    setIsOpen((prev) => !prev)
    setTimeout(() => {
      const hightMenu = menuRef?.current?.clientHeight
      const menuRect = menuRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (menuRect.top + 75 + 219 > windowHeight) {
        menuRef.current.style.transform = `translateY(-${hightMenu}px)`
      }
      if (menuRect.x < 800 && notMove) {
        menuRef.current.style.transform = `translateX(${100}px)`
      }
    }, 30)
  }

  return (
    <>
      <button
        ref={buttonRef}
        className={`${styles.buttonHeader} ${
          isChat && styles.circleOFF
        } ${className}`}
        title="Menú"
        onClick={HandleOpenMenu}
      >
        {!isChat && <MenuIcon />}
        {isChat && <ArrowDownIcon />}
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          className={`${styles.menuProfile} ${
            isPositionArrow && styles.isPositionArrow
          }`}
        >
          {options.map((option, index) => (
            <li
              className={styles.buttonMenu}
              key={uid()}
              onClick={() => HandleSelectedItemMenu(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
