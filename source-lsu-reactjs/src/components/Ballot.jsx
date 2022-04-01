import React from 'react';
import styled from 'styled-components';

const Ballot = () => {

  return (
    <>
      <StyledDiv>
        <h1>PRESIDENT</h1>
        <div className="card-container">
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h1>VICE PRESIDENT</h1>
        <div className="card-container">
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h1>SECRETARY</h1>
        <div className="card-container">
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
          <div className="cards">
            <h1>Image here</h1>
            <h1>Name here</h1>
            <h1>Course here</h1>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300">VOTE</button>
          </div>
        </div>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300'>Submit</button>
      </StyledDiv>
    </>
  )
}

export default Ballot;

const StyledDiv = styled.div`
  height: 90vh;
  overflow-y: scroll;
  border: 1.2px solid black;
  width: 60%;
  margin: auto;
  margin-top: 1.2rem;
    .card-container {
      display: flex;
      justify-content: space-around;
      margin: 1rem;
      height: 30vh;
      .cards {
      background-color: green;
      width: 30%;
      height: 100%;
      display: grid;
      place-items: center;
    }
  }
`

