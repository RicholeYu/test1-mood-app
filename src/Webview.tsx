import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  uri: string;
  baseDirectory: string;
};

export default function WebviewCt(props: Props) {
  const { uri, baseDirectory } = props;

  return (
    <WebView
      style={styles.flex}
      originWhitelist={["*"]}
      source={
        uri.startsWith("http") ? { uri } : { baseUrl: baseDirectory, uri }
      }
      cacheMode="LOAD_NO_CACHE"
      allowFileAccess={true}
      allowUniversalAccessFromFileURLs={true}
      allowingReadAccessToURL={baseDirectory}
      allowFileAccessFromFileURLs={true}
      allowsLinkPreview={true}
    ></WebView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
