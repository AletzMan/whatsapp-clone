import Button from "@mui/material/Button"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import { Fragment, useEffect, useState } from "react"
import { CloseIcon } from "@/app/constants/constants"
import { Slide } from "@mui/material"

export default function SnackBar({ selectedItem, message, notificationON }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  useEffect(() => {
    if (selectedItem === 4) {
      setOpen(true)
    }
    if (selectedItem === 1 && notificationON) {
      setOpen(true)
    }
  }, [selectedItem])

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
  }
  const action = (
    <Fragment>
      <Button color="warning" size="small" onClick={handleClose}>
        Deshacer
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

  return (
    <div style={{ position: "absolute" }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        sx={{
          "& .MuiSnackbarContent-root": {
            borderRadius: "2px",
            backgroundColor: "#111b21f2",
            color: "white",
          },
          "& .MuiButton-textWarning": {
            color: "yellow",
            textTransform: "capitalize",
          },
        }}
      />
    </div>
  )
}
