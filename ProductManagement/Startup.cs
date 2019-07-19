using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProductManagement.Models;
using Repository;

namespace ProductManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services .AddMvc(option =>
            {
                option.ModelBinderProviders.Insert(0, new JsonBinderProvider());

            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddMemoryCache()
                    .AddOptions()
                    .AddDbContext<ProductManageDBContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("ProductManageDBContext")));

            return new AutofacServiceProvider(AutofacExt.InitAutofac(services));
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseCookiePolicy();

            app.UseMvcWithDefaultRoute();
        }
    }
}
