/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { ReactElement, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';

export interface DropdownProps {
  anchorEl: HTMLElement | null;
  style?: React.CSSProperties;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export type DropdownClasses = 'popover' | 'backdrop';
const PADDING = 8;
const useStyles = createUseStyles<DropdownClasses>({
  popover: {
    position: 'absolute',
    zIndex: 100000,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 32px)',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: '#fff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.16)',
    borderRadius: 7,
    padding: PADDING,
  },

  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 10000,
  },
});

function Dropdown({ anchorEl, onClose, children, style, className }: DropdownProps): ReactElement | null {
  const classes = useStyles();

  if (anchorEl) {
    return (
      <>
        <div
          className={classNames(classes.popover, className)}
          style={{
            top: anchorEl.offsetTop + anchorEl.offsetHeight,
            left: anchorEl.offsetLeft,
            width: anchorEl.offsetWidth - PADDING * 2,
            ...style,
          }}
        >
          {children}
        </div>
        <div onClick={onClose} onKeyDown={onClose} className={classes.backdrop} />
      </>
    );
  }
  return null;
}

export default Dropdown;
