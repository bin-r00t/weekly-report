import { readFile, writeFile } from "node:fs/promises";

export const readData = async () => {
  try {
    const data = await readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeData = async (data: any) => {
  const oldData = await readData();
  const newData = [...oldData, data];
  await writeFile("data.json", JSON.stringify(newData));
};

export const readDataByAuthor = async (author: string, date: string | Date) => {
  const data = await readData();
  const timestamp =
    date instanceof Date ? date.getTime() : new Date(date).getTime();
  return data.filter((item: any) => {
    const itemTimestamp = new Date(item.createdAt).getTime();
    console.log(itemTimestamp, timestamp, item.author === author, item);
    return itemTimestamp >= timestamp && item.author === author;
  });
};

export const readDataById = async (id: string) => {
  const data = await readData();
  return data.find((item: any) => item.id === id);
};

export const updateDataById = async (id: string, data: any) => {
  const oldData = await readData();
  const newData = oldData.map((item: any) => (item.id === id ? data : item));
  await writeFile("data.json", JSON.stringify(newData));
};

export const deleteDataById = async (id: string) => {
  const oldData = await readData();
  const newData = oldData.filter((item: any) => item.id !== id);
  await writeFile("data.json", JSON.stringify(newData));
};

export const readDataByDate = async (date: string | Date) => {
  const timestamp =
    date instanceof Date ? date.getTime() : new Date(date).getTime();
  const data = await readData();
  return data.filter((item: any) => {
    const itemTimestamp = new Date(item.createdAt).getTime();
    return itemTimestamp >= timestamp;
  });
};
