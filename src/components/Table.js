import React from 'react';

const Table = ({ data, toggleMetric }) => {
  
  const renderLines = data.map((line) => {
    return (
      <tr key={line.key}>
        <td>
          <div className="ui checkbox">
            <input    
              type="checkbox"
              name="public"
              checked={line.active}
              onChange={() => toggleMetric(line.key)} />
            <label>{line.key}</label>
          </div>
        </td>
        <td
          className="center aligned"
          style={{color: line.color}}>{line.last.toFixed(1)}
        </td>
      </tr>
    );
  });

  return (
    <table className="ui celled table">
      <thead>
        <tr>
          <th>Metric</th>
          <th className="center aligned">Value</th>
        </tr>
      </thead>
      <tbody>{renderLines}</tbody>
    </table>
  );
};

export default Table;
