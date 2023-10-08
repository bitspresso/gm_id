import { EventRegistered as EventRegisteredEvent } from "../generated/EventRegistry/EventRegistry"
import { EventRegistered } from "../generated/schema"

export function handleEventRegistered(event: EventRegisteredEvent): void {
  let entity = new EventRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.description = event.params.description
  entity.tags = event.params.tags
  entity.domain = event.params.domain

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
