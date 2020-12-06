using System;
using System.Collections.Generic;

namespace LinkedList {
    internal class Program {
        public static void Main(string[] args) {
            var node = new Node(null, 0, 1);
            var node2 = new Node(node, 1, 2);
            var node3 = new Node(node2, 4, 3);
            var node4 = new Node(node3, 2, 4);

            // Console.WriteLine(node);
            // Console.WriteLine(node2);
            // Console.WriteLine(node.next);
            // Console.WriteLine(node2.prev);

            var node6 = new Node(node4, 3);
            //Console.WriteLine(node6);
            
            node.ReadByIndex(0);
            node.OutLinkedList();
            node.RemoveByIndex(3);
            node.OutLinkedList();

            node.Sort();
            node.OutLinkedList();
        }
    }
}