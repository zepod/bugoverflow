// @flow
import React, {PropTypes} from 'react';

const ArticleTitle = (props :Object) => {
  return (
    <div>
      {props.title}
    </div>
  );
}

ArticleTitle.propTypes = {
  title: PropTypes.string.isRequired
}

export default ArticleTitle;
