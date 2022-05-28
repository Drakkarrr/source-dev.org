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
                <div className="lg:w-80 lg:relative">
                  <div className="lg:absolute lg:top-1/2 left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pt-0 pt-10">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Voted;