import React, {PropTypes} from 'react';

const ArticleOverview = ({overview}) => {
  return (
    <div>
      {overview}
    </div>
  );
}

ArticleOverview.propTypes = {
  overview: PropTypes.string.isRequired
}

export default ArticleOverview;
