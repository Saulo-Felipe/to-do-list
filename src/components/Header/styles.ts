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

    top: 150%;
    left: 50%;
    bottom: 0px;

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

  > div:nth-child(3) {
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