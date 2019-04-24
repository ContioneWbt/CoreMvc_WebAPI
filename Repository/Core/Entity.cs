using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.Core
{
    public abstract class Entity
    {
        public Entity()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
       
    }
}
