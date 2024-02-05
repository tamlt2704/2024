import logo from './logo.svg';
import './App.css';
import Excel from './components/Excel';
import Discovery from './components/Discovery';

function App() {
  const isDiscovery = window.location.pathname.replace(/\//g, '') === 'discovery';

  let headers = localStorage.getItem('headers');
  let data = localStorage.getItem('initialData');

  if (!headers) {
    headers = ['Title', 'Year', 'Rating', 'Comment'];
    data = [
      ['Red whine', '2021', '3', 'meh'],
      ['Red whine', '2021', '3', 'meh22']
  ];
  }

  if (isDiscovery) {
    return <Discovery />
  }

  return (
    <div>
      <Excel headers={headers} initialData={data} />
    </div>
  );
}

export default App;
