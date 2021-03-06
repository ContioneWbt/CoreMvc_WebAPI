layui.define(["jquery", "larryms"],
function (t) {
    var a = layui.$,
    e = layui.larryms;
    var o = function () { };
    o.prototype.post = function () { };
    o.prototype.get = function () { };
    o.prototype.request = function () { };
    o.prototype.ajaxDebug = function () { };
    o.prototype.json = function (t, e, o, n) {
        var r = this,
        i = typeof e === "function";
        if (i) {
            n = o;
            o = e;
            e = {}
        }
        n = n || {};
        return a.ajax({
            type: n.type || "post",
            dataType: n.dataType || "json",
            data: e,
            url: t,
            success: function (t) {
                if (t.code == 200) {
                    o && o(t)
                } else if (t.code === 0) {
                    o && o(t)
                } else if (t.code === 808) {
                    r.setPhoneNotice()
                } else {
                    layer.msg(t.msg || t.code, {
                        shift: 6
                    });
                    n.error && n.error()
                }
            },
            error: function (t) {
                layer.msg("请求异常，请重试", {
                    shift: 6
                });
                n.error && n.error(t)
            }
        })
    };
    o.prototype.setPhoneNotice = function () {
        e.open({
            type: 1,
            id: "LAY_Notice_add",
            title: "手机号绑定通知",
            content: '<div class="layui-text" style="padding: 20px;">您需要绑定手机后，才可进行发帖/回帖等操作。</div>',
            btnAlign: "c",
            btn: ["立即绑定", "朕偏不绑！"],
            yes: function () {
                location.href = "/user/set.html"
            },
            btn2: function () {
                e.msg("少年，我看好你！")
            }
        })
    };
    var n = new o;
    t("larryajax", n)
});