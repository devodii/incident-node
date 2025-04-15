import { OverrideProps } from "./typescript"

export interface ApiError {
  type: string
  status: number
  request_id: string
  errors: Array<{
    code: string
    message: string
  }>
}

export type Headers = Record<string, string>

/**
 * Forces headers to be an object type
 */
export type RequestOptions = OverrideProps<Omit<RequestInit, "method">, { headers?: Headers }>

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

  private async handleRequest<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options)

    // First check if the response is ok
    if (response.ok) return (await response.json()) as T

    // If not ok, try to parse the error response
    try {
      const errorData = (await response.json()) as ApiError
      throw errorData
    } catch (error) {
      throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
  }

  public async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return this.handleRequest<T>(`${this.baseUrl}/${path}`, { method: "GET", ...mergedOptions })
  }

  public async post<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return this.handleRequest<T>(`${this.baseUrl}/${path}`, { method: "POST", ...mergedOptions })
  }

  public async put<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return this.handleRequest<T>(`${this.baseUrl}/${path}`, { method: "PUT", ...mergedOptions })
  }

  public async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    const mergedOptions = this.mergeOptions(options)

    return this.handleRequest<T>(`${this.baseUrl}/${path}`, { method: "DELETE", ...mergedOptions })
  }
}
