import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search(e) {
    e.preventDefault();
    this.props.onSearch(this.state.term);
    this.setState({
      term: ''
    });
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: 
      <form className="search-form" onSubmit={this.search}> 
        <input type="text" value={this.state.term} onChange={this.onChange} />
        <button type="submit" onClick={this.search}> Add Repos </button>
      </form>
    </div>) 
  }
}

export default Search;