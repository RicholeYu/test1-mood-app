import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { unzip } from "react-native-zip-archive";
import { ListItem } from "./useGetList";

type Props = ListItem | null;
// 离线zip包缓存目录
const zipDir = FileSystem.documentDirectory + "zip/";
// 离线小程序数据包存放目录
const minisDir = FileSystem.documentDirectory + "minis/";

export default function useListItem(props: Props): [string, string] {
  const [uri, setUri] = useState("");
  const [baseDirectory, setBaseDirectory] = useState("");

  useEffect(() => {
    if (props === null) {
      setUri("");
      setBaseDirectory("");
      return;
    }

    (async () => {
      if (props.type === "web") {
        setUri(props.entry);
        setBaseDirectory("");
        return;
      }

      const miniDir = minisDir + props.englishName + "/";
      // 每次打开页面删除离线包缓存目录，和离线包数据
      try {
        // 有目录删除目录所有内容
        await FileSystem.readDirectoryAsync(zipDir);
        await FileSystem.deleteAsync(zipDir);
        await FileSystem.makeDirectoryAsync(zipDir);
      } catch {
        // 没有目录创建目录
        await FileSystem.makeDirectoryAsync(zipDir);
      }

      try {
        // 有目录删除目录所有内容
        await FileSystem.readDirectoryAsync(minisDir);
        await FileSystem.deleteAsync(minisDir);
        await FileSystem.makeDirectoryAsync(minisDir);
      } catch {
        // 没有目录创建目录
        await FileSystem.makeDirectoryAsync(minisDir);
      }

      try {
        // 下载小程序包
        await FileSystem.downloadAsync(props.url, minisDir + props.zipname);
        // 创建小程序数据包目录
        await FileSystem.makeDirectoryAsync(miniDir);
        // 解压缩小程序包
        await unzip(minisDir + props.zipname, miniDir);

        setUri(miniDir + props.entry);
        setBaseDirectory(miniDir);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [props]);

  return [uri, baseDirectory];
}
