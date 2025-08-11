import { useLayoutEffect, useState } from "react";
import { Outlet } from "react-router";

export default function ThisWeekLayout() {
  const [user, setUser] = useState<string | null>(null);

  useLayoutEffect(() => {
    const user = localStorage.getItem("user") || null;
    setUser(user);
  }, []);

  return (
    <div className="bg-white h-screen flex flex-col">
      <div className="header bg-neutral-100 border-b border-slate-300 p-4">
        <h1 className="text-2xl">User: {user}</h1>
      </div>
      <div className="body flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
