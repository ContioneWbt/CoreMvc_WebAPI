using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace H_Blog.Controllers
{
    public class ArticleController : Controller
    {
        // GET: Article
        public ActionResult Index()
        {
            return View();
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
    }
}