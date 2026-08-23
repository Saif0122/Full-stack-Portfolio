class SchemaRegistryService {
  constructor() {
    this.registry = new Map();
  }

  register(type, generatorFunction) {
    this.registry.set(type, generatorFunction);
  }

  getGenerator(type) {
    return this.registry.get(type);
  }

  getRegisteredTypes() {
    return Array.from(this.registry.keys());
  }
}

export default new SchemaRegistryService();
