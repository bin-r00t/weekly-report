import { Form, Navigate, useNavigate } from "react-router";
import { useIsAuthenticated, useUserStore } from "~/store/useUserStore";

import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "登录 - 你是谁？你的角色是什么？" },
    { name: "description", content: "你是谁?!" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const login = useUserStore((state) => state.login);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    const role = formData.get("role");
    console.log("roel", role);
    await login({
      username: username as string,
      password: "password",
      role: role as string,
    });
    navigate("/thisweek");
  };

  return (
    <div className="bg-neutral-100 h-screen flex items-center justify-center">
      {isAuthenticated && <Navigate to="/" />}
      {!isAuthenticated && (
        <Form
          method="post"
          onSubmit={onSubmit}
          className="w-96 flex flex-col gap-3 border border-gray-400 rounded-md p-6"
        >
          <label htmlFor="username" className="text-gray-500">
            username
          </label>
          <input
            type="text"
            name="username"
            placeholder="username"
            className="p-2 px-3 rounded outline outline-gray-400"
          />
          <label htmlFor="role" className="text-gray-500">
            role
          </label>
          <select
            name="role"
            className="p-2 px-3 rounded outline outline-gray-400"
          >
            <option value="backend">后端开发</option>
            <option value="frontend">前端开发</option>
          </select>
          <button
            type="submit"
            className="bg-slate-500 text-white rounded-md p-2"
          >
            Login
          </button>
        </Form>
      )}
    </div>
  );
}
