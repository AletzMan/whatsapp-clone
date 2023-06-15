import {
  ActivityIcon,
  AnimalIcon,
  EmojiIcon,
  emojis,
  FlagsIcon,
  FoodIcon,
  ObjectIcon,
  SymbolIcon,
  TravelIcon,
} from "@/app/constants/constants"
import styles from "./emojiwindow.module.css"

import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { useState } from "react"
import { uid } from "uid"
import { FlagIcon } from "react-flag-kit"
import Image from "next/image"
import { GetUnicode } from "@/app/constants/functions"

const baseURLFlag = "https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/"
const tabsPanel = [
  {
    id: 0,
    name: "Smileys & Emotion",
  },
  {
    id: 1,
    name: "People & Body",
  },
  {
    id: 2,
    name: "Animals & Nature",
  },
  {
    id: 3,
    name: "Food & Drink",
  },
  {
    id: 4,
    name: "Activities",
  },
  {
    id: 5,
    name: "Travel & Places",
  },
  {
    id: 6,
    name: "Objects",
  },
  {
    id: 7,
    name: "Symbols",
  },
  {
    id: 8,
    name: "Flags",
  },
]

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className={styles.emojiContainer}>{children}</div>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function ContainerEmojis({ category, setEmojiSelected }) {
  return (
    <>
      {emojis.map((emoji, index) => {
        if (emoji.category === category) {
          return (
            <button
              key={uid()}
              className={styles.buttonEmoji}
              onClick={() => setEmojiSelected(emoji.emoji)}
            >
              {category !== "Flags" && (
                <span className={styles.emoji}>{emoji.emoji}</span>
              )}
              {category === "Flags" && index < 1588 && (
                <span className={styles.emoji}>{emoji.emoji}</span>
              )}
              {category === "Flags" && index > 1587 && (
                <span className={styles.emoji}>
                  <Image
                    src={`${baseURLFlag}${GetUnicode(emoji.emoji)}.svg`}
                    width={35}
                    height={30}
                    alt={""}
                  />
                </span>
              )}
            </button>
          )
        }
      })}
    </>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export function EmojiWindow({ setEmojiSelected }) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#2a3942",
        zIndex: "10",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              height: "4px",
              backgroundColor: "#00a884",
            },
            "& .MuiButtonBase-root": {
              width: "100%",
              maxWidth: "12.5%",
              minWidth: "12.5%",
              color: "#8696a0",
            },
            color: "#8696a0",
          }}
        >
          <Tab label="" {...a11yProps(0)} icon={<EmojiIcon />} />
          <Tab label="" {...a11yProps(1)} icon={<AnimalIcon />} />
          <Tab label="" {...a11yProps(2)} icon={<FoodIcon />} />
          <Tab label="" {...a11yProps(3)} icon={<ActivityIcon />} />
          <Tab label="" {...a11yProps(4)} icon={<TravelIcon />} />
          <Tab label="" {...a11yProps(5)} icon={<ObjectIcon />} />
          <Tab label="" {...a11yProps(6)} icon={<SymbolIcon />} />
          <Tab label="" {...a11yProps(7)} icon={<FlagsIcon />} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <input
          type="search"
          className={styles.searchEmoji}
          placeholder="Buscar emoji"
        />
        <ContainerEmojis
          category={"Smileys & Emotion"}
          setEmojiSelected={setEmojiSelected}
        />
        <ContainerEmojis
          category={"People & Body"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContainerEmojis
          category={"Animals & Nature"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ContainerEmojis
          category={"Food & Drink"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ContainerEmojis
          category={"Activities"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <ContainerEmojis
          category={"Travel & Places"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ContainerEmojis
          category={"Objects"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ContainerEmojis
          category={"Symbols"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ContainerEmojis
          category={"Flags"}
          setEmojiSelected={setEmojiSelected}
        />
      </TabPanel>
    </Box>
  )
}
