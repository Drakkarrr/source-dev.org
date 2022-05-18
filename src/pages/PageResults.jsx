import React from 'react';
import logo from '../assets/source-logo.png';
import Presidents from '../components/results/Presidents';

//!  Results of candidates votes

const PageResults = () => {
    return (
        <div class="min-w-screen min-h-screen px-5 py-5 rounded-2xl bg-gray-100">
            <div class="w-full h-screen rounded-2xl shadow-lg  mx-auto bg-white px-5  text-gray-600 mb-10">
                <div className='w-2/4 h-28 mx-auto flex justify-around'>
                    <img src={logo} alt="source logo" />
                    <img src={logo} alt="source logo" />
                    <img src={logo} alt="source logo" />
                </div>
                <div className='w-3/5 text-center h-28 mx-auto mt-10'>
                    <h1 className='text-2xl font-semibold'>LSU - OZC SOURCE ELECTION for A.Y 2022 - 2023 OFFICERS</h1>
                    <h1 className='text-2xl'><span className='font-bold'>Voting Status</span>: 100 students already voted out of 130 Total Population.</h1>
                </div>
                <div className="w-3/4 mt-20 mx-auto h-auto bg-gray-100 py-8">
                    <Presidents />
                </div>
            </div>
        </div>
    )
}

export default PageResults;