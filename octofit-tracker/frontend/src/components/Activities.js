import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchActivities = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('REST endpoint:', endpoint);
        console.log('Fetched data:', data);
        setActivities(data.results || data);
      })
      .catch(err => console.error('Erreur fetch:', err));
  };

  useEffect(() => {
    fetchActivities();
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Activités</h2>
        <button className="btn btn-primary mb-3" onClick={fetchActivities}>Recharger</button>
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
              {activities.map((activity, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{activity.name || '-'}</td>
                  <td>{JSON.stringify(activity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Activities;
