using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc;

namespace H_Blog.Controllers
{
    public class DribsController : Controller
    {
        // GET: Dribs
        public ActionResult Index()
        {
            return View();
        }
    }
}