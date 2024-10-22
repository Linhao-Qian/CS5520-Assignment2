import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { commonStyles } from "../helper/helper";

export default function PressableButton({title, pressedFunction, componentStyle, pressedStyle, titleStyle}) {
  return (
    <Pressable
      onPress={pressedFunction}
      style={({pressed}) => [
        commonStyles.defaultButtonStyle,
        componentStyle,
        pressed && commonStyles.pressedStyle,
        pressed && pressedStyle
      ]}
    >
      <Text style={[commonStyles.darkText, titleStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
