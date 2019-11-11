/**
 *
 * @constructor
 */
function IndexFactory(baseModule){
    this.getPropertyIndexBuilder = function () {
        return new PropertyIndexBuilder();
    };

    this.createOneToManyIndex = function(){
        return new OneToManyIndex();
    };
    this.createOneToOneIndex = function () {
        return new OneToOneIndex();
    };

    /**
     *
     * @constructor
     */
    function PropertyIndexBuilder() {
        var _indexedPropertyName, _storageIndex;
        this.setIndexedPropertyName = function (str) {
            _indexedPropertyName = str;
            return this;
        };
        this.setStorageIndex = function (index) {
            _storageIndex = index;
            return this;
        };
        this.build = function () {
            baseModule.Validator.isDefined("Storage Index", _storageIndex);
            baseModule.Validator.isDefined("Indexed Property Name", _indexedPropertyName);
            return new PropertyIndex(_storageIndex, _indexedPropertyName);
        };
    }

    /**
     *
     * @param storageIndex
     * @param indexedPropertyName
     * @constructor
     */
    function PropertyIndex(storageIndex, indexedPropertyName) {
        this.getIndexedPropertyName = function () {
            return indexedPropertyName;
        };
        this.index = function (instance) {
            baseModule.Validator.mustBeTrue(instance.hasOwnProperty(indexedPropertyName),
                "Instance can not be indexed by property: " + indexedPropertyName);
            var indexedPropertyValueExtractor = baseModule.PropertyExtractorCollection.getByType(typeof instance[indexedPropertyName]);
            storageIndex.set(indexedPropertyValueExtractor.extract(indexedPropertyName, instance), instance);
        };
        this.get = function (indexedPropertyValue) {
            return storageIndex.get(indexedPropertyValue);
        }
    }

    function OneToManyIndex() {
        var _index = {};
        var _keys = [];
        this.set = function(key, obj){
            if(!_index[key]) _index[key] = [];
            _index[key].push(obj);
            _keys.push(key);
            return this;
        };
        this.get = function(key){
            if(_index[key]) return _index[key];
        };
        this.has = function (key) {
            return _index[key] !== undefined;
        };
        this.keys = function () {
            return _keys;
        };
        this.remove = function(key){
            _remove(_index, _keys, key);
            return this;
        };
    }

    function OneToOneIndex() {
        var _index = {};
        var _keys = [];
        this.set = function (key, obj) {
            _index[key] = obj;
            _keys.push(key);
            return this;
        };
        this.get = function (key) {
            return _index[key];
        };
        this.has = function (key) {
            return _index[key] !== undefined;
        };
        this.keys = function () {
            return _keys;
        };
        this.remove = function(key){
            _remove(_index, _keys, key);
            return this;
        };
    }

    function _remove(index, keys, key) {
        var keyIndex = keys.indexOf(key);
        keys.splice(keyIndex, 1);
        delete index[key];
    }
}