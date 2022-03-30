import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from '../auth/firebase'

//!  Components
import Ballot from './Ballot';

const Home = ({ db, firebase, candidates, user, setUser }) => {
    const [data, setData] = useState({
        selectedCandidate: null,
        votes: null,
        activeTab: 1
    });
    const userCollectionRef = collection(db, 'users');

    //!  Get user and user's votes
    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollectionRef);
    
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

  return (
    <div>Home</div>
  )
}

export default Home