import React, { useState } from 'react';

type OptionType = {
  label: string;
  value: string;
  icon: string;
};

const useOptionList = () => {
  function createRandomIconUrl() {
    const random = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/200/200?random=${random}`;
  }
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

  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  return { value, options, handleDelete, handleAdd, setValue };
};

export default useOptionList;
