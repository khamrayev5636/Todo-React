import { useState } from "react";

const Todo = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Uxlash",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Futbol ko'rish",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Dars qilish",
      isCompleted: false,
    },
  ]);

  const [value, setValue] = useState("");

  // Form Submit Function

  const handlerSubmit = (evt) => {
    evt.preventDefault();

    setTodos([
      ...todos,
      {
        id: todos[todos.length - 1].id + 1,
        text: value,
        isCompleted: false,
      },
    ]);

    setValue("");
  };

  // Edit Function

  const handlerEditBtn = (todoId, todoText) => {
    const newText = prompt("Yangi text kiriting!!", todoText);
    const findId = todos.find((item) => item.id === todoId);

    findId.text = newText;
    setTodos([...todos]);
  };

  // IsCompleted function

  const handlerChange = (todoChange) => {
    // console.log(todoChange);
    const findChange = todos.find((item) => item.id === todoChange);

    findChange.isCompleted = !findChange.isCompleted;
    setTodos([...todos]);
  };

  // LocalStorage function

  // localStorage.setItem("todos", JSON.stringify("todos"));

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
        {todos.map((item) => {
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
                  }}
                  className="bg-red-700 p-1 px-5"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
