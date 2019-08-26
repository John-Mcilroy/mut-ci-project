import React from 'react';
import './stylesheets/PerformanceSearch.css';

const PerformanceSearch = () => {
  const onSubmit = (e) => {
    e.preventDefault();

    console.log('clicked');
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