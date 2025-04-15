import { ApiClient, RequestOptions } from "../helpers/client"

enum AlertEventStatus {
  firing = 1,
  resolved = 2,
}

export interface AlertEventCreateParams {
  alert_source_config_id: string
  deduplication_key: string
  key: string
  description: string
  metadata: Record<string, any>
  source_url: string
  status: AlertEventStatus
  title: string
}

export class AlertEvents {
  constructor(private _client: ApiClient) {}

  create(params: AlertEventCreateParams, options?: RequestOptions) {
    const { alert_source_config_id, ...restParams } = params

    return this._client.post<{ deduplication_key: string; message: string; status: AlertEventStatus }>(
      `/alert_events/http/${alert_source_config_id}`,
      { ...options, body: JSON.stringify(restParams) },
    )
  }
}
