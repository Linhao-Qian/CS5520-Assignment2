import { Alert, Button, StyleSheet, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { commonStyles } from '../helper/helper'
import { Context } from '../helper/context';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormItem from '../Components/FormItem';

export default function AddADietEntry({navigation}) {
  const { theme, addADietEntry } = useContext(Context);
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [description, setDescription] = useState();
  const [calories, setCalories] = useState();
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
    if (!description || !date || !calories || isNaN(calories) || Number(calories) < 0) {
      Alert.alert('Invalid input', 'Please fill the fields correctly.');
      return;
    }
    addADietEntry({
      name: description,
      value: Number(calories),
      date: date.toString().slice(0, 15),
      isSpecial: Number(calories) > 800,
    });
    navigation.goBack();
  }

  return (
    <View style={[commonStyles.centerContainer, commonStyles[theme], commonStyles.content]}>
      <FormItem label='Description *'>
        <TextInput
          style={[commonStyles.formItem, commonStyles.input, styles.description]}
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

const styles = StyleSheet.create({
    description: {
        height: 100,
    }
})