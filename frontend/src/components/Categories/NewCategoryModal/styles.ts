import styled from "styled-components";


export const teste = styled.div``;

export const CategoryModalForm = styled.section`

  .modal-title-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.4rem;
      
    img {
      width: 40px;
      height: 40px;
      margin-right: 1rem;
    }

    h1 {
      font-size: 1.4rem;

      @media (max-width: 720px) {
        font-size: 1rem;
      }
    }
  }

  .modal-title-input {
    margin-bottom: 1.4rem;

    input[type="text"] {
      border: solid 1px #b9b9b9; 
      width: 100%;
      height: 3rem;
      padding-left: 0.75rem;
      font-size: 1rem;
      transition: all 0.3s;

      &:hover {
        border: solid 1px #8d8d8d; 
      }
    }
  }

  .modal-configs-inputs {
    > div:nth-child(1) {
      display: flex;
      justify-content: space-between;

      > div:nth-child(2) {
        width: 1px;
        background: rgb(0, 0, 0, 0.1);
      }

      @media (max-width: 720px) {
        flex-direction: column;
      }
    }

    h4 {
      margin-bottom: 1rem;
      font-size: 0.85rem;
    }
  }

  .finish-new-category {
    padding-top: 2rem;

    button {
      border: none;
      background-color: #363676;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.25rem;
      font-size: 1rem;
      transition: filter 0.3s;
      width: 100%;

      &:hover {
        filter: brightness(0.8);
      }
    }
  }

  .select-emoji {
    position: relative;

    #icon-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      
      background-color: rgb(0, 0, 0, 0.05);
      padding: 0.2rem;
      border-radius: 0.25rem;
      transition: 200ms;

      &:hover {
        background-color: rgb(0, 0, 0, 0.085);
      }

      label {
        margin-left: 0.5rem;
        cursor: pointer;
      }
      
    }
  }

  .preview-container {
    @media (max-width: 720px) {
      margin-top: 1rem;
    }
  }
`;

export const RoundColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;

  div {
    margin-top: 0 !important;
  }

  > div:nth-child(1) {
    width: 49%;
  }
  > div:nth-child(2) {
    width: 49%;
  }
`;

export const RoundColorPicker = styled.div`
  display: flex;
  align-items: center;

  div, label, input {
    cursor: pointer;
  }

  background-color: rgb(0, 0, 0, 0.05);
  padding: 0.2rem;
  border-radius: 0.25rem;
  transition: 200ms;

  &:hover {
    background-color: rgb(0, 0, 0, 0.085);
  }

  & + div {
    margin-top: 0.8rem;
  }

  div:nth-child(1) {
    box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.5);
    border-radius: 50%;

    width: 2.5rem;
    height: 2.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-right: 0.5rem;
    overflow: hidden;

    input[type="color"] {
      border: none;
      background-color: transparent;
      width: 150%;
      height: 150%;
      margin: -25%;
    }
  }
`;