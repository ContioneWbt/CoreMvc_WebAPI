using Microsoft.EntityFrameworkCore;
using Repository.Domain;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class ProductManageDBContext : DbContext
    {
        public ProductManageDBContext(DbContextOptions<ProductManageDBContext> options)
          : base(options)
        { }
        public virtual DbSet<UserInfo> UserInfo { get; set; }

        public virtual DbSet<UserNO> UserNO { get; set; }

        public virtual DbSet<Product> Products { get; set; }

        public virtual DbSet<Notification> Notification { get; set; }

        public virtual DbSet<Article> Article { get; set; }
        
    }
}
