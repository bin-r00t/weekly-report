import { Outlet, useLoaderData } from "react-router";
import { readCurrentWeekData } from "~/db/utils";
import LeftSide from "../leftside/LeftSide";
import { useEffect, useMemo, useState } from "react";

export const loader = async () => {
  // const data = await readCurrentWeekData();
  return { data: [] };
};

export default function CurrentWeekLayout() {
  // const { data } = useLoaderData<typeof loader>();
  // const entries = new Set(data.map((u: any) => u.author));
  const [user, setUser] = useState<string | null>(null);
  // useEffect(() => {
  //   const user = localStorage.getItem("user") || null;
  //   setUser(user);
  // }, []);

  // const userDisplay = useMemo(() => {
  //   if (user) {
  //     return user;
  //   }
  //   return "Anonymous";
  // }, [user]);
  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="header bg-neutral-100 border-b border-slate-300 p-4">
        <h1 className="text-2xl font-bold">User: {"userDisplay"}</h1>
      </div>
      <div className="body flex-1 flex">
        {/* <LeftSide
          entries={Array.from(entries).map((u: any) => ({ name: u, id: u }))}
        /> */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
