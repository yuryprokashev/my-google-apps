/**
 * creates an object with all BaseModule services available in it.
 * @constructor
 */
function BaseModule(){
    this.KeyValueFactory = new KeyValueFactory();
    this.Validator = new ValidatorFactory();
    this.MapFactory = new KeyMapFactory();
    this.IndexFactory = new PropertyIndexFactory(this);
    this.CollectionFactory = new CollectionFactory(this);
    this.OperatorCollection = new OperatorCollectionFactory(this);
    this.ConditionFactory = new ConditionFactory();
    this.ConditionEvaluator = new ConditionEvaluator(this);
    this.PropertyExtractorCollection = new PropertyExtractorCollectionFactory(this);
}