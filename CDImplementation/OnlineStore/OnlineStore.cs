namespace OnlineStore {
    public class OnlineStore {


        
        public class StoreFront {
            public static int SQLColumn(int information) {
                var res = Customer(information);
                return res;
            }
            
            public static int Customer(int information) {
                var res = information;
                return res;
            }
        }

        public class Catalogue {
            public static int AdjustStock(int information) {
                var res = StoreFront.SQLColumn(information);
                return res;
            }
        }

        public class OrderSystem {

            public static int Payment(int information) {
                var res = Catalogue.AdjustStock(information);
                return res;
            }
            

        }
    }
}