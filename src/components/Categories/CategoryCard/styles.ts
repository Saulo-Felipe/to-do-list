import styled from "styled-components";


export const Container = styled.div`
  width: 15rem;
  height: 15rem;
  background-color: #fff;

  box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);

  border-radius: 0.75rem;
  cursor: pointer;

  &:hover header img {
    opacity: 1;
  }

  display: flex;
  flex-direction: column;

  header {
    padding: 0.85rem 0 0 0.85rem;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    img {
      padding: 0.4rem 0.8rem 0 0;
      transition: all 0.3s;
      opacity: 0;
    }
  }

  section {
    font-size: 2rem;
    padding: 0 1rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

`;