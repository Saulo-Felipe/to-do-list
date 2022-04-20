import { createGlobalStyle } from "styled-components";

export const GlobalCss = createGlobalStyle`
  :root {
    --background: #F0F0F0;
    --default-font: 'Assistant', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
     }

    @media (max-with: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: var(--default-font);
    font-weight: 400;
  }
  
  h1, h2, h3, h4, h5, h6 strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  #root {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    width: 100%;
    max-width: 576px;
    background-color: #fff;
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;

    > .close-modal-icon {
      width: 1.5rem;
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
    }
  }

  hr {
    background-color: #AEAEAE;
    opacity: 0.55;
  }
  
`