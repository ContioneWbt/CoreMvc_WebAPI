(function(e,l){if(window.layui&&layui.define){layui.define(function(e){window.UEDITOR_HOME_URL=layui.cache.base+"lib/extend/neditor/";e("neconfig",l())})}else{e.neconfig=l()}})(this,function(){var e=window.UEDITOR_HOME_URL||l();window.UEDITOR_CONFIG={UEDITOR_HOME_URL:e,serverUrl:"",imageActionName:"uploadimage",scrawlActionName:"uploadscrawl",videoActionName:"uploadvideo",fileActionName:"uploadfile",imageUrlPrefix:"",scrawlUrlPrefix:"",videoUrlPrefix:"",fileUrlPrefix:"",catcherLocalDomain:"",toolbars:[["fullscreen","source","|","undo","redo","|","bold","italic","underline","fontborder","strikethrough","superscript","subscript","removeformat","formatmatch","autotypeset","blockquote","pasteplain","|","forecolor","backcolor","insertorderedlist","insertunorderedlist","selectall","cleardoc","|","rowspacingtop","rowspacingbottom","lineheight","|","customstyle","paragraph","fontfamily","fontsize","|","directionalityltr","directionalityrtl","indent","|","justifyleft","justifycenter","justifyright","justifyjustify","|","touppercase","tolowercase","|","link","unlink","anchor","|","imagenone","imageleft","imageright","imagecenter","|","insertimage","emotion","scrawl","insertvideo","music","attachment","map","gmap","insertframe","pagebreak","template","background","|","insertcode","horizontal","date","time","spechars","snapscreen","wordimage","|","inserttable","deletetable","insertparagraphbeforetable","insertrow","deleterow","insertcol","deletecol","mergecells","mergeright","mergedown","splittocells","splittorows","splittocols","charts","|","print","preview","searchreplace","drafts","help"]],theme:"notadd",zIndex:1100,autoHeightEnabled:false,xssFilterRules:true,inputXssFilter:true,outputXssFilter:true,whitList:{a:["target","href","title","class","style"],abbr:["title","class","style"],address:["class","style"],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src","class","style"],b:["class","style"],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite","class","style"],br:[],caption:["class","style"],center:[],cite:[],code:["class","style"],col:["align","valign","span","width","class","style"],colgroup:["align","valign","span","width","class","style"],dd:["class","style"],del:["datetime"],details:["open"],div:["class","style"],dl:["class","style"],dt:["class","style"],em:["class","style"],font:["color","size","face"],footer:[],h1:["class","style"],h2:["class","style"],h3:["class","style"],h4:["class","style"],h5:["class","style"],h6:["class","style"],header:[],hr:[],i:["class","style"],img:["src","alt","title","width","height","id","_src","_url","loadingclass","class","data-latex"],ins:["datetime"],li:["class","style"],mark:[],nav:[],ol:["class","style"],p:["class","style"],pre:["class","style"],s:[],section:[],small:[],span:["class","style"],sub:["class","style"],sup:["class","style"],strong:["class","style"],table:["width","border","align","valign","class","style"],tbody:["align","valign","class","style"],td:["width","rowspan","colspan","align","valign","class","style"],tfoot:["align","valign","class","style"],th:["width","rowspan","colspan","align","valign","class","style"],thead:["align","valign","class","style"],tr:["rowspan","align","valign","class","style"],tt:[],u:[],ul:["class","style"],video:["autoplay","controls","loop","preload","src","height","width","class","style"],source:["src","type"],embed:["type","class","pluginspage","src","width","height","align","style","wmode","play","autoplay","loop","menu","allowscriptaccess","allowfullscreen","controls","preload"],iframe:["src","class","height","width","max-width","max-height","align","frameborder","allowfullscreen"]}};function l(e,l){return t(e||self.document.URL||self.location.href,l||s())}function s(){var e=document.getElementsByTagName("script");return e[e.length-1].src}function t(e,l){var s=l;if(/^(\/|\\\\)/.test(l)){s=/^.+?\w(\/|\\\\)/.exec(e)[0]+l.replace(/^(\/|\\\\)/,"")}else if(!/^[a-z]+:/i.test(l)){e=e.split("#")[0].split("?")[0].replace(/[^\\\/]+$/,"");s=e+""+l}return a(s)}function a(e){var l=/^[a-z]+:\/\//.exec(e)[0],s=null,t=[];e=e.replace(l,"").split("?")[0].split("#")[0];e=e.replace(/\\/g,"/").split(/\//);e[e.length-1]="";while(e.length){if((s=e.shift())===".."){t.pop()}else if(s!=="."){t.push(s)}}return l+t.join("/")}window.UE={getUEBasePath:l}});