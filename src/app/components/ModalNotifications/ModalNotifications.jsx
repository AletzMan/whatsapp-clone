import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { useEffect, useState } from "react"

export default function ModalNotifications({
  viewModal,
  setViewModal,
  setNotificationON,
}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("hours")

  useEffect(() => {
    if (viewModal) setOpen(true)
  }, [viewModal])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
    setViewModal(false)
    setNotificationON(false)
  }
  const handleCloseAccept = () => {
    setOpen(false)
    setViewModal(false)
    setNotificationON(true)
  }

  return (
    <div style={{ position: "absolute" }}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#3b4a54",
            color: "#d1d7db",
            position: "absolute",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Silencia las notificaciones"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "0.85em",
              fontWeight: 100,
              color: "#d1d7db99",
            }}
          >
            Ningún participante verá que silenciaste este chat, y que seguirás
            recibiendo una notificación cuando te mencionen.
          </DialogContentText>

          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            sx={{
              "& .MuiButtonBase-root": {
                color: "#d1d7db99",
              },
              "& .PrivateSwitchBase-input,.Mui-checked": {
                color: "#00a884",
              },
            }}
          >
            <FormControlLabel
              value="hours"
              control={<Radio />}
              label="8 horas"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.85em",
                  fontWeight: 100,
                },
              }}
            />
            <FormControlLabel
              value="week"
              control={<Radio />}
              label="1 semana"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.85em",
                  fontWeight: "100",
                },
              }}
            />
            <FormControlLabel
              value="forever"
              control={<Radio />}
              label="Siempre"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.85em",
                  fontWeight: "100",
                },
              }}
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              backgroundColor: "#3b4a54",
              border: "1px solid #75757585",
              borderRadius: "3em",
              textTransform: "capitalize",
              color: "#00a884",
              padding: "0.4em 1.7em",
              ":hover": {
                color: "#10d8ad",
              },
            }}
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <Button
            sx={{
              backgroundColor: "#00a884",
              border: "1px solid #75757585",
              borderRadius: "3em",
              textTransform: "capitalize",
              color: "#3b4a54",
              padding: "0.4em 1.7em",
              ":hover": {
                backgroundColor: "#10d8ad",
              },
            }}
            onClick={handleCloseAccept}
            autoFocus
          >
            Silenciar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
