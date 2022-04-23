import React from "react";
import styled from "styled-components";
import _ from "lodash";

//!  Candidate credentials
const Candidate = ({ data, name, list, onSelectCandidate, ...props }) => {
  const fullName = [data.last_name, data.first_name].join(", ");
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
      className="w-full"
    > 
      <div className="relative rounded-lg w-full flex bg-gradient-to-r from-green-900 to-green-500 mt-5">
        <input type="radio" className="my-auto mr-10 ml-5" />
        <div className="absolute bg-white -top-3 border-4 border-gray-500 left-12 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md">
          <img className =" rounded-full object-cover" src="{data.img}" />
        </div>
        <div className="text-lg text-white font-bold whitespace-nowrap text-center w-full my-auto ml-20 ">{fullName} </div>
        <span class="p-5 text-white whitespace-nowrap">{data.course_year}</span>
      </div>
    </div>
  );
};

export default Candidate;

const StyledRadioButton = styled.span`
  width: 12px;
  height: 12px;
  display: inline-block;
  border: 1px solid #aaa;
  border-radius: 50%;
  &.active {
    &::before {
      content: "";
      display: block;
      width: 8px;
      height: 8px;
      margin: 1px;
      background: #aaa;
      border-radius: 50%;
    }
  }
`;

const StyledName = styled.span`
  margin-left: 15px;
`;
