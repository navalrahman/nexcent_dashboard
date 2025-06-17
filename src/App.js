import './App.css';
import Router from './Route';
import { BrowserRouter } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
        <Toaster/>
      </BrowserRouter>
    </div>
  );
}

export default App;
