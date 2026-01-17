import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  const fetchUsers = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('REST endpoint:', endpoint);
        console.log('Fetched data:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Erreur fetch:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Utilisateurs</h2>
        <button className="btn btn-primary mb-3" onClick={fetchUsers}>Recharger</button>
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nom d'utilisateur</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.username || '-'}</td>
                  <td>{JSON.stringify(user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
