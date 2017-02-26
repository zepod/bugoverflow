import React, {PropTypes} from 'react';

const ArticleCategories = ({categories}) => {
  return (
    <div>
      {categories.map((category: string, i :number) => (
        <span key={`${category}-category-${i}`}>{category}</span>
      ))}
    </div>
  );
}

ArticleCategories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default ArticleCategories;
