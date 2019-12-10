import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles/PerformanceSearch.css';
import { searchPerformance } from '../../../actions/setPerformance';


const PerformanceSearch = ({ setPerformance, searchPerformance }) => {
  const [ partnerNumberInput, setPartnerNumberInput ] = useState('');
  const [ dateFromInput, setDateFromInput ] = useState('');
  const [ dateToInput, setDateToInput ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    searchPerformance({ dateFrom: dateFromInput, dateTo: dateToInput, partner: partnerNumberInput });
    setPartnerNumberInput('');
    setDateFromInput('');
    setDateToInput('');
  }

  const handlePartnerNumberInput = (e) => {
    setPartnerNumberInput(e.target.value);
  }
  const handleDateFromInput = (e) => {
    setDateFromInput(e.target.value);
  }
  const handleDateToInput = (e) => {
    setDateToInput(e.target.value);
  }

  return (
    <form className='performance-search' onSubmit={onSubmit} autoComplete='off'>
      <input className='performance-search__input' type='text' placeholder='Partner Number' id='search' onChange={handlePartnerNumberInput} value={partnerNumberInput} />
      <input className='performance-search__input' type='text' placeholder='Date From' id='search' onChange={handleDateFromInput} value={dateFromInput} />
      <input className='performance-search__input' type='text' placeholder='Date To' id='search' onChange={handleDateToInput} value={dateToInput} />
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