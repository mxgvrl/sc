function Tree() {
    this.root = null;
}

Tree.prototype.newNode = function (value) {
    let node = {};
    node.value = value;
    node.parent = null;
    node.left = null;
    node.right = null;
    return node;
}

Tree.prototype.add = function (value) {
    if (typeof(value) === 'number') {
        let currentNode = this.newNode(value);
        if (!this.root) {
            this.root = currentNode;
        } else {
            this.insert(currentNode);
        }
        return this
    }
    else {
        console.log('You can input numbers only')
    }
}

Tree.prototype.insert = function (currentNode) {
    let value = currentNode.value;
    let traverse = function (node) {
        if (value > node.value) {
            if (!node.right) {
                node.right = currentNode;
                node.right.parent = node;
            }
            else {
                traverse(node.right);
            }
        }
        else {
            if (!node.left) {
                node.left = currentNode;
                node.left.parent = node;
            }
            else {
                traverse(node.left);
            }
        }
    }
    traverse(this.root)
}

Tree.prototype.remove = function (value) {
    let toRemove = this.findNodeByValue(value).parent;
    toRemove.left = null;
    toRemove.right = null;
}

Tree.prototype.findNodeByValue = function (value) {
    let currentNode = this.root;
    let traverse = function (node) {
        if (node.value !== value) {
            if (value < node.value) {
                traverse(node.left)
            }
            else {
                traverse(node.right)
            }
        }
        else {
            currentNode = node;
        }
    }
    traverse(currentNode)
    return currentNode
}

Tree.prototype.traverseRTL = function () {
    let node = this.root;
    let nodesList = [node.value];
    while (node !== null) {
        if (node.right !== null) {
            nodesList.push(node.right.value);
            if (node.left !== null) {
                nodesList.push(node.left.value);
            }
            node = node.right;
        }
        else {
            if (node.left !== null) {
                nodesList.push(node.left.value);
                node = node.left
            }
            node = node.parent.left
        }
    }
    return nodesList;
}

Tree.prototype.traverseLTR = function () {
    let node = this.root;
    let nodesList = [node.value];
    while (node !== null) {
        if (node.left !== null) {
            nodesList.push(node.left.value);
            if (node.right !== null) {
                nodesList.push(node.right.value);
            }
            node = node.left;
        }
        else {
            if (node.right !== null) {
                nodesList.push(node.right.value);
                node = node.right
            }
            node = node.parent.right
        }
    }
    return nodesList;
}

Tree.prototype.NLR = function (node) {
    if (node != null) {
        console.log(node.value);
        this.NLR(node.left);
        this.NLR(node.right);
    }
}

Tree.prototype.LNR = function (node) {
    if (node != null) {
        this.LNR(node.left);
        console.log(node.value);
        this.LNR(node.right);
    }
}

Tree.prototype.LRN = function (node) {
    if (node != null) {
        this.LRN(node.left);
        this.LRN(node.right);
        console.log(node.value);
    }
}

// --- CREATING ---
let tree = new Tree();
tree.add(50);
tree.add(78);
tree.add('node');
tree.add(32);
tree.add(20);
tree.add(5);
tree.add(6);
tree.add(1);
tree.add(41);
tree.add(35);
tree.add(48);
tree.add(70);
tree.add(81);
tree.add(100);
tree.add(99);

// --- REMOVING ---
let treeToCheck = tree.findNodeByValue(25);
console.log('Tree', treeToCheck);
tree.remove(10);
console.log('Tree after remove', treeToCheck);

// --- FINDING ---
let temp = tree.findNodeByValue(10);
console.log('Founded node', temp)

// --- RTL TRAVERSE ---
let listRTL = tree.traverseRTL();
let strRTL = 'RTL: ';
while (listRTL.length) {
    strRTL += listRTL.shift() + ', '
}
console.log(strRTL)

// --- LTR TRAVERSE ---
let listLTR = tree.traverseLTR();
let strLTR = 'LTR: ';
while (listLTR.length) {
    strLTR += listLTR.shift() + ', '
}
console.log(strLTR)

console.log('-------------NLR traverse---------------')
tree.NLR(tree.root)
console.log('-------------LNR traverse---------------')
tree.LNR(tree.root)
console.log('-------------LRN traverse---------------')
tree.LRN(tree.root)

