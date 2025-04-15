import { ApiClient, RequestOptions } from "../helpers/client"

export interface AlertAttribute {
  id: string
  name: string
  type: string
  array: boolean
}

export class AlertAttributes {
  constructor(private _client: ApiClient) {}

  create(params: Omit<AlertAttribute, "id">, options?: RequestOptions) {
    return this._client.post<{ alert_attribute: AlertAttribute }>("/alert_attributes", { ...options, body: JSON.stringify(params) })
  }

  list(options?: RequestOptions) {
    return this._client.get<{ alert_attributes: AlertAttribute[] }>("/alert_attributes", options)
  }

  retrieve(id: string, options?: RequestOptions) {
    return this._client.get<{ alert_attribute: AlertAttribute }>(`/alert_attributes/${id}`, options)
  }

  update(id: string, params: Omit<AlertAttribute, "id">, options?: RequestOptions) {
    return this._client.put<{ alert_attribute: AlertAttribute }>(`/alert_attributes/${id}`, { ...options, body: JSON.stringify(params) })
  }

  delete(options?: RequestOptions) {
    return this._client.delete<null>("/alert_attributes", options)
  }
}
