import { Form, redirect } from "react-router";
import { writeData } from "~/db/utils";
import { v4 as uuidv4 } from "uuid";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const project = formData.get("project");
  const items = formData.get("items");
  const author = formData.get("author");
  const createdAt = new Date().toISOString();
  const id = uuidv4();
  const data = {
    project,
    id,
    items,
    author,
    createdAt,
  };
  await writeData(data);
  return redirect("/current");
};

export default function CurrentWeekCreate() {
  return (
    <div className="create-page h-screen p-6 flex flex-col gap-6">
      <h1>Create</h1>
      <Form
        className="md:w-1/2 border border-gray-400 rounded-md p-3 flex flex-col gap-3"
        method="post"
      >
        <input type="text" hidden name="author" value={"liubin"} />
        <div className="form-item flex flex-col gap-3">
          <label htmlFor="project" className="text-gray-400 text-sm capitalize">
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
          <label htmlFor="items" className="text-gray-400 text-sm capitalize">
            Done Items
          </label>
          <textarea
            name="items"
            id="items"
            rows={9}
            className="p-2 px-3 outline outline-gray-400 rounded-md"
          ></textarea>
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
  );
}
