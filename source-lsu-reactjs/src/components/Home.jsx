import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, q } from '../auth/firebase';

//!  Components
import Ballot from './Ballot';
import Results from './Results';

const Home = ({ db, firebase, candidates, user, setUser }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [votes, setVotes] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const collectionRef  = collection(db, 'users');

  
  //!  Get user and user's votes
  useEffect(() => {
    const getUsers = async () => {
    const data = await getDocs(collectionRef);

      let votes = [];
      data.docs.map((_doc) => {
        const doc = _doc.data();
        if (doc.candidates) {
          if (doc.candidates.presidential) {
            const idx = votes.findIndex(
              (c) => c?.id === doc.candidates.presidential
            );

            if (idx !== -1) {
              votes[idx].counts++;
            } else {
              votes = [
                ...votes,
                {
                  id: doc.candidates.presidential,
                  counts: 1,
                },
              ];
            }
          }

          if (doc.candidates.vicepresidential) {
            const idx = votes.findIndex(
              (c) => c?.id === doc.candidates.vicepresidential
            );

            if (idx !== -1) {
              votes[idx].counts++;
            } else {
              votes = [
                ...votes,
                {
                  id: doc.candidates.vicepresidential,
                  counts: 1,
                },
              ];
            }
          }
        }
      });

      setVotes(votes);
    };

    getUsers();
  }, []);

  //!  Unregister auth state observer
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (!user) window.location.assign('/');
        else setUser(user?.providerData[0]);
      });

    return () => unregisterAuthObserver();
  }, []);

  const handleOnSelectCandidate = (data) => {
    setSelectedCandidate({
      ...selectedCandidate,
      candidates: {
        ...selectedCandidate?.candidates,
        [data.name]: data.id,
      },
      userInfo: {
        name: user.displayName,
        email: user.email,
      },
    });
  };

  //!  Stores the user's selected candidate
  const handleOnVote = async () => {
    await addDoc(collectionRef , { ...selectedCandidate }).then(() => {
      setSelectedCandidate(null);
      window.alert('Thank you for voting!');
      window.location.reload();
    });
  };
      
      //!  Unregister auth state observer
      useEffect(() => {
        const unregisterAuthObserver = firebase
          .auth()
          .onAuthStateChanged((user) => {
            if (!user) window.location.assign('/');
            else setUser(user?.providerData[0]);
          });
    
        return () => unregisterAuthObserver();
      }, []);


  return (
    <section>
      <ul className="btn-group">
        <li
          className={['btn', activeTab === 1 ? 'active' : ''].join(' ')}
          onClick={() => setActiveTab(1)}
        >
          RESULTS:
        </li>
        <li
          className={['btn', activeTab === 2 ? 'active' : ''].join(' ')}
          onClick={() => setActiveTab(2)}
        >
          Official Ballot
        </li>
      </ul>
      <div className="container">
        {activeTab === 1 ? (
          <Results votes={votes} candidates={candidates} />
        ) : (
          <Ballot
            candidates={candidates}
            selectedCandidate={selectedCandidate}
            onClick={handleOnSelectCandidate}
          />
        )}

        <div className="footer">
          {activeTab === 2 && (
            <button className="vote" onClick={handleOnVote}>
              Vote
            </button>
          )}
          <button>Logout</button>
        </div>
      </div>
    </section>
  )
}

export default Home;