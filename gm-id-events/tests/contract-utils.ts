import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import { EventRegistered } from "../generated/Contract/Contract"

export function createEventRegisteredEvent(
  name: string,
  description: string,
  tags: string,
  domain: string
): EventRegistered {
  let eventRegisteredEvent = changetype<EventRegistered>(newMockEvent())

  eventRegisteredEvent.parameters = new Array()

  eventRegisteredEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  eventRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  eventRegisteredEvent.parameters.push(
    new ethereum.EventParam("tags", ethereum.Value.fromString(tags))
  )
  eventRegisteredEvent.parameters.push(
    new ethereum.EventParam("domain", ethereum.Value.fromString(domain))
  )

  return eventRegisteredEvent
}
