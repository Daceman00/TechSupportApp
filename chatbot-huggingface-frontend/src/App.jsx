import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Dashboard from "./components/Dashboard"
import StartPage from "./components/StartPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"



function App() {

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/chat" element={<Dashboard />} />
            </Routes>
      </BrowserRouter>
    </QueryClientProvider>

  )
}

export default App
