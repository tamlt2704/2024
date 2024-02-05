import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const headers = ['Book', 'Author', 'Language', 'Published', 'Sales'];
  const data = [
    [
      'A Tale of Two Cities',
      'Charles Dickens',
      'English',
      '1859',
      '200 million',
    ],
    [
      'Le Petit Prince (The Little Prince)',
      'Antoine de Saint-Exupéry',
      'French',
      '1943',
      '150 million',
    ],
    [
      "Harry Potter and the Philosopher's Stone",
      'J. K. Rowling',
      'English',
      '1997',
      '120 million',
    ],
    [
      'And Then There Were None',
      'Agatha Christie',
      'English',
      '1939',
      '100 million',
    ],
    [
      'Dream of the Red Chamber',
      'Cao Xueqin',
      'Chinese',
      '1791',
      '100 million',
    ],
    ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
  ];

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  const [tableData, setTableData] = useState(data);
  const [sortBy, setSortBy] = useState();
  const [descending, setDescending] = useState(false);
  const [editPosition, setEditPosition] = useState();
  const [edit, setEdit] = useState(false);

  function sort(e) {
    const column = e.target.cellIndex;

    setDescending(sortBy === column && !descending);
    setSortBy(column);
    
    console.log(`sort by column ${column}`)

    const sortData = clone(tableData);
    sortData.sort((a,b) => {
      if (a[column] == b[column]) {
        return 0;
      }

      return descending ?
        a[column] > b[column] ? 1 : -1 :
        a[column] > b[column] ? -1 : 1;
    });


    setTableData(sortData);
  }

  function showEditor(e) {
    setEditPosition({
      'row': parseInt(e.target.parentNode.dataset.row, 10),
      'column': e.target.cellIndex
    })
    setEdit(true);
  }

  function save(e) {
    e.preventDefault(); // prevent page reload
    const input = e.target.firstChild;
    const data = clone(tableData);
    data[editPosition.row][editPosition.column] = input.value;
    setTableData(data);
    setEdit(false);
  }

  return (
    <>
      <table>
        <thead onClick={sort}>
          <tr> 
            {
            headers.map((title, idx) => {
              if (sortBy === idx) {
                title += descending ? ' \u2191' : ' \u2193';
              }
              return (
              <th key={idx}> {title} </th>
              );
            })
            } 
          </tr>
        </thead>
        <tbody onDoubleClick={showEditor}>
          {tableData.map((row, rowidx) => (
            <tr key={rowidx} data-row={rowidx}>
              {row.map((cell, columnidx) => {

                  if (edit && editPosition.row === rowidx && editPosition.column === columnidx) {
                    cell = (
                      <form onSubmit={save}>
                        <input type='text' defaultValue={cell}/>
                      </form>
                    )   
                  }

                  return (
                    <td key={columnidx}> {cell} </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
