import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import Dashboard from "./Dashboard";
import useGetList from "./hook/useGetList";

export default function App() {
  const [list, getList] = useGetList();
  const empty = list.length === 0;

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.flex} source={require("../assets/bg.jpg")}>
        {empty ? (
          <Pressable
            style={styles.button}
            onPress={() => {
              getList();
            }}
          >
            <Text style={styles.text}>获取H5离线包列表</Text>
          </Pressable>
        ) : (
          <Dashboard data={list} />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      {
        translateX: -100,
      },
      {
        translateY: -50,
      },
    ],
    backgroundColor: "#FFF",
    color: "#999",
    borderRadius: 3,
    padding: 10,
    width: 200,
    alignSelf: "center",
    marginTop: 20,
  },
  text: {
    textAlign: "center",
  },
});
