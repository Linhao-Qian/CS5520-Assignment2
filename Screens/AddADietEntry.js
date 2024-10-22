import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormItem from '../Components/FormItem';
import { deleteFromDB, updateInDB, writeToDB } from '../Firebase/firestoreHelper';
import Checkbox from 'expo-checkbox';
import PressableButton from '../Components/PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddADietEntry({navigation, route}) {
  const { theme } = useContext(Context);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [description, setDescription] = useState(route.params?.item.name);
  const [calories, setCalories] = useState(route.params?.item.value.toString());
  const [date, setDate] = useState(route.params?.item ? new Date(route.params.item.date) : null);
  const [isApproved, setIsApproved] = useState(route.params?.item?.isApproved);
  const collectionName = 'diet';
  
  useEffect(() => {
    if (route.params?.item) {
      navigation.setOptions({
        headerRight: () =>
          <Pressable
            android_ripple={{color: 'white', radius: 20}}
            style={({pressed}) => [commonStyles.headerIcons, pressed && commonStyles.pressedStyle]}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={24} color="white" />
          </Pressable>,
      })
    }
  }, [])

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      {
        text: "No",
      },
      {
        text: "Yes",
        onPress: () => {
          deleteFromDB(route.params?.item.id, collectionName);
          navigation.goBack();
        },
      },
    ])
  }

  const handlePressOut = () => {
    if (!isCalendarShow && !date) {
      setDate(new Date());
    }
    setIsCalendarShow(prev => !prev);
  }

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleSaveChanges = (data, id) => {
    updateInDB(data, id, collectionName);
    navigation.goBack();
  }

  const handleSave = () => {
    // validate the inputs
    if (!description || !date || !calories || isNaN(calories) || Number(calories) < 0) {
      Alert.alert('Invalid input', 'Please fill the fields correctly.');
      return;
    }
    const data = {
      name: description,
      value: Number(calories),
      date: date.getTime(),
      isSpecial: Number(calories) > 800,
    }
    if (data.isSpecial) {
      data.isApproved = !!isApproved;
    }
    // If the item is being edited, ask for confirmation before saving changes.
    if (route.params?.item) {
      Alert.alert("Important", "Are you sure you want to save these changes?", [
        {
          text: "No",
        },
        {
          text: "Yes",
          onPress: () => handleSaveChanges(data, route.params?.item.id),
        },
      ])
    } else {
      writeToDB(data, collectionName);
      navigation.goBack();
    }
  }

  return (
    <View style={[commonStyles.centerContainer, commonStyles[theme], commonStyles.content]}>
      <FormItem label='Description *'>
        <TextInput
          style={[commonStyles.formItem, commonStyles.input, commonStyles.description]}
          value={description}
          multiline={true}
          onChangeText={newDescription => setDescription(newDescription)}
        />
      </FormItem>
      <FormItem label='Calories *'>
        <TextInput
          style={[commonStyles.formItem, commonStyles.input]}
          value={calories}
          onChangeText={newCalories => setCalories(newCalories)}
        />
      </FormItem>
      <FormItem label='Date *'>
        <TextInput
          style={[commonStyles.formItem, commonStyles.input]}
          value={date ? date.toString().slice(0, 15) : ''}
          inputMode='none'
          onPressOut={handlePressOut}
          onBlur={() => setIsCalendarShow(false)}
        />
        <View style={commonStyles.dateTimePicker}>
          {isCalendarShow && <DateTimePicker
            value={date || new Date()}
            onChange={(event, selectedDate) => {
              setIsCalendarShow(false);
              setDate(selectedDate);
            }}
            display="inline"
          />}
        </View>
      </FormItem>
      {!isCalendarShow && 
      <View style={commonStyles.bottomGroup}>
        {route.params?.item.isSpecial &&
        <View style={commonStyles.checkbox}>
          <Text style={commonStyles.checkboxText}>This item is marked as special. Select the checkbox if you would like to approve it.</Text>
          <Checkbox value={isApproved} onValueChange={setIsApproved} />
        </View>}
        <View style={commonStyles.buttonGroup}>
          <PressableButton pressedFunction={handleCancel} title="Cancel" componentStyle={commonStyles.cancelButtonStyle} />
          <PressableButton pressedFunction={handleSave} title="Save" />
        </View>
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({})