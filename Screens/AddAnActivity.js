import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormItem from '../Components/FormItem';
import { deleteFromDB, updateInDB, writeToDB } from '../Firebase/firestoreHelper';
import Checkbox from 'expo-checkbox';
import PressableButton from '../Components/PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function AddAnActivity({navigation, route}) {
  const { theme } = useContext(Context);
  const [dropDownPickerOpen, setDropDownPickerOpen] = useState(false);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [activity, setActivity] = useState(route.params?.item.name);
  const [duration, setDuration] = useState(route.params?.item && Number(route.params.item.value.split(' ')[0]).toString());
  const [date, setDate] = useState(route.params?.item ? new Date(route.params.item.date) : null);
  const [isApproved, setIsApproved] = useState(route.params?.item?.isApproved);
  const collectionName = 'activities';

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
    if (!activity || !date || !duration || isNaN(duration) || Number(duration) < 0) {
      Alert.alert('Invalid input', 'Please fill the fields correctly.');
      return;
    }
    const data = {
      name: activity,
      value: Number(duration) + ' min',
      date: date.getTime(),
      isSpecial: Number(duration) > 60 && (activity === 'Running' || activity === 'Weights'),
    }
    if (data.isSpecial) {
      data.isApproved = !!isApproved;
    }
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
      <View style={commonStyles.activity}>
        <FormItem label='Activity *'>
          <DropDownPicker
            style={commonStyles.formItem}
            placeholder='Select an activity'
            labelProps={{style: commonStyles.lightText}}
            open={dropDownPickerOpen}
            value={activity}
            items={['Walking', 'Running', 'Swimming', 'Weights', 'Yoga', 'Cycling', 'Hiking'].map(item =>
              ({label: item, value: item, labelStyle: commonStyles.lightText})
            )}
            setOpen={setDropDownPickerOpen}
            setValue={setActivity}
          />
        </FormItem>
      </View>
      <FormItem label='Duration (min) *'>
        <TextInput
          style={[commonStyles.formItem, commonStyles.input]}
          value={duration}
          onChangeText={newDuration => setDuration(newDuration)}
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
        {/* Give the component DateTimePicker a constant height so that its height does not collapse even when it is not visible. */}
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