import { Form, useLoaderData } from "react-router";
import { readData } from "~/db/utils";

export const loader = async () => {
  const data = await readData();
  return { data };
};

export default function CurrentWeekIndex() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen gap-6 flex flex-col p-6">
      <h1 className="text-2xl font-bold">dashboard</h1>
      <div className="grid grid-cols-3 gap-3">
        {data.map((u: any) => (
          <div className="card bg-gray-100 rounded-lg p-6 flex flex-col gap-3">
            <h2 className="text-lg font-bold">{u.project}</h2>
            <div className="flex gap-3">
              <small className="font-light text-gray-500">作者: {u.author}</small>
              <small className="font-light text-gray-500">创建日期: {u.createdAt}</small>
            </div>
            <p className="text-sm text-gray-500">{u.items}</p>
            <Form method="delete">
              <button
                name="id"
                value={u.id}
                type="submit"
                className="text-red-600  rounded-md cursor-pointer transition hover:text-red-300"
              >
                delete
              </button>
            </Form>
          </div>
        ))}
      </div>
    </div>
  );
}
