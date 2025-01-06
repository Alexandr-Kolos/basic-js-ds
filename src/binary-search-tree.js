const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this._insertNode(this.rootNode, newNode);
    }
  }

  _insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return this._findNode(this.rootNode, data);
  }

  _findNode(node, data) {
    if (!node) {
      return null;
    }
    if (data < node.data) {
      return this._findNode(node.left, data);
    } else if (data > node.data) {
      return this._findNode(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.rootNode = this._removeNode(this.rootNode, data);
  }

  _removeNode(node, data) {
    if (!node) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      // У узла нет дочерних элементов
      if (!node.left && !node.right) {
        return null;
      }
      // У узла один дочерний элемент
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      // У узла два дочерних элемента
      const minRight = this._findMinNode(node.right);
      node.data = minRight.data;
      node.right = this._removeNode(node.right, minRight.data);
      return node;
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    return this._findMinNode(this.rootNode).data;
  }

  _findMinNode(node) {
    if (!node.left) {
      return node;
    }
    return this._findMinNode(node.left);
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    return this._findMaxNode(this.rootNode).data;
  }

  _findMaxNode(node) {
    if (!node.right) {
      return node;
    }
    return this._findMaxNode(node.right);
  }
}

module.exports = {
  BinarySearchTree
};