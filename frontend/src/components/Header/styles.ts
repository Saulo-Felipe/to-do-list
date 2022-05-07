import styled from "styled-components";


export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2D2E3D;

  padding: 1rem;
  position: relative;

  > div:nth-child(1) {
    display: flex;
    align-items: end;

    > h1 {
      color: white;
      margin-left: 0.75rem;

    }
  }

  > div:nth-child(2) {
    position: absolute;
    cursor: pointer;

    top: 150%;
    left: 50%;

    transform: translate(-50%, -100%);
    background-color: #21222F;

    width: 60px;
    height: 60px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 40px;
    }

  }



`;

export const ThirdDiv = styled.div`
  position: relative;
  user-select: none;

  > div:nth-child(1) {

    cursor: pointer;
    display: flex;

    > div:nth-child(1) {
      text-align: center;
      color: white;
      margin-right: 1rem;

      > div:nth-child(1) {
        font-size: 1.25rem;
      }
    }
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 115%;
  background-color: #14143c;
  color: white;
  width: 80%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.3s;
  padding-left: 1rem;

  :hover {
    background-color: #3c1414;
  }
`;