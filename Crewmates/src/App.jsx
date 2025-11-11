import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import CreateCrewmate from './pages/CreateCrewmate'
import ListCrewmates from './pages/ListCrewmates'
import CrewmateDetail from './pages/CrewmateDetail'
import EditCrewmate from './pages/EditCrewmate'
import Sidebar from './components/Sidebar'
import crew from './assets/noFilter.jpg'
function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />

        <div className="app-content">
          <header className="app-header">
            <h1>Crewmates</h1>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/create" element={<CreateCrewmate />} />
              <Route path="/summary" element={<ListCrewmates />} />
              <Route path="/crewmates/:id" element={<CrewmateDetail />} />
              <Route path="/crewmates/:id/edit" element={<EditCrewmate />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

function Landing() {
  return (
    <section>
      <h2>Welcome</h2>
      <p>Create and manage your custom team of crewmates.</p>
      <img src={crew} alt="Crewmate" />
      <p>
        Use the <Link to="/create">create form</Link> to add a new crewmate, or
        view your team on the <Link to="/summary">summary</Link> page.
      </p>
    </section>
  )
}

export default App
