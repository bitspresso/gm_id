import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { Dropped, Registered } from "../generated/EntryPoint/EntryPoint"

export function createDroppedEvent(
  account: Address,
  forEvent: Address
): Dropped {
  let droppedEvent = changetype<Dropped>(newMockEvent())

  droppedEvent.parameters = new Array()

  droppedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  droppedEvent.parameters.push(
    new ethereum.EventParam("forEvent", ethereum.Value.fromAddress(forEvent))
  )

  return droppedEvent
}

export function createRegisteredEvent(
  account: Address,
  forEvent: Address
): Registered {
  let registeredEvent = changetype<Registered>(newMockEvent())

  registeredEvent.parameters = new Array()

  registeredEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  registeredEvent.parameters.push(
    new ethereum.EventParam("forEvent", ethereum.Value.fromAddress(forEvent))
  )

  return registeredEvent
}
