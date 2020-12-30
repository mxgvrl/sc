using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBFirst
{
    public class SCDBContext : DbContext
    {
        public SCDBContext() : base("SCDBControllEntities") { }

        public DbSet<Account> Account { get; set; }
    }
}
