using System;
using System.Collections.Generic;
using System.Text;
using Repository.Domain;
using Repository.Interface;

namespace App.Product
{
    public class ProductManger : BaseApp<UserInfo>
    {

        /// <summary>
        /// 执行添加操作
        /// </summary>
        /// <param name="user"></param>
        public void Add(UserInfo user)
        {
            if (string.IsNullOrEmpty(user.Id))
            {
                user.Id = Guid.NewGuid().ToString();
            }
            Repository.Add(user);
           
        }

        public ProductManger(IRepository<UserInfo> repository) : base(repository)
        {

        }
    }
}
