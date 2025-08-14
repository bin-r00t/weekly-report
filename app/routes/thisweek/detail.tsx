import {
  Form,
  Link,
  Navigate,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import {
  deleteDataById,
  readCurrentWeekData,
  readDataByAuthor,
} from "~/db/utils";
import LeftSide from "../leftside/LeftSide";
import { useUser, useUserStore } from "~/store/useUserStore";
import type { Route } from "./+types/detail";

export function meta({}: Route.MetaArgs) {
  const user = useUserStore.getState().user;
  return [{ title: `查看 - ${user?.username}本周做了哪些事情?` }];
}
// 确保日期格式在服务器端和客户端一致
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");
}

// 获取周一凌晨0点的时间戳
function getMondayTime() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDay() - day + (day === 0 ? -6 : 1);
  return diff === 1 ? now.setHours(0, 0, 0, 0) : new Date(now.setDate(diff));
}

export const loader = async ({ params }: { params: { id: string } }) => {
  const thisWeekData = await readCurrentWeekData();
  const data = await readDataByAuthor(params.id, getMondayTime());
  return { data, thisWeekData };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  await deleteDataById(id);
  return redirect("/thisweek");
};

export default function CurrentWeekDetail() {
  const { id } = useParams();
  const user = useUser();
  const { data, thisWeekData } = useLoaderData<typeof loader>();
  return (
    <>
      <LeftSide entries={thisWeekData} />
      <div className="flex-1 flex flex-col gap-3 p-6">
        <div className="flex items-center">
          <Link
            to="/thisweek"
            className="hamburger-item text-gray-500 cursor-pointer after:content-['/'] after:text-gray-500 after:mx-2 hover:text-gray-700 hover:underline"
          >
            home
          </Link>
          <span className="hamburger-item">{id}</span>
        </div>
        <h1 className="text-2xl font-bold">Details</h1>
        <div className="content detail grid grid-cols-3 gap-3">
          {data.map((u: any) => (
            <div
              key={u.id}
              className="card card-plain p-3 border border-gray-400 rounded-lg flex flex-col gap-3"
            >
              <h2 className="text-lg font-bold">{u.project}</h2>
              <p className="text-sm text-gray-500">{formatDate(u.createdAt)}</p>
              <p className="text-sm text-gray-500">{u.items}</p>
              {user?.id === u.author && (
                <Form method="delete">
                  <button
                    name="id"
                    value={u.id}
                    className="text-red-600  rounded-md cursor-pointer transition hover:text-red-300"
                  >
                    delete
                  </button>
                </Form>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
