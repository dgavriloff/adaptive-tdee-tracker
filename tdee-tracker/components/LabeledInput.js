import { useContext, useEffect, useState } from "react";
import React from "react";
import { Text, TextInput, View, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemeContext } from "./ThemeProvider";

export default ({
  units,
  placeholder,
  value,
  onChangeText,
  borderColor,
  keyboardType,
  style,
  secureTextEntry,
}) => {
  const [shown, setShown] = useState(false); //shown password is true, hidden is false
  const { currentTheme, hexToRgb, darkMode } = useContext(ThemeContext);

  return (
    <View>
      <Text
        style={{
          position: "absolute",
          left: "80%",
          fontSize: currentTheme.fontSize,
          paddingTop: 20,
          color: currentTheme.fontColor
        }}
      >
        {units}
      </Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: borderColor ? borderColor : currentTheme.fontColor,
          padding: 10,
          fontSize: 20,
          borderRadius: 5,
          marginTop: 10,
          marginBottom: 10,
          width: "100%",
          ...style,
          zIndex: -1,
          color: currentTheme.fontColor,
        }}
        keyboardAppearance={darkMode ? 'dark' : 'light'}
        placeholderTextColor={hexToRgb(currentTheme.fontColor, 0.4)}
        placeholder={placeholder}
        keyboardType={keyboardType ? keyboardType : "numeric"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry ? !shown : false}
      />
      {secureTextEntry && (
        <View
          style={{
            position: "absolute",
            right: 5,
            paddingTop: 24,
            zIndex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShown(!shown);
            }}
            title={shown ? "hide" : "show"}
          >
            <Text
              style={{
                textAlign: "center",
                color: currentTheme.buttonTextColor,
              }}
            >
              {shown ? "hide" : "show"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
