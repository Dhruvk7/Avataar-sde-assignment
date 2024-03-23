import React, { useState, useEffect } from 'react';
import './DynamicMenu.scss';
import logo from './logo.svg';
import searchIcon from './search.svg';

const options = [
  'HOME', 'ELECTRONICS', 'BOOKS', 'MUSIC', 'MOVIES', 'CLOTHING',
  'GAMES', 'FURNITURE', 'ELECTRONICS', 'TRAVEL', 'BOTANICAL', 'CATEGORY NAME'
];

const DynamicMenu = () => {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const [primaryOptions, setPrimaryOptions] = useState([]);
  const [moreOptions, setMoreOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('MORE');

  useEffect(() => {
    const updateOptions = () => {
      const logoWidth = 164; // Logo width
      const searchBarWidth = 468; // Search bar width
      const totalWidth = window.innerWidth;

      const optionsContainerWidth = totalWidth - logoWidth - searchBarWidth;
      const optionWidth = 120; // Adjust this based on your li width
      const maxOptions = Math.floor(optionsContainerWidth / optionWidth);

      const newPrimaryOptions = options.slice(0, maxOptions);
      const newMoreOptions = options.slice(maxOptions);

      setPrimaryOptions(newPrimaryOptions);
      setMoreOptions(newMoreOptions);
    };

    updateOptions();

    const handleResize = () => {
      setContainerWidth(window.innerWidth);
      updateOptions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerWidth]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="dynamic-menu">
      <div className="logo">
        <img src={logo} alt="E-comm Logo" />
        <span>E-COMM</span>
      </div>

      <div className="options">
        <ul>
          {primaryOptions.map((option) => (
            <li key={option} className={`option-${option}`}>{option}</li>
          ))}

          {moreOptions.length > 0 && (
            <li className='dropdown-container'>
              <select value={selectedOption} className='dropdown' onChange={handleSelectChange}>
                <option value='MORE' className={'MORE' === selectedOption ? 'hidden' : ''} >MORE</option>
                {moreOptions.map((option, index) => (
                  <option key={index} value={option} className={option === selectedOption ? 'hidden' : ''}>
                    {option}
                  </option>
                ))}
              </select>
            </li>
          )}

        </ul>

        <div className="search-bar">
          <img src={searchIcon} alt="Search Icon" />
          <input type="text" placeholder="Search Something" />
        </div>
      </div>
    </div>
  );
};

export default DynamicMenu;