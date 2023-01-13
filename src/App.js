import { GreetingProvider } from './GreetingProvider'
import FetchGreeting from './FetchGreeting'
import './App.css';

function App() {
  return (
    <div className="App">
      <GreetingProvider>
        <FetchGreeting url='/greeting' />
      </GreetingProvider>
    </div>
  );
}

export default App;
