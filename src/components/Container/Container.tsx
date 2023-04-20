import { ContainerWrapper } from './Container.style';

type ContainerProps = {
  children: React.ReactNode;
};
const Container = ({ children }: ContainerProps) => {
  return (
    <ContainerWrapper direction="COLUMN" gap={{ row: 16 }} boxFill>
      {children}
    </ContainerWrapper>
  );
};

export default Container;
