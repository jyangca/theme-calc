type TitleProps = {
  children: string;
};
const Title = ({ children }: TitleProps) => {
  return <h1>{children}</h1>;
};

export default Title;
