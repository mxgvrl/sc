namespace OnlineStore {
    internal class Program {
        public static void Main(string[] args) {
            var customer = OnlineStore.OrderSystem.Payment(1);
            var storeAdmin = OnlineStore.StoreFront.StoreAdmin(2);
        }
    }
}