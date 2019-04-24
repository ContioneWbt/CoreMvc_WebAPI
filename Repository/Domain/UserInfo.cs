using Repository.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Domain
{
    [Table("UserInfo")]
    public partial class UserInfo : Entity
    {
        public UserInfo()
        {
            this.Name = string.Empty;
            this.AppSecret = string.Empty;
            this.Description = string.Empty;
            this.Icon = string.Empty;
            this.CreateTime = DateTime.Now;
            this.CreateUser = string.Empty;
        }
        public string Name { get; set; }
        public string AppSecret { get; set; }
        public string Description { get; set; }
        public string Icon { get; set; }
        public bool Disable { get; set; }
        public DateTime CreateTime { get; set; }
        public string CreateUser { get; set; }
    }
}
