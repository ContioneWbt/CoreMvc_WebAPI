using Autofac;
using Microsoft.Extensions.DependencyInjection;
using Autofac.Extensions.DependencyInjection;
using Repository;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using IContainer = Autofac.IContainer;
using System.Reflection;

namespace App
{
    public static class AutofacExt
    {
        private static IContainer _container;
        public static IContainer InitAutofac(IServiceCollection services)
        {
            var builder = new ContainerBuilder();
            services.AddScoped(typeof(ICate), typeof(PayCate));
            services.AddScoped(typeof(IUnitWork), typeof(UnitWork));
            services.AddScoped(typeof(IRepository<>), typeof(BaseRepository<>));
            //注册app层
            builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly());
            builder.Populate(services);
            _container = builder.Build();
            return _container;
        }
        /// <summary>
        /// 从容器中获取对象
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public static T GetFromFac<T>()
        {
            return _container.Resolve<T>();
        }
    }
}
