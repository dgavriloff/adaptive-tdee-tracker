import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { UserDataContext } from "../../components/UserDataProvider";
import DismissKeyboard from "../../components/DismissKeyboard";
import LabeledInput from "../../components/LabeledInput";
import BubbleButton from "../../components/BubbleButton";
import Segment from "../../components/Segment";

const InitialGoals = ({ navigation }) => {
  const { updateUserData, userData, isInputValid } = useContext(UserDataContext);
  const [goalWeight, setGoalWeight] = useState(userData.goalWeight);
  const [weeklyWeightDelta, setWeeklyWeightDelta] = useState(
    !userData.weeklyWeightDelta ? "0.5" : userData.weeklyWeightDelta
  );
  const [missingFields, setMissingFields] = useState(false);

  const handleNext = () => {
    if (isInputValid(goalWeight, 20, 1000, 'Goal weight')) {
      updateUserData({
        goalWeight: parseFloat(goalWeight),
        weeklyWeightDelta: parseFloat(weeklyWeightDelta),
        dailyCalorieDelta: Math.floor(
          userData.weightUnits === "lbs"
            ? weeklyWeightDelta * 500
            : Math.floor((weeklyWeightDelta * 2.20462 * 500) / 10) * 10
        ),
        loseOrGain: goalWeight > userData.startWeight ? true : false,
      });
      setMissingFields(false);
      navigation.navigate("Baseline Results");
    } else {
      setMissingFields(true);
    }
  };

  const handleBack = () => {
    setMissingFields(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DismissKeyboard style={{ width: "100%", alignItems: "center" }}>
          <Segment label={"Goal Weight"}>
            <LabeledInput
              value={goalWeight ? goalWeight.toString() : ""}
              onChangeText={setGoalWeight}
              placeholder={"Enter goal weight"}
              units={userData.weightUnits}
              borderColor={missingFields && !goalWeight ? "red" : "black"}
            />
          </Segment>
        </DismissKeyboard>
        <Segment
          label={`Desired Weekly Weight ${
            goalWeight > userData.startWeight ? "Gain" : "Loss"
          } in ${userData.weightUnits}`}
        >
          <Picker
            selectedValue={
              weeklyWeightDelta ? weeklyWeightDelta.toString() : ""
            }
            onValueChange={(value) => setWeeklyWeightDelta(value)}
          >
            {[...Array(10).keys()].map((num) => (
              <Picker.Item
                key={num}
                label={(num * 0.5).toString()}
                value={(num * 0.5).toString()}
              />
            ))}
          </Picker>
        </Segment>
        <View style={styles.buttonContainer}>
          <BubbleButton
            text={"Back"}
            onPress={handleBack}
            style={{ width: "45%" }}
          />
          <BubbleButton
            text={"Next"}
            onPress={handleNext}
            style={{ width: "45%" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
  },
});

export default InitialGoals;
