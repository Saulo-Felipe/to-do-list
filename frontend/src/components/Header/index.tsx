import { useCategories } from "../../hooks/useCategories";
import { NewCategoryModal } from "../Categories/NewCategoryModal";
import { Register } from "../Register";
import { useState } from "react";

import { Container } from "./styles";
import ImgLogo from "../../assets/logo.svg";
import ImgNewAction from "../../assets/newAction.svg";
import ImgUser from "../../assets/user.svg";


export function Header() {
  const { setNewCategoryModalIsOpen } = useCategories().modalOpen;
  const [registerModalIsOpen, setRegisterModalIsOpen] = useState(false);

  return (
    <Container>
      <div>
        <img src={ImgLogo} alt="Logotipo" />

        <h1>To-do List :D</h1>
      </div>

      <div onClick={() => setNewCategoryModalIsOpen(true)}>
        <img src={ImgNewAction} alt="nova tarefa ou categoria" />
      </div>

      <div onClick={() => setRegisterModalIsOpen(true)}>
        <div>
          <div>Entrar</div>
          <div>Salve suas tarefas</div>
        </div>

        <img src={ImgUser} alt="Entrar" />
      </div>

      <Register isOpen={registerModalIsOpen} setIsOpen={setRegisterModalIsOpen} />
      <NewCategoryModal />
    </Container>
  );
}