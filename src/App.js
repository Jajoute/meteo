import './App.scss';
import Header from './components/Header/Header';
import Weather from './components/Weather/Weather';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="App-body">
        <Weather></Weather>
      </div>
    </div>
  );
}

export default App;
