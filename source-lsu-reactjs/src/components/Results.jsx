import React, { useEffect, useState } from 'react';

const Results = ({votes, candidates}) => {
  const [applicants, setApplicants] = useState(null);

  useEffect(() => {
    if (votes) {
      let tmpPresidentialData = [];
      candidates.presidential.map((p) => {
        const idx = votes.findIndex((v) => v.id === p.id);
        if (idx !== -1) {
          tmpPresidentialData = [
            ...tmpPresidentialData,
            {
              ...votes[idx],
              ...p,
            },
          ];
        }
      });

      let tmpVicePresidentialData = [];
      candidates.vicepresidential.map((p) => {
        const idx = votes.findIndex((v) => v.id === p.id);
        if (idx !== -1) {
          tmpVicePresidentialData = [
            ...tmpVicePresidentialData,
            {
              ...votes[idx],
              ...p,
            },
          ];
        }
      });

      tmpPresidentialData = tmpPresidentialData.sort(
        (a, b) => b.counts - a.counts
      );
      tmpVicePresidentialData = tmpVicePresidentialData.sort(
        (a, b) => b.counts - a.counts
      );

      setApplicants({
        presidential: tmpPresidentialData,
        vicepresidential: tmpVicePresidentialData,
      });
    }
  }, [votes]);


  return (
    <div className="wrapper">
      <h1 className="title mb-3">Ranking</h1>
      <div className="list-container">
        <h3 className="title mb-3">Presidential Candidates</h3>
        {applicants?.presidential?.map((d) => {
          return (
            <div className="list">
              <span className="name">
                {[d.last_name, d.first_name].join(', ')}
              </span>
              <span className="counts">{d.counts}</span>
            </div>
          );
        })}
      </div>
      <div className="list-container">
        <h3 className="title mb-3">Vice Presidential Candidates</h3>
        {applicants?.vicepresidential?.map((d) => {
          return (
            <div className="list">
              <span className="name">
                {[d.last_name, d.first_name].join(', ')}
              </span>
              <span className="counts">{d.counts}</span>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Results;