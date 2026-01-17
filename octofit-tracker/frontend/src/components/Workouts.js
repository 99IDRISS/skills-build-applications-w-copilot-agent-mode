import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchWorkouts = () => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('REST endpoint:', endpoint);
        console.log('Fetched data:', data);
        setWorkouts(data.results || data);
      })
      .catch(err => console.error('Erreur fetch:', err));
  };

  useEffect(() => {
    fetchWorkouts();
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Entraînements</h2>
        <button className="btn btn-primary mb-3" onClick={fetchWorkouts}>Recharger</button>
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
              {workouts.map((workout, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{workout.name || '-'}</td>
                  <td>{JSON.stringify(workout)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
