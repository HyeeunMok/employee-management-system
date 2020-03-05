import React from 'react';
import styled from 'styled-components';
import { filterHandler } from '../../../utils/FilterHandler';

const searchBar = ({ filterValue, employees, changeHandler }) => {
  return (
    <Wrapper>
      <Input
        className="filter-input"
        type="text"
        id="filter"
        name="filter"
        required
        size="30"
        placeholder="Search by employee's name..."
        onChange={e => filterHandler(e, employees, changeHandler)}
        value={filterValue}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 30px 1px 12px;
  padding-right: 30px;
  text-align: right;
`;

const Input = styled.input`
  border: 2px solid rgb(74, 81, 87);
  font-size: 1.4em;
  padding: 0.25em 0.5em 0.3em;
  border-radius: 0.25em;
  background: transparent;
  transition: all 0.1s;
  outline: none;
  color: rgb(48, 47, 47);
`;

export default searchBar;
