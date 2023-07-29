import React from "react";
import { View, Text, Button } from "native-base";

const HomeScreen = ({ navigation }) => {
  const handleLearnPress = () => {
    navigation.navigate("Learn");
  };

  const handlePracticePress = () => {
    navigation.navigate("Practice");
  };

  const handleDecksPress = () => {
    navigation.navigate("Error Book");
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View>
      <Text>Welcome to NEET Flashcards App</Text>
      <Button onPress={handleLearnPress}>
        <Text>Learn</Text>
      </Button>
      <Button onPress={handlePracticePress}>
        <Text>Practice</Text>
      </Button>
      <Button onPress={handleErrorBookPress}>
        <Text>Error Book</Text>
      </Button>
      <Button onPress={handleSettingsPress}>
        <Text>Settings</Text>
      </Button>
    </View>
  );
};

export default HomeScreen;
