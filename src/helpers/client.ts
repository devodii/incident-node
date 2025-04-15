import { type Headers } from "./typescript"

export class ApiClient {
  baseUrl = "https://api.plane.com/v1"

  protected makeHeaders = (): Headers => ({
    "Content-Type": "application/json",
  })

  public async get<T>(path: string, option?: Omit<RequestInit, "method">): Promise<T> {
    return await fetch(`${this.baseUrl}/${path}`, {
      method: "GET",
      ...option,
      ...this.makeHeaders(),
    }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }

  public async post<T>(path: string, option?: Omit<RequestInit, "method">): Promise<T> {
    return await fetch(`${this.baseUrl}/${path}`, {
      method: "POST",
      ...option,
      ...this.makeHeaders(),
    }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }

  public async delete<T>(path: string, option?: Omit<RequestInit, "method">): Promise<T> {
    return await fetch(`${this.baseUrl}/${path}`, {
      method: "DELETE",
      ...option,
      ...this.makeHeaders(),
    }).then((res) => {
      if (res.ok) return res.json()
      else throw new Error(res.statusText)
    })
  }
}
