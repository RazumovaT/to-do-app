import { React, useState } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/header";
import ToDoList from "./components/todo-list";
import Footer from "./components/footer";
import { all, active, completed } from "./components/filters";

const root1 = document.getElementById("root1");
const root = createRoot(root1);

function AppElements() {
  const [data, setData] = useState([]);
  const [filteredArr, setFilteredArr] = useState([]);
  const [activeFilter, setActiveFilter] = useState(all);
  const [id, setId] = useState(0);

  const chooseActiveFilter = (filterName) => {
    switch (filterName) {
      case all:
        setFilteredArr(data);
        setActiveFilter(filterName);
        break;
      case active:
        const activeArr = data.filter((el) => !el.done);
        setFilteredArr(activeArr);
        setActiveFilter(filterName);
        break;
      case completed:
        const doneArr = data.filter((el) => el.done);
        setFilteredArr(doneArr);
        setActiveFilter(filterName);
        break;
      default:
        break;
    }
  };
  const createItem = (label, min, sec) => {
    setId((id) => id + 1);
    return {
      label,
      done: false,
      active: true,
      isEdit: false,
      min,
      sec,
      id: id,
      createdAt: Date.now(),
    };
  };

  const addItem = (text, min, sec) => {
    if (!text.length) {
      return;
    }
    const newItem = createItem(text, min, sec);
    const copy = JSON.parse(JSON.stringify(data));
    const newArr = [...copy, newItem];
    setData(newArr);
    setFilteredArr(newArr);
  };

  const deleteItem = (id) => {
    const index = data.findIndex((el) => el.id === id);
    const newArr = JSON.parse(JSON.stringify(data))
      .slice(0, index)
      .concat(JSON.parse(JSON.stringify(data)).slice(index + 1));
    setData(newArr);
    setFilteredArr(newArr);
  };

  const itemDone = (id) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, done: !el.done } : { ...el }
    );
    setData(newArr);
    setFilteredArr(newArr);
  };

  const itemEdit = (id) => {
    let newArr = data.map((el) =>
      el.id === id ? { ...el, isEdit: !el.isEdit } : { ...el }
    );
    setData(newArr);
    setFilteredArr(newArr);
  };

  const clearCompleted = () => {
    const newArr = data.filter((el) => !el.done);
    setData(newArr);
    setFilteredArr(newArr);
  };

  const onItemSubmit = (id, text) => {
    let newArr = data.map((el) =>
      el.id === id
        ? { ...el, label: text, isEdit: !el.isEdit, done: !el.done }
        : { ...el }
    );
    setData(newArr);
    setFilteredArr(newArr);
  };

  let itemsLeft = data.filter((el) => !el.done).length;
  console.log(data);

  return (
    <div className="todoapp">
      <Header onItemAdded={addItem} />
      <ToDoList
        todos={filteredArr}
        onDeleted={deleteItem}
        onItemDone={itemDone}
        onItemEdit={itemEdit}
        clearCompleted={clearCompleted}
        onItemAdded={addItem}
        onItemSubmit={onItemSubmit}
      />
      <Footer
        itemsLeft={itemsLeft}
        activeFilter={activeFilter}
        chooseActiveFilter={chooseActiveFilter}
        clearCompleted={clearCompleted}
        all={all}
        active={active}
        completed={completed}
      />
    </div>
  );
}

root.render(<AppElements />);
