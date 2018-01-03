import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <tr>
        <th>Repo Name</th>
        <th>Stargazer Count</th>
      </tr>
      {props.repos.map((repo) => {
        return (
          <tr>
            <td>{repo.repoName}</td>
            <td>{repo.stargazerCount}</td>
          </tr>
        )}
      )}
    </table>
  </div>
)

export default RepoList;