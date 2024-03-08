import React, { useState } from 'react';
import s from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Searchbar = ({handleSetQuery}) => {

  const [searchValue, setSearchValue] = useState('')


const handleChangeValue=(e) =>{
  setSearchValue(e.target.value)
  // this.setState({searchValue: e.target.value})
}

const handleSubmit = e => {
  e.preventDefault();
  if (searchValue.trim() === '') {
    return toast.warn('Please enter text!');
  }
  handleSetQuery(searchValue)
  setSearchValue('')
  // this.setState({ seachValue: '' });
}

        return (
<header className={s.Searchbar}>
  <form className={s.SearchForm} onSubmit={handleSubmit}>
    <button type="submit" className={s.button} >
      <span className={s.buttonLabel}>Search</span>
    </button>

    <input
      className={s.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={searchValue}
      onChange = {handleChangeValue}
    />
  </form>
</header>
        )
    }
    
