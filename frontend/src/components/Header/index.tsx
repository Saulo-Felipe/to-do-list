import { useCategories } from "../../hooks/useCategories";
import { NewCategoryModal } from "../Categories/NewCategoryModal";
import { Login } from "../Login";
import { Register } from "../Register";
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { getToken } from "../../tools/getToken";

import { Container, Dropdown, ThirdDiv } from "./styles";
import ImgLogo from "../../assets/logo.svg";
import ImgNewAction from "../../assets/newAction.svg";
import ImgUser from "../../assets/user.svg";
import { Link } from "react-router-dom";

export function Header() {
  const { setNewCategoryModalIsOpen } = useCategories();
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
  });

  function openLoginModal() {
    if (!user.name) {
      setLoginModalIsOpen(true)
    } else {
      setDropdownIsOpen(dropdownIsOpen == false);
      
    }
  }

  function logout() {
    localStorage.removeItem("@to-do-list/user-token");
    window.location.href = "/categories";
  }

  useEffect(() => {
    async function onLoad() {
      if (getToken()) {
        const { data } = await api.post("/get-user");

        setUser({
          name: data.name
        })

      }
    }

    onLoad();
  }, []);

  return (
    <Container>
      <div>
        <img src={ImgLogo} alt="Logotipo" />

        <h2><Link to={"/categories"}>To-do List :D</Link></h2>
      </div>

      <div onClick={() => setNewCategoryModalIsOpen(true)}>
        <img src={ImgNewAction} alt="nova tarefa ou categoria" />
      </div>

      <ThirdDiv>
        <div onClick={openLoginModal}>
          <div>
            <div>{user.name ? "Seja bem vindo" : "Salve suas tarefas"}</div>
            <div>{user.name ? user.name : "Entrar"}</div>
          </div>

          <img src={ImgUser} alt="Entrar" />
        </div>
        
        {
          dropdownIsOpen
          ? 
            <Dropdown onClick={logout}>
              <div><i className="fa-solid fa-arrow-right-from-bracket"></i> Sair</div>
            </Dropdown>
          : <></>          
        }
      </ThirdDiv>

      <Register isOpen={registerModalIsOpen} setIsOpen={setRegisterModalIsOpen} />

      <Login
        isOpen={loginModalIsOpen}
        setIsOpen={setLoginModalIsOpen}
        setRegisterModalIsOpen={setRegisterModalIsOpen}
      />

      <NewCategoryModal />
    </Container>
  );
}