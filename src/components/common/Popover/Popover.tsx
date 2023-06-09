import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'components/common';
import { ChildrenWrapper, ContentBox } from './Popover.style';
import { useSpring } from '@react-spring/web';

type PopoverCloseOption = {
  contentClick: boolean;
  keyDown: boolean;
};

type PopoverProps = {
  content: React.ReactElement;
  children: React.ReactElement | React.ReactElement[];
  closeOption?: PopoverCloseOption;
  disabled?: boolean;
};

const Popover = ({ children, content, closeOption, disabled }: PopoverProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openPopover) {
      const triggerNode = triggerRef.current;
      const contentNode = contentRef.current;

      if (triggerNode && contentNode) {
        const triggerRect = triggerNode.getBoundingClientRect();
        const childrenRect = contentNode.getBoundingClientRect();

        const top =
          triggerRect.top + contentNode.clientHeight > window.innerHeight
            ? triggerRect.bottom - childrenRect.height - 20
            : triggerRect.top;
        const left =
          triggerRect.right + childrenRect.width + 4 > window.innerWidth
            ? triggerRect.left - childrenRect.width - 4
            : triggerRect.left + triggerRect.width + 4;

        contentNode.style.top = `${top}px`;
        contentNode.style.left = `${left}px`;
      }
    }
  }, [openPopover]);

  useEffect(() => {
    if (closeOption?.keyDown) {
      document.addEventListener('keydown', () => setOpenPopover(false));

      return document.removeEventListener('keydown', () => setOpenPopover(false));
    }
  }, []);

  const handleContentClick = () => {
    if (closeOption?.contentClick) {
      setOpenPopover(false);
    }
  };

  const popoverSpringProps = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: {
      opacity: openPopover ? 1 : 0,
      transform: openPopover ? 'scale(1)' : 'scale(0.9)',
    },
  });

  return (
    <>
      <ChildrenWrapper
        ref={triggerRef}
        onClick={() => !disabled && setOpenPopover((prev) => !prev)}
        disabled={disabled}
      >
        {children}
      </ChildrenWrapper>
      <Portal isOpen={openPopover} onDimClick={() => setOpenPopover(false)}>
        <ContentBox ref={contentRef} onClick={handleContentClick} style={popoverSpringProps}>
          {content}
        </ContentBox>
      </Portal>
    </>
  );
};

export default Popover;
