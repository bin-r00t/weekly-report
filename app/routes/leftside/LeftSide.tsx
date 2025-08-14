import { ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useRouteLoaderData } from "react-router";

export default function LeftSide({ entries }: { entries: any[] }) {
  const [menus, setMenus] = useState<any>([]);
  useEffect(() => {
    const ms: any[] = [];
    entries.forEach((e) => {
      if (ms.find((m: any) => m.author === e.author)) {
        return;
      }
      ms.push(e);
    });
    setMenus(ms);
  }, [entries]);

  const onExport = () => {
    const cardsInPage = document.querySelectorAll(".card");
    const cards = Array.from(cardsInPage);
    let text = `
办公小组周报-${new Date().toLocaleDateString()}
报送人: Admin

一、本周主要工作概述
\n`;

    // 根据作者 处理工作内容
    const authorMap = new Map<string, any>();
    const all = cards.map((card) => {
      return {
        title: card.querySelector("h2")?.textContent,
        author: card
          .querySelector(".author")
          ?.textContent?.replace("作者: ", ""),
        role: card.querySelector(".role")?.textContent,
        content: card
          .querySelector(".content")
          ?.innerHTML.replaceAll("</div>", "")
          .replaceAll("<div>", "\n"),
        plan: card.querySelector(".plans")?.textContent,
      };
    });

    all.forEach((item) => {
      if (!item.author) {
        return;
      }
      if (!authorMap.has(item.author)) {
        authorMap.set(item.author, [item]);
      } else {
        authorMap.set(item.author, [...authorMap.get(item.author), item]);
      }
    });

    // frontend role 处理
    text += `\n前端\n`;
    authorMap.forEach((items, author) => {
      console.log("items", items);
      if (items[0].role === "前端") {
        text += `\n${author}\n`;
        items.forEach((item: any) => {
          text += `\n项目: ${item.title}`;
          text += `${item.content}\n`;
        });
        text += `\n`;
      }
    });

    // backend role 处理
    text += `\n后端\n`;
    authorMap.forEach((items, author) => {
      if (items[0].role === "后端") {
        text += `\n${author}\n`;
        items.forEach((item: any) => {
          text += `\n项目: ${item.title}`;
          text += `${item.content}\n`;
        });
        text += `\n\n`;
      }
    });

    // plans
    text += `
二、下周计划
\n`;

    // 按照项目划分计划
    let projMap = new Map<string, any>();
    all.forEach((item: any) => {
      if (item.plan && item.title) {
        if (!projMap.has(item.title)) {
          projMap.set(item.title, [item]);
        } else {
          projMap.set(item.title, [...projMap.get(item.title), item]);
        }
      }
    });
    projMap.forEach((items, title) => {
      text += `项目: ${title}\n`;
      items.forEach((item: any, index: number) => {
        text += `${index + 1}. ${item.plan}\n`;
      });
      text += `\n`;
    });

    // const data = JSON.stringify(entries);
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.txt";
    a.click();
  };
  return (
    <div className="h-full overflow-y-auto bg-neutral-100 w-96 border-r border-neutral-300 flex flex-col gap-3">
      <div className="cta-create p-3 flex gap-3">
        <Link
          to={"/thisweek/create"}
          className="block border-gray-600 capitalize text-sm border w-full px-9 cursor-pointer text-gray-600 rounded-md text-center p-3 transition hover:text-white hover:bg-gray-600"
        >
          + Create
        </Link>
        <button
          onClick={onExport}
          className="bg-gray-500 text-white rounded-md hover:bg-gray-700 flex gap-3 items-center px-3 cursor-pointer"
        >
          <ArrowDownLeftIcon className="w-4 h-4" />
          Export
        </button>
      </div>
      <div className="users p-3">
        <h2 className="text-gray-400 my-5 text-sm font-bold">
          Members ({menus.length})
        </h2>
        <ul className="flex flex-col gap-3">
          {menus.map((u: any) => (
            <li key={u.author}>
              <NavLink
                to={`/thisweek/${u.author}`}
                className={({ isActive }) =>
                  `block text-gray-600 hover:bg-gray-600 hover:text-white transition cursor-pointer p-3 rounded-md ${
                    isActive ? "bg-gray-600 text-white" : ""
                  }`
                }
              >
                {u.author}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
