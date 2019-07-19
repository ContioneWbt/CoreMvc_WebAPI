using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using App.NotificationManger;
using H_Blog.Models.Music;
using Microsoft.AspNetCore.Mvc;
using Repository.Domain;
using Repository.Interface;

namespace H_Blog.Controllers
{
    public class HomeController : Controller
    {
        private IRepository<Notification> _Repository;
        private readonly NotificationManger _appNoticeManger;
        // GET: Home
        public ActionResult Index()
        {
            return View(_appNoticeManger.GetAllEntity());
        }

        [HttpGet]
        public JsonResult GetMusicList()
        {
            List<MusicModel> musiclist = new List<MusicModel>()
            {
                new MusicModel { title = "Wishing", url = "/APlayer/music/浪子康.mp3", pic = "/images/Absolutely.jpg", author = "水瀬いのり" },
                new MusicModel { title = "Stay Alive", url = "/APlayer/music/乌龟组合.mp3", pic = "/images/Absolutely.jpg", author = "高橋李依" },
                new MusicModel { title = "遇见", url = "http://music.163.com/song/media/outer/url?id=287035.mp3", pic = "http://y.gtimg.cn/music/photo_new/T002R300x300M000002ehzTm0TxXC2.jpg", author = "孙燕姿" }
            };
            //[new Random().Next(3)]
            return Json(musiclist);
        }

        public HomeController(IRepository<Notification> repository, NotificationManger app)
        {
            _Repository = repository;
            _appNoticeManger = app;
        }
    }
}