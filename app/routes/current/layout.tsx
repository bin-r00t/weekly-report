import { Outlet, useLoaderData } from "react-router";
import { readData } from "~/db/utils";
import LeftSide from "../leftside/LeftSide";

export const loader = async () => {
  const data = await readData();
  return { data };
};

export default function CurrentWeekLayout() {
  const { data } = useLoaderData<typeof loader>();
  const entries = new Set(data.map((u: any) => u.author));
  return (
    <div className="bg-white h-screen flex">
      <LeftSide
        entries={Array.from(entries).map((u: any) => ({ name: u, id: u }))}
      />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
