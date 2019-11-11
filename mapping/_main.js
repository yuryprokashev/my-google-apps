/**
 * Constructs the object with all MappingModule services available in it.
 * @param {BaseModule} baseModule - the instance of the BaseModule
 * @constructor
 */
function MappingModule(baseModule){
    this.ObjectMappingRuleFactory = new ObjectMappingRuleFactory();
    this.PropertyMappingRuleFactory = new PropertyMappingRuleFactory();
    this.PropertyMapperFactory = new PropertyMapperFactory(baseModule);
    this.ObjectMapperFactory = new ObjectMapperFactory(baseModule);
    this.MapperFactory = new MapperFactory();
}