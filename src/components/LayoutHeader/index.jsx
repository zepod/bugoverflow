// @flow
import React from 'react';
import {Link} from 'react-router';

const Header = (props: Object) => {
  return (
    <div>
      <Link to="/">
        <h1>Bug Overflow</h1>
      </Link>
      <ul>
        <Link to="/category/ideas">
          <li>Ideas</li>
        </Link>
        <Link to="/category/reviews">
          <li>Reviews</li>
        </Link>
        <Link to="/category/guides">
          <li>Guides</li>
        </Link>
        <Link to="/category/stories">
          <li>Stories</li>
        </Link>
      </ul>
    </div>
  );
}


export default Header;
