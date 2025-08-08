import { useLoaderData, useParams } from "react-router";
import { readDataByAuthor } from "~/db/utils";
// import type { Route } from "./+types/detail";

function getMondayTime() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(now.setDate(diff));
}

export const loader = async ({ params }: { params: { id: string } }) => {
  const data = await readDataByAuthor(params.id, getMondayTime());
  console.log("dddd", data);
  return { data };
};

export default function CurrentWeekDetail() {
  const { data } = useLoaderData<typeof loader>();
  console.log("data", data);
  return (
    <div className="flex flex-col gap-3 p-6">
      <h1>Details</h1>
      <div className="content detail grid grid-cols-3 gap-3">
        {data.map((u: any) => (
          <div key={u.id} className="card card-plain p-3 border border-gray-400 rounded-lg">
            <h2 className="text-lg font-bold">{u.project}</h2>
            <p className="text-sm text-gray-500">{u.createdAt}</p>
            <p className="text-sm text-gray-500">{u.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
