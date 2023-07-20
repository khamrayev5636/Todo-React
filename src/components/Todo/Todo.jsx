import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [value, setValue] = useState("");

  // Form Submit Function

  const handlerSubmit = (evt) => {
    evt.preventDefault();

    setTodos([
      ...todos,
      {
        id: todos[todos.length - 1]?.id + 1 || 1,
        text: value,
        isCompleted: false,
      },
    ]);

    setValue("");
    toast.success("Todo Added!");
  };

  // Edit Function

  const handlerEditBtn = (todoId, todoText) => {
    const newText = prompt("Yangi text kiriting!!", todoText);
    const findId = todos.find((item) => item.id === todoId);

    findId.text = newText;
    setTodos([...todos]);
    toast.warning("Todo Edited!");
  };

  // IsCompleted function

  const handlerChange = (todoChange) => {
    // console.log(todoChange);
    const findChange = todos.find((item) => item.id === todoChange);

    findChange.isCompleted = !findChange.isCompleted;
    setTodos([...todos]);
    toast.info("Todo Change!");
  };

  localStorage.setItem("todos", JSON.stringify(todos));

  // Return function

  return (
    <div className="pt-10">
      <h1 className="mb-6 text-center font-bold text-[45px] text-white">
        TODO APP
      </h1>
      <form
        onSubmit={handlerSubmit}
        className="flex justify-center w-[600px] mx-auto mb-7 py-5  space-x-2 bg-[#252C40] rounded-[4px]"
      >
        <input
          onChange={(evt) => setValue(evt.target.value)}
          className="w-2/3 p-3 text-lg border-none outline-none rounded-[4px]"
          type="text"
          value={value}
          placeholder="Enter your text"
        />
        <button className="px-10 text-xl bg-green-400 text-white rounded-[4px] hover:bg-green-600">
          Send
        </button>
      </form>
      <ul className="flex flex-col items-center">
        {todos.length ? (
          todos.map((item) => {
            return (
              <li
                key={item.id}
                className="flex justify-between items-center w-[500px] py-4 px-3 border text-white bg-[#423A6F] border-b-2 border-[#2d284c]"
              >
                <div className="flex items-center">
                  <strong className="text-xl me-4">{item.id}.</strong>
                  <input
                    onChange={() => handlerChange(item.id)}
                    defaultChecked={item.isCompleted}
                    className="me-2"
                    type="checkbox"
                  />
                  <h3
                    className={
                      item.isCompleted ? "line-through text-xl" : "text-xl"
                    }
                  >
                    {item.text}
                  </h3>
                </div>
                <div className="">
                  <button
                    onClick={() => handlerEditBtn(item.id, item.text)}
                    className="bg-yellow-400 p-1 px-5 me-3"
                    type="submit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const findItem = todos.filter(
                        (list) => list.id !== item.id
                      );
                      setTodos(findItem);
                      toast.error("Todo Deleted!");
                    }}
                    className="bg-red-700 p-1 px-5"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })
        ) : (
          <h2 className="py-2 px-4 text-3xl font-bold text-white bg-black rounded uppercase">
            No Todos List
          </h2>
        )}
      </ul>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Todo;
