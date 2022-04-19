import { Container } from "./styles";
import NewAction from "../../assets/newAction.svg";
import Logo from "../../assets/logo.svg";

export function Header() {

  return (
    <Container>
      <section>
        <div>
          <img src={Logo} alt="logotipo react"/>
          <h1>Todo List </h1>
        </div>

        <div>
          <button>
            <img src={NewAction} alt="Adicionar nova ação" />
          </button>
        </div>

        <div></div>
      </section>
    </Container>
  );
}