import { useEffect, useState } from "react";
import Modal from "react-modal";
import { CategoryCard } from "../CategoryCard";
import { Emoji, Picker, EmojiData } from "emoji-mart";

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
  const [categoryInfo, setCategoryInfo] = useState({
    bgColor: "#ffffff",
    textColor: "#000000",
    content: "Coloque aqui o nome da categoria",
    emojiID: "croissant"
  });

  const [isFormOk, setIsFormOk] = useState(false);
  const [openEmojis, setOpenEmojis] = useState(false);


  function changeContent(text: string) {
    setCategoryInfo({ ...categoryInfo, content: text });
  }

  function changeBgColor(hexaColor: string) {
    setCategoryInfo({ ...categoryInfo, bgColor: hexaColor });
  }

  function changeTxtColor(hexaColor: string) {
    setCategoryInfo({ ...categoryInfo, textColor: hexaColor });
  }

  function changeEmoji(emoji: EmojiData) {
    setOpenEmojis(false);
    setCategoryInfo({ ...categoryInfo, emojiID: emoji.id || "warning" })
  }

  useEffect(() => {
    if (categoryInfo.content.length <= 0 && isFormOk === false)
      setIsFormOk(true);
    else if (isFormOk === true)
      setIsFormOk(false);
  }, [categoryInfo.content]);

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
            value={categoryInfo.content}
            type="text"
            placeholder="Título da categoria" />
        </div>

        <div className="modal-configs-inputs">

          <div>
            <div>
              <h4>Configurações do cartão</h4>

              <RoundColorPicker>
                <div>
                  <input
                    defaultValue={categoryInfo.bgColor}
                    onChange={(e) => changeBgColor(e.target.value)}
                    value={categoryInfo.bgColor}
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
                    defaultValue={categoryInfo.textColor}
                    onChange={(e) => changeTxtColor(e.target.value)}
                    value={categoryInfo.textColor}
                    id="txt-color"
                    type="color"
                    alt="selecionar cor da letra do cartão" />
                </div>

                <label htmlFor="txt-color">Cor da letra</label>
              </RoundColorPicker>

              <div className="select-emoji" /*onClick={() => setOpenEmojis(true)}*/>
                <Emoji emoji={categoryInfo.emojiID} set='facebook' size={40} />

                {
                  openEmojis
                  ? 
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

                <label htmlFor="select-emoji-id">Ícone da categoria</label>
              </div>
            </div>

            <div></div>

            <div>
              <h4>Seu cartão de categoria ficará assim: </h4>
              <CategoryCard data={categoryInfo} />
            </div>
          </div>

          <div>

          </div>
        </div>

        <div className="finish-new-category">
          <button disabled={isFormOk}>Adicionar nova categoria</button>
        </div>

      </CategoryModalForm>
    </Modal>
  );
}