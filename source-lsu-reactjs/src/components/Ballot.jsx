import React from 'react';

const Ballot = ({ candidates, selectedCandidate, onClick }) => {

    //!  Check candidates and user select candidates
    const Candidate = ({ data, name, onClick, ...props }) => {
        const isChecked = selectedCandidate && selectedCandidate.candidates[name] === data.id
                ? 'active'
                : '';

        return (
            <div
                id={data.id}
                name={name}
                className="candidate"
                onClick={() => {
                    onClick({ name, id: data.id });
                }}
                {...props}
            >
                <span className={['radio', isChecked].join(' ')} />
                <span className="name">
                    {[data.last_name, data.first_name].join(', ')}
                </span>
            </div>
        );
    };

    return (
        <>
            <div className="wrapper">
                <h1 className="title mb-3">Official Ballot</h1>
                <div className="card">
                    <div className="card-title">Presidential Candidates</div>
                    <div className="card-body">
                        {candidates.presidential.map((data, idx) => (
                            <Candidate
                                name={'presidential'}
                                key={idx}
                                data={data}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-title">Vice Presidential Candidates</div>
                    <div className="card-body">
                        {candidates.vicepresidential.map((data, idx) => (
                            <Candidate
                                name={'vicepresidential'}
                                key={idx}
                                data={data}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ballot;