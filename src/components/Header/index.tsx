import { useState } from "react";
import { Container } from "./styles";
import NewAction from "../../assets/newAction.svg";
import Logo from "../../assets/logo.svg";
import User from "../../assets/user.svg";
import Modal from "react-modal";

Modal.setAppElement("#root");

export function Header() {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  

  function openLoginModal() {
    setLoginModalIsOpen(true);
  }

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

        <div>
          <div onClick={openLoginModal} >
            <div>
              <span>Entrar</span>
              <small>Salve suas tarefas :)</small>
            </div>

            <button>
              <img src={User} alt="reaizar login"/>
            </button>
          </div>
        </div>

        <Modal 
          isOpen={loginModalIsOpen}
          onRequestClose={() => setLoginModalIsOpen(false)}
          overlayClassName={"modal-overlay"}
          className={"modal-content"}
        >
          <h2>Teste de content do modal</h2>
        </Modal>
      </section>
    </Container>
  );
}