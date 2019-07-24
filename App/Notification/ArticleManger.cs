using System;
using System.Collections.Generic;
using System.Text;
using Repository.Domain;
using Repository.Interface;

namespace App.NotificationManger
{
    public class ArticleManger : BaseApp<Article>
    {

        /// <summary>
        /// 执行添加操作
        /// </summary>
        /// <param name="user"></param>
        public void Add(Article article)
        {
            if (string.IsNullOrEmpty(article.Id))
            {
                article.Id = Guid.NewGuid().ToString();
            }
            Repository.Add(article);
        }

        public ArticleManger(IRepository<Article> repository) : base(repository)
        {

        }
    }
}