using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductManagement.Models
{
    public static class SpanningTree
    {
        /// <summary>
        /// 获取菜单树结构
        /// </summary>
        /// <returns></returns>
        public static List<NodelModel> CreateMenuTree()
        {
            List<NodelModel> rootNodeList = new List<NodelModel>();

            foreach (var item in GetlistTree().Where(p => p.pid == 0))
            {

                NodelModel menuNode = new NodelModel()
                {
                    id = item.id,
                    pid = item.pid,
                    title = item.title,
                    font = item.font,
                    icon = item.icon,
                    url = item.url,
                    param = item.param,
                    condition = item.condition,
                };
                menuNode.children = CreateChildTree(GetlistTree(), menuNode);
                rootNodeList.Add(menuNode);
            }

            return rootNodeList;

        }

        /// <summary>
        /// 递归生成子树
        /// </summary>
        /// <param name="AllMenuList"></param>
        /// <param name="vmMenu"></param>
        /// <returns></returns>
        private static List<NodelModel> CreateChildTree(List<NodelModel> alllist, NodelModel menu)
        {
            int parentMenuID = menu.id;//根节点ID
            List<NodelModel> nodeList = new List<NodelModel>();
            var children = alllist.Where(t => t.pid == parentMenuID);
            foreach (var chl in children)
            {
                NodelModel node = new NodelModel()
                {
                    id = chl.id,
                    pid = chl.pid,
                    title = chl.title,
                    font = chl.font,
                    icon = chl.icon,
                    url = chl.url,
                    param = chl.param,
                    condition = chl.condition,
                };
                node.children = CreateChildTree(alllist, node);
                nodeList.Add(node);
            }
            return nodeList;
        }

        /// <summary>
        /// 菜单数据模拟
        /// </summary>
        /// <returns></returns>
        private static List<NodelModel> GetlistTree()
        {
            List<NodelModel> list = new List<NodelModel>()
            {
                new NodelModel() { id=1, pid=0, title="系统管理",font="larry-icon",icon="larry-xitong",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=30, pid=0, title="系统组件库",font="larry-icon",icon="larry-chanpinC",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=83, pid=0, title="UI场景特例",font="larry-icon",icon="larry-yemiankuangjia_o",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=160, pid=0, title="常用模板系列",font="larry-icon",icon="larry-changyongshili",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=2, pid=1, title="后台首页",font="larry-icon",icon="larry-qunfengzhuye",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=3, pid=1, title="文章管理",font="larry-icon",icon="larry-wenzhang",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=4, pid=1, title="发布文章",font="larry-icon",icon="larry-kongzhitaishouye",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=5, pid=1, title="权限管理",font="larry-icon",icon="larry-quanxianguanli1",url="/Home/Console", param="",condition="", spread=false, },
                new NodelModel() { id=6, pid=1, title="菜单管理",font="larry-icon",icon="larry-caidanguanli3",url="/Home/MenuCheck", param="",condition="", spread=false, },
                new NodelModel() { id=7, pid=1, title="登录页",font="larry-icon",icon="larry-denglu3",url="/Login/Index", param="",condition="", spread=false, },
            };
            return list;
        }
    }
}
