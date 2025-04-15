import { ApiClient } from "./helpers/client"
import { Actions } from "./resources/actions"
import { AlertAttribute } from "./resources/alert-attribute"

interface IncidentV2 {
  actions: Actions
  alert_attribute: AlertAttribute
}

export class Incident {
  public v2: IncidentV2
  private client: ApiClient

  constructor(config: IncidentConfig) {
    this.client = new ApiClient(config.apiKey)
    this.v2 = {
      actions: new Actions(this.client),
      alert_attribute: new AlertAttribute(this.client),
    }
  }
}

export interface IncidentConfig {
  apiKey: string
}
