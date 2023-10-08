import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { EventRegistered } from "../generated/schema"
import { EventRegistered as EventRegisteredEvent } from "../generated/EventRegistry/EventRegistry"
import { handleEventRegistered } from "../src/event-registry"
import { createEventRegisteredEvent } from "./event-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let name = "Example string value"
    let description = "Example string value"
    let tags = "Example string value"
    let domain = "Example string value"
    let newEventRegisteredEvent = createEventRegisteredEvent(
      name,
      description,
      tags,
      domain
    )
    handleEventRegistered(newEventRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EventRegistered created and stored", () => {
    assert.entityCount("EventRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EventRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "EventRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "EventRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tags",
      "Example string value"
    )
    assert.fieldEquals(
      "EventRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "domain",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
