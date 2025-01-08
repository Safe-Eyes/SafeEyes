import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { init } from "./api/axios.api";

init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />  
)