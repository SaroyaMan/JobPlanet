using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebData {
    public static class Utils {

        public static List<int> ConvertStringIdsToList(string stringOfIds) {
            return Array.ConvertAll((stringOfIds.Split(',')), s => int.Parse(s)).ToList();
        }

        public static string ConvertListIdsToString(List<int> ids) {
            return string.Join(",", ids);
        }

        public static string FormatFullName(string firstName, string lastName)
        {
            return string.Format("{0} {1}", firstName, lastName);
        }
    }
}
