import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import Item from './Item'

// Use the prop "item" to communicate what type of entries (diet or activity) to show.
export default function ItemsList({items, type}) {
  return (
    // FlatList has a better performance for showing a list of dynamic data than ScrollView.
    <FlatList
      data={items}
      renderItem={({item}) => <Item item={item} type={type} />}
      keyExtractor={item => item.id}
    />
  )
}

const styles = StyleSheet.create({})