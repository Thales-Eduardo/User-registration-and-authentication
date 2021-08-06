import styled from 'styled-components';

export const Contaienr = styled.div`
  position: relative;

  span {
    background: ${(props) => props.theme.colors.backgroundError};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 10px);
    width: 160px;
    left: 50%;
    transform: translateX(-50%);

    color: ${(props) => props.theme.colors.color};

    &::before {
      content: '';
      border-style: solid;
      border-color: ${(props) => props.theme.colors.backgroundError} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
