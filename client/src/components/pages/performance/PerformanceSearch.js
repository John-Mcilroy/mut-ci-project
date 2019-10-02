import React, { useState } from 'react';
import axios from 'axios';
import './styles/PerformanceSearch.css';

const PerformanceSearch = () => {
  const [ searchInput, setSearchInput ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    let res;
    let input = searchInput || '';
    setSearchInput('');
    if(input) res = await axios.get(`/api/performance/search/${input}`)

    if ( res.data ) console.log(res.data);
    setSearchInput('');
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);

    console.log(`Search Input: ${searchInput}`);
  }

  return (
    <form className='performance-search' onSubmit={onSubmit}>
      <input className='performance-search__input' type='text' placeholder='Search for Partner' onChange={handleSearchInput} value={searchInput} />
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