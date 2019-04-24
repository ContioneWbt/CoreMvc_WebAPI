layui.extend({
    larryms: "lib/larryms"
}).define(["jquery", "configure", "layer", "larryms"],
function (e) {
    "use strict";
    var s = layui.$,
    d = layui.configure,
    o = layui.layer,
    c = layui.device(),
    r = s(window),
    u = layui.larryms;
    var i = new Function;
    var a = {
        larryms: "lib/larryms",
        larryTab: "lib/larryTab",
        larryElem: "lib/larryElem",
        larryMenu: "lib/larryMenu",
        larryajax: "lib/larryajax",
        larryEditor: "lib/larryEditor",
        larryApi: "lib/larryApi",
        larryTree: "lib/larryTree",
        larrySecret: "lib/larrySecret",
        shuttle: "lib/shuttle",
        face: "lib/face",
        xss: "lib/xss",
        wangEditor: "lib/extend/we/wangEditor",
        echarts: "lib/extend/echarts",
        echartStyle: "lib/extend/echartStyle",
        md5: "lib/extend/md5",
        base64: "lib/extend/base64",
        fullPage: "lib/extend/fullPage",
        geetest: "lib/extend/geetest",
        classie: "lib/extend/classie",
        snapsvg: "lib/extend/svg/snapsvg",
        svgLoader: "lib/extend/svg/svgLoader",
        clipboard: "lib/extend/clipboard",
        swiper: "lib/extend/swiper/swiper",
        ckplayer: "lib/extend/ckplayer/ckplayer",
        countup: "lib/extend/countup",
        qrcode: "lib/extend/qrcode",
        flash: "lib/extend/video/flash",
        EvEmitter: "lib/extend/EvEmitter",
        imagesloaded: "lib/extend/imagesloaded",
        jqui: "lib/extend/jqueryui/jqui",
        ztree: "lib/extend/ztree/ztree",
        ztreeCheck: "lib/extend/ztree/ztreeCheck",
        ueconfig: "lib/extend/ueditor/ueconfig",
        neconfig: "lib/extend/neditor/neconfig",
        nebase: "lib/extend/neditor/nebase",
        ueditor: "lib/extend/ueditor/ueditor",
        neditor: "lib/extend/neditor/neditor",
        pdfobject: "lib/extend/pdfobject",
        fullpages: "lib/extend/fullpage/fullpages",
        cropper: "lib/extend/cropper",
        tinymce: "lib/extend/tinymce/tinymce",
        ckeditor: "lib/extend/ckeditor/ckeditor",
        watermark: "lib/extend/watermark",
        scrolla: "lib/extend/scrolla",
        Print: "lib/extend/Print",
        printJS: "lib/extend/printJS",
        Vue: "lib/Vue"
    };
    i.prototype.modules = function () {
        for (var e in a) {
            layui.modules[e] = a[e]
        }
    }();
    if (d.thirdExtend == true) {
        var l = d.basePath + d.thirdDir + "conf.json";
        s.ajaxSettings.async = false;
        s.getJSON(l,
        function (e) {
            for (var r in e) {
                layui.modules[r] = d.thirdDir + e[r]
            }
        });
        s.ajaxSettings.async = true
    }
    window.larrymsExtend = true;
    layui.cache.extendStyle = d.basePath + "lib/extendStyle/";
    var y = d.modules + d.modsname;
    if (d.uploadUrl) {
        layui.cache.neUploadUrl = d.uploadUrl
    } else {
        layui.cache.neUploadUrl = ""
    }
    if (d.upvideoUrl) {
        layui.cache.neVideoUrl = d.upvideoUrl
    } else {
        layui.cache.neVideoUrl = ""
    }
    function b() {
        var e = r.width();
        if (e >= 1200) {
            return 3
        } else if (e >= 992) {
            return 2
        } else if (e >= 768) {
            return 1
        } else {
            return 0
        }
    }
    i.prototype.init = function () {
        var e = this;
        u.debug = d.debug;
        if (d.browserCheck) {
            if (c.ie && c.ie < 8) {
                o.alert("本系统最低支持ie8，您当前使用的是古老的 IE" + c.ie + " \n 建议使用IE9及以上版本的现代浏览器", {
                    title: u.tit[0],
                    skin: "larry-debug",
                    icon: 2,
                    resize: false,
                    zIndex: o.zIndex,
                    anim: Math.ceil(Math.random() * 6)
                })
            }
            if (c.ie) {
                s("body").addClass("larryms-ie-hack")
            }
        }
        u.screen = b();
        if (d.fontSet) {
            if (d.font !== "larry-icon") {
                layui.link(layui.cache.base + "css/fonts/larry-icon.css")
            }
            u.fontset({
                font: d.font,
                url: d.fontUrl,
                online: d.fontSet
            })
        } else {
            layui.link(layui.cache.base + "css/fonts/larry-icon.css")
        }
        if (window.top === window.self) {
            layui.use(["larrySecret", "md5"],
            function () {
                var e = layui.larrySecret,
                r = layui.md5;
                var i = e.userKey;
                if (d.grantUser && d.grantKey) {
                    var a = u.grantCheck(d.grantUser, d.grantKey, i);
                    if (!a) {
                        console.log("您需要前往larryms.com官网获取产品授权,或检查授权参数是否正确配置");
                        return false
                    }
                } else {
                    console.log("请前往larryms.com官方获取授权密钥,或检查配置文件必填参数");
                    return false
                }
            })
        }
        if (layui.cache.page) {
            layui.cache.page = layui.cache.page.split(",");
            if (s.inArray("larry", layui.cache.page) === -1) {
                var r = {};
                for (var i = 0; i < layui.cache.page.length; i++) {
                    r[layui.cache.page[i]] = y + layui.cache.page[i]
                }
                layui.extend(r);
                layui.use(layui.cache.page)
            }
        }
        if (d.basecore !== "undefined") {
            var a = d.basecore.split(",");
            var l = {};
            for (var i = 0; i < a.length; i++) {
                l[a[i]] = d.modules + a[i]
            }
            layui.extend(l);
            layui.use(d.basecore)
        }
        if (d.modscore) {
            if (layui.cache.modscore == false) {
                return false
            }
            var t = d.corename.split(",");
            var n = {};
            for (var i = 0; i < t.length; i++) {
                n[t[i]] = y + t[i]
            }
            layui.extend(n);
            layui.use(d.corename)
        }
        if (d.animations) {
            layui.link(d.basePath + "lib/extendStyle/animatelib/animations.css")
        }
    }();
    window.onresize = function () {
        u.screen = b()
    };
    e("larry", {})
});