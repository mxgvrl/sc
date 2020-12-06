using System;

namespace LinkedList {
    public class Node {
        private readonly int _value;
        private Node _next;
        private Node _prev;
        private readonly int _index;
        private Node _root;
        public override string ToString() {
            return $"[{this._index}] {this._value}";
        }

        public Node(Node previous, int index, int value) {
            this._index = index;
            this._value = value;
            if (previous != null) {
                this._prev = previous;
                previous._next = this;
            }
            else {
                this._root = this;
            }
        }

        public Node(Node previous, int value) {
            this._value = value;
            this._prev = previous;
            previous._next = this;
            var tempNode = previous;
            var index = 0;
            while (tempNode != null) {
                if (tempNode._index == index) {
                    index++;
                    tempNode = previous._next;
                    this._index = index;
                }
                else {
                    this._index = index;
                }
                tempNode = tempNode._prev;
            }
        }

        private static Node FindNodeByIndex(Node node, int index) {
            if(node._index == index) {
                return node;
            }
            if(node._next != null) {
                return FindNodeByIndex(node._next, index);
            }
            Console.WriteLine($"Node with index {index} not found");
            return null;
        }
        
        public void ReadByIndex(int index) {
            Node node = FindNodeByIndex(_root, index);
            if (node != null) {
                Console.WriteLine($"Node: {node}");
            }
        }
        
        public void RemoveByIndex(int index)
        {
            var marked = FindNodeByIndex(_root, index);
            if (marked == null) return;
            if(marked._prev != null && marked._next != null)
            {
                marked._prev._next = marked._next;
                marked._next._prev = marked._prev;
            } 
            else
            {
                if (marked._next != null) {
                    marked._next._prev = null;
                    _root = marked._next;
                }
                else {
                    if (marked._prev != null) marked._prev._next = null;
                }
            }
        }

        private void OutList(Node node) {
            Console.Write($"{node}  ");
            if (node._next != null) {
                OutList(node._next);
            }
        }

        public void OutLinkedList() {
            OutList(_root);
            Console.WriteLine();
        }

        void swap(Node node, Node node2) {
            if (node._prev != null && node2._next != null) {
                node._next = node2._next;
                node._next._prev = node;
                node2._prev = node._prev;
                node2._prev._next = node2;
            }

            if (node2._next == null) {
                node._next = null;
                node2._prev = node._prev;
                if (node2._prev != null) node2._prev._next = node2;
            }
            
            if (node._prev == null) {
                node._next = node2._next;
                if (node._next != null) {
                    node._next._prev = node;
                    node2._prev = null;
                }

                if (node2._prev != null) node2._prev._next = node2;
            }

            if (node._prev == null && node2._next == null) {
                node._next = null;
                node2._prev = null;
            }
            
            node2._next = node;
            node._prev = node2;
        }
        
        public void Sort()
        {
            var temp = _root;
            while (temp._next != null)
            {
                if (temp._index > temp._next._index)
                {
                    swap(temp, temp._next);
                    if (temp._next != null) temp = temp._next;
                    Sort();
                }
                else
                    temp = temp._next; 
            }
        }
    }
}