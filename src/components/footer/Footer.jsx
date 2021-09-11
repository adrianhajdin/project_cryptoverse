import React from 'react';
import { Link } from 'react-router-dom';

import './footer.css';

export const Footer = () => (
  <div className="footer">
    <div className="footer-desc">
      <p>Copyright © 2021 <Link to="/">Cryptoverse Inc.</Link> All Rights Reserved.</p>
    </div>
    <div className="footer-links">
      <Link to="/">Home</Link>
      <Link to="/exchanges">Exchanges</Link>
      <Link to="/news">News</Link>
    </div>
  </div>
);

