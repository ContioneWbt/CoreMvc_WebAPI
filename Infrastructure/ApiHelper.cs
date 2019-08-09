using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;

namespace Infrastructure
{
    public static class ApiHelper
    {
        public static TResult Get<TParam, TResult>(string url, TParam param) where TParam : class
        {
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            PropertyInfo[] properties = typeof(TParam).GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                if (propertyInfo.GetValue(param) != null)
                {
                    dictionary.Add(propertyInfo.Name, propertyInfo.GetValue(param).ToString());
                }
                else
                {
                    dictionary.Add(propertyInfo.Name, "");
                }
            }
            return Get<TResult>(url, dictionary);
        }

        /// <summary>
        /// Get请求
        /// </summary>
        /// <typeparam name="T">返回值类型</typeparam>
        /// <param name="url">请求路径</param>
        /// <returns></returns>
        public static T Get<T>(string url, Dictionary<string, string> param = null)
        {
            T result3;
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    if (param != null)
                    {
                        url += "?";
                        foreach (KeyValuePair<string, string> item in param)
                        {
                            url = url + item.Key + "=" + item.Value + "&";
                        }
                        url = url.TrimEnd('&');
                    }
                    httpClient.BaseAddress = new Uri(url);
                    httpClient.DefaultRequestHeaders.Accept.Clear();
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage result = httpClient.GetAsync(httpClient.BaseAddress).Result;
                    string result2 = result.Content.ReadAsStringAsync().Result;
                    return JsonHelper.Instance.Deserialize<T>(result2);
                }
            }
            catch
            {
                result3 = default(T);
            }
            return result3;
        }

        /// <summary>
        /// post请求
        /// </summary>
        /// <typeparam name="TParam">参数类型</typeparam>
        /// <typeparam name="TResult">返回结果类型</typeparam>
        /// <param name="url">请求url</param>
        /// <param name="param">传递的参数</param>
        /// <returns></returns>
        public static TResult Post<TParam, TResult>(string url, TParam param) where TParam : class
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            PropertyInfo[] properties = typeof(TParam).GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                if (propertyInfo.GetValue(param) != null)
                {
                    dictionary.Add(propertyInfo.Name, propertyInfo.GetValue(param).ToString());
                }
                else
                {
                    dictionary.Add(propertyInfo.Name, "");
                }
            }
            return Post<TResult>(url, dictionary);
        }

        /// <summary>
        /// Post请求
        /// </summary>
        /// <typeparam name="TResult">返回结果类型</typeparam>
        /// <param name="url">请求url</param>
        /// <param name="param">参数</param>
        /// <returns></returns>
        public static TResult Post<TResult>(string url, Dictionary<string, object> param)
        {
            TResult result2;
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(url);
                    httpClient.DefaultRequestHeaders.Accept.Clear();
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    StringContent content = new StringContent(JsonHelper.Instance.Serialize(param));
                    HttpResponseMessage result = httpClient.PostAsync(httpClient.BaseAddress, content).Result;
                    return JsonHelper.Instance.Deserialize<TResult>(result.Content.ReadAsStringAsync().Result);
                }
            }
            catch (Exception)
            {
                result2 = default(TResult);
            }
            return result2;
        }
    }
}
