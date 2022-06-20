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
    if (
      selectedCandidate.candidates.president &&
      selectedCandidate.candidates.vice_president &&
      selectedCandidate.candidates.secretary &&
      selectedCandidate.candidates.infomedia &&
      selectedCandidate.candidates.budget_and_finance &&
      selectedCandidate.candidates.material_preparation_and_services &&
      selectedCandidate.candidates.logistics &&
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
        selectedCandidate.candidates.infomedia.full_name,
        selectedCandidate.candidates.budget_and_finance.full_name,
        selectedCandidate.candidates.material_preparation_and_services.full_name,
        selectedCandidate.candidates.logistics.full_name,
        selectedCandidate.candidates.public_relations_and_communications.full_name
      ]

      const message = `${messageToMail} the candidates you voted are the following:\nPRESIDENT: ${listVoted[0]},\nVICE PRESIDENT: ${listVoted[1]},\nSECRETARY: ${listVoted[2]},\nINFOMEDIA: ${listVoted[3]},\nBUDGET AND FINANCE: ${listVoted[4]},\nMATERIAL PREPARATION AND SERVICES: ${listVoted[5]},\nLOGISTICS: ${listVoted[6]},\nPUBLIC RELATIONS AND COMMUNICATIONS: ${listVoted[7]}`;

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'SOURCE ELECTION RECEIPT',
          message: message,
          to: user.email,
          to_name: user.displayName,
          from_name: 'LSU Source Election'
        })
      };

      fetch('https://api.earlp.ru/mail/?key=pqF617BYV3p0&secret=900ab768bde76da7a36dd85606f4b5a32384b241%3Abea491c69c4deaed', requestOptions)
        .then(response => console.log(response))
        .then(() => navigate('/verify'));
    }
  };



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
          w-11/12
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
        SUBMIT VOTES!
      </button>
    </div>
  );
};

export default Ballot;
