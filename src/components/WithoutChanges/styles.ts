import styled from "styled-components";


export const Container = styled.section`

  //b4b4b4

  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 3rem;

    h1 {
      color: #b4b4b4;
      font-size: 2rem;
    }

    img {
      width: 70px;
      margin-right: 0.5rem;
    }
  }

  div:nth-child(2) {
    width: 12rem;
    height: 12rem;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 0.5rem;
    box-shadow: 0 0 20px rgb(0, 0, 0, 0.15);

    cursor: pointer;

    transition: box-shadow 0.2s;

    &:hover {
      box-shadow: 0 0 30px rgb(0, 0, 0, 0.3);

      img {
        animation-name: folder-moviment;
      }
    }

    img {
      opacity: 0.5;
      animation-duration: 0.8s;
      animation-iteration-count: infinite;
      transition: all 0.5s;
    }

    @keyframes folder-moviment {
      0% { margin-top: 0; }
      50% { margin-top: -10px; }
      100% { margin-top: 0px; }
    }
  }
`;

export const ModalForm = styled.div`

  h4 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  div:nth-child(1) {
    display: flex;
  }


  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  div:nth-child(3) {
    margin-top: 1.5rem;
  }
  

  input[type="text"] {
    width: 100%;
    border: solid 1px #c3c3c3;
    height: 3rem;
    padding-left: 0.5rem;
    font-size: 1.4rem;

    &::placeholder {
      font-size: 1rem;
    }

    &:hover {
      border: solid 1px #707070;
    }
  }



`;


export const PickColorContainer = styled.div`
  display: flex;
  align-items: center;

  
  & + div {
    margin-top: 1rem;
  }

  label {
    margin-left: 0.75rem;
  }

  input[type="color"] {
    border: none;
    width: 150%;
    height: 150%;
    margin: -25%;
  }

  div {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 3px 0px grey;
  }
`;