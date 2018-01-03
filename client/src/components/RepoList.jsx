import React from 'react';
let moment = require('moment');

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
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
              <td>{repo.owner.username}</td>
              <td>{moment(repo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            </tr>
          </tbody>
        )}
      )}
    </table>
  </div>
)

export default RepoList;