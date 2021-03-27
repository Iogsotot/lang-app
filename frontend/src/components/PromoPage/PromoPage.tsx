import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const PromoPage: FC = () => (
  <>
    <Link to="/textbook/0/0">TextBook page</Link>
    <br />
    <Link to="/auth">Auth page</Link>
  </>
);

export default PromoPage;
