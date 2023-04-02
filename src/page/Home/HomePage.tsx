import { ReactComponent as DeleteIcon } from 'assets/svgs/x-bold.svg';
import { AutoComplete } from 'components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { createUseStyles } from 'react-jss';

import useOptionList from './useOptionList';
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

export default function HomePage() {
  const { t } = useTranslation();
  const classes = useStyles();
  const { value, options, handleDelete, handleAdd, setValue } = useOptionList();
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
          onKeyDown: handleAdd,
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
