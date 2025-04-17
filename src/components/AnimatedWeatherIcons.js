// src/components/AnimatedWeatherIcons.js

import React from 'react';
import styled, { keyframes } from 'styled-components';

const sunRotation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const cloudMovement = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(10px); }
  100% { transform: translateX(0); }
`;

const rainDrop = keyframes`
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(20px); opacity: 0; }
`;

const windMovement = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(10px); }
`;

const snowFall = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  100% { transform: translateY(20px) rotate(360deg); }
`;

const IconWrapper = styled.svg`
  width: 50px;
  height: 50px;
`;

const SunIcon = styled(IconWrapper)`
  .sun {
    animation: ${sunRotation} 10s linear infinite;
  }
`;

const CloudIcon = styled(IconWrapper)`
  .cloud {
    animation: ${cloudMovement} 3s ease-in-out infinite;
  }
`;

const RainIcon = styled(IconWrapper)`
  .raindrop {
    animation: ${rainDrop} 1s linear infinite;
  }
`;

const WindIcon = styled(IconWrapper)`
  .wind-line {
    animation: ${windMovement} 2s linear infinite;
  }
`;

const SnowIcon = styled(IconWrapper)`
  .snowflake {
    animation: ${snowFall} 3s linear infinite;
  }
`;

export const AnimatedSun = () => (
  <SunIcon viewBox='0 0 50 50'>
    <circle className='sun' cx='25' cy='25' r='20' fill='#FFD700' />
  </SunIcon>
);

export const AnimatedCloud = () => (
  <CloudIcon viewBox='0 0 50 50'>
    <path
      className='cloud'
      d='M10 25 A15 15 0 0 1 40 25 A10 10 0 0 1 40 35 H10 A10 10 0 0 1 10 25'
      fill='#A9A9A9'
    />
  </CloudIcon>
);

export const AnimatedRain = () => (
  <RainIcon viewBox='0 0 50 50'>
    <AnimatedCloud />
    <line
      className='raindrop'
      x1='20'
      y1='35'
      x2='20'
      y2='45'
      stroke='#4682B4'
      strokeWidth='2'
    />
    <line
      className='raindrop'
      x1='30'
      y1='35'
      x2='30'
      y2='45'
      stroke='#4682B4'
      strokeWidth='2'
      style={{ animationDelay: '-0.5s' }}
    />
    <line
      className='raindrop'
      x1='25'
      y1='40'
      x2='25'
      y2='50'
      stroke='#4682B4'
      strokeWidth='2'
      style={{ animationDelay: '-0.75s' }}
    />
  </RainIcon>
);

export const AnimatedWind = () => (
  <WindIcon viewBox='0 0 50 50'>
    <path
      className='wind-line'
      d='M10 20 H40'
      stroke='#000'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <path
      className='wind-line'
      d='M5 25 H35'
      stroke='#000'
      strokeWidth='2'
      strokeLinecap='round'
      style={{ animationDelay: '-0.5s' }}
    />
    <path
      className='wind-line'
      d='M15 30 H45'
      stroke='#000'
      strokeWidth='2'
      strokeLinecap='round'
      style={{ animationDelay: '-1s' }}
    />
  </WindIcon>
);

export const AnimatedSnow = () => (
  <SnowIcon viewBox='0 0 50 50'>
    <AnimatedCloud />
    <circle className='snowflake' cx='20' cy='40' r='2' fill='#FFF' />
    <circle
      className='snowflake'
      cx='30'
      cy='45'
      r='2'
      fill='#FFF'
      style={{ animationDelay: '-1s' }}
    />
    <circle
      className='snowflake'
      cx='25'
      cy='35'
      r='2'
      fill='#FFF'
      style={{ animationDelay: '-2s' }}
    />
  </SnowIcon>
);
