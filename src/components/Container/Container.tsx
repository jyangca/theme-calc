import { ContainerWrapper } from './Container.style';

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return (
    <ContainerWrapper direction="COLUMN" gap={{ row: 12 }} boxFill>
      {children}
    </ContainerWrapper>
  );
};

export default Container;
