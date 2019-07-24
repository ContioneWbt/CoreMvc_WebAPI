using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.NotificationManger;
using Microsoft.AspNetCore.Mvc;
using Repository.Domain;

namespace H_Blog.Controllers
{
    public class ArticleController : Controller
    {
        // GET: Article
        public ActionResult Index()
        {
            return View(new Tuple<List<Notification>, List<Article>>
                (
                    _appNoticeManger.GetAllEntity(),
                    _articleManger.GetAllEntity().OrderBy(o => o.Sort).ToList())
                );
        }

        public ActionResult Regex_Artile()
        {

            return View();
        }
        public ActionResult ChainofResponsibility()
        {

            return View();
        }
        public ActionResult Check()
        {

            return View();
        }
        public ActionResult Proxy()
        {

            return View();
        }
        public ActionResult SingletonPattern()
        {

            return View();
        }

        #region IOC_DI

        private readonly ArticleManger _articleManger;
        private readonly NotificationManger _appNoticeManger;

        public ArticleController(NotificationManger app, ArticleManger articleManger)
        {
            _appNoticeManger = app;
            _articleManger = articleManger;
        }

        #endregion
    }
}