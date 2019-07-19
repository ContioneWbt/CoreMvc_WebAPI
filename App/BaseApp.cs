using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Repository.Core;
using Repository.Interface;

namespace App
{
    /// <summary>
    /// 业务层基类，UnitWork用于事务操作，Repository用于普通的数据库操作
    /// <para>如用户管理：Class UserManagerApp:BaseApp<User></para>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class BaseApp<T> where T : Entity
    {

        public BaseApp(IRepository<T> repository)
        {
            Repository = repository;
        }

        /// <summary>
        /// 用于普通的数据库操作
        /// </summary>
        /// <value>The repository.</value>
        protected IRepository<T> Repository;

        /// <summary>
        /// 按id批量删除
        /// </summary>
        /// <param name="ids"></param>
        public void Delete(string[] ids)
        {
            Repository.Delete(u => ids.Contains(u.Id));
        }

        public T Get(string id)
        {
            return Repository.FindSingle(u => u.Id == id);
        }
        public List<T> GetAllEntity()
        {
            return Repository.FindAll(o => !string.IsNullOrWhiteSpace(o.Id)).ToList();
        }
    }
}
