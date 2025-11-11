import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function CrewmateDetail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', id)
        .single()

      if (!mounted) return

      if (error) setError(error.message)
      else setCrewmate(data)

      setLoading(false)
    }

    load()
    return () => { mounted = false }
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="error">{error}</p>
  if (!crewmate) return <p>Not found</p>

  return (
    <section>
      <h2>{crewmate.name}</h2>
      <p><strong>Role:</strong> {crewmate.role}</p>
      <p><strong>Color:</strong> {crewmate.color}</p>
      <p><strong>Created:</strong> {new Date(crewmate.created_at).toLocaleString()}</p>
      <p>{crewmate.description || 'No extra description provided.'}</p>
      <p>
        <Link to={`/crewmates/${crewmate.id}/edit`}>Edit</Link>
      </p>
    </section>
  )
}
