import { Form, Navigate, redirect, useLoaderData } from "react-router";
import { readCurrentWeekData, writeData } from "~/db/utils";
import { v4 as uuidv4 } from "uuid";
import LeftSide from "../leftside/LeftSide";
import { useRef, useState } from "react";
import { useIsAuthenticated, useUser } from "~/store/useUserStore";

export const loader = async () => {
  const data = await readCurrentWeekData();
  return { data };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const project = formData.get("project");
  const items = formData.get("items");
  const author = formData.get("author");
  const plan = formData.get("plan");
  const role = formData.get("role");
  const createdAt = new Date().toISOString();
  const id = uuidv4();
  const data = {
    project,
    id,
    items,
    author,
    plan,
    role,
    createdAt,
  };
  await writeData(data);
  return redirect("/thisweek");
};

export default function ThisWeekCreate() {
  const editorRef = useRef<HTMLDivElement>(null);
  const { data } = useLoaderData<typeof loader>();
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const [content, setContent] = useState("");

  function onUpdateHiddenInput() {
    setContent(editorRef.current?.innerHTML || "");
  }
  return (
    <>
      {!isAuthenticated && <Navigate to="/login" />}
      {isAuthenticated && (
        <>
          <LeftSide entries={data} />
          <div className="create-page h-full flex-1 p-6 flex flex-col gap-6">
            <h1>Create</h1>
            <Form
              className="md:w-1/2 border border-gray-400 rounded-md p-3 flex flex-col gap-3"
              method="post"
            >
              <input
                type="text"
                hidden
                name="author"
                value={user?.username}
                readOnly
              />
              <input
                type="text"
                hidden
                name="role"
                value={user?.role}
                readOnly
              />
              <div className="form-item flex flex-col gap-3">
                <label
                  htmlFor="project"
                  className="text-gray-400 text-sm capitalize"
                >
                  project name
                </label>
                <input
                  type="text"
                  name="project"
                  id="project"
                  className="p-2 px-3 outline outline-gray-400 rounded-md"
                />
              </div>
              <div className="form-item flex flex-col gap-3">
                <label
                  htmlFor="items"
                  className="text-gray-400 text-sm capitalize"
                >
                  Done Items
                </label>
                {/* <textarea
              name="items"
              id="items"
              rows={9}
              className="p-2 px-3 outline outline-gray-400 rounded-md"
            ></textarea> */}
                <div
                  ref={editorRef}
                  className="editor min-h-32 p-2 px-3 outline outline-gray-400 rounded-md"
                  contentEditable={true}
                  onInput={onUpdateHiddenInput}
                ></div>
                <input type="hidden" name="items" value={content} />
              </div>
              <div className="form-item flex flex-col gap-3">
                <label
                  htmlFor="plan"
                  className="text-gray-400 text-sm capitalize"
                >
                  plan
                </label>
                <input
                  type="text"
                  name="plan"
                  id="plan"
                  className="p-2 px-3 outline outline-gray-400 rounded-md"
                />
              </div>
              <div className="form-item flex flex-col gap-3">
                <button
                  type="submit"
                  className="bg-gray-600 text-white p-2 px-3 rounded-md cursor-pointer transition hover:bg-gray-700"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
