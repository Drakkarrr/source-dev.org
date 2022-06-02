import React from "react";
import slogan from "../assets/slogan.png";


const Voted = () => {
  return (
    <>
      <div className="flex h-screen">
        <div className="lg:m-auto my-10 mx-5">
          <div className="lg:shadow-2xl lg:box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);">
            <div className="lg:flex">
              <div className="lg:w-80">
                <img
                  className="lg:w-80 shadow-box"
                  src={slogan}
                  alt="slogan logo"
                />
              </div>
              <div className="bg-gradient-to-r
          from-green-400
          to-green-600 px-2 py-2 font-bold grid place-items-center h-100 text-white text-bold">VOTE SUBMITTED, THANKS FOR VOTING!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Voted;