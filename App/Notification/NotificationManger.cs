using System;
using System.Collections.Generic;
using System.Text;
using Repository.Domain;
using Repository.Interface;

namespace App.NotificationManger
{
    public class NotificationManger : BaseApp<Notification>
    {

        /// <summary>
        /// 执行添加操作
        /// </summary>
        /// <param name="user"></param>
        public void Add(Notification user)
        {
            if (string.IsNullOrEmpty(user.Id))
            {
                user.Id = Guid.NewGuid().ToString();
            }
            Repository.Add(user);
        }

        public NotificationManger(IRepository<Notification> repository) : base(repository)
        {

        }
    }
}
