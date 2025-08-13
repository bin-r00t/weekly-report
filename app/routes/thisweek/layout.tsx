import { Navigate, Outlet, useNavigate } from "react-router";
import {
  useIsAuthenticated,
  useUser,
  useUserStore,
} from "~/store/useUserStore";

export default function ThisWeekLayout() {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const logout = useUserStore((state) => state.logout);

  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <div className="bg-white h-screen flex flex-col">
          <div className="header bg-neutral-100 border-b border-slate-300 p-4 flex justify-between">
            <h1 className="text-2xl">User: {user?.username}</h1>
            <button
              className="text-red-500 bg-red-100 rounded-md p-1 px-6 cursor-pointer hover:bg-red-200 hover:text-red-800"
              onClick={() => {
                logout();
              }}
            >
              退出
            </button>
          </div>
          <div className="body flex-1 flex">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
}
