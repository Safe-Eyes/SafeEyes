import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { init } from "./api/axios.api";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'



init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />  
    <ToastContainer position='bottom-left' autoClose={2000} />
  </>
)