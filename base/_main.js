/**
 * creates an object with all BaseModule services available in it.
 * @constructor
 */
function BaseModule(){
    this.KeyValueFactory = new KeyValueFactory();
    this.Validator = new ValidatorFactory();
    this.IndexFactory = new IndexFactory(this);
    this.CollectionFactory = new CollectionFactory(this);
    this.OperatorCollection = new OperatorCollectionFactory(this);
    this.ConditionFactory = new ConditionFactory();
    this.ConditionEvaluator = new ConditionEvaluator(this);
    this.PropertyExtractorCollection = new PropertyExtractorCollectionFactory(this);
}