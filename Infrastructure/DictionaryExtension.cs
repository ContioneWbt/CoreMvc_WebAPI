using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure
{
   public static class DictionaryExtension
    {
        public static bool StringEmpty(this Dictionary<string, string> dic, string key)
        {
            return dic.ContainsKey(key) && !string.IsNullOrEmpty(dic[key]);
        }

        public static bool IsNoContent<T>(this IEnumerable<T> enumerable)
        {
            return enumerable != null && enumerable.Any();
        }
    }
}
