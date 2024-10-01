import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Item from './Item'

export default function ItemsList({items}) {
  return (
    <FlatList
        data={items}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.name}
    />
  )
}

const styles = StyleSheet.create({})