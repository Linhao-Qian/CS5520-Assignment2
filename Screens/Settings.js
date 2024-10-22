import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context'
import PressableButton from '../Components/PressableButton';

export default function Settings() {
  // Use React Context to communicate theme change to all the components.
  const { theme, toggleTheme } = useContext(Context);

  return (
    <View style={[commonStyles.centerContainer, commonStyles[theme]]}>
      <PressableButton
        pressedFunction={toggleTheme}
        title='Toggle Theme'
        componentStyle={commonStyles.lightText}
      />
    </View>
  )
}

const styles = StyleSheet.create({})