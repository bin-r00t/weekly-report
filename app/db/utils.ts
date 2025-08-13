import { readFile, writeFile } from "node:fs/promises";

export const readData = async () => {
  try {
    const data = await readFile("data.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const readCurrentWeekData = async () => {
  try {
    let data = await readFile("data.json", "utf-8");
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDay() - day + (day === 0 ? -6 : 1);
    const timestamp =
      diff === 1 ? now.setHours(0, 0, 0, 0) : new Date(now.setDate(diff)).getTime();
    let adata = JSON.parse(data);
    return adata.filter((item: any) => {
      const itemTimestamp = new Date(item.createdAt).getTime();
      return itemTimestamp >= timestamp;
    });
  } catch (error) {
    return [];
  }
};

export const writeData = async (data: any) => {
  const oldData = await readData();
  const newData = [...oldData, data];
  await writeFile("data.json", JSON.stringify(newData));
};

export const readDataByAuthor = async (
  author: string,
  date: string | Date | number
) => {
  const data = await readData();
  const timestamp =
    date instanceof Date ? date.getTime() : new Date(date).getTime();
  return data.filter((item: any) => {
    const itemTimestamp = new Date(item.createdAt).getTime();
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
