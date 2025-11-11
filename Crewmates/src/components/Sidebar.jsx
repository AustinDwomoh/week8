import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h3>Crewmates</h3>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/summary">Summary</Link></li>
        </ul>
      </nav>

      <footer className="sidebar-footer">
        <small>Build your team • Project 7</small>
      </footer>
    </aside>
  )
}
