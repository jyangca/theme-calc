import { Flex, IconButton } from 'components/common';
import { memo } from 'react';
import { BsGithub, BsSunFill, BsMoonFill } from 'react-icons/bs';
import { IoLogoMarkdown } from 'react-icons/io5';

const Header = () => {
  const handleClickGithub = () => {
    window.location.href = 'https://github.com/jyangca';
  };
  const handleClickMarkdown = () => {
    window.location.href = 'https://www.jyangca.com';
  };

  return (
    <Flex justify="END" boxFill>
      <IconButton onClick={handleClickGithub}>
        <BsGithub size="30px" color="#c7c7c7" />
      </IconButton>
      <IconButton onClick={handleClickMarkdown}>
        <IoLogoMarkdown size="30px" color="#c7c7c7" />
      </IconButton>
    </Flex>
  );
};

export default memo(Header);
