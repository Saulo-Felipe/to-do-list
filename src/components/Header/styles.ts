import styled from "styled-components";

export const Container = styled.header`
  height: 5rem;
  padding: 0.5rem;

  section {
    background: #fff;
    height: 100%;
    border-radius: 0.75rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;

    div {
      display: flex;
      align-items: center;

      img {
        width: 3rem;
        height: 3rem;
      }
    }

    div:nth-child(1) {
      padding-left: 1rem;

      h1 {
        margin-left: 0.5rem;
      }
    }

    div:nth-child(2) {
      justify-content: center;
      position: relative;

      button {
        height: 3.7rem;
        width: 3.7rem;
        
        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background: var(--background);

        position: absolute;
        bottom: -50%;
        border: none;
      }
    }
    
    div:nth-child(3) {
      justify-content: end;
      padding-right: 1rem;

      div div {
        flex-direction: column;
        cursor: pointer;
      }

      button {
        border: none;
        background: transparent;
      }
    }

  }
`;