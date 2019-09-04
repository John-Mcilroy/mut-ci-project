import React from 'react';
import './styles/PerformanceSearch.css';

const PerformanceSearch = () => {
  const onSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <form className='performance-search' onSubmit={onSubmit}>
      <input className='performance-search__input' type='text' placeholder='Search for Partner' />
      <select className='performance-search__select'>
        <option value='all'>All Partners</option>
        <option value='name'>by Name</option>
        <option value='number'>by Number</option>
      </select>
      <input type='submit' hidden />
    </form>
  )
}

export default PerformanceSearch;