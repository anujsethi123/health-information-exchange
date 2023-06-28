import React from 'react';

const MedicationPage = ({ data }) => {
  // Group the data by category
  const groupedData = data.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedData).map(category => (
        <div key={category} className="col-md-6">
          <h3>{category.replaceAll('_',' ')}</h3>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th>Code</th>
                <th>Description</th>
                <th>Attributes</th>
              </tr>
            </thead>
            <tbody>
              {groupedData[category].map(item => (
                <tr key={item.code}>
                  <td>{item.code}</td>
                  <td>{item.desc}</td>
                  <td>{item.attribute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MedicationPage;
