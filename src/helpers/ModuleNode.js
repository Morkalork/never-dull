'use script';

/**
 *	This class represents a node in the module cluster. 
 */
export default class {
  /**
   *	Create a module node
   *
   *	@param {object} module - A Never Dull (ND) module
   *	@param {object} parent - The parent ND module to which this node comes from. It set to
   *	null this node will be considered a starting node.
   *	@param {object[]} children - An array of ND modules to which a successful player
   *	can move after completing the node module.
   */
  constructor(module, parent, children) {
    this.module = module;
    this.parent = parent;
    this.children = children;
  }
}
