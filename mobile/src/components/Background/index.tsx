import { ReactNode } from "react"
import { ImageBackground } from "react-native"

import { styles } from "./styles"

import backgroundImg from "../../assets/background-galaxy.png"

interface Props {
  children: ReactNode
}

export function Background({ children }: Props) {
  return (
    <ImageBackground 
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  )
}
