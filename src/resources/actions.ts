import { makeQueryParams } from "../helpers/utils"
import { ApiClient, type RequestOptions } from "../helpers/client"

export interface Action {
  id: string
  incident_id: string
  status: ActionStatus
  assignee: ActionAssignee
  completed_at: string
  created_at: Date
  updated_at: Date
  description: string
}

export type ActionStatus = string

export type ActionAssigneeRole = string

export interface ActionAssignee {
  id: string
  name: string
  email: string
  role: ActionAssigneeRole
  slack_user_id: string
}

export enum ActionIncidentMode {
  STANDARD = "STANDARD",
  RETROSPECTIVE = "RETROSPECTIVE",
  TEST = "TEST",
  TUTORIAL = "TUTORIAL",
  STREAM = "STREAM",
}

export interface ActionRetrieveParams {
  incident_id: string
  incident_mode: ActionIncidentMode
}

export class Actions {
  constructor(private _client: ApiClient) {}

  /**
   * Retrieves an action
   */
  retrieve(params: ActionRetrieveParams, body?: RequestOptions) {
    const query = makeQueryParams({ incident_id: params.incident_id, incident_mode: params.incident_mode })

    return this._client.get<Action>(`/actions?${query}`)
  }

  /**
   * List actions for a given ID
   */
  list(id: string) {
    return this._client.get<Action[]>(`/actions/${id}`)
  }
}
