using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBFirst
{
    class Program
    {
        static void Main(string[] args)
        {
            using (SCDBContext db = new SCDBContext())
            {

                var account1 = db.Account;
                Console.WriteLine("List: ");
                foreach (var account in account1)
                {
                    Console.WriteLine($"{account.id} - {account.account_name} - {account.create_date} - {account.update_Date}");
                }
                Console.ReadKey();
            }
        }
    }
}
