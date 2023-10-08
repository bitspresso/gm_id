# Deployment order:
- Traits: [0, 1, 2]
- EventPass(Traits)
- IdentController(sender, EventPass)
- Event(name, description)
- CriteriaFilter(Event, EventPass)
- Registry
- FilterExecutor(IdentController, Registry)
- EntryPoint(Registry, FilterExecutor)