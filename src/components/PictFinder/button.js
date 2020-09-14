import React from 'react';

const Button = ({ fetchPictures }) => (
  <button className="Button" type="button" onClick={fetchPictures}>
    Load more...
  </button>
);

export default Button;
