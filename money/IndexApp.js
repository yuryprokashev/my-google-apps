function IndexAppFactory(){
    this.createOneToManyIndex = function(){
        return new OneToManyIndex();
    };
    this.createOneToOneIndex = function () {
        return new OneToOneIndex();
    };

    function OneToManyIndex() {
        var _index = {};
        var _keys = [];
        this.set = function(key, obj){
            if(!_index[key]) _index[key] = [];
            _index[key].push(obj);
            _keys.push(key);
        };
        this.get = function(key){
            if(_index[key]) return _index[key];
            return [];
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

    function OneToOneIndex() {
        var _index = {};
        var _keys = [];
        this.set = function (key, obj) {
            _index[key] = obj;
            _keys.push(key);
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
        };
    }

    function _remove(index, keys, key) {
        var keyIndex = keys.indexOf(key);
        keys.splice(keyIndex, 1);
        delete index[key];
    }
}