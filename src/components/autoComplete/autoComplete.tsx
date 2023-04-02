/* eslint-disable no-unused-vars */
import { ReactComponent as ArrowDown } from 'assets/svgs/keyboard-arrow-down-rounded.svg';
import { Dropdown, DropdownProps } from 'components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles<
  'inputWrapper' | 'input' | 'arrow',
  {
    open: boolean;
  }
>({
  inputWrapper: {
    position: 'relative',
  },
  input: {
    border: ' 2px solid #dadada',
    borderRadius: 7,
    outline: 'none',
    fontSize: '16px',

    padding: '8px',
    '&:focus': {
      outline: 'none',
      borderColor: '#9ecaed',
      boxShadow: '0 0 10px #9ecaed',
    },
  },

  arrow: {
    position: 'absolute',
    right: 10,
    transition: 'all 0.2s ease-in-out',
    transform: props => (props.open ? 'rotate(180deg)' : 'rotate(0deg)'),
    top: 10,
    width: 20,
    height: 20,
    cursor: 'pointer',
  },
});

interface Props<T> {
  options?: T[];
  renderOption: (option: T) => React.ReactNode;
  keyExtractor: (option: T) => string;
  onChange?: (option: T | string) => void;
  defaultValue?: T;
  value?: T | string;
  valueEquals?: (a: T, b: T) => boolean;
  valueExtractor?: (option: T) => string;
  getLabel?: (option: T) => string;
  inputProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'defaultValue'>;
  dropdownProps?: Omit<DropdownProps, 'children'>;
}

function AutoComplete<T extends object = any>({
  options,
  renderOption,
  onChange,
  keyExtractor,
  valueExtractor,
  getLabel,
  valueEquals,
  defaultValue,
  value,
  inputProps,
  dropdownProps,
}: Props<T>) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [inputValue, setInputValue] = useState(typeof value === 'string' ? value : getLabel?.(value as T));
  const [filteredOptions, setFilteredOptions] = useState(options);
  const classes = useStyles({ open: Boolean(anchorEl) });
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    if (value !== undefined) {
      const newInputValue = typeof value === 'string' ? value : getLabel?.(value as T);
      setInputValue(newInputValue);
      const filtered = options?.filter(option => getLabel?.(option)?.toLowerCase().includes(String(newInputValue).toLowerCase()));
      setFilteredOptions(filtered);
    }
  }, [value]);

  return (
    <>
      <div onClick={handleClick} className={classes.inputWrapper}>
        <input
          value={inputValue}
          defaultValue={getLabel?.(defaultValue as T)}
          className={classes.input}
          {...inputProps}
          type="text"
          onChange={e => {
            const filtered = options?.filter(option => getLabel?.(option)?.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredOptions(filtered);
            setInputValue(e.target.value);
          }}
          onClick={handleClick}
        />

        <ArrowDown color="#777" className={classes.arrow} onClick={handleClose} />
      </div>
      <Dropdown
        style={{
          marginTop: '10px',
          maxHeight: '200px',
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
        {...dropdownProps}
      >
        {filteredOptions?.length ? (
          filteredOptions?.map(option => (
            <div
              key={keyExtractor(option)}
              onClick={() => {
                onChange?.(valueExtractor ? valueExtractor(option) : option);
                handleClose();
              }}
            >
              {renderOption(option)}
            </div>
          ))
        ) : (
          <div>{t('No results')}</div>
        )}
      </Dropdown>
    </>
  );
}

export default AutoComplete;
