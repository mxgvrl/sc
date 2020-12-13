using System;
using System.Linq;

namespace LINQ {
    internal class Program {
        public static void Main(string[] args) {
            task1();
            task2();
        }

        static void task1() {
            int[] numbers = { 33, -2, 3, 1, 10, -34, 55, -66, 77, 88 };
            var t1 = numbers.Where(i => i > 0).Min();
            Console.WriteLine(t1);
        }

        static void task2() {
            string[] strings = { "AKDSFJ", "HDFAADGREDF", "ASGQERGSDFB", "PLSA", "ZEKNRG", "OAAO"};
            var t2 = strings.OrderBy(s => s.Length).ThenBy(s => s);
            foreach (var n in t2) {
                Console.WriteLine(n);
            }
        }
    }
}