import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormItem from '../Components/FormItem';

export default function AddAnActivity({navigation}) {
  const { theme, addAnActivity } = useContext(Context);
  const [dropDownPickerOpen, setDropDownPickerOpen] = useState(false);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [activity, setActivity] = useState();
  const [duration, setDuration] = useState();
  const [date, setDate] = useState();

  const handlePressOut = () => {
    if (!isCalendarShow && !date) {
      setDate(new Date());
    }
    setIsCalendarShow(prev => !prev);
  }

  const handleCancel = () => {
    navigation.goBack();
  }

  const handleSave = () => {
    // validate the inputs
    if (!activity || !date || !duration || isNaN(duration) || Number(duration) < 0) {
      Alert.alert('Invalid input', 'Please fill the fields correctly.');
      return;
    }
    addAnActivity({
      name: activity,
      value: Number(duration) + ' min',
      date: date.toString().slice(0, 15),
      isSpecial: Number(duration) > 60 && (activity === 'Running' || activity === 'Weights'),
    });
    navigation.goBack();
  }

  return (
    <View style={[commonStyles.centerContainer, commonStyles[theme], commonStyles.content]}>
      <View style={{zIndex: 1000}}>
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
        <View style={{ height: 240}}>
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
      {!isCalendarShow && <View style={commonStyles.buttonGroup}>
        <Button title='Cancel' onPress={handleCancel} />
        <Button title='Save' onPress={handleSave} />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({})