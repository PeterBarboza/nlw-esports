import React from "react"
import { View, ViewProps, Text } from "react-native"

import { styles } from "./styles"

interface Props extends ViewProps {
  title: string
  subtitle: string
}

export function Heading({ title, subtitle, ...viewProps }: Props) {
  return (
    <View style={styles.container} {...viewProps}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  )
}
