import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CrewmateCard from '../components/CrewCard'


export default function ListCrewmates() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false })

      if (!mounted) return
      if (error) setError(error.message)
      else setCrewmates(data || [])
      setLoading(false)
    }

    load()
    return () => { mounted = false }
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>

  if (crewmates.length === 0)
    return (
      <section>
        <h2>No crewmates yet</h2>
        <p><Link to="/create">Create your first crewmate</Link></p>
      </section>
    )

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Your Crewmates</h2>
      <div className="cards-grid">
        {crewmates.map((c) => (
          <CrewmateCard key={c.id} crewmate={c} />
        ))}
      </div>
    </section>
  )
}
