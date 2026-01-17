import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  const fetchLeaders = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('REST endpoint:', endpoint);
        console.log('Fetched data:', data);
        setLeaders(data.results || data);
      })
      .catch(err => console.error('Erreur fetch:', err));
  };

  useEffect(() => {
    fetchLeaders();
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Leaderboard</h2>
        <button className="btn btn-primary mb-3" onClick={fetchLeaders}>Recharger</button>
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
              {leaders.map((leader, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{leader.name || '-'}</td>
                  <td>{JSON.stringify(leader)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
