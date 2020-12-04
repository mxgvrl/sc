namespace LinkedList {
    public class Node {
        public int value;
        public Node next;
        public Node prev;
        public int index;
        public override string ToString() {
            return $"[{this.index}] {this.value}";
        }

        public Node() {
            
        }
        
        public Node(Node previous, int index, int value) {
            this.index = index;
            this.value = value;
            if (previous != null) {
                this.prev = previous;
                previous.next = this;
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
    }
}