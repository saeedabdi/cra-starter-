import { ReactComponent as DeleteIcon } from 'assets/svgs/x-bold.svg';
import { AutoComplete } from 'components';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  autoCompleteItemWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    borderRadius: 7,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#9ecaed',
    },
  },
  autoCompleteItem: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },

  icon: {
    width: 20,
    height: 20,
    borderRadius: '50%',
  },
  deleteIcon: {
    width: 15,
    cursor: 'pointer',
    height: 15,
  },
});
type OptionType = {
  label: string;
  value: string;
  icon: string;
};
export default function HomePage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [value, setValue] = useState<string>();
  const [options, setOptions] = useState<OptionType[]>([
    {
      label: 'Home',
      value: 'home',
      icon: createRandomIconUrl(),
    },
    {
      label: 'About',
      value: 'about',
      icon: createRandomIconUrl(),
    },
    {
      label: 'Contact',
      value: 'contact',
      icon: createRandomIconUrl(),
    },
  ]);

  const handleDelete = (option: OptionType) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();

    if (value === option.value) {
      setValue('');
    }
    const newOptions = options.filter(item => item.value !== option.value);
    setOptions(newOptions);
  };
  return (
    <div className={classes.wrapper}>
      <AutoComplete
        options={options}
        renderOption={option => (
          <div className={classes.autoCompleteItemWrapper}>
            <div className={classes.autoCompleteItem}>
              <span>{option?.label}</span>
              <img className={classes.icon} src={option.icon} alt={option?.label} width={20} height={20} />
            </div>
            <DeleteIcon color="#777" onClick={handleDelete(option)} className={classes.deleteIcon} />
          </div>
        )}
        inputProps={{
          placeholder: t('Search or add') as string,
          onKeyDown: event => {
            if (event.key === 'Enter') {
              const { value } = event.currentTarget;
              if (!value) return;
              const newOption = {
                label: value,
                value,
                icon: createRandomIconUrl(),
              };
              if (options.findIndex(option => option.value === value) === -1) {
                setValue(value);
                setOptions([...options, newOption]);
              }
            }
          },
        }}
        value={value}
        onChange={value => setValue(value as string)}
        keyExtractor={option => option?.value}
        valueExtractor={option => option?.value}
        getLabel={option => option?.label}
        valueEquals={(a, b) => a?.value === b?.value}
      />
    </div>
  );
}

function createRandomIconUrl() {
  const random = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/200/200?random=${random}`;
}
