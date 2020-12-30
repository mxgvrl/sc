using System;

namespace DBControll {
    public class Account {
        public int id { get; set; }
        public string account_name { get; set; }
        public DateTime create_date { get; set; }
        public DateTime update_date { get; set; }
    }
}