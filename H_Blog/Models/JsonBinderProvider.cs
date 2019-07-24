using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.Models
{
    public class JsonBinderProvider: IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            if (context.Metadata.ModelType == typeof(JObject))
            {
                return new BinderTypeModelBinder(typeof(JobjectModelBinder));
            }

            return null;
        }
    }
    public class JobjectModelBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var obj = new JObject();
            //这个地方会报StringValues的异常，好奇怪，只能调试源码了
            var request = bindingContext.HttpContext.Request;
            foreach (var item in request.Form)
            {
                obj[item.Key] = item.Value[0];
            }

            bindingContext.Result = ModelBindingResult.Success(obj);
            return Task.CompletedTask;
        }
    }
}
