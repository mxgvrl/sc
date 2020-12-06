using System;

namespace LinkedList {
    public class Node {
        public int value;
        public Node next;
        public Node prev;
        public int index;
        public Node root;
        public override string ToString() {
            return $"[{this.index}] {this.value}";
        }

        public Node() { }
        
        public Node(Node previous, int index, int value) {
            this.index = index;
            this.value = value;
            if (previous != null) {
                this.prev = previous;
                previous.next = this;
            }
            else {
                this.root = this;
            }
        }
        
        // public Node(int index, int value) {
        //     this.index = index;
        //     this.value = value;
        //     this.prev = null;
        //     this.next = null;
        // }
        
        public Node(Node previous, int value) {
            this.value = value;
            this.prev = previous;
            previous.next = this;
            var tempNode = previous;
            var index = 0;
            while (tempNode != null) {
                if (tempNode.index == index) {
                    index++;
                    tempNode = previous.next;
                    this.index = index;
                }
                else {
                    this.index = index;
                }
                tempNode = tempNode.prev;
            }
        }

        private static Node FindNodeByIndex(Node node, int index) {
            if(node.index == index) {
                return node;
            }
            if(node.next != null) {
                return FindNodeByIndex(node.next, index);
            }
            Console.WriteLine($"Node with index {index} not found");
            return null;
        }
        
        public void ReadByIndex(int index) {
            Node node = FindNodeByIndex(root, index);
            if (node != null) {
                Console.WriteLine($"Node: {node}");
            }
        }
        
        public void RemoveByIndex(int index)
        {
            var marked = FindNodeByIndex(root, index);
            if (marked == null) return;
            if(marked.prev != null && marked.next != null)
            {
                marked.prev.next = marked.next;
                marked.next.prev = marked.prev;
            } 
            else
            {
                if (marked.next != null) {
                    marked.next.prev = null;
                    root = marked.next;
                }
                else {
                    marked.prev.next = null;
                }
            }
        }

        private void OutList(Node node) {
            Console.Write($"{node}  ");
            if (node.next != null) {
                OutList(node.next);
            }
        }

        public void OutLinkedList() {
            OutList(root);
            Console.WriteLine();
        }

        void swap(Node node, Node node2) {
            if (node.prev != null && node2.next != null) {
                node.next = node2.next;
                node.next.prev = node;
                node2.prev = node.prev;
                node2.prev.next = node2;
            }

            if (node2.next == null) {
                node.next = null;
                node2.prev = node.prev;
                node2.prev.next = node2;
            }
            
            if (node.prev == null) {
                node.next = node2.next;
                node.next.prev = node;
                node2.prev = null;
                node2.prev.next = node2;
            }

            if (node.prev == null && node2.next == null) {
                node.next = null;
                node2.prev = null;
            }
            
            node2.next = node;
            node.prev = node2;
        }
        
        public void Sort()
        {
            var temp = root;
            while (temp.next != null)
            {
                if (temp.index > temp.next.index)
                {
                    swap(temp, temp.next);
                    if (temp.next != null) temp = temp.next;
                    Sort();
                }
                else
                    temp = temp.next; 
            }
        }
    }
}