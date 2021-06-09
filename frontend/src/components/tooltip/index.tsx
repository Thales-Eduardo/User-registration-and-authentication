import React from 'react';

import { Contaienr } from './styled';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ title, className, children }) => {
  return (
    <Contaienr className={className}>
      {children}
      <span>{title}</span>
    </Contaienr>
  );
};

export default Tooltip;
