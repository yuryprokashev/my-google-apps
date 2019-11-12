/**
 *
 * @constructor
 */
function PropertyIndexFactory(baseModule){
    this.getBuilder = function () {
        return new PropertyIndexBuilder();
    };

    /**
     *
     * @constructor
     */
    function PropertyIndexBuilder() {
        var _indexedPropertyName, _storageMap;
        this.setIndexedPropertyName = function (str) {
            _indexedPropertyName = str;
            return this;
        };
        this.setStorageMap = function (map) {
            _storageMap = map;
            return this;
        };
        this.build = function () {
            baseModule.Validator.isDefined("Storage Index", _storageMap);
            baseModule.Validator.isDefined("Indexed Property Name", _indexedPropertyName);
            return new PropertyIndex(_storageMap, _indexedPropertyName);
        };
    }

    /**
     *
     * @param storageMap {KeyMap}
     * @param indexedPropertyName
     * @constructor
     */
    function PropertyIndex(storageMap, indexedPropertyName) {
        this.getIndexedPropertyName = function () {
            return indexedPropertyName;
        };
        this.index = function (instance) {
            baseModule.Validator.mustBeTrue(instance.hasOwnProperty(indexedPropertyName),
                "Instance can not be indexed by property: " + indexedPropertyName);
            var indexedPropertyValueExtractor = baseModule.PropertyExtractorCollection.getByType(typeof instance[indexedPropertyName]);
            storageMap.set(indexedPropertyValueExtractor.extract(indexedPropertyName, instance), instance);
        };
        this.get = function (indexedPropertyValue) {
            return storageMap.get(indexedPropertyValue);
        }
    }
}