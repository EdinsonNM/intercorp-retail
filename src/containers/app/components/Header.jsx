import React from 'react';
import logo from '../../../assets/images/logo.png';
import logo2x from '../../../assets/images/logo@2x.png';

export default function Header() {
  return (
      <div className="App-header">
          <img
              srcSet={`${logo} 1x, ${logo2x} 2x`}
              alt="…"
              sizes="(max-width: 320px) 680px"
            />
          <div>Edinson Nuñez More</div>
        </div>
  );
}
