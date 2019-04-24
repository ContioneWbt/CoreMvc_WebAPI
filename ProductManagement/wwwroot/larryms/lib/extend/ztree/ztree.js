(function(t){"use strict";if(window.layui&&layui.define){layui.define(["jquery"],function(e){e("ztree",t(layui.$))})}else{t(jQuery)}})(function($){if(!window.larrymsExtend){return false}layui.link(layui.cache.extendStyle+"ztree/zTreeStyle/zTreeStyle.css");var settings={},roots={},caches={},_consts={className:{BUTTON:"button",LEVEL:"level",ICO_LOADING:"ico_loading",SWITCH:"switch",NAME:"node_name"},event:{NODECREATED:"ztree_nodeCreated",CLICK:"ztree_click",EXPAND:"ztree_expand",COLLAPSE:"ztree_collapse",ASYNC_SUCCESS:"ztree_async_success",ASYNC_ERROR:"ztree_async_error",REMOVE:"ztree_remove",SELECTED:"ztree_selected",UNSELECTED:"ztree_unselected"},id:{A:"_a",ICON:"_ico",SPAN:"_span",SWITCH:"_switch",UL:"_ul"},line:{ROOT:"root",ROOTS:"roots",CENTER:"center",BOTTOM:"bottom",NOLINE:"noline",LINE:"line"},folder:{OPEN:"open",CLOSE:"close",DOCU:"docu"},node:{CURSELECTED:"curSelectedNode"}},_setting={treeId:"",treeObj:null,view:{addDiyDom:null,autoCancelSelected:true,dblClickExpand:true,expandSpeed:"fast",fontCss:{},nameIsHTML:false,selectedMulti:true,showIcon:true,showLine:true,showTitle:true,txtSelectedEnable:false},data:{key:{isParent:"isParent",children:"children",name:"name",title:"",url:"url",icon:"icon"},simpleData:{enable:false,idKey:"id",pIdKey:"pId",rootPId:null},keep:{parent:false,leaf:false}},async:{enable:false,contentType:"application/x-www-form-urlencoded",type:"post",dataType:"text",url:"",autoParam:[],otherParam:[],dataFilter:null},callback:{beforeAsync:null,beforeClick:null,beforeDblClick:null,beforeRightClick:null,beforeMouseDown:null,beforeMouseUp:null,beforeExpand:null,beforeCollapse:null,beforeRemove:null,onAsyncError:null,onAsyncSuccess:null,onNodeCreated:null,onClick:null,onDblClick:null,onRightClick:null,onMouseDown:null,onMouseUp:null,onExpand:null,onCollapse:null,onRemove:null}},_initRoot=function(e){var t=data.getRoot(e);if(!t){t={};data.setRoot(e,t)}data.nodeChildren(e,t,[]);t.expandTriggerFlag=false;t.curSelectedList=[];t.noSelection=true;t.createdNodes=[];t.zId=0;t._ver=(new Date).getTime()},_initCache=function(e){var t=data.getCache(e);if(!t){t={};data.setCache(e,t)}t.nodes=[];t.doms=[]},_bindEvent=function(i){var e=i.treeObj,t=consts.event;e.bind(t.NODECREATED,function(e,t,n){tools.apply(i.callback.onNodeCreated,[e,t,n])});e.bind(t.CLICK,function(e,t,n,o,a){tools.apply(i.callback.onClick,[t,n,o,a])});e.bind(t.EXPAND,function(e,t,n){tools.apply(i.callback.onExpand,[e,t,n])});e.bind(t.COLLAPSE,function(e,t,n){tools.apply(i.callback.onCollapse,[e,t,n])});e.bind(t.ASYNC_SUCCESS,function(e,t,n,o){tools.apply(i.callback.onAsyncSuccess,[e,t,n,o])});e.bind(t.ASYNC_ERROR,function(e,t,n,o,a,r){tools.apply(i.callback.onAsyncError,[e,t,n,o,a,r])});e.bind(t.REMOVE,function(e,t,n){tools.apply(i.callback.onRemove,[e,t,n])});e.bind(t.SELECTED,function(e,t,n){tools.apply(i.callback.onSelected,[t,n])});e.bind(t.UNSELECTED,function(e,t,n){tools.apply(i.callback.onUnSelected,[t,n])})},_unbindEvent=function(e){var t=e.treeObj,n=consts.event;t.unbind(n.NODECREATED).unbind(n.CLICK).unbind(n.EXPAND).unbind(n.COLLAPSE).unbind(n.ASYNC_SUCCESS).unbind(n.ASYNC_ERROR).unbind(n.REMOVE).unbind(n.SELECTED).unbind(n.UNSELECTED)},_eventProxy=function(e){var t=e.target,n=data.getSetting(e.data.treeId),o="",a=null,r="",i="",s=null,l=null,d=null;if(tools.eqs(e.type,"mousedown")){i="mousedown"}else if(tools.eqs(e.type,"mouseup")){i="mouseup"}else if(tools.eqs(e.type,"contextmenu")){i="contextmenu"}else if(tools.eqs(e.type,"click")){if(tools.eqs(t.tagName,"span")&&t.getAttribute("treeNode"+consts.id.SWITCH)!==null){o=tools.getNodeMainDom(t).id;r="switchNode"}else{d=tools.getMDom(n,t,[{tagName:"a",attrName:"treeNode"+consts.id.A}]);if(d){o=tools.getNodeMainDom(d).id;r="clickNode"}}}else if(tools.eqs(e.type,"dblclick")){i="dblclick";d=tools.getMDom(n,t,[{tagName:"a",attrName:"treeNode"+consts.id.A}]);if(d){o=tools.getNodeMainDom(d).id;r="switchNode"}}if(i.length>0&&o.length==0){d=tools.getMDom(n,t,[{tagName:"a",attrName:"treeNode"+consts.id.A}]);if(d){o=tools.getNodeMainDom(d).id}}if(o.length>0){a=data.getNodeCache(n,o);switch(r){case"switchNode":var c=data.nodeIsParent(n,a);if(!c){r=""}else if(tools.eqs(e.type,"click")||tools.eqs(e.type,"dblclick")&&tools.apply(n.view.dblClickExpand,[n.treeId,a],n.view.dblClickExpand)){s=handler.onSwitchNode}else{r=""}break;case"clickNode":s=handler.onClickNode;break}}switch(i){case"mousedown":l=handler.onZTreeMousedown;break;case"mouseup":l=handler.onZTreeMouseup;break;case"dblclick":l=handler.onZTreeDblclick;break;case"contextmenu":l=handler.onZTreeContextmenu;break}var f={stop:false,node:a,nodeEventType:r,nodeEventCallback:s,treeEventType:i,treeEventCallback:l};return f},_initNode=function(e,t,n,o,a,r,i){if(!n)return;var s=data.getRoot(e),l=data.nodeChildren(e,n);n.level=t;n.tId=e.treeId+"_"+ ++s.zId;n.parentTId=o?o.tId:null;n.open=typeof n.open=="string"?tools.eqs(n.open,"true"):!!n.open;var d=data.nodeIsParent(e,n);if(tools.isArray(l)&&!(d===false||typeof d=="string"&&tools.eqs(d,"false"))){data.nodeIsParent(e,n,true);n.zAsync=true}else{d=data.nodeIsParent(e,n,d);n.open=d&&!e.async.enable?n.open:false;n.zAsync=!d}n.isFirstNode=a;n.isLastNode=r;n.getParentNode=function(){return data.getNodeCache(e,n.parentTId)};n.getPreNode=function(){return data.getPreNode(e,n)};n.getNextNode=function(){return data.getNextNode(e,n)};n.getIndex=function(){return data.getNodeIndex(e,n)};n.getPath=function(){return data.getNodePath(e,n)};n.isAjaxing=false;data.fixPIdKeyValue(e,n)},_init={bind:[_bindEvent],unbind:[_unbindEvent],caches:[_initCache],nodes:[_initNode],proxys:[_eventProxy],roots:[_initRoot],beforeA:[],afterA:[],innerBeforeA:[],innerAfterA:[],zTreeTools:[]},data={addNodeCache:function(e,t){data.getCache(e).nodes[data.getNodeCacheId(t.tId)]=t},getNodeCacheId:function(e){return e.substring(e.lastIndexOf("_")+1)},addAfterA:function(e){_init.afterA.push(e)},addBeforeA:function(e){_init.beforeA.push(e)},addInnerAfterA:function(e){_init.innerAfterA.push(e)},addInnerBeforeA:function(e){_init.innerBeforeA.push(e)},addInitBind:function(e){_init.bind.push(e)},addInitUnBind:function(e){_init.unbind.push(e)},addInitCache:function(e){_init.caches.push(e)},addInitNode:function(e){_init.nodes.push(e)},addInitProxy:function(e,t){if(!!t){_init.proxys.splice(0,0,e)}else{_init.proxys.push(e)}},addInitRoot:function(e){_init.roots.push(e)},addNodesData:function(e,t,n,o){var a=data.nodeChildren(e,t),r;if(!a){a=data.nodeChildren(e,t,[]);n=-1}else if(n>=a.length){n=-1}if(a.length>0&&n===0){a[0].isFirstNode=false;view.setNodeLineIcos(e,a[0])}else if(a.length>0&&n<0){a[a.length-1].isLastNode=false;view.setNodeLineIcos(e,a[a.length-1])}data.nodeIsParent(e,t,true);if(n<0){data.nodeChildren(e,t,a.concat(o))}else{r=[n,0].concat(o);a.splice.apply(a,r)}},addSelectedNode:function(e,t){var n=data.getRoot(e);if(!data.isSelectedNode(e,t)){n.curSelectedList.push(t)}},addCreatedNode:function(e,t){if(!!e.callback.onNodeCreated||!!e.view.addDiyDom){var n=data.getRoot(e);n.createdNodes.push(t)}},addZTreeTools:function(e){_init.zTreeTools.push(e)},exSetting:function(e){$.extend(true,_setting,e)},fixPIdKeyValue:function(e,t){if(e.data.simpleData.enable){t[e.data.simpleData.pIdKey]=t.parentTId?t.getParentNode()[e.data.simpleData.idKey]:e.data.simpleData.rootPId}},getAfterA:function(e,t,n){for(var o=0,a=_init.afterA.length;o<a;o++){_init.afterA[o].apply(this,arguments)}},getBeforeA:function(e,t,n){for(var o=0,a=_init.beforeA.length;o<a;o++){_init.beforeA[o].apply(this,arguments)}},getInnerAfterA:function(e,t,n){for(var o=0,a=_init.innerAfterA.length;o<a;o++){_init.innerAfterA[o].apply(this,arguments)}},getInnerBeforeA:function(e,t,n){for(var o=0,a=_init.innerBeforeA.length;o<a;o++){_init.innerBeforeA[o].apply(this,arguments)}},getCache:function(e){return caches[e.treeId]},getNodeIndex:function(e,t){if(!t)return null;var n=t.parentTId?t.getParentNode():data.getRoot(e),o=data.nodeChildren(e,n);for(var a=0,r=o.length-1;a<=r;a++){if(o[a]===t){return a}}return-1},getNextNode:function(e,t){if(!t)return null;var n=t.parentTId?t.getParentNode():data.getRoot(e),o=data.nodeChildren(e,n);for(var a=0,r=o.length-1;a<=r;a++){if(o[a]===t){return a==r?null:o[a+1]}}return null},getNodeByParam:function(e,t,n,o){if(!t||!n)return null;for(var a=0,r=t.length;a<r;a++){var i=t[a];if(i[n]==o){return t[a]}var s=data.nodeChildren(e,i);var l=data.getNodeByParam(e,s,n,o);if(l)return l}return null},getNodeCache:function(e,t){if(!t)return null;var n=caches[e.treeId].nodes[data.getNodeCacheId(t)];return n?n:null},getNodePath:function(e,t){if(!t)return null;var n;if(t.parentTId){n=t.getParentNode().getPath()}else{n=[]}if(n){n.push(t)}return n},getNodes:function(e){return data.nodeChildren(e,data.getRoot(e))},getNodesByParam:function(e,t,n,o){if(!t||!n)return[];var a=[];for(var r=0,i=t.length;r<i;r++){var s=t[r];if(s[n]==o){a.push(s)}var l=data.nodeChildren(e,s);a=a.concat(data.getNodesByParam(e,l,n,o))}return a},getNodesByParamFuzzy:function(e,t,n,o){if(!t||!n)return[];var a=[];o=o.toLowerCase();for(var r=0,i=t.length;r<i;r++){var s=t[r];if(typeof s[n]=="string"&&t[r][n].toLowerCase().indexOf(o)>-1){a.push(s)}var l=data.nodeChildren(e,s);a=a.concat(data.getNodesByParamFuzzy(e,l,n,o))}return a},getNodesByFilter:function(e,t,n,o,a){if(!t)return o?null:[];var r=o?null:[];for(var i=0,s=t.length;i<s;i++){var l=t[i];if(tools.apply(n,[l,a],false)){if(o){return l}r.push(l)}var d=data.nodeChildren(e,l);var c=data.getNodesByFilter(e,d,n,o,a);if(o&&!!c){return c}r=o?c:r.concat(c)}return r},getPreNode:function(e,t){if(!t)return null;var n=t.parentTId?t.getParentNode():data.getRoot(e),o=data.nodeChildren(e,n);for(var a=0,r=o.length;a<r;a++){if(o[a]===t){return a==0?null:o[a-1]}}return null},getRoot:function(e){return e?roots[e.treeId]:null},getRoots:function(){return roots},getSetting:function(e){return settings[e]},getSettings:function(){return settings},getZTreeTools:function(e){var t=this.getRoot(this.getSetting(e));return t?t.treeTools:null},initCache:function(e){for(var t=0,n=_init.caches.length;t<n;t++){_init.caches[t].apply(this,arguments)}},initNode:function(e,t,n,o,a,r){for(var i=0,s=_init.nodes.length;i<s;i++){_init.nodes[i].apply(this,arguments)}},initRoot:function(e){for(var t=0,n=_init.roots.length;t<n;t++){_init.roots[t].apply(this,arguments)}},isSelectedNode:function(e,t){var n=data.getRoot(e);for(var o=0,a=n.curSelectedList.length;o<a;o++){if(t===n.curSelectedList[o])return true}return false},nodeChildren:function(e,t,n){if(!t){return null}var o=e.data.key.children;if(typeof n!=="undefined"){t[o]=n}return t[o]},nodeIsParent:function(e,t,n){if(!t){return false}var o=e.data.key.isParent;if(typeof n!=="undefined"){if(typeof n==="string"){n=tools.eqs(n,"true")}n=!!n;t[o]=n}return t[o]},nodeName:function(e,t,n){var o=e.data.key.name;if(typeof n!=="undefined"){t[o]=n}return""+t[o]},nodeTitle:function(e,t){var n=e.data.key.title===""?e.data.key.name:e.data.key.title;return""+t[n]},removeNodeCache:function(e,t){var n=data.nodeChildren(e,t);if(n){for(var o=0,a=n.length;o<a;o++){data.removeNodeCache(e,n[o])}}data.getCache(e).nodes[data.getNodeCacheId(t.tId)]=null},removeSelectedNode:function(e,t){var n=data.getRoot(e);for(var o=0,a=n.curSelectedList.length;o<a;o++){if(t===n.curSelectedList[o]||!data.getNodeCache(e,n.curSelectedList[o].tId)){n.curSelectedList.splice(o,1);e.treeObj.trigger(consts.event.UNSELECTED,[e.treeId,t]);o--;a--}}},setCache:function(e,t){caches[e.treeId]=t},setRoot:function(e,t){roots[e.treeId]=t},setZTreeTools:function(e,t){for(var n=0,o=_init.zTreeTools.length;n<o;n++){_init.zTreeTools[n].apply(this,arguments)}},transformToArrayFormat:function(n,e){if(!e)return[];var o=[];if(tools.isArray(e)){for(var t=0,a=e.length;t<a;t++){var r=e[t];i(r)}}else{i(e)}return o;function i(e){o.push(e);var t=data.nodeChildren(n,e);if(t){o=o.concat(data.transformToArrayFormat(n,t))}}},transformTozTreeFormat:function(e,t){var n,o,a=e.data.simpleData.idKey,r=e.data.simpleData.pIdKey;if(!a||a==""||!t)return[];if(tools.isArray(t)){var i=[];var s={};for(n=0,o=t.length;n<o;n++){s[t[n][a]]=t[n]}for(n=0,o=t.length;n<o;n++){var l=s[t[n][r]];if(l&&t[n][a]!=t[n][r]){var d=data.nodeChildren(e,l);if(!d){d=data.nodeChildren(e,l,[])}d.push(t[n])}else{i.push(t[n])}}return i}else{return[t]}}},event={bindEvent:function(e){for(var t=0,n=_init.bind.length;t<n;t++){_init.bind[t].apply(this,arguments)}},unbindEvent:function(e){for(var t=0,n=_init.unbind.length;t<n;t++){_init.unbind[t].apply(this,arguments)}},bindTree:function(e){var t={treeId:e.treeId},n=e.treeObj;if(!e.view.txtSelectedEnable){n.bind("selectstart",handler.onSelectStart).css({"-moz-user-select":"-moz-none"})}n.bind("click",t,event.proxy);n.bind("dblclick",t,event.proxy);n.bind("mouseover",t,event.proxy);n.bind("mouseout",t,event.proxy);n.bind("mousedown",t,event.proxy);n.bind("mouseup",t,event.proxy);n.bind("contextmenu",t,event.proxy)},unbindTree:function(e){var t=e.treeObj;t.unbind("selectstart",handler.onSelectStart).unbind("click",event.proxy).unbind("dblclick",event.proxy).unbind("mouseover",event.proxy).unbind("mouseout",event.proxy).unbind("mousedown",event.proxy).unbind("mouseup",event.proxy).unbind("contextmenu",event.proxy)},doProxy:function(e){var t=[];for(var n=0,o=_init.proxys.length;n<o;n++){var a=_init.proxys[n].apply(this,arguments);t.push(a);if(a.stop){break}}return t},proxy:function(e){var t=data.getSetting(e.data.treeId);if(!tools.uCanDo(t,e))return true;var n=event.doProxy(e),o=true,a=false;for(var r=0,i=n.length;r<i;r++){var s=n[r];if(s.nodeEventCallback){a=true;o=s.nodeEventCallback.apply(s,[e,s.node])&&o}if(s.treeEventCallback){a=true;o=s.treeEventCallback.apply(s,[e,s.node])&&o}}return o}},handler={onSwitchNode:function(e,t){var n=data.getSetting(e.data.treeId);if(t.open){if(tools.apply(n.callback.beforeCollapse,[n.treeId,t],true)==false)return true;data.getRoot(n).expandTriggerFlag=true;view.switchNode(n,t)}else{if(tools.apply(n.callback.beforeExpand,[n.treeId,t],true)==false)return true;data.getRoot(n).expandTriggerFlag=true;view.switchNode(n,t)}return true},onClickNode:function(e,t){var n=data.getSetting(e.data.treeId),o=n.view.autoCancelSelected&&(e.ctrlKey||e.metaKey)&&data.isSelectedNode(n,t)?0:n.view.autoCancelSelected&&(e.ctrlKey||e.metaKey)&&n.view.selectedMulti?2:1;if(tools.apply(n.callback.beforeClick,[n.treeId,t,o],true)==false)return true;if(o===0){view.cancelPreSelectedNode(n,t)}else{view.selectNode(n,t,o===2)}n.treeObj.trigger(consts.event.CLICK,[e,n.treeId,t,o]);return true},onZTreeMousedown:function(e,t){var n=data.getSetting(e.data.treeId);if(tools.apply(n.callback.beforeMouseDown,[n.treeId,t],true)){tools.apply(n.callback.onMouseDown,[e,n.treeId,t])}return true},onZTreeMouseup:function(e,t){var n=data.getSetting(e.data.treeId);if(tools.apply(n.callback.beforeMouseUp,[n.treeId,t],true)){tools.apply(n.callback.onMouseUp,[e,n.treeId,t])}return true},onZTreeDblclick:function(e,t){var n=data.getSetting(e.data.treeId);if(tools.apply(n.callback.beforeDblClick,[n.treeId,t],true)){tools.apply(n.callback.onDblClick,[e,n.treeId,t])}return true},onZTreeContextmenu:function(e,t){var n=data.getSetting(e.data.treeId);if(tools.apply(n.callback.beforeRightClick,[n.treeId,t],true)){tools.apply(n.callback.onRightClick,[e,n.treeId,t])}return typeof n.callback.onRightClick!="function"},onSelectStart:function(e){var t=e.originalEvent.srcElement.nodeName.toLowerCase();return t==="input"||t==="textarea"}},tools={apply:function(e,t,n){if(typeof e=="function"){return e.apply(zt,t?t:[])}return n},canAsync:function(e,t){var n=data.nodeChildren(e,t);var o=data.nodeIsParent(e,t);return e.async.enable&&t&&o&&!(t.zAsync||n&&n.length>0)},clone:function(e){if(e===null)return null;var t=tools.isArray(e)?[]:{};for(var n in e){t[n]=e[n]instanceof Date?new Date(e[n].getTime()):typeof e[n]==="object"?tools.clone(e[n]):e[n]}return t},eqs:function(e,t){return e.toLowerCase()===t.toLowerCase()},isArray:function(e){return Object.prototype.toString.apply(e)==="[object Array]"},isElement:function(e){return typeof HTMLElement==="object"?e instanceof HTMLElement:e&&typeof e==="object"&&e!==null&&e.nodeType===1&&typeof e.nodeName==="string"},$:function(e,t,n){if(!!t&&typeof t!="string"){n=t;t=""}if(typeof e=="string"){return $(e,n?n.treeObj.get(0).ownerDocument:null)}else{return $("#"+e.tId+t,n?n.treeObj:null)}},getMDom:function(e,t,n){if(!t)return null;while(t&&t.id!==e.treeId){for(var o=0,a=n.length;t.tagName&&o<a;o++){if(tools.eqs(t.tagName,n[o].tagName)&&t.getAttribute(n[o].attrName)!==null){return t}}t=t.parentNode}return null},getNodeMainDom:function(e){return $(e).parent("li").get(0)||$(e).parentsUntil("li").parent().get(0)},isChildOrSelf:function(e,t){return $(e).closest("#"+t).length>0},uCanDo:function(e,t){return true}},view={addNodes:function(e,t,n,o,a){var r=data.nodeIsParent(e,t);if(e.data.keep.leaf&&t&&!r){return}if(!tools.isArray(o)){o=[o]}if(e.data.simpleData.enable){o=data.transformTozTreeFormat(e,o)}if(t){var i=$$(t,consts.id.SWITCH,e),s=$$(t,consts.id.ICON,e),l=$$(t,consts.id.UL,e);if(!t.open){view.replaceSwitchClass(t,i,consts.folder.CLOSE);view.replaceIcoClass(t,s,consts.folder.CLOSE);t.open=false;l.css({display:"none"})}data.addNodesData(e,t,n,o);view.createNodes(e,t.level+1,o,t,n);if(!a){view.expandCollapseParentNode(e,t,true)}}else{data.addNodesData(e,data.getRoot(e),n,o);view.createNodes(e,0,o,null,n)}},appendNodes:function(e,t,n,o,a,r,i){if(!n)return[];var s=[];var l=o?o:data.getRoot(e),d=data.nodeChildren(e,l),c,f;if(!d||a>=d.length-n.length){a=-1}for(var u=0,p=n.length;u<p;u++){var v=n[u];if(r){c=(a===0||d.length==n.length)&&u==0;f=a<0&&u==n.length-1;data.initNode(e,t,v,o,c,f,i);data.addNodeCache(e,v)}var g=data.nodeIsParent(e,v);var N=[];var h=data.nodeChildren(e,v);if(h&&h.length>0){N=view.appendNodes(e,t+1,h,v,-1,r,i&&v.open)}if(i){view.makeDOMNodeMainBefore(s,e,v);view.makeDOMNodeLine(s,e,v);data.getBeforeA(e,v,s);view.makeDOMNodeNameBefore(s,e,v);data.getInnerBeforeA(e,v,s);view.makeDOMNodeIcon(s,e,v);data.getInnerAfterA(e,v,s);view.makeDOMNodeNameAfter(s,e,v);data.getAfterA(e,v,s);if(g&&v.open){view.makeUlHtml(e,v,s,N.join(""))}view.makeDOMNodeMainAfter(s,e,v);data.addCreatedNode(e,v)}}return s},appendParentULDom:function(e,t){var n=[],o=$$(t,e);if(!o.get(0)&&!!t.parentTId){view.appendParentULDom(e,t.getParentNode());o=$$(t,e)}var a=$$(t,consts.id.UL,e);if(a.get(0)){a.remove()}var r=data.nodeChildren(e,t),i=view.appendNodes(e,t.level+1,r,t,-1,false,true);view.makeUlHtml(e,t,n,i.join(""));o.append(n.join(""))},asyncNode:function(setting,node,isSilent,callback){var i,l;var isParent=data.nodeIsParent(setting,node);if(node&&!isParent){tools.apply(callback);return false}else if(node&&node.isAjaxing){return false}else if(tools.apply(setting.callback.beforeAsync,[setting.treeId,node],true)==false){tools.apply(callback);return false}if(node){node.isAjaxing=true;var icoObj=$$(node,consts.id.ICON,setting);icoObj.attr({style:"",class:consts.className.BUTTON+" "+consts.className.ICO_LOADING})}var tmpParam={};var autoParam=tools.apply(setting.async.autoParam,[setting.treeId,node],setting.async.autoParam);for(i=0,l=autoParam.length;node&&i<l;i++){var pKey=autoParam[i].split("="),spKey=pKey;if(pKey.length>1){spKey=pKey[1];pKey=pKey[0]}tmpParam[spKey]=node[pKey]}var otherParam=tools.apply(setting.async.otherParam,[setting.treeId,node],setting.async.otherParam);if(tools.isArray(otherParam)){for(i=0,l=otherParam.length;i<l;i+=2){tmpParam[otherParam[i]]=otherParam[i+1]}}else{for(var p in otherParam){tmpParam[p]=otherParam[p]}}var _tmpV=data.getRoot(setting)._ver;$.ajax({contentType:setting.async.contentType,cache:false,type:setting.async.type,url:tools.apply(setting.async.url,[setting.treeId,node],setting.async.url),data:setting.async.contentType.indexOf("application/json")>-1?JSON.stringify(tmpParam):tmpParam,dataType:setting.async.dataType,success:function(msg){if(_tmpV!=data.getRoot(setting)._ver){return}var newNodes=[];try{if(!msg||msg.length==0){newNodes=[]}else if(typeof msg=="string"){newNodes=eval("("+msg+")")}else{newNodes=msg}}catch(e){newNodes=msg}if(node){node.isAjaxing=null;node.zAsync=true}view.setNodeLineIcos(setting,node);if(newNodes&&newNodes!==""){newNodes=tools.apply(setting.async.dataFilter,[setting.treeId,node,newNodes],newNodes);view.addNodes(setting,node,-1,!!newNodes?tools.clone(newNodes):[],!!isSilent)}else{view.addNodes(setting,node,-1,[],!!isSilent)}setting.treeObj.trigger(consts.event.ASYNC_SUCCESS,[setting.treeId,node,msg]);tools.apply(callback)},error:function(e,t,n){if(_tmpV!=data.getRoot(setting)._ver){return}if(node)node.isAjaxing=null;view.setNodeLineIcos(setting,node);setting.treeObj.trigger(consts.event.ASYNC_ERROR,[setting.treeId,node,e,t,n])}});return true},cancelPreSelectedNode:function(e,t,n){var o=data.getRoot(e).curSelectedList,a,r;for(a=o.length-1;a>=0;a--){r=o[a];if(t===r||!t&&(!n||n!==r)){$$(r,consts.id.A,e).removeClass(consts.node.CURSELECTED);if(t){data.removeSelectedNode(e,t);break}else{o.splice(a,1);e.treeObj.trigger(consts.event.UNSELECTED,[e.treeId,r])}}}},createNodeCallback:function(e){if(!!e.callback.onNodeCreated||!!e.view.addDiyDom){var t=data.getRoot(e);while(t.createdNodes.length>0){var n=t.createdNodes.shift();tools.apply(e.view.addDiyDom,[e.treeId,n]);if(!!e.callback.onNodeCreated){e.treeObj.trigger(consts.event.NODECREATED,[e.treeId,n])}}}},createNodes:function(e,t,n,o,a){if(!n||n.length==0)return;var r=data.getRoot(e),i=!o||o.open||!!$$(data.nodeChildren(e,o)[0],e).get(0);r.createdNodes=[];var s=view.appendNodes(e,t,n,o,a,true,i),l,d;if(!o){l=e.treeObj}else{var c=$$(o,consts.id.UL,e);if(c.get(0)){l=c}}if(l){if(a>=0){d=l.children()[a]}if(a>=0&&d){$(d).before(s.join(""))}else{l.append(s.join(""))}}view.createNodeCallback(e)},destroy:function(e){if(!e)return;data.initCache(e);data.initRoot(e);event.unbindTree(e);event.unbindEvent(e);e.treeObj.empty();delete settings[e.treeId]},expandCollapseNode:function(e,t,n,o,a){var r=data.getRoot(e);var i,s;if(!t){tools.apply(a,[]);return}var l=data.nodeChildren(e,t);var d=data.nodeIsParent(e,t);if(r.expandTriggerFlag){s=a;i=function(){if(s)s();if(t.open){e.treeObj.trigger(consts.event.EXPAND,[e.treeId,t])}else{e.treeObj.trigger(consts.event.COLLAPSE,[e.treeId,t])}};a=i;r.expandTriggerFlag=false}if(!t.open&&d&&(!$$(t,consts.id.UL,e).get(0)||l&&l.length>0&&!$$(l[0],e).get(0))){view.appendParentULDom(e,t);view.createNodeCallback(e)}if(t.open==n){tools.apply(a,[]);return}var c=$$(t,consts.id.UL,e),f=$$(t,consts.id.SWITCH,e),u=$$(t,consts.id.ICON,e);if(d){t.open=!t.open;if(t.iconOpen&&t.iconClose){u.attr("style",view.makeNodeIcoStyle(e,t))}if(t.open){view.replaceSwitchClass(t,f,consts.folder.OPEN);view.replaceIcoClass(t,u,consts.folder.OPEN);if(o==false||e.view.expandSpeed==""){c.show();tools.apply(a,[])}else{if(l&&l.length>0){c.slideDown(e.view.expandSpeed,a)}else{c.show();tools.apply(a,[])}}}else{view.replaceSwitchClass(t,f,consts.folder.CLOSE);view.replaceIcoClass(t,u,consts.folder.CLOSE);if(o==false||e.view.expandSpeed==""||!(l&&l.length>0)){c.hide();tools.apply(a,[])}else{c.slideUp(e.view.expandSpeed,a)}}}else{tools.apply(a,[])}},expandCollapseParentNode:function(e,t,n,o,a){if(!t)return;if(!t.parentTId){view.expandCollapseNode(e,t,n,o,a);return}else{view.expandCollapseNode(e,t,n,o)}if(t.parentTId){view.expandCollapseParentNode(e,t.getParentNode(),n,o,a)}},expandCollapseSonNode:function(e,t,n,o,a){var r=data.getRoot(e),i=t?data.nodeChildren(e,t):data.nodeChildren(e,r),s=t?false:o,l=data.getRoot(e).expandTriggerFlag;data.getRoot(e).expandTriggerFlag=false;if(i){for(var d=0,c=i.length;d<c;d++){if(i[d])view.expandCollapseSonNode(e,i[d],n,s)}}data.getRoot(e).expandTriggerFlag=l;view.expandCollapseNode(e,t,n,o,a)},isSelectedNode:function(e,t){if(!t){return false}var n=data.getRoot(e).curSelectedList,o;for(o=n.length-1;o>=0;o--){if(t===n[o]){return true}}return false},makeDOMNodeIcon:function(e,t,n){var o=data.nodeName(t,n),a=t.view.nameIsHTML?o:o.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");e.push("<span id='",n.tId,consts.id.ICON,"' title='' treeNode",consts.id.ICON," class='",view.makeNodeIcoClass(t,n),"' style='",view.makeNodeIcoStyle(t,n),"'></span><span id='",n.tId,consts.id.SPAN,"' class='",consts.className.NAME,"'>",a,"</span>")},makeDOMNodeLine:function(e,t,n){e.push("<span id='",n.tId,consts.id.SWITCH,"' title='' class='",view.makeNodeLineClass(t,n),"' treeNode",consts.id.SWITCH,"></span>")},makeDOMNodeMainAfter:function(e,t,n){e.push("</li>")},makeDOMNodeMainBefore:function(e,t,n){e.push("<li id='",n.tId,"' class='",consts.className.LEVEL,n.level,"' tabindex='0' hidefocus='true' treenode>")},makeDOMNodeNameAfter:function(e,t,n){e.push("</a>")},makeDOMNodeNameBefore:function(e,t,n){var o=data.nodeTitle(t,n),a=view.makeNodeUrl(t,n),r=view.makeNodeFontCss(t,n),i=[];for(var s in r){i.push(s,":",r[s],";")}e.push("<a id='",n.tId,consts.id.A,"' class='",consts.className.LEVEL,n.level,"' treeNode",consts.id.A,' onclick="',n.click||"",'" ',a!=null&&a.length>0?"href='"+a+"'":""," target='",view.makeNodeTarget(n),"' style='",i.join(""),"'");if(tools.apply(t.view.showTitle,[t.treeId,n],t.view.showTitle)&&o){e.push("title='",o.replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),"'")}e.push(">")},makeNodeFontCss:function(e,t){var n=tools.apply(e.view.fontCss,[e.treeId,t],e.view.fontCss);return n&&typeof n!="function"?n:{}},makeNodeIcoClass:function(e,t){var n=["ico"];if(!t.isAjaxing){var o=data.nodeIsParent(e,t);n[0]=(t.iconSkin?t.iconSkin+"_":"")+n[0];if(o){n.push(t.open?consts.folder.OPEN:consts.folder.CLOSE)}else{n.push(consts.folder.DOCU)}}return consts.className.BUTTON+" "+n.join("_")},makeNodeIcoStyle:function(e,t){var n=[];if(!t.isAjaxing){var o=data.nodeIsParent(e,t);var a=o&&t.iconOpen&&t.iconClose?t.open?t.iconOpen:t.iconClose:t[e.data.key.icon];if(a)n.push("background:url(",a,") 0 0 no-repeat;");if(e.view.showIcon==false||!tools.apply(e.view.showIcon,[e.treeId,t],true)){n.push("width:0px;height:0px;")}}return n.join("")},makeNodeLineClass:function(e,t){var n=[];if(e.view.showLine){if(t.level==0&&t.isFirstNode&&t.isLastNode){n.push(consts.line.ROOT)}else if(t.level==0&&t.isFirstNode){n.push(consts.line.ROOTS)}else if(t.isLastNode){n.push(consts.line.BOTTOM)}else{n.push(consts.line.CENTER)}}else{n.push(consts.line.NOLINE)}if(data.nodeIsParent(e,t)){n.push(t.open?consts.folder.OPEN:consts.folder.CLOSE)}else{n.push(consts.folder.DOCU)}return view.makeNodeLineClassEx(t)+n.join("_")},makeNodeLineClassEx:function(e){return consts.className.BUTTON+" "+consts.className.LEVEL+e.level+" "+consts.className.SWITCH+" "},makeNodeTarget:function(e){return e.target||"_blank"},makeNodeUrl:function(e,t){var n=e.data.key.url;return t[n]?t[n]:null},makeUlHtml:function(e,t,n,o){n.push("<ul id='",t.tId,consts.id.UL,"' class='",consts.className.LEVEL,t.level," ",view.makeUlLineClass(e,t),"' style='display:",t.open?"block":"none","'>");n.push(o);n.push("</ul>")},makeUlLineClass:function(e,t){return e.view.showLine&&!t.isLastNode?consts.line.LINE:""},removeChildNodes:function(e,t){if(!t)return;var n=data.nodeChildren(e,t);if(!n)return;for(var o=0,a=n.length;o<a;o++){data.removeNodeCache(e,n[o])}data.removeSelectedNode(e);delete t[e.data.key.children];if(!e.data.keep.parent){data.nodeIsParent(e,t,false);t.open=false;var r=$$(t,consts.id.SWITCH,e),i=$$(t,consts.id.ICON,e);view.replaceSwitchClass(t,r,consts.folder.DOCU);view.replaceIcoClass(t,i,consts.folder.DOCU);$$(t,consts.id.UL,e).remove()}else{$$(t,consts.id.UL,e).empty()}},scrollIntoView:function(e,t){if(!t){return}if(typeof Element==="undefined"){var n=e.treeObj.get(0).getBoundingClientRect(),o=t.getBoundingClientRect();if(o.top<n.top||o.bottom>n.bottom||o.right>n.right||o.left<n.left){t.scrollIntoView()}return}if(!Element.prototype.scrollIntoViewIfNeeded){Element.prototype.scrollIntoViewIfNeeded=function(a){function e(e,t,n,o){if(false===a||n<=e+o&&e<=t+o){return Math.min(n,Math.max(t,e))}else{return(t+n)/2}}function l(a,r,i,s){return{left:a,top:r,width:i,height:s,right:a+i,bottom:r+s,translate:function(e,t){return l(e+a,t+r,i,s)},relativeFromTo:function(e,t){var n=a,o=r;e=e.offsetParent;t=t.offsetParent;if(e===t){return d}for(;e;e=e.offsetParent){n+=e.offsetLeft+e.clientLeft;o+=e.offsetTop+e.clientTop}for(;t;t=t.offsetParent){n-=t.offsetLeft+t.clientLeft;o-=t.offsetTop+t.clientTop}return l(n,o,i,s)}}}var t,n=this,d=l(this.offsetLeft,this.offsetTop,this.offsetWidth,this.offsetHeight);while(tools.isElement(t=n.parentNode)){var o=t.offsetLeft+t.clientLeft;var r=t.offsetTop+t.clientTop;d=d.relativeFromTo(n,t).translate(-o,-r);t.scrollLeft=e(t.scrollLeft,d.right-t.clientWidth,d.left,t.clientWidth);t.scrollTop=e(t.scrollTop,d.bottom-t.clientHeight,d.top,t.clientHeight);d=d.translate(o-t.scrollLeft,r-t.scrollTop);n=t}}}t.scrollIntoViewIfNeeded()},setFirstNode:function(e,t){var n=data.nodeChildren(e,t);if(n.length>0){n[0].isFirstNode=true}},setLastNode:function(e,t){var n=data.nodeChildren(e,t);if(n.length>0){n[n.length-1].isLastNode=true}},removeNode:function(e,t){var n=data.getRoot(e),o=t.parentTId?t.getParentNode():n;t.isFirstNode=false;t.isLastNode=false;t.getPreNode=function(){return null};t.getNextNode=function(){return null};if(!data.getNodeCache(e,t.tId)){return}$$(t,e).remove();data.removeNodeCache(e,t);data.removeSelectedNode(e,t);var a=data.nodeChildren(e,o);for(var r=0,i=a.length;r<i;r++){if(a[r].tId==t.tId){a.splice(r,1);break}}view.setFirstNode(e,o);view.setLastNode(e,o);var s,l,d,c=a.length;if(!e.data.keep.parent&&c==0){data.nodeIsParent(e,o,false);o.open=false;delete o[e.data.key.children];s=$$(o,consts.id.UL,e);l=$$(o,consts.id.SWITCH,e);d=$$(o,consts.id.ICON,e);view.replaceSwitchClass(o,l,consts.folder.DOCU);view.replaceIcoClass(o,d,consts.folder.DOCU);s.css("display","none")}else if(e.view.showLine&&c>0){var f=a[c-1];s=$$(f,consts.id.UL,e);l=$$(f,consts.id.SWITCH,e);d=$$(f,consts.id.ICON,e);if(o==n){if(a.length==1){view.replaceSwitchClass(f,l,consts.line.ROOT)}else{var u=$$(a[0],consts.id.SWITCH,e);view.replaceSwitchClass(a[0],u,consts.line.ROOTS);view.replaceSwitchClass(f,l,consts.line.BOTTOM)}}else{view.replaceSwitchClass(f,l,consts.line.BOTTOM)}s.removeClass(consts.line.LINE)}},replaceIcoClass:function(e,t,n){if(!t||e.isAjaxing)return;var o=t.attr("class");if(o==undefined)return;var a=o.split("_");switch(n){case consts.folder.OPEN:case consts.folder.CLOSE:case consts.folder.DOCU:a[a.length-1]=n;break}t.attr("class",a.join("_"))},replaceSwitchClass:function(e,t,n){if(!t)return;var o=t.attr("class");if(o==undefined)return;var a=o.split("_");switch(n){case consts.line.ROOT:case consts.line.ROOTS:case consts.line.CENTER:case consts.line.BOTTOM:case consts.line.NOLINE:a[0]=view.makeNodeLineClassEx(e)+n;break;case consts.folder.OPEN:case consts.folder.CLOSE:case consts.folder.DOCU:a[1]=n;break}t.attr("class",a.join("_"));if(n!==consts.folder.DOCU){t.removeAttr("disabled")}else{t.attr("disabled","disabled")}},selectNode:function(e,t,n){if(!n){view.cancelPreSelectedNode(e,null,t)}$$(t,consts.id.A,e).addClass(consts.node.CURSELECTED);data.addSelectedNode(e,t);e.treeObj.trigger(consts.event.SELECTED,[e.treeId,t])},setNodeFontCss:function(e,t){var n=$$(t,consts.id.A,e),o=view.makeNodeFontCss(e,t);if(o){n.css(o)}},setNodeLineIcos:function(e,t){if(!t)return;var n=$$(t,consts.id.SWITCH,e),o=$$(t,consts.id.UL,e),a=$$(t,consts.id.ICON,e),r=view.makeUlLineClass(e,t);if(r.length==0){o.removeClass(consts.line.LINE)}else{o.addClass(r)}n.attr("class",view.makeNodeLineClass(e,t));if(data.nodeIsParent(e,t)){n.removeAttr("disabled")}else{n.attr("disabled","disabled")}a.removeAttr("style");a.attr("style",view.makeNodeIcoStyle(e,t));a.attr("class",view.makeNodeIcoClass(e,t))},setNodeName:function(e,t){var n=data.nodeTitle(e,t),o=$$(t,consts.id.SPAN,e);o.empty();if(e.view.nameIsHTML){o.html(data.nodeName(e,t))}else{o.text(data.nodeName(e,t))}if(tools.apply(e.view.showTitle,[e.treeId,t],e.view.showTitle)){var a=$$(t,consts.id.A,e);a.attr("title",!n?"":n)}},setNodeTarget:function(e,t){var n=$$(t,consts.id.A,e);n.attr("target",view.makeNodeTarget(t))},setNodeUrl:function(e,t){var n=$$(t,consts.id.A,e),o=view.makeNodeUrl(e,t);if(o==null||o.length==0){n.removeAttr("href")}else{n.attr("href",o)}},switchNode:function(e,t){if(t.open||!tools.canAsync(e,t)){view.expandCollapseNode(e,t,!t.open)}else if(e.async.enable){if(!view.asyncNode(e,t)){view.expandCollapseNode(e,t,!t.open);return}}else if(t){view.expandCollapseNode(e,t,!t.open)}}};$.fn.zTree={consts:_consts,_z:{tools:tools,view:view,event:event,data:data},getZTreeObj:function(e){var t=data.getZTreeTools(e);return t?t:null},destroy:function(e){if(!!e&&e.length>0){view.destroy(data.getSetting(e))}else{for(var t in settings){view.destroy(settings[t])}}},init:function(e,t,n){var d=tools.clone(_setting);$.extend(true,d,t);d.treeId=e.attr("id");d.treeObj=e;d.treeObj.empty();settings[d.treeId]=d;if(typeof document.body.style.maxHeight==="undefined"){d.view.expandSpeed=""}data.initRoot(d);var o=data.getRoot(d);n=n?tools.clone(tools.isArray(n)?n:[n]):[];if(d.data.simpleData.enable){data.nodeChildren(d,o,data.transformTozTreeFormat(d,n))}else{data.nodeChildren(d,o,n)}data.initCache(d);event.unbindTree(d);event.bindTree(d);event.unbindEvent(d);event.bindEvent(d);var r={setting:d,addNodes:function(e,t,n,o){if(!e)e=null;var a=data.nodeIsParent(d,e);if(e&&!a&&d.data.keep.leaf)return null;var r=parseInt(t,10);if(isNaN(r)){o=!!n;n=t;t=-1}else{t=r}if(!n)return null;var i=tools.clone(tools.isArray(n)?n:[n]);function s(){view.addNodes(d,e,t,i,o==true)}if(tools.canAsync(d,e)){view.asyncNode(d,e,o,s)}else{s()}return i},cancelSelectedNode:function(e){view.cancelPreSelectedNode(d,e)},destroy:function(){view.destroy(d)},expandAll:function(e){e=!!e;view.expandCollapseSonNode(d,null,e,true);return e},expandNode:function(t,e,n,o,a){if(!t||!data.nodeIsParent(d,t))return null;if(e!==true&&e!==false){e=!t.open}a=!!a;if(a&&e&&tools.apply(d.callback.beforeExpand,[d.treeId,t],true)==false){return null}else if(a&&!e&&tools.apply(d.callback.beforeCollapse,[d.treeId,t],true)==false){return null}if(e&&t.parentTId){view.expandCollapseParentNode(d,t.getParentNode(),e,false)}if(e===t.open&&!n){return null}data.getRoot(d).expandTriggerFlag=a;if(!tools.canAsync(d,t)&&n){view.expandCollapseSonNode(d,t,e,true,r)}else{t.open=!e;view.switchNode(this.setting,t);r()}return e;function r(){var e=$$(t,d).get(0);if(e&&o!==false){view.scrollIntoView(d,e)}}},getNodes:function(){return data.getNodes(d)},getNodeByParam:function(e,t,n){if(!e)return null;return data.getNodeByParam(d,n?data.nodeChildren(d,n):data.getNodes(d),e,t)},getNodeByTId:function(e){return data.getNodeCache(d,e)},getNodesByParam:function(e,t,n){if(!e)return null;return data.getNodesByParam(d,n?data.nodeChildren(d,n):data.getNodes(d),e,t)},getNodesByParamFuzzy:function(e,t,n){if(!e)return null;return data.getNodesByParamFuzzy(d,n?data.nodeChildren(d,n):data.getNodes(d),e,t)},getNodesByFilter:function(e,t,n,o){t=!!t;if(!e||typeof e!="function")return t?null:[];return data.getNodesByFilter(d,n?data.nodeChildren(d,n):data.getNodes(d),e,t,o)},getNodeIndex:function(e){if(!e)return null;var t=e.parentTId?e.getParentNode():data.getRoot(d);var n=data.nodeChildren(d,t);for(var o=0,a=n.length;o<a;o++){if(n[o]==e)return o}return-1},getSelectedNodes:function(){var e=[],t=data.getRoot(d).curSelectedList;for(var n=0,o=t.length;n<o;n++){e.push(t[n])}return e},isSelectedNode:function(e){return data.isSelectedNode(d,e)},reAsyncChildNodesPromise:function(n,o,a){var e=new Promise(function(e,t){try{r.reAsyncChildNodes(n,o,a,function(){e(n)})}catch(e){t(e)}});return e},reAsyncChildNodes:function(e,t,n,o){if(!this.setting.async.enable)return;var a=!e;if(a){e=data.getRoot(d)}if(t=="refresh"){var r=data.nodeChildren(d,e);for(var i=0,s=r?r.length:0;i<s;i++){data.removeNodeCache(d,r[i])}data.removeSelectedNode(d);data.nodeChildren(d,e,[]);if(a){this.setting.treeObj.empty()}else{var l=$$(e,consts.id.UL,d);l.empty()}}view.asyncNode(this.setting,a?null:e,!!n,o)},refresh:function(){this.setting.treeObj.empty();var e=data.getRoot(d),t=data.nodeChildren(d,e);data.initRoot(d);data.nodeChildren(d,e,t);data.initCache(d);view.createNodes(d,0,data.nodeChildren(d,e),null,-1)},removeChildNodes:function(e){if(!e)return null;var t=data.nodeChildren(d,e);view.removeChildNodes(d,e);return t?t:null},removeNode:function(e,t){if(!e)return;t=!!t;if(t&&tools.apply(d.callback.beforeRemove,[d.treeId,e],true)==false)return;view.removeNode(d,e);if(t){this.setting.treeObj.trigger(consts.event.REMOVE,[d.treeId,e])}},selectNode:function(t,e,n){if(!t)return;if(tools.uCanDo(d)){e=d.view.selectedMulti&&e;if(t.parentTId){view.expandCollapseParentNode(d,t.getParentNode(),true,false,o)}else if(!n){try{$$(t,d).focus().blur()}catch(e){}}view.selectNode(d,t,e)}function o(){if(n){return}var e=$$(t,d).get(0);view.scrollIntoView(d,e)}},transformTozTreeNodes:function(e){return data.transformTozTreeFormat(d,e)},transformToArray:function(e){return data.transformToArrayFormat(d,e)},updateNode:function(e,t){if(!e)return;var n=$$(e,d);if(n.get(0)&&tools.uCanDo(d)){view.setNodeName(d,e);view.setNodeTarget(d,e);view.setNodeUrl(d,e);view.setNodeLineIcos(d,e);view.setNodeFontCss(d,e)}}};o.treeTools=r;data.setZTreeTools(d,r);var a=data.nodeChildren(d,o);if(a&&a.length>0){view.createNodes(d,0,a,null,-1)}else if(d.async.enable&&d.async.url&&d.async.url!==""){view.asyncNode(d)}return r}};var zt=$.fn.zTree,$$=tools.$,consts=zt.consts;return zt});