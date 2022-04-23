import { useCategories } from "../../hooks/useCategories";
import { NewCategoryModal } from "../Categories/NewCategoryModal";

import { Container } from "./styles";
import ImgLogo from "../../assets/logo.svg";
import ImgNewAction from "../../assets/newAction.svg";
import ImgUser from "../../assets/user.svg";


export function Header() {
  const { setNewCategoryModalIsOpen } = useCategories().modalOpen;
 
  return (
    <Container>
      <div>
        <img src={ImgLogo} alt="Logotipo" />

        <h1>To-do List :D</h1>
      </div>

      <div onClick={() => setNewCategoryModalIsOpen(true)}>
        <img src={ImgNewAction} alt="nova tarefa ou categoria" />
      </div>

      <div>        
        <div>
          <div>Entrar</div>
          <div>Salve suas tarefas</div>
        </div>

        <img src={ImgUser} alt="Entrar" />
      </div>

      <NewCategoryModal />
    </Container>
  );
}