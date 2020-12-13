using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Numerics;

namespace VernamCipher {
    internal class Program {
        public static void Main(string[] args) {

            StringBuilder key0 = new StringBuilder("1001001");
            string key = key0.ToString();

            String str = "alma-mater";
            
            String s1  = vernam(str, key);
            String s2  = vernam(s1, key);

            Console.WriteLine(s1);
            Console.WriteLine(s2);

            Console.WriteLine(vernam(s1, key));
        }

        static string Eq(int n) => (1 + new String('0', n));

        public static String vernam(string s, String key) {
            
            int keyLength = key.Length;
            StringBuilder res = new StringBuilder();
            
            char[] charArray = s.ToCharArray();
            string[] strArray = new String[charArray.Length];

            var iterator = 0;
            foreach (var c in charArray) {
                strArray[iterator] += (Convert.ToString(c, 2));
                iterator++;
            }
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
            return res.ToString();
        }
    }
}