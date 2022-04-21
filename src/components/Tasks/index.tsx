import { useEffect, useState } from "react";
import { Section, Header, Task, NotHaveTasks } from "./styles";
import { useParams, Link } from "react-router-dom";
import { Emoji } from "emoji-mart";
import { CategoryInfo } from "../../hooks/useCategories";

import ArrowBack from "../../assets/arrowBack.svg";
import TaskIcon from "../../assets/task.svg";
import Checked from "../../assets/checkbox.svg";


export function Tasks() {
  const params = useParams() || "";

  const [category, setCategory] = useState<CategoryInfo>({
    bgColor: "white",
    categoryID: "loadings",
    content: "loading...",
    emojiID: "warning",
    textColor: "black",
  });

  const [allTasks, setAllTasks] = useState([]);

  function getLocalTasks(categoryID: string) {
    let data = JSON.parse(localStorage.getItem("@to-do-list") || "{}")

    for (var c = 0; c < data.length; c++) {
      if (data[c].categoryID === categoryID) {
        return data[c];
      }
    }

    return {};
  }

  useEffect(() => {
    const tasks = getLocalTasks(String(params.categoryID));

    setCategory(tasks);
    
  }, []);


  return (
    <>
      <Header>
        <div>
          <Link to={"/categories"}>
            <img src={ArrowBack} alt="Voltar"/>
          </Link>
          
          <div>
            <Emoji emoji={category.emojiID} set="facebook" size={40} />

            <h2>{category.content}</h2>
          </div>
        </div>

        <hr />
      </Header>

      <Section>
        <Task>
          <div>
            <img src={Checked} alt="checar" />
            <div>Conteúdo aqui here o quem dirifjdf jjfjdf dfdfjhehr</div>
          </div>


          <div>
            <i className="fa-solid fa-pen-to-square"></i>
            <i className="fa-solid fa-trash-can"></i>
          </div>
        </Task>
        
        <NotHaveTasks>
          <img src={TaskIcon} alt="Nenhuma task encontrada" />

          <h1>Nenhuma tarefa encontrada</h1>
        </NotHaveTasks>
      </Section>
    </>
  );
}