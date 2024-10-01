import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context';

export default function FormItem({label, children}) {
  const { theme } = useContext(Context);

  return (
    <View style={commonStyles.item}>
        <Text style={[commonStyles[theme + 'Text'], commonStyles.formItemText]}>{label}</Text>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({})