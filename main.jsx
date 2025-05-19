
import { createRoot } from 'react-dom/client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import "./src/scss/main.scss";
import Header from './src/components/header/Header.jsx';
import KanbanDashboard from './src/components/content/KanbanDashboard.jsx';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  
    <QueryClientProvider client={queryClient}>
      <Header />
      <KanbanDashboard/>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
)
