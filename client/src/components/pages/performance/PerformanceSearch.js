import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/PerformanceSearch.css';
import { searchPerformance } from '../../../actions/setPerformance';


const PerformanceSearch = ({ setPerformance, searchPerformance }) => {
  const [ searchInput, setSearchInput ] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    searchPerformance({date: searchInput});
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <form className='performance-search' onSubmit={onSubmit}>
      <input className='performance-search__input' type='text' placeholder='Date: DD/MM/YYYY' onChange={handleSearchInput} value={searchInput} />
      <button type='submit' className='performance-search__select'>Search</button>
    </form>
  )
}

PerformanceSearch.propTypes = {
  searchPerformance: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  setPerformance: state.setPerformance
});

export default connect(mapStateToProps, { searchPerformance })(PerformanceSearch);