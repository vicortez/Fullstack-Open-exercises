import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import NotificationProvider from './context/NotificationProvider'
import store from './store'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </Provider>,
)
