/**
 *
 * @constructor
 */
function KeyMapFactory() {
    this.getBuilder = function () {
        return new KeyMapBuilder();
    };

    /**
     *
     * @constructor
     */
    function KeyMapBuilder() {
        var _oneToMany = false;
        this.setOneToMany = function (bool) {
            _oneToMany = bool;
            return this;
        };
        this.build = function () {
            return new KeyMap(_oneToMany);
        };
    }

    /**
     *
     * @param isOneToMany
     * @constructor
     */
    function KeyMap(isOneToMany) {
        var _index = {};
        var _keys = [];
        this.set = function (key, obj) {
            if(isOneToMany) return _setMany(_index, _keys, key, obj);
            return _setOne(_index, _keys, key, obj);
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
        };
    }
    function _setMany(index, keys, key, obj){
        if(!index[key]) index[key] = [];
        index[key].push(obj);
        return keys.push(key);
    }
    function _setOne(index, keys, key, obj) {
        index[key] = obj;
        return keys.push(key);
    }
    function _remove(index, keys, key) {
        var keyIndex = keys.indexOf(key);
        keys.splice(keyIndex, 1);
        delete index[key];
    }
}