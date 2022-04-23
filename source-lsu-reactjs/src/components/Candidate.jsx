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
    >
      <div className="flex bg-gradient-to-r from-green-900 to-green-500 border border-black mt-5">
        <input type="radio" className="my-auto mr-10" />
        <div className="bg-white top-2 left-6 h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-md">
          <img src="{data.img}" />
        </div>
        <div className="text-center w-full my-auto ">{fullName} </div>
        <span class="text-xs text-white whitespace-nowrap">{data.course_year}</span>
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
