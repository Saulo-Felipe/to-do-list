import { useState, useEffect } from "react";
import { Emoji } from "emoji-mart";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useCategories } from "../../hooks/useCategories";

import { Header, Container, CreateNewTask, TaskContainer, Section, WithOutTasks, Details, Dropdown } from "./styles";
import ImgBack from "../../assets/back.svg";
import ImgWithoutTask from "../../assets/task.svg";

export type Task = {
  taskID: string;
  content: string;
  finish: boolean;
  categoryID: string;
}

type AllTasks = {
  finished: Task[];
  incomplete: Task[];
}

export function Tasks() {
  const [category, setCategory] = useState({
    bgColor: "#0f3f86",
    categoryID: "loadings",
    content: "loading...",
    emojiID: "warning",
    textColor: "white",
  });
  const [allTasks, setAllTasks] = useState<AllTasks>({
    finished: [],
    incomplete: []
  });
  const [newTask, setNewTask] = useState<Task>({
    taskID: "",
    content: "",
    finish: false,
    categoryID: "",
  });

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { deleteLocalCategory } = useCategories();
  const params = useParams();
  const Navigate = useNavigate();

  function getLocalCategoryInfo(categoryID: string) { // FOi
    let data = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]")

    for (let c = 0; c < data.length; c++) {
      if (data[c].categoryID === categoryID) {
        return setCategory(data[c]);
      }
    }
  }

  function refreshLocalTasksState() { // if localstorage change
    let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");
    let filterTasks: AllTasks = {
      finished: [],
      incomplete: []
    };

    for (let c = 0; c < localData.length; c++) {
      if (localData[c].categoryID === params.categoryID) {
        if (localData[c].finish) {
          filterTasks.finished.push(localData[c]);
        } else {
          filterTasks.incomplete.push(localData[c]);
        }
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
        if (isEditing) {
          localData.splice(c, 1);

          if (localData.length === 1) setIsEditing(false);
        } else {
          localData[c].finish = localData[c].finish ? false : true;
        }
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
  
  function handleDeleteCategory() {
    deleteLocalCategory(category.categoryID)

    Navigate("/categories");
  }

  useEffect(() => {
    getLocalCategoryInfo(params.categoryID || "");
    refreshLocalTasksState();
  }, [])

  return (
    <Container>
      <Header bgColor={category.bgColor} textColor={category.textColor}>
        <div>
          <Link to={"/categories"} >
            <div>
              <img src={ImgBack} alt="Voltar" />
              <h2> Voltar</h2>
            </div>
          </Link>
        </div>

        <div>
          <Dropdown isOpen={dropdownIsOpen}>
            <div>
              <span onClick={handleDeleteCategory}>
                <i className="fa-solid fa-trash"></i> Deletar Categoria
              </span>

              <span 
                onClick={() => {
                  setDropdownIsOpen(false);
                  setIsEditing(true);
                }}>
                <i  className="fa-solid fa-trash"></i> Excluir uma tarefa
              </span>
            </div>

            <div onClick={() => setDropdownIsOpen(dropdownIsOpen === false)}>
              <i className="fa-solid fa-gear"></i>
            </div>
          </Dropdown>

          <div>
            <Emoji emoji={"heavy_plus_sign"} set='facebook' size={40} />

            <h1>{category.content}</h1>
          </div>
        </div>
      </Header>

      <Section>
        {
          isEditing
          ? 
          <div className="edit-tasks"> 
            <strong>Clique na categoria que deseja deletar</strong>
            
            <button onClick={() => setIsEditing(false)}>Sair do modo edição</button>
          </div>
          : <></>
        }
        <CreateNewTask
          isOk={newTask.content.length !== 0}
        >
          <div onClick={handleNewTask}>
            <i className={"fa-solid fa-plus"} ></i>
          </div>

          <div>
            <input
              type="text"
              placeholder="Adicionar nova tarefa"
              value={newTask.content}
              onChange={e => setNewTask({ ...newTask, content: e.target.value })}
            />
          </div>
        </CreateNewTask>

        {
          allTasks.finished.length === 0 && allTasks.incomplete.length === 0
          ? <WithOutTasks>
              <img src={ImgWithoutTask} alt="Nenhuma task cadastrada" />

              <h1>Nenhuma task cadastrada</h1>
            </WithOutTasks>
          : <></>
        }
        {
          allTasks.incomplete.map(task =>
            <TaskContainer
              key={task.taskID}
              onClick={() => handleDoneLocalTask(task.taskID)}
              finish={task.finish}
              isEditing={isEditing}
            >
              <div>
                <i className="fa-solid fa-circle"></i>
              </div>

              <div>
                {task.content}
              </div>
            </TaskContainer>
          )
        }
        {
          allTasks.finished.length > 0
          ? <Details open>
              <summary>Tarefas Concluídas ({allTasks.finished.length})</summary>
              {
                allTasks.finished.map(task =>

                  <TaskContainer
                    key={task.taskID}
                    onClick={() => handleDoneLocalTask(task.taskID)}
                    finish={task.finish}
                    isEditing={isEditing}
                  >
                    <div>
                      <i className="fa-solid fa-circle-check"></i>
                    </div>

                    <div>
                      {task.content}
                    </div>
                  </TaskContainer>
                )
              }
            </Details>
          : <></>
        }

      </Section>
    </Container>
  );
}