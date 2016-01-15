import AttributeDictionary = require("./AttributeDictionary");
import TreeNodeBase = require('./TreeNodeBase');
import JThreeContext = require("../JThreeContext");
import NodeManager = require('./NodeManager');
import ContextComponents = require('../ContextComponents');
import BehaviorNode = require("./Nodes/Behaviors/BehaviorNode");
import Delegates = require("../Base/Delegates");
import NodeProps = require('./NodeProps');

/**
 * This is the most base class in all GomlNode
 */
class GomlTreeNodeBase extends TreeNodeBase {
  /**
   * コンストラクタ内ではattributeの定義、attributeの変化時のイベント、child, parentが更新された際のイベントを設定します。
   */
  constructor() {
    super();

    //load node manager
    this.nodeManager = JThreeContext.getContextComponent<NodeManager>(ContextComponents.NodeManager);

    //after configuration, this node is going to add to NodesById
    this.nodeManager.NodesById[this.ID] =  this;
    this.attributes = new AttributeDictionary(this);

    // apply attributes
    this.on('node-mount-process-finished', (mounted) => {
      const attrs = this.attributes.getAllAttributes();
      const attrs_kv = {};
      Object.keys(attrs).forEach((v) => {
        attrs_kv[v] = attrs[v].Value;
      });
      console.log('ga initialize', this.getTypeName(), attrs_kv);
      if (mounted) {
        this.attributes.forEachAttr((ga) => {
          ga.initialize();
        })
      }
    });
  }

  /**
   * node manager
   * @type {NodeManager}
   */
  public nodeManager: NodeManager;

  /**
   * Attributes this node have.
   */
  public attributes: AttributeDictionary;

  /**
   * props for Node.
   * @type {NodeProps}
   */
  public props: NodeProps;

  /**
   * components that is attached to this node.
   */
  protected behaviors: {[key:string]:BehaviorNode[]} = {};

  /**
   * Add component to this node.
   */
  public addBehavior(behaviors: BehaviorNode): void {
    this.nodeManager.behaviorRunner.addBehavior(behaviors, this);
    if (!this.behaviors[behaviors.BehaviorName]) this.behaviors[behaviors.BehaviorName] =  [];
    this.behaviors[behaviors.BehaviorName].push(behaviors);
  }

  public getBehaviors(behaviorName: string): BehaviorNode[] {
    return this.behaviors[behaviorName];
  }
}

export = GomlTreeNodeBase;
