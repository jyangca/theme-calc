import { memo } from 'react';

type TitleProps = {
  children: string;
  color?: string;
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLAttributes<HTMLHeadingElement>;

const Title = ({ children, tag, color, ...props }: TitleProps) => {
  const Tag = tag;
  return (
    <Tag {...props} style={{ margin: '0', color: color }}>
      {children}
    </Tag>
  );
};

export default memo(Title);
