import styled from 'styled-components';

export const Contaienr = styled.div`
  position: relative;

  span {
    background: #c53030;
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

    color: #f4ede8;

    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
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
