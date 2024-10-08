import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

import { ThemeContext } from "./ThemeProvider";
import { useContext } from "react";

const BubbleButton = ({ onPress, text, style, unTouchable, xOnPress, fontSize, fontColor }) => {
  const { currentTheme } = useContext(ThemeContext);
  
  
  return (
    <>
      {!unTouchable ? (
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 20,
            backgroundColor: currentTheme.foregroundColor,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: '5%',
            width: "85%",
            ...style,
          }}
        >
          <Text
            style={{
              fontSize: fontSize ? fontSize : 18,
              fontWeight: "bold",
              color: fontColor ? fontColor : currentTheme.buttonTextColor, // Blue color for buttons
              textAlign: "center",
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          onPress={onPress}
          style={{
            padding: 20,
            backgroundColor: currentTheme.foregroundColor,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
            width: "85%",
            ...style,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: currentTheme.fontColor, // Blue color for buttons
              textAlign: "center",
            }}
          >
            {text}
          </Text>
          {xOnPress && (
            <TouchableOpacity
              onPress={xOnPress}
              style={{
                position: "absolute",
                right: 10,
                bottom: "50%",
              }}
            >
              <Text
                style={{
                  fontSize: 35,
                  color: "red",
                }}
              >
                x
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

export default BubbleButton;
