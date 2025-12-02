export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${apiBase}${endpoint}`)
      if (!response.ok) throw new Error(`API Error: ${response.status}`)
      return await response.json()
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  return {
    fetchData,
    getMembers: () => fetchData('/members'),
    getMember: (id: number) => fetchData(`/members/${id}`),
    getMatches: () => fetchData('/matches'),
    getMatch: (id: number) => fetchData(`/matches/${id}`),
    getGalleries: () => fetchData('/galleries'),
    getGallery: (id: number) => fetchData(`/galleries/${id}`),
    getStats: () => fetchData('/stats')
  }
}
