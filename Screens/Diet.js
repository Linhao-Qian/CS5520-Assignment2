import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../helper/context'
import { commonStyles } from '../helper/helper';
import ItemsList from '../Components/ItemsList';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Firebase/firebaseSetup';

export default function Diet() {
  // Use useContext to read the theme.
  const { theme } = useContext(Context);
  const [diet, setDiet] = useState([]);
  
  const collectionName = 'diet';

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, collectionName), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach(docSnapshot => {
        newArray.push({...docSnapshot.data(), id: docSnapshot.id});
      })
      setDiet(newArray);
    })
    return () => unsubscribe();
  }, [])

  return (
    <View style={[commonStyles.topContainer, commonStyles[theme]]}>
      <ItemsList items={diet} type="diet" />
    </View>
  )
}

const styles = StyleSheet.create({})