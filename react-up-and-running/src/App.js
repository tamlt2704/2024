import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const headers = ['Book', 'Author', 'Language', 'Published', 'Sales'];
  const initialData = [
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

  const data = initialData.map((row, idx) => row.concat(idx));

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  const [tableData, setTableData] = useState(data);
  const [sortBy, setSortBy] = useState();
  const [descending, setDescending] = useState(false);
  const [editPosition, setEditPosition] = useState();
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState(false);
  const [presearchData, setPresearchData] = useState();

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

  function toggleSearch(e) {
    if (search) {
      setTableData(presearchData);
    } else {
      setPresearchData(tableData);
    }

    setSearch(!search);
  }

  function runSearch(e) {
    const needle = e.target.value.toLowerCase();
    if (!needle) {
      setTableData(presearchData);
    } else {
      const idx = e.target.dataset.idx;
      const searchData = presearchData.filter((row) => {
        return row[idx].toString().toLowerCase().indexOf(needle) > -1;
      })
      setTableData(searchData);
    }
  }

  return (
    <div>
      <button className='toolbar' onClick={toggleSearch}>
        {search ? 'Hide Search' : 'Show Search'}
      </button>
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
          { !search ? null : (
              <tr onChange={runSearch}>
                  {headers.map((_, idx) => (
                    <td key={idx}>
                        <input type='text' data-idx={idx}/>
                    </td>
                  ))}
              </tr>
          )
          }

          {tableData.map((row, rowidx) => {
            // last element of data is the ID
            const recordId = row[row.length - 1];
            return (
                <tr key={recordId} data-row={recordId}>
                {row.map((cell, columnidx) => {

                    // do not show record id in the UI
                    if (columnidx === headers.length) {
                      return;
                    }

                    if (
                        edit && 
                        editPosition.row === recordId && 
                        editPosition.column === columnidx
                    ) {
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
