import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors, commonStyles } from '../helper/helper';
import { useNavigation } from '@react-navigation/native';

export default function Item({item, type}) {
  const navigation = useNavigation();
  const {name, value, date, isSpecial} = item;

  return (
    <Pressable
      android_ripple={{color: 'white', radius: 20}}
      style={({pressed}) => [commonStyles.itemContainer, pressed && commonStyles.pressedStyle]}
      onPress={() => navigation.navigate(type === 'activities' ? 'EditAnActivity' : 'EditADietEntry', {item})}
    >
      <Text style={[commonStyles.itemText, commonStyles.itemLeft]}>{name}</Text>
      <View style={commonStyles.itemRight}>
        {isSpecial && !item.isApproved && <Ionicons name="warning" size={24} color={colors.yellow} />}
        <View style={commonStyles.textContainer}>
            <Text style={commonStyles.itemText}>{new Date(date).toString().slice(0, 15)}</Text>
        </View>
        <View style={commonStyles.textContainer}>
            <Text style={commonStyles.itemText}>{value}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({})