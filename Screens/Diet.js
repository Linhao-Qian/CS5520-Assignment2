import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Context } from '../helper/context';
import { commonStyles } from '../helper/helper';
import ItemsList from '../Components/ItemsList';

export default function Diet() {
  const { theme, diet } = useContext(Context);

  return (
    <View style={[commonStyles.topContainer, commonStyles[theme]]}>
      <ItemsList items={diet} />
    </View>
  )
}

const styles = StyleSheet.create({})