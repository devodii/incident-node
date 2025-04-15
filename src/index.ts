import { ApiClient } from "./helpers/client"
import { Actions } from "./resources/actions"

interface IncidentV2 {
  actions: Actions
}

export class Incident {
  public v2: IncidentV2
  private client: ApiClient

  constructor(config: IncidentConfig) {
    this.client = new ApiClient(config.apiKey)
    this.v2 = {
      actions: new Actions(this.client),
    }
  }
}

export interface IncidentConfig {
  apiKey: string
}
