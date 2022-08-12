import { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { ListItem } from "./hook/useGetList";
import useListItem from "./hook/useListItem";
import WebView from "./Webview";
import Header from "./Header";

type Props = {
  data: ListItem[];
};

export default function Dashboard(props: Props) {
  const [listItem, setListItem] = useState<null | ListItem>(null);
  const [uri, baseDirectory] = useListItem(listItem);

  return (
    <>
      {uri ? (
        <Header
          title={listItem?.name || ""}
          back={() => {
            setListItem(null);
          }}
        />
      ) : null}
      <View style={styles.dashboard}>
        {!uri ? (
          props.data.map((item) => {
            return (
              <View
                key={item.name}
                style={styles.listItem}
                onTouchStart={() => setListItem(item)}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.img,
                  }}
                ></Image>
                <Text style={styles.text}>{item.name}</Text>
              </View>
            );
          })
        ) : (
          <WebView uri={uri} baseDirectory={baseDirectory} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    marginTop: 0,
    padding: 0,
    flexDirection: "row",
  },
  listItem: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
    backgroundColor: "#FFF",
    marginBottom: 9,
    borderRadius: 10,
  },
  text: {
    color: "#FFF",
    width: 100,
    textAlign: "center",
  },
});
