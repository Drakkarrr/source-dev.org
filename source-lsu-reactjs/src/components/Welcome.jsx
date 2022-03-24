import React from 'react'
import logo from '../assets/source-logo.png'
import styled from 'styled-components';

const Welcome = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className='grid m-auto place-items-center shadow-2xl box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className=' h-96 w-160'>  
              <StyledContainer className='container m-auto border-gray-700 shadow-box h-90 w-160'>
                <div className='w-80 m-auto relative grid'>
                  <StyledLogoContainer className="logo-container h-auto">
                    <img className='mt-6' src={logo} alt="source logo" />
                  </StyledLogoContainer>
                </div>
                <div className='w-80 relative'>
                 <h1>WELCOME!</h1>
                </div>
                <div className='w-80 relative'>
                  <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eveniet!</h2>
                </div>
                <div className='w-80 relative'>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ratione cumque sed deserunt animi id, ab porro laboriosam magnam culpa quam illo, error quidem libero autem sapiente? Incidunt, enim dolor?</p>
                </div>
                <div className='buttons'>
                 <button>asd</button> br
                 <button>asdsss</button>
                </div>
              </StyledContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome;

const StyledLogoContainer = styled.div`
  background: green;
  width: 640px;
  display: grid;
  place-items: center;
  height: auto;
    img {
      object-fit: cover;
      width: 101px;
    }
`

const StyledContainer = styled.div`
  background: grey;
  height: 100%;
  text-align: center;
  display: grid;
`