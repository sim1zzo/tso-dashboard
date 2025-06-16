// src/components/Sidebar.js - VERSIONE CORRETTA SENZA ERRORI ESLINT

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaHome,
  FaChartLine,
  FaTachometerAlt,
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
  height: 100%;
  flex-shrink: 0;
  position: relative;
  z-index: 100;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #495057;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.2s ease;

  background-color: ${(props) => (props.isActive ? '#007bff' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#495057')};

  &:hover {
    background-color: ${(props) => (props.isActive ? '#0056b3' : '#e9ecef')};
    color: ${(props) => (props.isActive ? 'white' : '#212529')};
    transform: translateX(2px);
  }

  svg {
    margin-right: 12px;
    font-size: 18px;
  }
`;

const SidebarTitle = styled.h3`
  color: #6c757d;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  margin-top: 0;
  padding-left: 16px;
`;

const Sidebar = () => {
  const location = useLocation();
  const {} = useNetwork();

  return (
    <SidebarContainer>
      <SidebarTitle>TSO Dashboard</SidebarTitle>

      <NavLink to='/home' isActive={location.pathname === '/home'}>
        <FaHome /> Home
      </NavLink>

      <NavLink to='/dashboard' isActive={location.pathname === '/dashboard'}>
        <FaTachometerAlt /> Dashboard
      </NavLink>

      <NavLink
        to='/transmission'
        isActive={location.pathname === '/transmission'}
      >
        <FaNetworkWired /> Transmission
      </NavLink>

      <NavLink to='/market' isActive={location.pathname === '/market'}>
        <FaMoneyBillWave /> Mercato
      </NavLink>

      <NavLink to='/analisi' isActive={location.pathname === '/analisi'}>
        <FaChartBar /> Analisi
      </NavLink>
    </SidebarContainer>
  );
};

export default Sidebar;
