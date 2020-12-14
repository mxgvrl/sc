using System;
using System.Collections.Generic;
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

        static void task4() {
            // 4) Исходная последовательность содержит сведения о клиентах фитнес-центра. Каждый элемент
            // последовательности включает следующие целочисленные поля:
            //     <Код клиента> <Год> <Номер месяца>
            //     <Продолжительность занятий (в часах)>
            // Для каждой пары «год–месяц», присутствующей в исходных данных, ----- (GroupJoin?)
            // определить общую продолжительность занятий 
            // всех клиентов в указанное время                                ----- (Времени нет в классе)
            // (вначале выводится общая продолжительность, затем год, затем месяц). 
            // Сведения о каждой паре «год–месяц» выводить на новой строке и упорядочивать
            // по возрастанию общей продолжительности занятий, 
            // для одинаковой продолжительности — по убыванию номера года, адля одинакового номера года —
            // по возрастанию номера месяца.

            var clients = new List<Client> {
                new Client {Id = 1, Year = 2020, Month = 3, Duration = 2},
                new Client {Id = 2, Year = 2020, Month = 6, Duration = 3},
                new Client {Id = 3, Year = 2019, Month = 12, Duration = 1},
                new Client {Id = 4, Year = 2020, Month = 12, Duration = 2}
            };
        }
    }

    class Client {
        public int Id;
        public int Year;
        public int Month;
        public int Duration;
    }
    
    
}