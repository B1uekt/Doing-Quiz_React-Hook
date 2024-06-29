import logo from './logo.svg';
import './App.scss';
import './Example/MyComponents'
import MyComponents from './Example/MyComponents';

const App = () => {
  return (
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO WORLD WITH REACTJS
        </p>

        <MyComponents />
      </header>
    </div>
  );
}

export default App;
