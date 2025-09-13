// import React, { useState, useMemo } from "react";
// import "./../styles/App.css";
// const Todos = [
//   { text: "Todo 1", status: "not completed" },
//   { text: "Todo 2", status: "completed" },
//   { text: "Todo 3", status: "completed" },
//   { text: "Todo 4", status: "completed" },
//   { text: "Todo 5", status: "not completed" },
//   { text: "Todo 6", status: "completed" },
//   { text: "Todo 7", status: "completed" },
//   { text: "Todo 8", status: "not completed" },
//   { text: "Todo 9", status: "completed" },
//   { text: "Todo 10", status: "not completed" },
//   { text: "Todo 11", status: "not completed" },
//   { text: "Todo 12", status: "not completed" },
//   { text: "Todo 13", status: "completed" },
//   { text: "Todo 14", status: "not completed" },
//   { text: "Todo 15", status: "completed" },
//   { text: "Todo 16", status: "not completed" },
//   { text: "Todo 17", status: "not completed" },
//   { text: "Todo 18", status: "not completed" },
//   { text: "Todo 19", status: "not completed" },
//   { text: "Todo 20", status: "completed" },
//   { text: "Todo 21", status: "completed" },
//   { text: "Todo 22", status: "not completed" },
//   { text: "Todo 23", status: "completed" },
//   { text: "Todo 24", status: "not completed" },
//   { text: "Todo 25", status: "completed" },
//   { text: "Todo 26", status: "not completed" },
//   { text: "Todo 27", status: "completed" },
//   { text: "Todo 28", status: "not completed" },
//   { text: "Todo 29", status: "completed" },
//   { text: "Todo 30", status: "not completed" },
//   { text: "Todo 31", status: "completed" },
//   { text: "Todo 32", status: "completed" },
//   { text: "Todo 33", status: "not completed" },
//   { text: "Todo 34", status: "not completed" },
//   { text: "Todo 35", status: "not completed" },
//   { text: "Todo 36", status: "not completed" },
//   { text: "Todo 37", status: "not completed" },
//   { text: "Todo 38", status: "not completed" },
//   { text: "Todo 39", status: "completed" },
//   { text: "Todo 40", status: "completed" },
//   { text: "Todo 41", status: "completed" },
//   { text: "Todo 42", status: "completed" },
//   { text: "Todo 43", status: "not completed" },
//   { text: "Todo 44", status: "completed" },
//   { text: "Todo 45", status: "completed" },
//   { text: "Todo 46", status: "not completed" },
//   { text: "Todo 47", status: "completed" },
//   { text: "Todo 48", status: "completed" },
//   { text: "Todo 49", status: "completed" },
//   { text: "Todo 50", status: "not completed" },
// ];

// const App = () => {
//   const [todos, setTodos] = useState(Todos);

//   const completed = useMemo(function completedTodos() {
//     return Todos.filter((todo) => todo.status === "completed");
//   });

//   const active = useMemo(function ActiveTodos() {
//     return Todos.filter((todo) => todo.status === "not completed");
//   });
//   function handleActiveTodo() {
//     setTodos(active);
//   }

//   function handleCompleteTodo() {
//     setTodos(completed);
//   }

//   function handleAllTodos() {
//     setTodos(Todos);
//   }
//   return (
//     <div>
//       <div
//         style={{
//           borderBottom: "1px solid black",
//           margin: "20px 0px",
//           padding: "10px",
//         }}
//       >
//         <button onClick={handleAllTodos}>All</button>
//         <button onClick={handleActiveTodo}>Active</button>
//         <button onClick={handleCompleteTodo}>completed</button>
//       </div>
//       <p>Note : List is artificially slowed down</p>
//       <div>
//         <ul>
//           {todos &&
//             todos.map((todo, index) => (
//               <li
//                 key={index}
//                 style={{
//                   textDecoration: `${
//                     todo.status === "completed" ? "line-through" : ""
//                   }`,
//                 }}
//               >
//                 {todo.text}
//               </li>
//             ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useMemo } from "react";
import "./../styles/App.css";

const generateTodos = () => {
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    text: `Todo ${i + 1}`,
    status: i < 25 ? "completed" : "not completed",
  }));
};

function slowRender() {
  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }
  return total;
}

const TodoList = ({ todos }) => {
  slowRender();
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{
            textDecoration:
              todo.status === "completed" ? "line-through" : "none",
          }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const allTodos = generateTodos();

  const [tab, setTab] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const filteredTodos = useMemo(() => {
    if (tab === "active") {
      return allTodos.filter((todo) => todo.status === "not completed");
    }
    if (tab === "completed") {
      return allTodos.filter((todo) => todo.status === "completed");
    }
    return allTodos;
  }, [tab, allTodos]);

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#222" : "#fff",
        color: darkMode ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Todo App (useMemo Performance)</h1>

      <button onClick={() => setDarkMode((prev) => !prev)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setTab("all")}>All</button>
        <button onClick={() => setTab("active")}>Active</button>
        <button onClick={() => setTab("completed")}>Completed</button>
      </div>

      <TodoList todos={filteredTodos} />
    </div>
  );
};

export default App;
