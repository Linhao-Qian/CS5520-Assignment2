import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../helper/context';
import { commonStyles } from '../helper/helper';

export default function Diet() {
  const { theme, diet } = useContext(Context);

  return (
    <View style={[commonStyles.topContainer, commonStyles[theme]]}>
      <Text>Diet</Text>
    </View>
  )
}

const styles = StyleSheet.create({})