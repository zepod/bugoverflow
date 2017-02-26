// @flow
import React, {PropTypes} from 'react';

const DateMark = (props :Object) => {
  const year = props.date.getFullYear();
  const month = props.date.getMonth();
  const day = props.date.getDate();
  return (
    <div>
      {`${day}.${month + 1} ${year}`}
    </div>
  );
}

DateMark.propTypes = {
  date: PropTypes.instanceOf(Date)
}

export default DateMark;
