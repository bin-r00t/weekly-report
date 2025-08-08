import { Form, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username");
    localStorage.setItem("user", username as string);
    navigate("/current");
  };
  return (
    <div className="bg-neutral-100 h-screen flex items-center justify-center">
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
        <button type="submit" className="bg-slate-500 text-white rounded-md p-2">
          Login
        </button>
      </Form>
    </div>
  );
}
