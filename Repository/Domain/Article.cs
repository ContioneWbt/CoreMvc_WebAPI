using Repository.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Repository.Domain
{

    [Table("Article")]
    public partial class Article : Entity
    {
        public Article()
        {
            this.Title = string.Empty;
            this.Img = string.Empty;
            this.Href = "/Article/SingletonPattern";
            this.Abstract = string.Empty;
            this.CreateTime = DateTime.Now;
            this.Title = string.Empty;
            this.Author = "Contione";
        }
        public string Title { get; set; }
        public string Img { get; set; }
        public string Href { get; set; }
        public string Abstract { get; set; }
        public int TitleType { get; set; }
        public DateTime CreateTime { get; set; }
        public string Author { get; set; }
        public int ArticleType { get; set; }
        public int ViewNumber { get; set; }
        public int CommentNumber { get; set; }
        public int Sort { get; set; }
    }
}