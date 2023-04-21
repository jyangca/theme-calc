import { ContentsWrapper } from './ContentContainer.style';

type ContentContainerProps = {
  children: React.ReactNode;
};
const ContentContainer = ({ children }: ContentContainerProps) => {
  return <ContentsWrapper gap={{ column: 16 }}>{children}</ContentsWrapper>;
};

export default ContentContainer;
