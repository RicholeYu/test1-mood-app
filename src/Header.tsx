import { View, Image, Text, StyleSheet, Pressable } from "react-native";

type Props = {
  title: string;
  back: () => void;
};

export default function Header(props: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.image} onPress={() => props.back()}>
        <Image source={require("../assets/back.png")}></Image>
      </Pressable>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 30,
    position: "relative",
    backgroundColor: "#FFF",
  },
  title: {
    width: "100%",
    textAlign: "center",
    lineHeight: 40,
  },
  image: {
    position: "absolute",
    top: 10,
    left: 20,
    width: 30,
    zIndex: 10,
  },
});
