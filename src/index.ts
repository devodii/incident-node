import { ApiClient } from "./helpers/client"
import { Actions } from "./resources/actions"
import { AlertAttributes } from "./resources/alert-attribute"
import { AlertEvents } from "./resources/alert-event"

interface IncidentV2 {
  actions: Actions
  alert_attributes: AlertAttributes
  alert_events: AlertEvents
}

export class Incident {
  public v2: IncidentV2
  private client: ApiClient

  constructor(config: IncidentConfig) {
    this.client = new ApiClient(config.apiKey)
    this.v2 = {
      actions: new Actions(this.client),
      alert_attributes: new AlertAttributes(this.client),
      alert_events: new AlertEvents(this.client),
    }
  }
}

export interface IncidentConfig {
  apiKey: string
}
