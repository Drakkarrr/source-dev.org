import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, doc, updateDoc, where } from "firebase/firestore";
import { auth, db, getDocs } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import _ from "lodash";


//!  Candidates
import Candidate from "./Candidate";
import candidates from "../candidates.json";

//! Helpers
import * as helpers from "../helpers/index";

const Ballot = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //!  Storing query candidate stats count
  useEffect(async () => {
    const q = query(collection(db, "users"));
    const doc = await getDocs(q);
    const list = doc.docs.map((doc) => doc.data());

    //! Per user counts
    // console.log('counts list', list);

    //!  Toltal candidates counts
    const data1 = helpers.getAllStatistics(list, candidates);
    // console.log("Candidates total counts", data1);
  }, []);

  //!  Get the voter id
  const getUserId = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      return doc.docs[0].id;
    } catch (err) {
      return null;
    }
  };
  

  //!  Submits the voter's voted candidates
  const handleOnSubmit = async () => {
    setIsSubmitted(true);
    console.log(isSubmitted);
    if (
      selectedCandidate.candidates.president &&
      selectedCandidate.candidates.vice_president &&
      selectedCandidate.candidates.secretary &&
      selectedCandidate.candidates.budget_and_finance &&
      selectedCandidate.candidates.logistics &&
      selectedCandidate.candidates.infomedia &&
      selectedCandidate.candidates.material_preparation_and_services &&
      selectedCandidate.candidates.public_relations_and_communications
    ) {
      const userId = await getUserId();
      const docRef = doc(db, "users", userId);

      await updateDoc(docRef, { ...selectedCandidate }).then(() => {
        setSelectedCandidate(null);
      });

      const messageToMail = `Hello ${user.displayName},`;
      const listVoted = [
        selectedCandidate.candidates.president.full_name,
        selectedCandidate.candidates.vice_president.full_name,
        selectedCandidate.candidates.secretary.full_name,
        selectedCandidate.candidates.budget_and_finance.full_name,
        selectedCandidate.candidates.logistics.full_name,
        selectedCandidate.candidates.infomedia.full_name,
        selectedCandidate.candidates.material_preparation_and_services.full_name,
        selectedCandidate.candidates.public_relations_and_communications.full_name
      ]

      const message = `${messageToMail} the candidates you voted are the following:\nPRESIDENT: ${listVoted[0]},\nVICE PRESIDENT: ${listVoted[1]},\nSECRETARY: ${listVoted[2]},\nINFOMEDIA: ${listVoted[3]},\nBUDGET AND FINANCE: ${listVoted[4]},\nMATERIAL PREPARATION AND SERVICES: ${listVoted[5]},\nLOGISTICS: ${listVoted[6]},\nPUBLIC RELATIONS AND COMMUNICATIONS: ${listVoted[7]}`;
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'SOURCE ELECTION RECEIPT',
          from_name: 'LSU Source Election',
          to: `${user.email} <${user.displayName}>`,
          cc: 'source@lsu.edu.ph',
          message: message,
        })
      };
      
      fetch('https://api.earlp.ru/mail/?key=pqF617BYV3p0&secret=900ab768bde76da7a36dd85606f4b5a32384b241%3Abea491c69c4deaed', requestOptions)
        .then(response => console.log(response))
        .then(() => navigate('/verify'))
    };
  }

  //!  Handle the voter's selected candidates bv
  const handleOnSelectCandidate = async (obj) => {
    setSelectedCandidate({
      ...selectedCandidate,
      candidates: {
        ...selectedCandidate?.candidates,
        [obj.name]: obj.data,
      },
    });
  };

  //!  Card container for ballot
  const Card = ({ title, children, ...props }) => {
    return (
      <div className="position-container" {...props}>
        <h1 className="border-b-4 lg:mb-10 mb-7 pb-2 text-white text-center capitalize text-sm pt-3">
          For SOURCE {title}
        </h1>
        <div className="">{children}</div>
      </div>
    );
  };

  return (
    <div className="lg:w-8/12 w-11/12 mx-auto my-10">
      <div className="w-fit mx-auto">
        <div className="flex gap-5">
          <img
            src={require("../assets/lsu-logo.png")}
            className="h-16 lg:mb-3 mb-5"
            alt="source logo"
          />

          <img
            src={require("../assets/source-logo.png")}
            className="h-16 lg:mb-3 mb-5"
            alt="source logo"
          />
        </div>
      </div>
      <h1
        className="
       text-center
       mb-14
       text-sm
       font-semibold
       text-transparent
       bg-clip-text bg-gradient-to-r
       from-green-400
       to-green-600    
       w-8/12
       mx-auto
     "
      >
        LSU Student Organization Utilizing the Realm of Computer Eclecticism
        <br />
        Election for Officers A.Y. 2022-2023
        <br />
        <span className="candidates-list">List of All Candidates</span>
      </h1>

      {_.map(_.keys(candidates), (name, idx) => {
        const { title, list } = candidates[name];
        return (
          <Card
            key={idx}
            title={title}
            className="
           rounded-md
           bg-gradient-to-r
           from-green-900
           to-green-500
           bg-white
           shadow-xl lg:pb-5 pb-2 mb-10
         "
          >
            <div className="lg:grid lg:grid-cols-2">
              {_.map(list, (data, idx) => (
                <Candidate
                  key={idx}
                  data={data}
                  name={name}
                  list={selectedCandidate?.candidates}
                  onSelectCandidate={handleOnSelectCandidate}
                />
              ))}
            </div>
          </Card>
        );
      })}
      <button
        className="bg-green-900 text-white px-4 lg:py-2 py-1 w-full shadow lg:text-xl font-medium hover:bg-green-700 transition duration-300 mx-auto block"
        onClick={handleOnSubmit}
        disabled={!selectedCandidate}
      >
        <span className="flex w-min mx-auto">
          <span className="whitespace-nowrap mr-5 mt-0.5">SUBMIT VOTES!</span>
          <span>
            {isSubmitted ? 
              <svg role="status" className="w-8 h-8 mr-2 text-white animate-spin dark:text-green-500 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg> : ''}
          </span>
        </span>
      </button>
    </div>
  );
};

export default Ballot;