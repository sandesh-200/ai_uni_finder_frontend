const BASE_URL = "https://silkworm-exciting-leech.ngrok-free.app"

export const courseRecommendationAPI = {
  async getRecommendations(formData) {
    try {
      const response = await fetch(`${BASE_URL}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_name: formData.course_name,
          level_group: formData.level_group,
          institution_country: formData.institution_country,
          cost_amount: parseFloat(formData.cost_amount),
          course_cost_currency: formData.course_cost_currency,
          minimum_qualification: formData.minimum_qualification,
          ielts_score: formData.ielts_score ? parseFloat(formData.ielts_score) : undefined,
          pte_score: formData.pte_score ? parseFloat(formData.pte_score) : undefined,
          duolingo_score: formData.duolingo_score ? parseFloat(formData.duolingo_score) : undefined,
          toefl_score: formData.toefl_score ? parseFloat(formData.toefl_score) : undefined,
        }),
      })

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching recommendations:', error)
      throw error
    }
  }
} 