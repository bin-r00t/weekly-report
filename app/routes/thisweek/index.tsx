import { readCurrentWeekData } from "~/db/utils";
import { useLoaderData } from "react-router";
import LeftSide from "../leftside/LeftSide";
import { useUser } from "~/store/useUserStore";

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

export const loader = async () => {
  const data = await readCurrentWeekData();
  return { data };
};

export default function ThisWeekIndex() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <>
      <LeftSide entries={data} />
      <main className="flex-1">
        <div className="h-screen gap-6 flex flex-col p-6">
          <h1 className="text-2xl font-bold">dashboard</h1>
          <div className="grid grid-cols-3 gap-3">
            {data.length === 0 && <div className="text-gray-500">No data</div>}
            {data.map((u: any) => (
              <div
                key={u.id}
                className="card bg-gray-100 rounded-lg p-6 flex flex-col gap-3"
              >
                <div className="d  flex gap-3">
                  {u.role && (
                    <span
                      className={`role rounded-full text-sm ${u.role == "frontend" ? "text-slate-600 bg-slate-300" : "text-red-600 bg-red-300"} p-1 px-3`}
                    >
                      {u.role === "frontend" ? "前端" : "后端"}
                    </span>
                  )}
                  <h2 className="title text-lg font-bold">{u.project}</h2>
                </div>
                <div className="flex gap-3">
                  <small className="author font-light text-gray-500">
                    作者: {u.author}
                  </small>
                  <small className="font-light text-gray-500">
                    创建日期: {formatDate(u.createdAt)}
                  </small>
                </div>
                <div
                  className="content text-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: u.items || "" }}
                ></div>
                <div className="hidden plans">{u.plan || ""}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
