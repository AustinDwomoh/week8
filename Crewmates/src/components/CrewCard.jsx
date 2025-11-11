import React from 'react'
import crewmateUrl from '../assets/blank.png'
import { Link } from 'react-router-dom'
export default function CrewmateCard({ crewmate }) {
  const { name, color, role } = crewmate

  return (
    <Link to={`/crewmates/${crewmate.id}`}>
    <div className="card-item">
      <div className="card-sprite">
        <img src={crewmateUrl} alt={name} />
      </div>
      <div className="card-body">
        <div className="card-name">{name}</div>
        <div className="card-types">Color: {color}</div>
        <div className="card-hp">Role: {role}</div>
        <button className="card-button"><Link to={`/crewmates/${crewmate.id}/edit`}>Edit</Link></button>
      </div>
    </div>
    </Link>
  )
}
