import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import GylPrototype from './pages/GylPrototype'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/homepage" replace />} />
          <Route path="homepage" element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/gyl-prototype-project" element={<GylPrototype />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
