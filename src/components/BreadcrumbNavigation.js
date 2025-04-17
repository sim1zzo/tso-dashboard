// src/components/BreadcrumbNavigation.js
import React from 'react';
import styled from 'styled-components';

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
`;

const BreadcrumbItem = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child)::after {
    content: ' > ';
    margin: 0 5px;
  }
`;

const BreadcrumbNavigation = ({ path, onNavigate }) => {
  return (
    <BreadcrumbContainer>
      {path.filter(Boolean).map((item, index) => (
        <BreadcrumbItem key={index} onClick={() => onNavigate(item)}>
          {item}
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default BreadcrumbNavigation;
