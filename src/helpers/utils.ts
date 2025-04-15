export const makeQueryParams = (dto: Record<string, string>) => {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(dto)) {
    params.append(key, value)
  }

  return params.toString()
}
