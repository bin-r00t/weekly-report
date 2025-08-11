import { ArrowDownLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, NavLink, useLoaderData, useRouteLoaderData } from "react-router";

export default function LeftSide({ entries }: { entries: any[] }) {
  const [menus, setMenus] = useState<any>([]);
  useEffect(() => {
    const ms: any[] = []
    entries.forEach((e) => {
      if (ms.find((m: any) => m.author === e.author)) {
        return;
      }
      ms.push(e);
    });
    setMenus(ms);
  }, [entries]);

  const onExport = () => {
    const data = JSON.stringify(entries);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
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
