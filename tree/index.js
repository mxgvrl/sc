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

// i'm an idiot!
// Tree.prototype.traverseRTL = function () {
//     let currentNode = this.root;
//     let nodesList = [];
//     let traverse = function (node) {
//         if (node !== null) {
//             if (node.right !== null) {
//                 nodesList.push(node.right.value);
//                 if (node.left !== null) {
//                     nodesList.push(node.left.value);
//                 }
//                 traverse(node.right);
//             }
//             else {
//                 if (node.left !== null) {
//                     nodesList.push(node.left.value);
//                     traverse(node.left)
//                 }
//                 traverse(node.parent.left)
//             }
//         }
//     }
//     traverse(currentNode)
//     return nodesList;
// }

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


// let bar = true;
// let input;
// input = prompt('This is tree. What do you want to do: 1) Add value; 2) Remove value; 3) Find value; 4) LTR traverse; 5) RTL traverse; 6) Add default values; 0) Exit ', '0');
// while (bar) {
//     switch (input) {
//         case 1:
//             let tree = new Tree();
//             tree.add(+(prompt('input value', '0')));
//             break;
//     }
// }



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

// --- REMOVING ---
// let treeToCheck = tree.findNodeByValue(25);
// console.log('Tree', treeToCheck);
// tree.remove(10);
// console.log('Tree after remove', treeToCheck);

// --- FINDING ---
// let temp = tree.findNodeByValue(10);
// console.log('Founded node', temp)

// --- RTL TRAVERSE ---
// let listRTL = tree.traverseRTL();
// let strRTL = 'RTL: ';
// while (listRTL.length) {
//     strRTL += listRTL.shift() + ', '
// }
// console.log(strRTL)

// --- LTR TRAVERSE ---
let listLTR = tree.traverseLTR(); // todo: fix traverse bug by adding marks for visited nodes
let strLTR = 'LTR: ';
while (listLTR.length) {
    strLTR += listLTR.shift() + ', '
}
console.log(strLTR)

