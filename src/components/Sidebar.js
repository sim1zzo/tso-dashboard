import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHome,
  FaChartLine,
  FaNetworkWired,
  FaChartBar,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { useNetwork } from './NetworkContext';


const SidebarContainer = styled.aside`
  width: 300px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  height: 100vh;
`;



const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  color: #495057;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background-color: #e9ecef;
  }

  svg {
    margin-right: 10px;
  }
`;

const Sidebar = () => {
  const {
  } = useNetwork();


  return (
    <SidebarContainer>
    <NavLink to='/home'>
      <FaHome /> Home
    </NavLink>
    <NavLink to='/dashboard'>
      <FaChartLine /> Dashboard
    </NavLink>
    <NavLink to='/transmission'>
      <FaNetworkWired /> Trasmission
    </NavLink>
    <NavLink to='/market'>
      <FaMoneyBillWave /> Mercato
    </NavLink>
    <NavLink to='/analisi'>
      <FaChartBar /> Analisi
    </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
