function MapperAppFactory() {
    this.getBuilder =function(){
        return new MapperBuilder();
    };
    function MapperBuilder(){
        var _ToConstructor, _fieldMap;
        this.setToConstructor = function (ToConstructor) {
            _ToConstructor = ToConstructor;
            return this;
        };
        this.setFieldMap = function (fieldMap) {
            _fieldMap = fieldMap;
            return this;
        };
        this.build = function () {
            return new Mapper(_ToConstructor, _fieldMap);
        };
    }
    function Mapper(ToConstructor, fieldMap){
        this.mapOne = function(fromObject){
            return _mapOne(fromObject);
        };
        this.mapBatch = function (fromObjects) {
            return _mapBatch(fromObjects);
        };
        function _mapBatch(fromObjects) {
            var toObjects = [];
            fromObjects.forEach(function(fromObject){
                toObjects.push(_mapOne(fromObject));
            });
            return toObjects;
        }
        function _mapOne(fromObject) {
            if(ToConstructor.name === "Array"){
                return _mapOneTo(fromObject, []);
            }
            else {
                var valueObject = _mapOneTo(fromObject, {});
                return new ToConstructor(valueObject);
            }
        }
        function _mapOneTo(fromObject, toValueObject) {
            fieldMap.keys().forEach(function (fromObjectField) {
                var toObjectField = fieldMap.get(fromObjectField);
                if(typeof fromObject[fromObjectField] === "function"){
                    toValueObject[toObjectField] = fromObject[fromObjectField]();
                }
                else {
                    toValueObject[toObjectField] = fromObject[fromObjectField];
                }
            });
            return toValueObject;
        }
    }
}