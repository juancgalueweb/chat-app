export const baseUrl = 'http://localhost:8001'

export const postRequest = async (url, body) => {
  let errorMsg
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()

  if (!response.ok) {
    if (data?.msg) {
      errorMsg = data.msg
    }
    return { error: true, errorMsg }
  }
  return data
}
