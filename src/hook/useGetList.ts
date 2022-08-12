import { useState } from "react";

export type ListItem = {
  name: string;
  type: string;
  englishName: string;
  version: string;
  url: string;
  img: string;
  zipname: string;
  entry: string;
};

type Source = {
  apps: ListItem[];
};

export default function useGetList(): [ListItem[], () => void] {
  const [list, setList] = useState<ListItem[]>([]);

  async function getList() {
    const res: Source = await fetch(
      `http://192.168.10.105:19000/source/source.json?random=${Math.random()}`
    ).then((res) => res.json());

    setList(res.apps);
  }

  return [list, getList];
}
