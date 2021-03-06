import { useEffect, useState } from 'react'

import { useStateValue } from 'data/state'
import useBackendApi from 'utils/useBackendApi'

const useDashboardStats = (range, sort) => {
  const [{ dashboardStats, reload }, dispatch] = useStateValue()
  const { get } = useBackendApi({ authToken: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchStats = async (range, sort) => {
    setLoading(true)
    setError(null)
    try {
      const data = await get(`/dashboard-stats?range=${range}&sort=${sort}`)
      dispatch({ type: 'setDashboardStats', stats: data })
    } catch (err) {
      console.error(err)
      setError('Failed to load stats')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats(range, sort)
  }, [range, sort, reload.dashboardStats])

  const reloadStats = () => {
    dispatch({ type: 'reload', target: 'dashboardStats' })
  }

  return { dashboardStats, loading, error, reload: reloadStats }
}

export default useDashboardStats
