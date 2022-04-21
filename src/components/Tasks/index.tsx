import { useEffect, useState } from "react";
import { Section, Header, Task, NotHaveTasks } from "./styles";
import { useParams, Link } from "react-router-dom";
import { Emoji } from "emoji-mart";
import { CategoryInfo } from "../../hooks/useCategories";
import { v4 as uuid } from "uuid";

import ArrowBack from "../../assets/arrowBack.svg";
import TaskIcon from "../../assets/task.svg";
import Checked from "../../assets/checkbox.svg";

type Task = {
  taskID: string;
  content: string;
  finish: boolean;
  categoryID: string;
}

export function Tasks() {
  const [category, setCategory] = useState<CategoryInfo>({
    bgColor: "white",
    categoryID: "loadings",
    content: "loading...",
    emojiID: "warning",
    textColor: "black",
  });
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>({
    taskID: "",
    content: "",
    finish: false,
    categoryID: "",
  });

  const params = useParams() || "";

  useEffect(() => {
    getLocalCategoryInfo(String(params.categoryID)); // informatons of category
    refreshLocalTasksState();
  }, []);

  function getLocalCategoryInfo(categoryID: string) {
    let data = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]")

    for (let c = 0; c < data.length; c++) {
      if (data[c].categoryID === categoryID) {
        return setCategory(data[c]);
      }
    }
  }

  function refreshLocalTasksState() { // if localstorage change
    let localData = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");
    let filterTasks = [];

    for (let c = 0; c < localData.length; c++) {
      if (localData[c].categoryID === params.categoryID) {
        filterTasks.push(localData[c]);
      }
    }

    setAllTasks(filterTasks);
  }

  function newLocalTask() {
    let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");

    localData.push({ 
      taskID: uuid(),
      content: newTask.content, 
      categoryID: params.categoryID || "", 
      finish: false 
    });

    localStorage.setItem("@to-do-list/tasks", JSON.stringify(localData));

    refreshLocalTasksState();
    setNewTask({
      taskID: "",
      content: "",
      finish: false,
      categoryID: "",
    });
  }
  
  function handleDoneLocalTask(taskID: string) {
    let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");

    for (let c = 0; c < localData.length; c++) {
      if (localData[c].taskID === taskID) {
        localData[c].finish = localData[c].finish ? false : true;
      }
    }

    localStorage.setItem("@to-do-list/tasks", JSON.stringify(localData));
    refreshLocalTasksState();
  }
    
  function handleNewTask() {
    if (newTask.content.length > 0) {
      newLocalTask();
    }
  }



  return (
    <>
      <Header style={{ backgroundColor: category.bgColor, color: category.textColor }}>
        <div>
          <Link to={"/categories"}>
            <img src={ArrowBack} alt="Voltar"/>
          </Link>
          
          <div>
            <Emoji emoji={category.emojiID} set="facebook" size={40} />

            <h1>{category.content}</h1>
          </div>
        </div>

        <hr />
      </Header>

      <Section>
        <h1>Tarefas</h1>
        <hr />
        <div>
          <label onClick={handleNewTask} htmlFor="new-task" style={
              newTask.content.length > 0
              ? { backgroundColor: "green", color: "#fff" }
              : {}
          }>
            <i className="fa-solid fa-plus"></i>
          </label>

          <div>
            <input 
              value={newTask.content}
              onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
              id={"new-task"} 
              type={"text"} 
              placeholder={"Adicionar nova tarefa"} 
            />
          </div>
        </div>

        {
          allTasks.length === 0
          ?
            <NotHaveTasks>
              <img src={TaskIcon} alt="Nenhuma task encontrada" />

              <h1>Nenhuma tarefa encontrada</h1>
            </NotHaveTasks>
          : 
            allTasks.map((task, index) =>
              <Task key={index}>
                <div>
                  <div 
                    className={`task-check 
                    ${task.finish 
                      ? "task-check-true" 
                      : "task-check-false"
                    }`}
                    onClick={() => handleDoneLocalTask(task.taskID)}
                    >
                     
                    <i className="fa-solid fa-check"></i>
                  </div>

                  <div
                    className={task.finish ? "task-txt-true" : "task-txt-false"}
                  >{task.content}</div>
                </div>


                <div>
                  <i className="fa-solid fa-pen-to-square"></i>
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </Task>
            )
        }
      </Section>
    </>
  );
}