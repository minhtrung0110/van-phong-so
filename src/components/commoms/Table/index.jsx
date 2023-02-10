import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default function TableLayout(props) {
  const { tableHeader, tableBody } = props;
  return (
    <table id="table" >
      <thead className='tb-header'>
        <tr className='tr-header'>
          {tableHeader.map((element) => (
            <th key={element.id} className={`${element.cursor ? 'cursor-pointer' : ''}`}>
              <div className="header-item">
                {element.name}
              </div>
            </th>
          ))}
        </tr>
      </thead>
        <tbody>{tableBody}</tbody>
    </table>
  );
}

TableLayout.propTypes = {
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      isSortAsc: PropTypes.bool,
      isSortDesc: PropTypes.bool,
    })
  ),
  tableBody: PropTypes.any,
  handleSort: PropTypes.func,
  tableSort: PropTypes.func,
};
