/**
 *
 * @constructor
 */
function CollectionFactory(baseModule){
    this.getBuilder = function () {
        return new CollectionBuilder();
    };

    /**
     *
     * @constructor
     */
    function CollectionBuilder() {
        var _propertyIndexesMap = baseModule.IndexFactory.createOneToOneIndex();
        var _instances = [];
        this.addPropertyIndex = function (propertyIndex) {
            _propertyIndexesMap.set(propertyIndex.getIndexedPropertyName(), propertyIndex);
            return this;
        };
        this.setInstances = function (instances) {
            _instances = instances;
            return this;
        };
        this.build = function () {
            return new Collection(_propertyIndexesMap, _instances);
        };
    }

    /**
     *
     * @constructor
     */
    function Collection(propertyIndexesMap, instances) {
        var _indexByPosition = baseModule.IndexFactory.createOneToOneIndex();
        instances.forEach(function (instance) {
            _indexOne(instance);
        });
        this.insertOne = function (instance) {
            return _insertOne(instance);
        };
        this.getBy = function (indexedPropertyName, indexedPropertyValue) {
            baseModule.Validator.isDefined("Indexed Property Name", indexedPropertyName);
            baseModule.Validator.isDefined("Indexed Property Value", indexedPropertyValue);
            return propertyIndexesMap.get(indexedPropertyName).get(indexedPropertyValue);
        };
        this.getAll = function () {
            return instances;
        };
        function _insertOne(instance) {
            var instancePosition = instances.push(instance);
            _indexOne(instance, instancePosition);
            return instancePosition;
        }
        function _indexOne(instance, instancePosition) {
            _indexByPosition.set(instancePosition, instance);
            propertyIndexesMap.keys().forEach(function(indexedPropertyName){
                propertyIndexesMap.get(indexedPropertyName).index(instance);
            });
        }
    }
}