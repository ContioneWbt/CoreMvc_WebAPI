using Repository.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Domain
{
    [Table("Product")]
    public class Product : Entity
    {
        public Product()
        {
            this.UserName = string.Empty;
            this.Age =0;
            this.Height = string.Empty;
        }
        public string UserName { get; set; }
        public int Age { get; set; }
        public string Height{get;set;}
    }
}
