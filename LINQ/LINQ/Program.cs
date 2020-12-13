using System;
using System.Linq;

namespace LINQ {
    internal class Program {
        public static void Main(string[] args) {
            task1();
            task2();
            task3();
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

        static void task3() {
            int[] numbers = { 33, -2456, 3346, 122, 106, -342, 556, -6633, 77, 88 };
            var t3 = numbers.GroupBy(n => Convert.ToInt32(n.ToString().Last()))
                .Select(n => n.Max())
                .OrderBy(n => Convert.ToInt32(n.ToString().Last()));
            
            foreach (var n in t3) {
                Console.WriteLine(n);
            }
        }
    }
}