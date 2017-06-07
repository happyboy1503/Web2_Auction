using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace webdaugia.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Header()
        {
            return PartialView();
        }

        public ActionResult Footer()
        {
            return PartialView();
        }
    }
}