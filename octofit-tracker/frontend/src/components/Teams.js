import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  const fetchTeams = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('REST endpoint:', endpoint);
        console.log('Fetched data:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Erreur fetch:', err));
  };

  useEffect(() => {
    fetchTeams();
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Équipes</h2>
        <button className="btn btn-primary mb-3" onClick={fetchTeams}>Recharger</button>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{team.name || '-'}</td>
                  <td>{JSON.stringify(team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teams;
