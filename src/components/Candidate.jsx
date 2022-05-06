import React from "react";
import styled from "styled-components";
import _ from "lodash";

//!  Candidate credentials
const Candidate = ({ data, name, list, onSelectCandidate, ...props }) => {
  const fullName = data.student_name;
  const isChecked =
    !_.isEmpty(list) && list[name]?.full_name === fullName ? "active" : "";

  return (
    <div
      id={data.id}
      name={name}
      onClick={() => {
        onSelectCandidate({ name, data: { ...data, full_name: fullName } });
      }}
      {...props}
      className="lg:flex                 bg-gradient-to-r
      from-green-900
      to-green-500


      rounded-md
      bg-white
      shadow-xl py-2 pl-5 lg:h-20 h-32 lg:w-54 w-full my-10 relative"
    >
      <div className="my-auto lg:relative absolute lg:top-1 top-8 lg:left-0 left-5 lg:mr-5">
        <StyledRadioButton className={isChecked} />
      </div>
      <div className="lg:flex lg:w-fit">
        <img
          src={data.profile}
          alt="profile"
          className="lg:absolute mx-auto lg:mx-0 lg:w-32 lg:h-32 w-24 h-24 object-cover overflow-hidden rounded-full border-4 border-green-900 -mt-10 object-scale-down bg-white"
        />
        <div className="lg:my-auto mt-3 lg:mx-10 text-white lg:w-fit">
          <p className="lg:whitespace-nowrap lg:ml-60 ml-32 text-xs lg:w-fit">
            For <span className="uppercase">{data.position}</span>
          </p>
          <p className="whitespace-nowrap lg:ml-60 ml-32 font-bold lg:text-xl w-fit">
            {fullName}
          </p>
          {/* {data.course_and_year} */}
        </div>
      </div>
    </div>
  );
};

export default Candidate;

const StyledRadioButton = styled.span`
  width: 20px;
  height: 20px;
  display: inline-block;
  border: 2px solid #aaa;
  border-radius: 50%;
  &.active {
    &::before {
      content: "";
      display: block;
      width: 14px;
      height: 14px;
      margin: 1px;
      background: #fff;
      border-radius: 50%;
    }
  }
`;

const StyledName = styled.span`
  margin-left: 15px;
`;
