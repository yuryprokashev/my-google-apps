function IndexAppFactory(){
    this.createOneToManyIndex = function(){
        return new OneToManyIndex();
    };
    this.createOneToOneIndex = function () {
        return new OneToOneIndex();
    };

    function OneToManyIndex() {
        var _index = {};
        this.set = function(key, obj){
            if(!_index[key]) _index[key] = [];
            _index[key].push(obj);
        };
        this.get = function(key){
            if(_index[key]) return _index[key];
            return [];
        };
        this.has = function (key) {
            return _index[key] !== undefined;
        };
        this.keys = function () {
            return Object.keys(_index);
        };
        this.remove = function(key){
            delete _index[key];
        };
    }

    function OneToOneIndex() {
        var _index = {};
        this.set = function (key, obj) {
            _index[key] = obj;
        };
        this.get = function (key) {
            return _index[key];
        };
        this.has = function (key) {
            return _index[key] !== undefined;
        }
    }
}