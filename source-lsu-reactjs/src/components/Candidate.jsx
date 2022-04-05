import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

//!  Candidate credentials
const Candidate = ({ data, name, list, onSelectCandidate, ...props }) => {
  const fullName = [data.last_name, data.first_name].join(', ');
  const isChecked =
    !_.isEmpty(list) && list[name]?.full_name === fullName ? 'active' : '';

  return (
    <StyledCandidate
      id={data.id}
      name={name}
      onClick={() => {
        onSelectCandidate({ name, data: { ...data, full_name: fullName } });
      }}
      {...props}
    >
      <StyledRadioButton className={isChecked} />
      <StyledName>{fullName}</StyledName>
    </StyledCandidate>
  );
};

export default Candidate;

const StyledCandidate = styled.div`
  cursor: pointer;
`

const StyledRadioButton = styled.span`
  width: 12px;
  height: 12px;
  display: inline-block;
  border: 1px solid #aaa;
  border-radius: 50%;
  &.active {
    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      margin: 1px;
      background: #aaa;
      border-radius: 50%;
    }
  }
`

const StyledName = styled.span`
  margin-left: 15px;
`
