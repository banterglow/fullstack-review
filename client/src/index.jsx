import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    let self = this;
    $.ajax(`http://localhost:1128/repos`, {
      type: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify({term: term}),
      success: function(result) {
        self.setState({
          repos: result
        })
      },
      error: function(e) {
        if (e.responseText.includes('validation')) {
          alert(`User ${term} was previously added to the database. No repositories have been added to the database.`)
        } else {
          alert(`User ${term} was not found in Github. No repositories have been added to the database.`);
        }
        
      }
      
    });
  }

  componentDidMount() {
    let self=this;
    $.ajax(`http://localhost:1128/repos`, {
      type: 'GET',
      success: function (result) {
        self.setState({
          repos: result
        })
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));