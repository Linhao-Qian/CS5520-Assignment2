import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors, commonStyles } from '../helper/helper'
import { Context } from '../helper/context'

export default function Settings() {
  const { theme, toggleTheme } = useContext(Context);

  return (
    <View style={[commonStyles.centerContainer, commonStyles[theme]]}>
      <Button
        title='Toggle Theme'
        onPress={toggleTheme}
        color={theme === 'light' ? colors.bluishViolet : colors.light}
      />
    </View>
  )
}

const styles = StyleSheet.create({})