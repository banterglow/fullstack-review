import React from 'react';
let moment = require('moment');

const RepoList = (props) => (
  <div>
    <h4> Repo List Component <br/> There are {props.repos.length} repos.</h4>
    
    <table>
      <thead>
        <tr>
          <th>Repo Name</th>
          <th>Star Count</th>
          <th>Owner</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      {props.repos.map((repo) => {
        return (
          <tbody key={repo.updatedAt}>
            <tr>
              <td><a href={repo.htmlUrl}>{repo.repoName}</a></td>
              <td>{repo.stargazerCount}</td>
              <td><img src={repo.owner.avatarUrl} /> {repo.owner.username}</td>
              <td>{moment(repo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            </tr>
          </tbody>
        )}
      )}
    </table>
  </div>
)

export default RepoList;