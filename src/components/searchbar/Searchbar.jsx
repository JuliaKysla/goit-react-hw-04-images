import React from 'react';
import s from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';


export class Searchbar extends React.Component {
state = {
  searchValue: '',

};

handleChangeValue=(e) =>{
  this.setState({searchValue: e.target.value})
}

handleSubmit = e => {
  e.preventDefault();
  console.log(this.state)
  this.props.handleSetQuery(this.state.searchValue)
  // this.setState({ seachValue: '' });
}

    render() {
        return (
<header className={s.Searchbar}>
  <form className={s.SearchForm} onSubmit={this.handleSubmit}>
    <button type="submit" className={s.button} >
      <span className={s.buttonLabel}>Search</span>
    </button>

    <input
      className={s.input}
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      value={this.state.searchValue}
      onChange = {this.handleChangeValue}
    />
  </form>
</header>
        )
    }
    
}