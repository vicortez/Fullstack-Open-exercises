import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationProvider } from './context/NotificationContext'
import './index.css'

const app = (
  <NotificationProvider>
    <App />
  </NotificationProvider>
)

ReactDOM.createRoot(document.getElementById('root')).render(app)
