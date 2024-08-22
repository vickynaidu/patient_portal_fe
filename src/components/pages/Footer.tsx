import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-muted fixed-bottom" style={{background: "transperent", padding: 10}}>
      Copyright © Patient Portal {new Date().getFullYear()}.
    </footer>
  );
}

export default Footer;