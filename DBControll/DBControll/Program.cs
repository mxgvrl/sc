using System;
using System.Linq;

namespace DBControll {
    internal class Program {
        public static void Main(string[] args) {
            using (SCDBContext db = new SCDBContext()) {
                // Account account1 = new Account {accountName = "C ac name1"};
                // Account account2 = new Account {accountName = "C ac name2"};
                //
                // db.Accounts.Add(account1);
                // db.Accounts.Add(account2);
                // db.SaveChanges();

                var account1 = db.Account;
                Console.WriteLine("List: ");
                foreach (var account in account1) {
                    Console.WriteLine($"{account.id} - {account.account_name} - {account.create_date} - {account.update_date}");
                }
                Console.ReadKey();
            }
        }
    }
}