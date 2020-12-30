using System.Data.Entity;

namespace DBControll {
    public class SCDBContext : DbContext{
        public SCDBContext() : base("DbConnection") { }
        
        public DbSet<Account> Account { get; set; }
    }
}