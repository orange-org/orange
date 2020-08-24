import React from "react";
import { Link } from "react-router-dom";

export const Home = () => (
  <>
    <p>
      <Link to="/wallet/create">
        <button type="button">Create wallet</button>
      </Link>
    </p>

    <p>
      <Link to="/wallet/import">
        <button type="button">Import wallet</button>
      </Link>
    </p>

    <p>
      <Link to="/wallet">
        <button type="button">Wallet</button>
      </Link>
    </p>
  </>
);
