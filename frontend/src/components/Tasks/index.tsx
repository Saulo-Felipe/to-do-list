import { useState, useEffect, ReactNode, ReactHTMLElement } from "react";
import { Emoji } from "emoji-mart";
import { Link, useParams, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { api } from "../../services/api";
import { getToken } from "../../tools/getToken";
import { toast, ToastContainer } from "react-toastify";

import { Header, Container, CreateNewTask, TaskContainer, Section, WithOutTasks, Details, Dropdown, LoadingContainer } from "./styles";
import ImgBack from "../../assets/back.svg";
import ImgWithoutTask from "../../assets/task.svg";

export type Task = {
  id: string;
  content: string;
  finished: boolean;
  categoryID: string;
}

type AllTasks = {
  finished: Task[];
  incomplete: Task[];
}

type CategoryInfoData = {
  data: {
    category: {
      PkUserId: number;
      backgroundColor: string;
      contentColor: string;
      iconId: string;
      id: number;
      name: string;
    },
    error: boolean;
    success: boolean;
    message: string;
  }
}

export function Tasks() {
  const [category, setCategory] = useState({
    bgColor: "",
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
    id: "",
    content: "",
    finished: false,
    categoryID: "",
  });
  const [newTaskLoading, setNewTaskLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const Navigate = useNavigate();

  function taskTools() {
    function getLocalCategoryInfo(categoryID: string) {
      let data = JSON.parse(localStorage.getItem("@to-do-list/categories") || "[]");
  
      for (let c = 0; c < data.length; c++) {
        if (data[c].categoryID === categoryID) {
          setCategory(data[c]);
          break;
        }
      }  
    }
    async function getCategoryInfo(categoryID: string) {
      var { data }: CategoryInfoData = await api.post("/get-category", { categoryID });
  
      if (data.error)
        Navigate("/categories");
  
      setCategory({
        bgColor: data.category.backgroundColor,
        textColor: data.category.contentColor,
        categoryID: categoryID,
        content: data.category.name,
        emojiID: data.category.iconId
      });
    }

    function refreshLocalTasks() { // if localstorage change
      let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");
      let filterTasks: AllTasks = {
        finished: [],
        incomplete: []
      };
  
      for (let c = 0; c < localData.length; c++) {
        if (localData[c].categoryID === params.categoryID) {
          if (localData[c].finished) {
            filterTasks.finished.push(localData[c]);
          } else {
            filterTasks.incomplete.push(localData[c]);
          }
        }
      }
  
      setAllTasks(filterTasks);
    }
    async function refreshTasks() {
      setLoading(true);
      const { data } = await api.post("/get-tasks", {categoryID: Number(params.categoryID)});

      const finished = [];
      const incomplete = [];
      for (var c = 0; c < data.tasks.length; c++) {
        if (data.tasks[c].finished) {
          finished.push(data.tasks[c]);
        } else {
          incomplete.push(data.tasks[c]);
        }
      }

      setAllTasks({
        finished,
        incomplete
      });
      setLoading(false);
    }

    function createLocalTask() {
      let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");
  
      localData.push({
        id: uuid(),
        content: newTask.content,
        categoryID: params.categoryID || "",
        finished: false
      });
  
      localStorage.setItem("@to-do-list/tasks", JSON.stringify(localData));
  
      taskTools().refreshTasks();
      setNewTask({
        id: "",
        content: "",
        finished: false,
        categoryID: "",
      });
    }
    async function createTask() {
      setNewTaskLoading(true);
      const { data } = await api.post("/create-task", { ...newTask, categoryID: Number(params.categoryID) })

      setNewTask({
        id: "",
        content: "",
        finished: false,
        categoryID: ""
      });
      setNewTaskLoading(false);
      refreshTasks();
    }

    function doneLocalTask(taskID: string, element: any) {
      element.style.opacity = "0.5";

      let localData: Task[] = JSON.parse(localStorage.getItem("@to-do-list/tasks") || "[]");
    
      for (let c = 0; c < localData.length; c++) {
        if (localData[c].id === taskID) {
          if (isEditing) {
            localData.splice(c, 1);
  
            if (localData.length === 1) setIsEditing(false);
          } else {
            localData[c].finished = localData[c].finished ? false : true;
          }
        }
      }
  
      localStorage.setItem("@to-do-list/tasks", JSON.stringify(localData));
      taskTools().refreshTasks();
    }
    async function doneTask(taskID: string, element: any, finished: boolean) {
      element.style.opacity = "0.5";
      
      let {data} = await api.post(`/${isEditing ? "delete" : "done"}-task`, { 
        taskID: parseInt(taskID) || 0, 
        categoryID: params.categoryID || 0,
        finished,
      });
  
      if (data.error)
        return toast.error(data.message, {
          autoClose: 2000,
          closeOnClick: true,
        });
      
      refreshTasks();
    }


    if (getToken()) return {
      getCategoryInfo,
      refreshTasks,
      createTask,
      doneTask
    }
    else return {
      getCategoryInfo: getLocalCategoryInfo,
      refreshTasks: refreshLocalTasks,
      createTask: createLocalTask,
      doneTask: doneLocalTask
    } 
  }
  
  function handleNewTask() {
    if (newTask.content.length > 0 && !newTaskLoading) {
      taskTools().createTask();
    }
  }
  
  function handleDoneTask(taskID: string, element: any, finished: boolean) {
    taskTools().doneTask(taskID, element, finished);
  }

  useEffect(() => {
    taskTools().getCategoryInfo(params.categoryID || "");
    taskTools().refreshTasks();
  }, []);

  return (
    <Container>
      <ToastContainer />
      <Header bgColor={category.bgColor} textColor={category.textColor}>
        <div>
          <Link to={"/categories"} >
            <div>
              <i className="fa-solid fa-angle-left"></i>
              <h2> Voltar</h2>
            </div>
          </Link>
        </div>

        <div>
          <Dropdown isOpen={dropdownIsOpen}>
            <div>
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
            <Emoji emoji={category.emojiID} set='facebook' size={40} />

            <h1>{category.content}</h1>
          </div>
        </div>
        
        {
          !category.bgColor ? <div className="loading-background"></div> : <></>
        }
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
            <i className={`fa-solid fa-plus ${newTaskLoading ? "loading-rotate" : ""}`} ></i>
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
          loading 
          ?
            <LoadingContainer>
              <i className="fa-solid fa-spinner loading-rotate"></i>
            </LoadingContainer>
          : <></>
        }

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
              key={task.id}
              onClick={(e) => handleDoneTask(task.id, e.target, task.finished)}
              finish={task.finished}
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
                    key={task.id}
                    onClick={(e) => handleDoneTask(task.id, e.target, task.finished)}
                    finish={task.finished}
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