using Repository.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Domain
{
    [Table("UserNO")]
    public partial class UserNO : Entity
    {
        public UserNO()
        {
            this.Name = string.Empty;
            this.Pwd = string.Empty;
        }
        public string Name { get; set; }

        public string Pwd { get; set; }
    }
}
