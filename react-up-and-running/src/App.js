import logo from './logo.svg';
import './App.css';

function App() {
  const headers = ['Book', 'Author', 'Language', 'Published', 'Sales'];
  
  return (
    <table>
      <thead> 
        <tr> 
          {headers.map((title, idx) => <th key={idx}> {title} </th>)} 
        </tr>
      </thead>
    </table>
  );
}

export default App;
