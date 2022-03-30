import React from 'react';
import logo from '../assets/source-logo.png';
import styled from 'styled-components';

const ThankYou = () => {

  return (
    <>
      <div className="flex h-screen">
      <div className="m-auto">
        <div className='grid m-auto place-items-center shadow-2xl box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className=' h-96 w-160'>
            <div className='container m-auto border-gray-700 shadow-box h-90 w-160'>
                <h1>Thank you for the Time!</h1>
            </div>
            <StyledLogoContainer className='image-container w-28'>
                <img src={logo} alt="source-logo" />
            </StyledLogoContainer>
              {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-blue-700 transition duration-300">RESULTS</button> */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ThankYou;

const StyledLogoContainer = styled.div`
    width: 170px;
`;