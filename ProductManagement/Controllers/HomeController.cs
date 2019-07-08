using System;
using System.Linq;
using App;
using App.Product;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ProductManagement.Models;
using Repository;
using Repository.Domain;
using Repository.Interface;

namespace ProductManagement.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        private ICate _payCate;

        private IRepository<UserInfo> _Repository;

        private readonly AppManger _app;

        private IRepository<UserNO> _UserNO;

        public HomeController(ICate payCate, IRepository<UserInfo> repository, IRepository<UserNO> userno, AppManger app)
        {
            _payCate = payCate;
            _Repository = repository;
            _UserNO = userno;
            _app = app;
        }

        public IActionResult Index()
        {
            _payCate.Show();

            #region 添加数据
            UserInfo user = new UserInfo()
            {
                AppSecret = "测试数据",
                Name = "测试",
                Description = "备注信息",
                Icon = "图标",
                CreateTime = DateTime.Now,
                CreateUser = "张三",
            };
            //_Repository.Add(user);
            var ll = _app;
            _app.Add(user);
            #endregion

            #region 查询数据
            var result = _Repository.FindAll();//Find(p => p.Description == "备注信息").ToList(); 
            #endregion

            return View();
        }

        public IActionResult Console()
        {
            return View();
        }

        public IActionResult Content_Add()
        {
            return View();
        }

        public IActionResult MenuCheck()
        {
            return View();
        }

        /// <summary>
        /// 绑定左侧菜单列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetTree()
        {
            var m = JsonConvert.SerializeObject(SpanningTree.CreateMenuTree());
            return Json(new { code = 1, msg = "success", data = SpanningTree.CreateMenuTree() });
        }

        public IActionResult Menuedit()
        {
            return View();
        }
    }
}
