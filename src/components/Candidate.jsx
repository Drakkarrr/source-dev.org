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
      className=""
    >
      <div className="mb-5 mx-auto block w-10/12">
        <div className="flex">
          <div className="my-auto lg:mx-5 mx-3">
            <StyledRadioButton className={isChecked} />
          </div>
          <div className="relative">
            <img
              src={data.profile}
              alt="profile"
              className="lg:w-32 lg:h-32 w-16 h-16 overflow-hidden rounded-full lg:border-4 border-2 border-green-900 object-scale-down bg-white"
            />

            <div className="w-max text-white absolute lg:top-12 top-5 lg:left-36 left-20 font-bold lg:text-xl text-sm">
              {fullName}
            </div>
            {/* {data.course_and_year} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;

const StyledRadioButton = styled.span`
  width: 16px;
  height: 16px;
  display: inline-block;
  border: 2px solid #aaa;
  border-radius: 50%;
  &.active {
    &::before {
      content: "";
      display: block;
      width: 10px;
      height: 10px;
      margin: 1px;
      background: #fff;
      border-radius: 50%;
    }
  }
`;

const StyledName = styled.span`
  margin-left: 15px;
`;
