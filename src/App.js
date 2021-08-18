import './App.css';
import { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import flattenLocation from './flattenLocation';
import {COLUMNS} from './columnsData';

function App() {
  const [data, setData] = useState([]);
  
  useEffect( () => {
    const fetchData = async () => {
      const response = await fetch("https://randomuser.me/api/?results=20");
      const responseJson = await response.json();
      let allUsersLocation = [];
      responseJson.results.forEach(userData => {
        const location = userData.location;
        const flattenedResult = flattenLocation(location);
        //add all users location data
        allUsersLocation.push(flattenedResult);
      });
      setData(allUsersLocation);
    }
    fetchData();
  }, []);

  const columns = useMemo(() => COLUMNS, []);

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
  } =  useTable(
      {
          columns,
          data,
      },
      useSortBy,
      usePagination
  );

  return (
    <div className="App">
      <table {...getTableProps()} >
        <thead>
          {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>
                              {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ''}
                          </span>
                      </th>
                  ))}
              </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
                <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    })}
                </tr>
            );
          })}    
        </tbody>
      </table>
    </div>
  );
}

export default App;
