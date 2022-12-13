import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./util/colors";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessCount, setGuessCount] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Colors.accent500} />
      </View>
    );
  }

  const pickedNumberHandler = (pickedNumber) => {
    setuserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessCount(numberOfRounds);
  };

  const handleNewGame = () => {
    setuserNumber(null);
    setGuessCount(0);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler} />
    );
  }

  if (userNumber && gameIsOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessCount}
        onStartNewGame={handleNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.jpg")}
          resizeMode="cover"
          style={styles.rootScreen} // this is the style for view type
          imageStyle={styles.backgroundImage} // this is the style for image which is used for background
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
