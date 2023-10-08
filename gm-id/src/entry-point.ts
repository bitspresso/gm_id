import {
  Dropped as DroppedEvent,
  Registered as RegisteredEvent
} from "../generated/EntryPoint/EntryPoint"
import { Dropped, Registered } from "../generated/schema"

export function handleDropped(event: DroppedEvent): void {
  let entity = new Dropped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.forEvent = event.params.forEvent

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegistered(event: RegisteredEvent): void {
  let entity = new Registered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.forEvent = event.params.forEvent

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
