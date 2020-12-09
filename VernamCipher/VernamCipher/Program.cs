using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Numerics;

namespace VernamCipher {
    internal class Program {
        public static void Main(string[] args) {
            // Example1();
            // Console.WriteLine();
            // Example2();
            // Console.WriteLine(Eq(100));
            
            StringBuilder key0 = new StringBuilder("1001001");
            string key = key0.ToString();
            // int keyLength = key.Length;
            //
            String str = "alma-mater";
            //
            // StringBuilder res = new StringBuilder();
            // string preBinary = Convert.ToString('t', 2);
            //
            // for (int i = 0; i < preBinary.Length - keyLength; i++) {
            //     key.Append((char)key[i]);
            // }
            //
            // int binary = Convert.ToInt32(preBinary, 2);
            // //var bar1 = Convert.ToInt32(binary.ToString(), 2);
            // var key1 = Convert.ToInt32(key.ToString(), 2);
            // res.Append((char) (binary ^ key1));
            //
            // Convert.ToInt32("1001101", 2).ToString();
            
            String s1  = vernam(str, key);
            Console.WriteLine(s1);
            Console.WriteLine(vernam(s1, key));
        }

        static string Eq(int n) => (1 + new String('0', n));

        public static String vernam(string s, String key) {
            
            int keyLength = key.Length;
            StringBuilder res = new StringBuilder();
            
            char[] charArray = s.ToCharArray();
            string[] strArray = new String[charArray.Length];
            
            foreach (var c in charArray) {
                strArray.Append(Convert.ToString(c, 2));
            }
            
            //string[] a = charArray.Select(c => Convert.ToString(c, 2));

            int symbCode = 0;
            int keyCode = 0;
            for (int i = 0; i < strArray.Length - 1; i++) {
                for (int j = 0; j < strArray[i].Length - keyLength; j++) {
                    key.Append((char) key[j]);
                }
                symbCode = Convert.ToInt32(strArray[i], 2);
                keyCode = Convert.ToInt32(key.ToString(), 2);
                res.Append((char) (symbCode ^ keyCode));
            }

            
            
            // StringBuilder res = new StringBuilder();
            // int binary = 0;
            // foreach (char c in s.ToCharArray()) {
            //     binary = Convert.ToInt32(Convert.ToString(c, 2));
            //     //res.Append((char) (binary ^ key));
            //     res.Append((char) (Convert.ToInt32(binary.ToString(), 2)  ^ Convert.ToInt32(key.ToString(), 2)));
            //
            // }
            return res.ToString();
        }
    }
}