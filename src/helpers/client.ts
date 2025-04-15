export type Headers = Record<string, string>

export type RequestOptions = Omit<RequestInit, "method">

export class ApiClient {
  constructor(private apiKey: string) {}

  baseUrl = "https://api.incident.io/v2"

  protected authHeaders(): Headers {
    return {
      Authorization: `Bearer ${this.apiKey}`,
    }
  }

  protected defaultHeaders = (): Headers => ({
    Accept: "application/json",
    "Content-Type": "application/json",
    ...this.authHeaders(),
  })

  private mergeOptions(options?: RequestOptions): RequestOptions {
    if (!options) return { headers: this.defaultHeaders() }

    const { headers: customHeaders, ...restOptions } = options

    // Merge headers, prioritizing auth headers over custom ones
    const mergedHeaders = { ...customHeaders, ...this.defaultHeaders() }

    return { ...restOptions, headers: mergedHeaders }
  }

  public async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return await fetch(`${this.baseUrl}/${path}`, { method: "GET", ...mergedOptions }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }

  public async post<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return await fetch(`${this.baseUrl}/${path}`, { method: "POST", ...mergedOptions }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }

  public async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return await fetch(`${this.baseUrl}/${path}`, { method: "DELETE", ...mergedOptions }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }
}
