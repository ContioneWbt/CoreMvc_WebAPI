using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.Models
{
    public class NodelModel
    {
        public int id { get; set; }

        public int? pid { get; set; }

        public string title { get; set; }

        public string font { get; set; }

        public string url { get; set; }

        public string param { get; set; } = string.Empty;

        public string condition { get; set; }

        public bool spread { get; set; }

        public string icon { get; set; }

        public object children { get; set; }
    }
}
