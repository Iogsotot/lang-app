import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const PromoPage: FC = () => (
  <>
    <Link to="/textbook/0/0">TextBook page</Link>
    <Link to="/memorygame/">Memory Game</Link>
  </>
);

export default PromoPage;
