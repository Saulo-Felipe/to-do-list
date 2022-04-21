import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CategoryCard } from "../CategoryCard";
import { Emoji, Picker, EmojiData } from "emoji-mart";
import { useCategories } from "../../../hooks/useCategories";

import MenuCategoryIcon from "../../../assets/app.png";
import CloseModal from "../../../assets/close.png";
import { CategoryModalForm, RoundColorPicker } from "./styles";



type NewCategoryModalProps = {
  state: {
    newCategoryModalIsOpen: boolean;
    setNewCategoryModalIsOpen: (value: boolean) => void;
  }
}

export function NewCategoryModal({state}: NewCategoryModalProps) {
  const {previewNewCategory, setPreviewNewCategory} = useCategories().newCategoryState;
  const {createLocalCategory} = useCategories();

  const [isFormOk, setIsFormOk] = useState(false);
  const [openEmojis, setOpenEmojis] = useState(false);


  function changeContent(text: string) {
    setPreviewNewCategory({ ...previewNewCategory, content: text });
  }

  function changeBgColor(hexaColor: string) {
    setPreviewNewCategory({ ...previewNewCategory, bgColor: hexaColor });
  }

  function changeTxtColor(hexaColor: string) {
    setPreviewNewCategory({ ...previewNewCategory, textColor: hexaColor });
  }

  function changeEmoji(emoji: EmojiData) {
    setOpenEmojis(false);
    setPreviewNewCategory({ ...previewNewCategory, emojiID: emoji.id || "warning" });
  }

  function addNewCategory() {
    if (previewNewCategory.content?.length === 0) {
      alert("ERRO! Categoria sem conteúdo, tente novamente.");
    } else {
      createLocalCategory(previewNewCategory);
    }
  }


  useEffect(() => {
    if (previewNewCategory.content.length <= 0 && isFormOk === false)
      setIsFormOk(true);
    else if (isFormOk === true)
      setIsFormOk(false);
  }, [previewNewCategory.content]);

  return (
    <Modal
      isOpen={state.newCategoryModalIsOpen}
      onRequestClose={() => state.setNewCategoryModalIsOpen(false)}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
    >

      <img
        onClick={() => state.setNewCategoryModalIsOpen(false)}
        className="close-modal-icon"
        src={CloseModal}
        alt="Fechar modal"
      />

      <CategoryModalForm>

        <div className="modal-title-header">
          <img src={MenuCategoryIcon} alt="Nova categoria icone" />
          <h1>Adicione uma nova Categoria</h1>
        </div>

        <div className="modal-title-input">
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => changeContent(e.target.value)}
            value={previewNewCategory.content}
            type="text"
            placeholder="Coloque aqui o nome da categoria" />
        </div>

        <div className="modal-configs-inputs">

          <div>
            <div>
              <h4>Configurações do cartão</h4>

              <RoundColorPicker>
                <div>
                  <input
                    onChange={(e) => changeBgColor(e.target.value)}
                    value={previewNewCategory.bgColor}
                    id="bg-color"
                    type="color"
                    alt="selecionar cor do fundo do cartão"
                  />
                </div>

                <label htmlFor="bg-color">Cor de fundo</label>
              </RoundColorPicker>

              <RoundColorPicker>
                <div>
                  <input
                    onChange={(e) => changeTxtColor(e.target.value)}
                    value={previewNewCategory.textColor}
                    id="txt-color"
                    type="color"
                    alt="selecionar cor da letra do cartão" />
                </div>

                <label htmlFor="txt-color">Cor da letra</label>
              </RoundColorPicker>

              <div className="select-emoji">
                { openEmojis ? 
                  <Picker
                    set="facebook"
                    onSelect={(e) => changeEmoji(e)}
                    
                    showPreview={false}
                    showSkinTones={false}
                    theme={"dark"}
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "3rem",
                      zIndex: 2,
                      minWidth: "300px",
                    }}
                  /> : <></>
                }
                
                <div id="icon-container" onClick={() => openEmojis ? setOpenEmojis(false) : setOpenEmojis(true)}>
                  <Emoji emoji={previewNewCategory.emojiID} set="facebook" size={40} />

                  <label htmlFor="select-emoji-id">Ícone da categoria</label>
                </div>

              </div>
            </div>

            <div></div>

            <div>
              <h4>Seu cartão de categoria ficará assim: </h4>
              <CategoryCard data={previewNewCategory} />
            </div>
          </div>
        </div>

        <div className="finish-new-category">
          <button disabled={isFormOk} onClick={addNewCategory}>Adicionar nova categoria</button>
        </div>

      </CategoryModalForm>
    </Modal>
  );
}