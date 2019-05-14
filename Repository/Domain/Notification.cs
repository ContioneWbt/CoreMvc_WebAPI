using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Domain
{
    [Table("Notification")]
    public partial class Notification
    {
        public Notification()
        {
            this.Color = string.Empty;
            this.Title= string.Empty;
            this.IsOpen = false;
            this.Link = string.Empty;
        }

        /// <summary>
        /// 颜色
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// 提示内容
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// 是否开启通知
        /// </summary>
        public bool IsOpen { get; set; }
        
        /// <summary>
        /// 提示加链接
        /// </summary>
        public string Link { get; set; }
    }
}
