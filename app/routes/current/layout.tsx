import { Outlet, useLoaderData } from "react-router";
import { readData } from "~/db/utils";
import LeftSide from "../leftside/LeftSide";

export const loader = async () => {
  const data = await readData();
  return { data };
};

export default function CurrentWeekLayout() {
  const { data } = useLoaderData<typeof loader>();
  return (
    <div className="bg-white h-screen flex">
      <LeftSide
        entries={data.map((u: any) => ({ name: u.author, id: u.author }))}
      />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
