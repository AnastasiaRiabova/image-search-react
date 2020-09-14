import React, { Component } from 'react';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  inputSearch = event => {
    this.setState({
      value: event.currentTarget.value,
    });
  };

  onSubmitForm = event => {
    event.preventDefault();
    this.props.getInputValue(this.state.value);
  };

  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.onSubmitForm}>
            <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
            </button>

            <input
              className="SearchForm-input"
              type="text"
              name={this.state.value}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.inputSearch}
            />
          </form>
        </header>
      </>
    );
  }
}

export default SearchBar;
