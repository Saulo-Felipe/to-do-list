import { Container, ModalForm, PickColorContainer } from "./styles";
import { useState } from "react";
import Modal from "react-modal";

import Plane from "../../assets/plane.svg";
import Folder from "../../assets/folder.svg";
import MenuCategoryIcon from "../../assets/app.png";


export function WithoutChanges() {
  const [isOpenCategoryModal, setIsOpenCategoryModal] = useState<boolean>(false);


  return (
    <Container >
      <div>
        <img src={Plane} alt="imagem de avião" />
        <h1>Nenhuma Categoria adicionada</h1>
      </div>

      <div onClick={() => setIsOpenCategoryModal(true)}>
        <img src={Folder} alt="Adicionar nova categoria"/>
      </div>

      {/* New cateogory */}
      <Modal
        isOpen={isOpenCategoryModal}
        onRequestClose={() => setIsOpenCategoryModal(false)}
        overlayClassName={"modal-overlay"}
        className={"modal-content"}
      >
        <ModalForm>
          <div>
            <img src={MenuCategoryIcon} width={"40px"} height={"40px"}/>
            <h1>Nova categoria</h1>
          </div>

          <hr />

          <input 
            type={"text"} 
            placeholder={"Nome da categoria"}
          />

          <h4>Selecione as cores do cartão</h4>
          
          <PickColorContainer>
            <div>
              <input id="backgroundColor" type={"color"} />
            </div>
            <label htmlFor="backgroundColor">Cor de fundo</label>
          </PickColorContainer>

          <PickColorContainer>
            <div>
              <input id="textColor" type={"color"} placeholder="oalaaa" />
            </div>
            <label htmlFor="textColor">Cor da letra</label>
          </PickColorContainer>


        </ModalForm>
      </Modal>
    </Container>
  );
}