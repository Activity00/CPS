$$ = function(a, c) {
    if (c) {
        var b = c.getElementsByTagName(a);
        if (!b || b.length == 0) {
            b = new Array();
            getbyTagName(c, a, b);
            return b;
        }
        return b;
    } else {
        return document.getElementsByTagName(a);
    }
};
var prevSaveData = "";
var hasCeShiQ = false;
var totalHideQcount = 0;
$ce = function(c, d, a) {
    var b = document.createElement(c);
    if (d) {
        b.innerHTML = d;
    }
    a.appendChild(b);
    return b;
};
function StringBuilder() {
    this._stringArray = new Array();
}
StringBuilder.prototype.append = function(a) {
    this._stringArray.push(a);
};
StringBuilder.prototype.toString = function(a) {
    a = a || "";
    return this._stringArray.join(a);
};
StringBuilder.prototype.clear = function() {
    this._stringArray.length = 0;
};
function forbidBackSpace(f) {
    var c = f || window.event;
    var d = c.target || c.srcElement;
    var b = d.type || d.getAttribute("type");
    var a = c.keyCode == 8 && b != "password" && b != "text" && b != "textarea";
    if (a) {
        return false;
    }
}
document.onkeydown = forbidBackSpace;
function getGapFillCount(b) {
    var d = 0;
    var e = 0;
    var a = b.length;
    do {
        e = b.indexOf(GapFillStr, e);
        if (e != -1) {
            d++;
            e += GapFillStr.length;
            for (var c = e; c < a; c++) {
                if (b.charAt(c) != "_") {
                    break;
                }
                e++;
            }
        }
    } while ( e != - 1 );
    return d;
}
var EndGapReq = true;
var batAddQTimes = 0;
function replaceGapFill(n, e) {
    var g = 0;
    var f = 0;
    EndGapReq = true;
    if (e._requir) {
        var C = n.indexOf("<br");
        if (C > -1) {
            var h = n.indexOf(GapFillStr);
            if (h > C) {
                EndGapReq = false;
                n = n.substring(0, C) + "<span class='req'>&nbsp;*</span>" + n.substring(C);
            }
        }
    }
    var u = new StringBuilder();
    var D = 0;
    do {
        f = g;
        g = n.indexOf(GapFillStr, g);
        var m = GapFillStr;
        var k = "";
        var s = false;
        if (e._requir && e._rowVerify) {
            for (var z = 0; z < e._rowVerify.length; z++) {
                if (e._rowVerify[z]._isRequir == false) {
                    s = true;
                    EndGapReq = false;
                    break;
                }
            }
        }
        if (g != -1) {
            var o = 0;
            u.append(n.substr(f, g - f));
            g += GapFillStr.length;
            for (var y = g; y < n.length; y++) {
                if (n[y] != "_") {
                    break;
                }
                o++;
                m += "_";
                g++;
            }
            var b = GapWidth + o * (GapWidth / 3);
            if (b > 600) {
                b = 600;
            }
            var B = false;
            if (e._rowVerify[D]) {
                if (e._rowVerify[D]._verify == "日期") {
                    b = 70;
                    B = true;
                } else {
                    if (e._rowVerify[D]._verify == "指定选项") {
                        k = e._rowVerify[D]._choice;
                    }
                }
            }
            var l = "";
            if (e._isCeShi) {
                var r = e._rowVerify;
                if (r[D]) {
                    var t = (r[D]._answer || "请设置答案");
                    l = t + ":" + (r[D]._ceshiValue || 1) + "分";
                    var x = t.length * 12 + 24;
                    if (b < x) {
                        b = x;
                    }
                }
            }
            var p = "";
            if (k) {
                p = GapFillReplace.replace("width:" + GapWidth + "px", "display:none;width:" + b + "px");
            } else {
                p = GapFillReplace.replace("width:" + GapWidth + "px", "width:" + b + "px");
            }
            if (l) {
                p = p.replace("/>", " value='" + l + "'/>");
            }
            if (e._useTextBox) {
                p = p.replace("/>", " class='inputtext'/>");
            } else {
                p = p.replace("/>", " class='underline'/>");
            }
            if (k) {
                var q = k.split("|");
                var w = q[0].split(/[,，]/);
                var a = q[1] || "请选择";
                var d = "<select style='vertical-align:middle;'><option value=''>" + a + "</option>";
                for (var z = 0; z < w.length; z++) {
                    var A = w[z];
                    d += "<option value='" + A + "'>" + A + "</option>";
                }
                d += "</select>";
                p = p.replace("/>", "/>" + d);
            }
            var v = true;
            if (e._rowVerify[D] && e._rowVerify[D]._isRequir == false) {
                v = false;
            }
            u.append(p);
            if (s && v) {
                u.append("<span class='req'>&nbsp;*</span>");
            }
            D++;
        } else {
            if (f < n.length) {
                u.append(n.substr(f));
            }
        }
    } while ( g != - 1 );
    return u.toString();
}
function showItemDesc(c, b) {
    var e = document.getElementById(c);
    var h = document.getElementById("divDescPopData");
    h.innerHTML = e.innerHTML;
    var d = trim(e.innerHTML);
    if (d.indexOf("http") == 0) {
        PDF_launch(d.replace(/&amp;/g, "&"), 800, 600);
    } else {
        var g = document.getElementById("divDescPop");
        g.style.display = "";
        g.style.width = "500px";
        var a = h.offsetHeight + 20;
        var f = 500;
        if (a < 500 && a > 30) {
            f = a;
        }
        PDF_launch("divDescPop", 500, f);
    }
}
function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}
function getCoords(a) {
    var d = a.getBoundingClientRect(),
    i = a.ownerDocument,
    f = i.body,
    e = i.documentElement,
    c = e.clientTop || f.clientTop || 0,
    g = e.clientLeft || f.clientLeft || 0,
    h = d.top + (self.pageYOffset || e.scrollTop || f.scrollTop) - c,
    b = d.left + (self.pageXOffset || e.scrollLeft || f.scrollLeft) - g;
    return {
        top: h,
        left: b
    };
}
function mouseCoords(a) {
    if (!a) {
        return;
    }
    if (a.pageX || a.pageY) {
        return {
            x: a.pageX,
            y: a.pageY
        };
    }
    return {
        x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: a.clientY + document.body.scrollTop - document.body.clientTop
    };
}
function showFillData(a) {
    toolTipLayer.innerHTML = "选中此项后，需要进行填空";
    sb_setmenunav(toolTipLayer, true, a);
}
var prevQType = null;
function sb_setmenunav(k, h, f, n, c) {
    var q = k;
    if (typeof(q) != "object") {
        q = document.getElementById(k);
    }
    if (!q) {
        return;
    }
    if (h) {
        if (q.timeArray) {
            window.clearTimeout(q.timeArray);
            q.timeArray = 0;
        }
        q.style.display = "block";
        if (!q.onmouseover) {
            q.onmouseover = function() {
                sb_setmenunav(k, true);
            };
            q.onmouseout = function() {
                sb_setmenunav(k, false);
            };
        }
        if (n) {
            var p = window.event || sb_setmenunav.caller.arguments[0];
            var m = mouseCoords(p);
            q.style.left = m.x + 1 + "px";
            q.style.top = m.y + 1 + "px";
        } else {
            if (f) {
                var e = f;
                if (e.parentNode.tagName.toLowerCase() == "li") {
                    e = f.parentNode;
                }
                var b = getCoords(e);
                var g = b.left;
                var j = b.top + e.offsetHeight;
                var i = c || document.documentElement.clientHeight || document.body.clientHeight;
                var s = document.documentElement.clientWidth || document.body.clientWidth;
                var o = s;
                if (q.id == "divDesc") {
                    o = 700;
                }
                if (f.nextObj) {
                    j = b.top - 33;
                }
                var r = f.getAttribute("qtype");
                if (q.innerHTML.indexOf("如果有多个答案") > -1) {
                    g += 88;
                    j -= 30;
                }
                if (r) {
                    g -= (q.offsetWidth - f.offsetWidth) / 2;
                    if (prevQType && prevQType != q) {
                        prevQType.style.display = "none";
                    }
                    prevQType = q;
                }
                if (g + q.offsetWidth > o) {
                    g = o - q.offsetWidth - 30;
                }
                if (j + q.offsetHeight > i) {
                    var l = 30;
                    if (r) {
                        l = 0;
                    }
                    var a = i - l - j;
                    if (a < 30) {
                        a = 30;
                    }
                    q.style.height = a + "px";
                }
                q.style.left = g + "px";
                q.style.top = j + "px";
            }
        }
    }
    if (f && f.tagName.toLowerCase() == "a") {
        q.needSaveClass = f;
        q.prevClass = f.className;
    } else {
        if (q.needSaveClass) {
            if (h) {
                q.needSaveClass.className = q.prevClass ? q.prevClass + " hover": "hover";
            } else {
                q.needSaveClass.className = q.prevClass || "";
            }
        }
    }
    if (!h) {
        if (jumpTipLayer && q != jumpTipLayer && jumpTipLayer.style.display != "none") {
            return;
        }
        q.timeArray = window.setTimeout(function() {
            q.style.display = "none";
            q.style.height = "";
        },
        300);
    }
}
var GapFillStr = "___";
var GapWidth = 21;
var GapFillReplace = "<input style='width:" + GapWidth + "px;' />";
function getFillStr(b) {
    var c = "";
    for (var a = 0; a < b; a++) {
        c += GapFillStr;
    }
    if (!c) {
        c = GapFillStr;
    }
    return c;
}
var EditorIndex = 1;
var EditToolBarItems = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "emoticons", "link", "image", "flash", "subscript", "superscript"];
var EditToolBarItemsPageCut = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "plainpaste", "-", "justifyleft", "justifycenter", "justifyright", "indent", "outdent", "link", "emoticons", "image", "flash", "media", "table", "hr"];
function getByClass(b, f, d) {
    var a = $$(b, f);
    var e = new Array();
    for (var c = 0; c < a.length; c++) {
        if (a[c].className.toLowerCase() == d.toLowerCase()) {
            e.push(a[c]);
        }
    }
    return e;
}
function getbyTagName(b, c, e) {
    var d;
    for (var a = 0; a < b.childNodes.length; a++) {
        d = b.childNodes[a];
        if (d.tagName === c) {
            e.push(d);
        }
        if (d.childNodes.length > 0 && d.nodeType == 1) {
            getbyTagName(d, c, e);
        }
    }
}
var defaultFileExt = ".gif|.png|.jpg|.jpeg|.bmp|.doc|.docx|.pdf|.xls|.xlsx|.ppt|.pptx|.txt|.rar|.zip|.gzip";
function Request(d) {
    var b = window.document.location.href;
    var f = b.indexOf("?");
    var e = b.substr(f + 1);
    var c = e.split("&");
    for (var a = 0; a < c.length; a++) {
        var g = c[a].split("=");
        if (g[0].toUpperCase() == d.toUpperCase()) {
            return g[1];
        }
    }
    return "";
}
function isEmpty(a) {
    return trim(a) == "";
}
function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}
function isPositive(a) {
    var b = /^\+?[1-9][0-9]*$/;
    return b.test(a);
}
function toInt(a) {
    return parseInt(trim(a));
}
var status_tip = $("status_tip");
var topnav = $("topnav");
var divSurvey = $("sur");
var divMenu = $("divMenu");
var questions = $("question");
var firstPage = null;
var questionHolder = new Array();
var cur = null;
var curover = null;
var curinsert = null;
var langVer = 0;
var WjxActivity = new Object();
var DataArray = new Array();
var total_page = 0;
var total_question = 0;
var select_item_num = 1;
var isMergeAnswer = false;
var isCompleteLoad = false;
var referRelHT = new Object();
var designversion = "7";
var hasInsPromoteJump = false;
var lastAddNewQTime = null;
var prevcurmove = null;
var useShortCutAddNewQ = false;
var QIndentity = 1;
function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^\s*)|(\s*$)/g, "");
    } else {
        return a;
    }
}
var interval_time;
init_page();
function init_page() {
    addEventSimple(window, "resize", setSidePos);
    if (vipUser == "2") {
        EditToolBarItems.push("source");
        EditToolBarItemsPageCut.push("source");
    }
    setSidePos();
    show_status_tip("正在读取数据，请稍后...");
    processData();
    interval_time = setInterval(autoSave, 90 * 1000);
}
function processData() {
    if (serverVersion && serverVersion != designversion) {
        alert("很抱歉，由于问卷星系统版本升级，您本机使用的脚本文件已过期，请您刷新页面或者重启浏览器再编辑问卷！");
        return;
    }
    var a = hfData.value;
    if (a == "error") {
        window.location = "/error/error.aspx?source=designQHandler";
    } else {
        if (a == "timeout") {
            alert("您的登录信息超时，请重新登录，谢谢！");
            window.location = "/wjx/manage/myquestionnaires.aspx";
        } else {
            show_status_tip("数据读取成功，初始化...");
            set_data_fromServer(a);
            set_data_toDesign();
            isCompleteLoad = true;
            if (questionHolder.length > 0) {
                questionHolder[0].focus();
            }
            loadComplete();
            document.title = "信息录入 ";
        }
    }
}
function autoSave() {
    var a = $("chkAutoSave");
    if (a.checked) {
        save_paper("edit", false);
    }
}
function showCeShiInfo() {
    if (hasCeShiQ || isKaoShi) {
        $("spanRandom").parentNode.style.display = "none";
        $("chkUseSelfTopic").parentNode.style.display = "none";
    }
}
function set_data_fromServer(c) {
    var b = new Array();
    var h = c.split("œ")[0];
    b = h.split("¤");
    var f = new Array();
    var g = c.split("œ")[1];
    var f = g.split("§");
    if (f[0] == "true") {
        isMergeAnswer = true;
    } else {
        isMergeAnswer = false;
    }
    if (isMergeAnswer) {
        var e = $("chkAutoSave");
        e.checked = false;
    }
    userGuid = f[1];
    langVer = Number(f[2]);
    var a = new Array();
    a = b[0].split("§");
    WjxActivity._start_time = a[0];
    WjxActivity._title = a[1];
    WjxActivity._tag = a[2];
    WjxActivity._random_begin = a[3];
    WjxActivity._random_end = a[4];
    WjxActivity._random_mode = a[5];
    WjxActivity._use_self_topic = a[6] == "true" ? true: false;
    WjxActivity._display_part = false;
    WjxActivity._display_part_num = 0;
    WjxActivity._partset = "";
    if (WjxActivity._random_mode == "1" || WjxActivity._random_mode == "2") {
        WjxActivity._display_part = a[7] == "true" ? true: false;
        if (WjxActivity._display_part) {
            WjxActivity._display_part_num = parseInt(a[8]);
        }
    } else {
        if (WjxActivity._random_mode == "3" || WjxActivity._random_mode == "4") {
            WjxActivity._partset = a[7] || "";
        }
    }
    for (var d = 1; d < b.length; d++) {
        DataArray[d - 1] = set_string_to_dataNode(b[d]);
    }
    showCeShiInfo();
}
function setLiCat(a) {}
function isQuestionLikert(b) {
    var c = b._type;
    var a = b._tag || 0;
    return c == "radio" && a;
}
function set_string_to_dataNode(r) {
    var f = new Object();
    var d = new Array();
    d = r.split("§");
    f._type = d[0];
    switch (d[0]) {
    case "page":
        f._topic = d[1];
        f._title = d[2];
        f._iszhenbie = d[4] == "true";
        f._istimer = d[4] == "time";
        f._mintime = d[5] ? parseInt(d[5]) : "";
        f._maxtime = d[6] ? parseInt(d[6]) : "";
        total_page++;
        break;
    case "cut":
        f._title = d[1];
        f._video = d[2] || "";
        f._relation = d[3] || "";
        break;
    case "fileupload":
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        if (d[4] == "true") {
            f._requir = true;
        } else {
            f._requir = false;
        }
        f._width = d[5] ? parseInt(d[5]) : 200;
        f._ext = d[6] || "";
        f._maxsize = d[7] ? parseInt(d[7]) : 4096;
        f._ins = d[8];
        if (d[9] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[10];
        break;
    case "slider":
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        if (d[4] == "true") {
            f._requir = true;
        } else {
            f._requir = false;
        }
        f._minvalue = d[5];
        f._maxvalue = d[6];
        f._minvaluetext = d[7];
        f._maxvaluetext = d[8];
        f._ins = d[9];
        if (d[10] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[11];
        break;
    case "question":
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        f._height = d[4] ? parseInt(d[4]) : 1;
        f._maxword = d[5];
        if (d[6] == "true") {
            f._requir = true;
        } else {
            f._requir = false;
        }
        if (d[7] == "true") {
            f._norepeat = true;
        } else {
            f._norepeat = false;
        }
        f._default = d[8];
        f._ins = d[9];
        if (d[10] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[11];
        f._verify = d[12];
        if (d[13]) {
            var l = d[13].split("〒");
            f._needOnly = l[0] == "true" ? true: false;
            f._needsms = l[1] == "true" ? true: false;
        }
        f._hasList = d[14] == "true" ? true: false;
        f._listId = d[15] ? parseInt(d[15]) : -1;
        f._width = d[16] ? parseInt(d[16]) : "";
        f._underline = d[17] == "true" ? true: false;
        f._minword = d[18] ? parseInt(d[18]) : "";
        if (d[19]) {
            if (f._verify == "多级下拉") {
                f._levelData = d[19] || "";
            } else {
                var h = d[19].split("〒");
                f._isCeShi = true;
                f._ceshiValue = h[0] || 5;
                f._answer = h[1] || "请设置答案";
                f._ceshiDesc = h[2] || "";
                f._include = h[3] == "true";
                hasCeShiQ = true;
            }
        }
        break;
    case "gapfill":
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        if (d[4] == "true") {
            f._requir = true;
        } else {
            f._requir = false;
        }
        f._gapcount = d[5] ? parseInt(d[5]) : 1;
        f._ins = d[6];
        if (d[7] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[8];
        var k = d[9] || "";
        f._rowVerify = new Array();
        if (d[11]) {
            f._isCeShi = true;
            hasCeShiQ = true;
        }
        if (k) {
            var o = k.split("〒");
            for (var x = 0; x < o.length; x++) {
                var y = new Object();
                var e = o[x].split("¦");
                if (e[0] == "指定选项") {
                    y._verify = e[0];
                    y._choice = e[1] || "";
                } else {
                    var q = o[x].split(",");
                    y._verify = q[0];
                    y._minword = q[1];
                    y._maxword = q[2];
                    if (f._isCeShi) {
                        y._ceshiValue = q[3] || 1;
                        y._answer = q[4] || "请设置答案";
                        y._ceshiDesc = q[5] || "";
                        y._include = q[6] == "true";
                        hasCeShiQ = true;
                    } else {
                        y._isRequir = q[3] == "false" ? false: true;
                    }
                }
                f._rowVerify[x] = y;
            }
        }
        f._useTextBox = d[10] == "true";
        break;
    case "sum":
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        if (d[4] == "true") {
            f._requir = true;
        } else {
            f._requir = false;
        }
        f._total = parseInt(d[5]);
        f._rowtitle = d[6];
        f._rowwidth = d[7].indexOf("%") > -1 ? d[7] : "";
        f._ins = d[9];
        if (d[10] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[11];
        break;
    case "radio":
    case "check":
    case "radio_down":
    case "matrix":
    case "boolean":
        if (d[0] == "boolean") {
            f._isbool = true;
            f._type = "radio";
        } else {
            f._type = d[0];
        }
        f._topic = d[1];
        var u = d[2].split("〒");
        f._title = u[0];
        f._keyword = u.length == 2 ? u[1] : "";
        f._relation = u[2] || "";
        f._mainWidth = u[3] || "";
        f._tag = isInt(d[3]) ? toInt(d[3]) : 0;
        if (f._type == "matrix") {
            var n = d[4].split("〒");
            f._rowtitle = n[0];
            if (n.length >= 2) {
                f._rowtitle2 = n[1];
            } else {
                f._rowtitle2 = "";
            }
            if (n.length == 3) {
                f._columntitle = n[2];
            } else {
                f._columntitle = "";
            }
        } else {
            var w = d[4].split("〒");
            f._numperrow = isInt(w[0]) ? toInt(w[0]) : 1;
            f._randomChoice = false;
            if (w.length == 2) {
                f._randomChoice = w[1] == "true" ? true: false;
            }
        }
        if (d[5] == "true") {
            f._hasvalue = true;
        } else {
            f._hasvalue = false;
        }
        if (d[6] == "true") {
            f._hasjump = true;
        } else {
            f._hasjump = false;
        }
        f._anytimejumpto = d[7];
        if (d[0] == "check" || (d[0] == "matrix" && f._tag == "102")) {
            var i = d[8].split(",");
            if (i[0] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            if (i[1] == "shop") {
                f._isShop = true;
            } else {
                f._lowLimit = i[1];
                f._upLimit = i[2];
            }
        } else {
            if (d[8] == "true") {
                f._requir = true;
            } else {
                if (d[0] == "radio") {
                    var i = d[8].split(",");
                    f._requir = i[0] == "true";
                    if (i[1]) {
                        f._isQingJing = true;
                    }
                } else {
                    f._requir = false;
                }
            }
        }
        if (f._type == "matrix") {
            var z = d[9].split("〒");
            var A = z[0].split(",");
            f._rowwidth = A[0].indexOf("%") > -1 ? A[0] : "";
            f._randomRow = A[1] == "true";
            f._rowwidth2 = "";
            if (z.length >= 2) {
                f._rowwidth2 = z[1].indexOf("%") > -1 ? z[1] : "";
            }
            f._minvalue = 0;
            f._maxvalue = 10;
            if (f._tag == "202" || f._tag == "301") {
                f._minvalue = z[2] || "";
                var p = z[3] || "";
                f._maxvalue = p;
                if (f._tag == "301") {
                    var s = p.split(",");
                    f._maxvalue = s[0] || "";
                    f._digitType = s[1] || 0;
                }
            } else {
                if (f._tag == "102" || f._tag == "103") {
                    f._daoZhi = z[2] == "true";
                } else {
                    if (f._tag == "201" || f._tag == "302") {
                        f._hasvalue = false;
                        var k = z[2] || "";
                        f._rowVerify = new Array();
                        if (k) {
                            var o = k.split(";");
                            for (var x = 0; x < o.length; x++) {
                                if (!o[x]) {
                                    continue;
                                }
                                var y = new Object();
                                var e = o[x].split("¦");
                                if (e[1] == "指定选项") {
                                    y._verify = e[1];
                                    y._choice = e[2] || "";
                                    var c = parseInt(e[0]);
                                    f._rowVerify[c] = y;
                                } else {
                                    var q = o[x].split(",");
                                    y._verify = q[1];
                                    y._minword = q[2];
                                    y._maxword = q[3];
                                    y._width = q[4] || "";
                                    y._isRequir = q[5] == "false" ? false: true;
                                    var c = parseInt(q[0]);
                                    f._rowVerify[c] = y;
                                }
                            }
                        }
                    }
                }
            }
            f._isTouPiao = false;
            f._isCeShi = false;
        } else {
            var g = d[9].split("〒");
            if (g[0] == "true") {
                f._isTouPiao = true;
                f._touPiaoWidth = isInt(g[1]) ? parseInt(g[1]) : 50;
                f._displayDesc = g[2] == "true";
                f._displayNum = g[3] == "true";
                f._displayPercent = g[4] == "true";
                f._displayThumb = g[5] == "true";
                f._displayDescTxt = g[6] || "";
            } else {
                if (g[0] == "ceshi") {
                    f._isCeShi = true;
                    hasCeShiQ = true;
                    f._ceshiValue = isInt(g[1]) ? parseInt(g[1]) : 5;
                    f._ceshiDesc = g[2];
                } else {
                    if (g[0] == "ceping") {
                        f._isCePing = true;
                    } else {
                        if (g[0] == "desc") {
                            f._displayDesc = true;
                            f._displayDescTxt = g[1] || "";
                        }
                    }
                }
            }
        }
        f._ins = d[10];
        var a = d[11].split(",");
        f._verify = a[0];
        if (a[1] == "true") {
            f._nocolumn = true;
        }
        f._referTopic = d[12];
        f._referedTopics = d[13];
        f._select = new Array();
        var b = 14;
        for (var t = b; t < d.length; t++) {
            var v = new Array();
            v = d[t].split("〒");
            var m = t - b + 1;
            f._select[m] = new Object();
            f._select[m]._item_title = v[0];
            if (v[1] == "true") {
                f._select[m]._item_radio = true;
            } else {
                f._select[m]._item_radio = false;
            }
            f._select[m]._item_value = v[2];
            f._select[m]._item_jump = v[3];
            f._select[m]._item_tb = false;
            f._select[m]._item_tbr = false;
            f._select[m]._item_img = "";
            f._select[m]._item_imgtext = false;
            f._select[m]._item_desc = "";
            f._select[m]._item_label = "";
            if (v.length >= 9) {
                f._select[m]._item_tb = v[4] == "true";
                f._select[m]._item_tbr = v[5] == "true";
                f._select[m]._item_img = v[6];
                f._select[m]._item_imgtext = v[7] == "true";
                f._select[m]._item_desc = v[8];
                f._select[m]._item_label = v[9];
                f._select[m]._item_huchi = v[10] == "true";
            }
            select_item_num++;
        }
        break;
    default:
        break;
    }
    return f;
}
function set_data_toDesign() {
    var g = $("paper_attr_title");
    g.value = WjxActivity._title;
    var c = $("pater_title");
    c.innerHTML = g.value;
    var b = $("paper_attr_desc");
    b.value = WjxActivity._tag;
    var f = $("pater_desc");
    f.innerHTML = b.value;
    if (!b.value) {
        f.innerHTML = "添加问卷说明";
    }
    var a = $("divId");
    a.onclick = function() {
        paper_attr("paper_attr_title");
    };
    b.onblur = b.onclick = b.onchange = function() {
        paper_attr_desc_onblur(this);
    };
    var d = $("chkUseTopic");
    var e = $("chkUseSelfTopic");
    d.checked = e.checked = WjxActivity._use_self_topic;
    d.onclick = e.onclick = function() {
        WjxActivity._use_self_topic = this.checked;
        d.checked = e.checked = this.checked;
        for (var h = 0; h < questionHolder.length; h++) {
            var j = questionHolder[h].dataNode._type;
            if (j != "cut" && j != "page") {
                questionHolder[h].divTopic.style.display = WjxActivity._use_self_topic ? "none": "";
            }
        }
        if (this.checked) {
            show_status_tip("设置成功！请在问题标题前添加自定义题号。", 4000);
        }
    };
    if (b.value.indexOf("<") > -1) {
        b.style.display = "none";
    }
    document.title = "正在加载问卷，请耐心等待....";
    set_dataNode_to_Design();
}
function getIEVersion() {
    var a = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return a ? parseInt(a[1]) : undefined;
}
function setQTopPos(c) {
    var g = 0;
    var f = document.documentElement.clientHeight || document.body.clientHeight;
    g = c.offsetTop + c.offsetHeight - f + 10;
    if (c.offsetHeight < f - 100) {
        g += 100;
    }
    var d = document.getElementById("pater_desc");
    var e = getIEVersion();
    var b = e && (!document.documentMode || document.documentMode < 8);
    var a = e <= 7 || b;
    if (a) {
        g += 85;
    }
    if (e) {
        setTimeout(function() {
            divSurvey.scrollTop = g;
        },
        400);
    } else {
        divSurvey.scrollTop = g;
    }
}
function set_dataNode_to_Design() {
    var f;
    var h = 0;
    var d = 0;
    var b = document.createDocumentFragment();
    for (var c = 0; c < DataArray.length; c++) {
        f = create_question(DataArray[c]);
        b.appendChild(f);
        if (DataArray[c]._type == "page" && firstPage == null) {
            firstPage = f;
            if (window.isTiKu) {
                firstPage.style.display = "none";
            }
        } else {
            if (h == 0 && isCepingQ) {
                f.isCepingQ = true;
            }
            questionHolder[h++] = f;
        }
        if (DataArray[c]._referedTopics) {
            var g = DataArray[c]._referedTopics.split(",");
            for (var e = 0; e < g.length; e++) {
                referRelHT[g[e]] = f;
            }
        }
        if (DataArray[c]._type != "page") {
            if (referRelHT[DataArray[c]._topic]) {
                var a = referRelHT[DataArray[c]._topic];
                f._referDivQ = a;
                if (!a._referedArray) {
                    a._referedArray = new Array();
                }
                a._referedArray.push(f);
                if (DataArray[c]._type == "sum") {
                    f.createSum();
                } else {
                    if (f.createTableRadio) {
                        f.createTableRadio();
                    }
                }
            }
        }
    }
    questions.appendChild(b);
    if (total_question == 0 && firstPage && !firstPage.dataNode._title) {
        firstPage.style.display = "none";
    }
}
function getDataNodeByTopic(b) {
    for (var c = 0,
    a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return d;
        }
    }
    return null;
}
function getDivIndex(b) {
    for (var c = 0,
    a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return c;
        }
    }
    return - 1;
}
function getJumpTitle(c) {
    if (c == "0" || c == "") {
        return "直接跳到下一题";
    } else {
        if (c == "1") {
            return "直接跳到问卷末尾";
        } else {
            if (isInt(c)) {
                var b = getDataNodeByTopic(c);
                if (b) {
                    var a = b._title;
                    if (!WjxActivity._use_self_topic) {
                        a = b._topic + "." + a;
                    }
                    return a;
                }
            }
        }
    }
    return "";
}
var status_tip_timeout = null;
function show_status_tip(b, d) {
    clearTimeout(status_tip_timeout);
    status_tip.style.display = "block";
    status_tip.innerHTML = b;
    var a = document.documentElement.scrollTop || document.body.scrollTop;
    var c = document.documentElement.clientHeight || document.body.clientHeight;
    if (status_tip.hasSetWidth) {
        status_tip.style.width = "";
    }
    status_tip.style.top = a + c - status_tip.offsetHeight - 96 + "px";
    status_tip.style.width = (divSurvey.offsetWidth - 10) + "px";
    if (d > 0) {
        status_tip_timeout = setTimeout("status_tip.style.display='none';status_tip.style.width = '';status_tip.hasSetWidth=false;", d);
    }
}
function setSidePos() {
    status_tip.style.left = "0px";
    var b = document.documentElement.clientHeight || document.body.clientHeight;
    divSurvey.style.height = b - 144 + "px";
    var a = document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById("m-rightbar").style.right = a < 1280 ? "20px": "-45px";
    document.getElementById("divNewTip").style.display = a < 1280 ? "none": "";
}
function show(a) {
    return;
}
var descEditorCreated = false;
function paper_attr(a) {
    PDF_launch("divQAttr", 620, 350);
    var c = "paper_attr_desc";
    if (!descEditorCreated) {
        KE.init({
            id: c,
            newlineTag: "p",
            width: "500px",
            height: "180px",
            filterMode: filter,
            items: EditToolBarItemsPageCut,
            afterChange: function(d) {
                KE.util.setData(d);
            },
            DesignPage: 1
        });
        KE.create(c);
        descEditorCreated = true;
        KE.util.focus(c);
    }
    var b = $(a);
    b.select();
}
function paper_attr_title_onblur(a) {
    var b = $("pater_title");
    b.innerHTML = a.value = replace_specialChar(trim(a.value));
}
function paper_attr_desc_onblur(a) {
    var b = $("pater_desc");
    b.innerHTML = a.value;
    $("spanHInput").innerHTML = a.value.length;
    var c = 4000 - a.value.length;
    if (c < 0) {
        c = 0;
    }
    $("spanLeftInput").innerHTML = c;
    $("spanDTip").style.display = "";
}
var titleEditorCreated = false;
function openTitleEditor(a, e, c) {
    c = c || "";
    PDF_launch("divTitleEditor", 620, 350, e, c);
    var d = "textTitleId";
    if (!titleEditorCreated) {
        KE.init({
            id: d,
            items: EditToolBarItemsPageCut,
            filterMode: filter
        });
        KE.create(d);
        setInterval(new Function('KE.util.setData("textTitleId")'), 500);
        titleEditorCreated = true;
        KE.util.focus(d);
    }
    var b = a.value || a.innerHTML || "";
    $("divTitleEditor").initContent = b;
    KE.util.setFullHtml(d, b);
}
function clickOK() {
    var a = KE.util.getData("textTitleId");
    window.parent.PDF_close(a);
}
function clickCancel() {
    var a = "-1nc";
    if (CheckIsDirty()) {
        if (confirm("您要保存刚才所做的更改吗？")) {
            a = KE.util.getData("textTitleId");
        }
    }
    window.parent.PDF_close(a);
}
function CheckIsDirty() {
    var a = KE.util.getData("textTitleId");
    return $("divTitleEditor").initContent != a;
}
function getQList(a, h) {
    var m = a.dataNode._topic;
    var c = "";
    c += "<div style='border-top:1px solid #ccddff;margin:10px 0;'>";
    for (var d = 0,
    f = questionHolder.length; d < f; d++) {
        var k = questionHolder[d].dataNode;
        if (k._type == "page" || k._type == "cut") {
            continue;
        }
        var l = k._topic;
        if (h == 2 && questionHolder[d] == a) {
            break;
        }
        var g = (l - m > 0 && h == 1) || (h == 2);
        if (h == 2 && k._type != "question" && k._type != "radio" && k._type != "radio_down" && k._type != "check") {
            continue;
        }
        if (g) {
            var b = l + ".";
            if (WjxActivity._use_self_topic) {
                b = "";
            }
            var e = k._title.replace(/<.+?>/gim, "");
            var j = "";
            if (h == 1) {
                j = "jumpSelected(" + l + ",this);return false;";
            } else {
                j = "referSelected(" + l + ",this);return false;";
            }
            c += "<div style='margin-top:6px;'><a class='link-U666' onclick='" + j + "' href='javascript:void(0);'  title='" + e + "'>" + b + e.substring(0, 23) + "</a></div>";
        }
    }
    c += "</div></div>";
    return c;
}
function openReferWindow(b, c) {
    var a = "&nbsp;<span style='color:#333;font-weight:bold;'>请选择要引用的题目：</span>";
    a += getQList(b, 2);
    toolTipLayer.innerHTML = a;
    toolTipLayer.referObj = c;
    toolTipLayer.style.width = "300px";
    sb_setmenunav(toolTipLayer, true, c);
}
function referSelected(b, e) {
    var d = "[q" + b + "]";
    var a = cur.gettextarea();
    var c = a.value.match(/\[q(\d+)\]/);
    if (c && isInt(c[1])) {
        alert("此题已经设置了引用到第" + c[1] + "题！");
        return;
    }
    var f = a.value.length;
    a.focus();
    if (typeof document.selection != "undefined") {
        document.selection.createRange().text = d;
    } else {
        a.value = a.value.substr(0, a.selectionStart) + d + a.value.substring(a.selectionEnd, f);
    }
    cur.checkTitle();
    toolTipLayer.style.width = "250px";
    show_status_tip("操作成功，被引用题目[" + b + "]的答案将会显示在此题标题中！", 6000);
    sb_setmenunav(toolTipLayer, false);
}
var jumpTipLayer = null;
function showJumpOver(a) {
    if (!jumpTipLayer) {
        jumpTipLayer = toolTipLayer.cloneNode(true);
        document.body.appendChild(jumpTipLayer);
    }
    jumpTipLayer.style.width = "250px";
    jumpTipLayer.innerHTML = "提示：题号“-1”表示当用户<b style='color:red;'>点击下一页</b>时，系统会自动提交并将答卷标为无效。请在题目后面添加<b style='color:red;'>分页栏</b>。";
    sb_setmenunav(jumpTipLayer, true, a);
}
function openJumpWindow(c, d, a) {
    var b = "&nbsp;<span style='color:#333;font-weight:bold;'>请选择要跳转到的题目：</span>";
    b += "<div style='padding:5px;'>";
    if (!a) {
        b += "<a onclick='jumpSelected(0,this);return false;' href='javascript:void(0);' title='提示：题号“0”表示顺序填写下一题' class='link-UF90'>跳到下一题</a>\r\n&nbsp;&nbsp;";
    }
    b += "<a onclick='jumpSelected(1,this);return false;'  href='javascript:void(0);' title='提示：题号“1”表示直接跳到问卷末尾' class='link-UF90'>跳到问卷末尾</a>\r\n&nbsp;&nbsp;";
    if (!a) {
        b += "<a onclick='jumpSelected(-1,this);return false;' href='javascript:void(0);'  onmouseover='showJumpOver(this);' onmouseout='sb_setmenunav(jumpTipLayer,false,this);'  class='link-UF90'>提交为无效答卷</a>\r\n";
    }
    b += getQList(c, 1);
    b += "</div>";
    toolTipLayer.innerHTML = b;
    toolTipLayer.jumpObj = d;
    toolTipLayer.style.width = "300px";
    sb_setmenunav(toolTipLayer, true, d);
}
function openDelWindow(c, d) {
    var a = c.dataNode._topic;
    var b = "";
    b += "<div style='margin:2px 0;'>";
    b += "<a onclick='sb_setmenunav(toolTipLayer,false);PDF_launch(\"/wjx/design/deletebatchq.aspx?ct=" + a + "\",500,250);return false;'  href='javascript:void(0);' style='font-size:12px;' class='link-444'>批量删除</a>";
    b += "</div>";
    batchDeleteMenu.innerHTML = b;
    sb_setmenunav(batchDeleteMenu, true, d);
}
function openValWindow(b, c) {
    var a = "<div style='padding:5px 10px;'>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(2);return false;' class='link-444' href='javascript:void(0);'>交换选项分数</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(0);return false;' class='link-444' href='javascript:void(0);'>分数<b>从1开始</b>顺序递增</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(1);return false;' class='link-444' href='javascript:void(0);'>选项分数全部<b>加1</b></a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(-1);return false;' class='link-444' href='javascript:void(0);'>选项分数全部<b>减1</b></a></div>";
    a += "</div>";
    toolTipLayer.innerHTML = a;
    toolTipLayer.valObj = b;
    toolTipLayer.style.width = "150px";
    sb_setmenunav(toolTipLayer, true, c);
}
function valChanged(f) {
    if (!toolTipLayer.valObj) {
        return;
    }
    var c = toolTipLayer.valObj;
    var h = toolTipLayer.valObj.dataNode;
    var g = c.option_radio;
    if (f == 0) {
        for (var d = 1; d < g.length; d++) {
            if (g[d].get_item_value().value != "") {
                g[d].get_item_value().value = d;
            }
        }
    } else {
        if (f == 2) {
            var e = 1;
            var a = g.length - 1;
            while (e < a) {
                var b = g[a].get_item_value().value;
                g[a].get_item_value().value = g[e].get_item_value().value;
                g[e].get_item_value().value = b;
                if (g[a].get_item_novalue()) {
                    b = g[a].get_item_novalue().checked;
                    g[a].get_item_novalue().checked = g[e].get_item_novalue().checked;
                    g[e].get_item_novalue().checked = b;
                }
                e++;
                a--;
            }
        } else {
            for (var d = 1; d < g.length; d++) {
                if (g[d].get_item_value().value != "") {
                    g[d].get_item_value().value = parseInt(h._select[d]._item_value) + f;
                }
            }
        }
    }
    c.updateItem();
    toolTipLayer.valObj = null;
    sb_setmenunav(toolTipLayer, false);
}
function openProvinceWindow(a, c) {
    var b = "北京,天津,河北,山西,内蒙古,辽宁,吉林,黑龙江,上海,江苏,浙江,安徽,福建,江西,山东,河南,湖北,湖南,广东,广西,海南,重庆,四川,贵州,云南,西藏,陕西,宁夏,甘肃,青海,新疆,香港,澳门,台湾,其它国家,不指定";
    var g = "<div style='padding:5px 10px;'>";
    var f = b.split(",");
    for (var d = 1; d <= f.length; ++d) {
        var j = f[d - 1];
        var e = "link-06f";
        if (j == "不指定") {
            e = "link-f60";
        }
        var h = "<span style='cursor:pointer;margin-top:3px;'><a onclick='provinceChanged(this);return false;' class='" + e + "' href='javascript:void(0);'>" + j + "</a></span>";
        g += h;
        if (d % 8 == 0) {
            g += "<div></div>";
        } else {
            g += "&nbsp;&nbsp;";
        }
    }
    g += "</div>";
    toolTipLayer.innerHTML = g;
    toolTipLayer.provinceObj = c;
    toolTipLayer.style.width = "360px";
    sb_setmenunav(toolTipLayer, true, c);
}
function provinceChanged(a) {
    if (!toolTipLayer.provinceObj) {
        return;
    }
    toolTipLayer.provinceObj.value = a.innerHTML;
    if (toolTipLayer.provinceObj.value == "不指定") {
        toolTipLayer.provinceObj.value = "";
    }
    if (toolTipLayer.provinceObj.onblur) {
        toolTipLayer.provinceObj.onblur();
    }
    toolTipLayer.provinceObj = null;
    sb_setmenunav(toolTipLayer, false);
}
function jumpSelected(a, c) {
    if (!vipUser && a < 0) {
        alert("提示：此功能只对企业版用户开放！");
        return;
    }
    var b = "";
    if (toolTipLayer.jumpObj) {
        b = toolTipLayer.jumpObj.value;
        toolTipLayer.jumpObj.value = a || "0";
        toolTipLayer.jumpObj.title = c.innerHTML;
        if (toolTipLayer.jumpObj.onblur) {
            toolTipLayer.jumpObj.onblur();
        }
        toolTipLayer.jumpObj = null;
        if (cur && cur.updateItem) {
            cur.updateItem();
        }
    }
    if (a == -1 && b != "-1") {
        if (confirm("此功能需要在该题后面添加分页栏才能生效，是否添加分页栏？")) {
            curinsert = cur;
            createFreQ("page");
        }
    }
    toolTipLayer.style.width = "250px";
    toolTipLayer.style.display = "none";
}
function getPageQCount() {
    var c = 0;
    var d = new Array();
    var a = 0;
    for (var b = 0; b < questionHolder.length; b++) {
        if (questionHolder[b].dataNode._type == "page") {
            c++;
            d.push(a);
            a = 0;
        } else {
            if (questionHolder[b].dataNode._type != "cut") {
                a++;
            }
        }
    }
    d.push(a);
    return d;
}
function initPageQuestionRandom() {
    var b = "/wjx/design/setrandom.aspx";
    var a = "题目随机设置";
    PDF_launch(b, 540, 300, null, a);
}
function setTikuRandom() {
    var b = "/wjx/design/settiku.aspx";
    var a = "题库随机设置";
    if (WjxActivity._random_mode == "3") {
        b = "/wjx/design/settikuold.aspx";
    }
    PDF_launch(b, 540, 400, null, a);
}
function $import(b) {
    var a = document.createElement("script");
    a.setAttribute("src", b);
    a.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(a);
}
function $importNoCache(a) {
    $import(a);
}
function loadComplete() {
    show_status_tip("成功获得数据", 2000);
    save_paper("init", false);
    setSidePos();
    divMenu.style.visibility = "visible";
    topnav.style.visibility = "visible";
    $importNoCache("/static/cpis/Js/operation_new.js?v=15");
    $importNoCache("/static/cpis/kindeditor/kindeditor.js?v=2");
    $importNoCache("/static/cpis/Js/createqattr_new.js?v=30");
    $importNoCache("/static/cpis/Js/utility_new.js?v=1");
}
function getXmlHttp() {
    var a;
    try {
        a = new XMLHttpRequest();
    } catch(b) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(b) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(b) {}
        }
    }
    return a;
}
function removeEventSimple(c, a, b) {
    if (c.removeEventListener) {
        c.removeEventListener(a, b, false);
    } else {
        if (c.detachEvent) {
            c.detachEvent("on" + a, b);
        }
    }
}
function addEventSimple(c, a, b) {
    if (c.addEventListener) {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        }
    }
}
function control_text(b) {
    var a = document.createElement("input");
    a.type = "text";
    a.style.width = b * 10 + "px";
    a.className = "choicetxt";
    return a;
}
function control_image(b) {
    var a = document.createElement("img");
    a.src = b;
    return a;
}
function control_check() {
    var a = document.createElement("input");
    a.type = "checkbox";
    a.tabIndex = "-1";
    return a;
}
function control_textarea(c, b) {
    var a = document.createElement("textarea");
    a.wrap = "soft";
    a.rows = c;
    a.style.width = b * 10 + "px";
    a.style.height = c * 22 + "px";
    a.className = "inputtext";
    return a;
}
function control_btn(b) {
    var a = document.createElement("input");
    a.type = "button";
    a.value = b;
    return a;
}
function control_radio(a) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        try {
            var c = document.createElement('<input type="radio" name="' + a + '" />');
            return c;
        } catch(b) {
            var c = document.createElement("input");
            c.type = "radio";
            c.name = a;
            return c;
        }
    } else {
        var c = document.createElement("input");
        c.type = "radio";
        c.name = a;
        return c;
    }
}
function addTouPiao(c, b, a) {
    if (b._displayPercent || b._displayNum) {
        if (b._displayNum) {
            c.append("<span style='color:#ff6600;'>0票</span>");
        }
        if (b._displayPercent) {
            if (b._displayNum) {
                c.append("(");
            }
            c.append("0%");
            if (b._displayNum) {
                c.append(")");
            }
        }
    }
}
var txtCurCity = null;
function openCityBox(e, d, c, f) {
    txtCurCity = e;
    ZheZhaoControl = txtCurCity;
    f = f || "";
    var a = e.getAttribute("province");
    var b = "";
    if (a) {
        b = "&pv=" + encodeURIComponent(a);
    }
    if (d == 3) {
        PDF_launch("/wjx/design/setcitycounty.aspx?activityid=" + activityID + "&ct=" + d + b + "&pos=" + f, 470, 220);
    } else {
        if (d == 4) {
            ZheZhaoControl = null;
            PDF_launch("/wjx/design/school.aspx?activityid=" + activityID + b, 700, 340);
        } else {
            if (d == 5) {
                PDF_launch("/wjx/design/setmenupreview.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 470, 220);
            } else {
                if (d == 6) {
                    PDF_launch("/wjx/join/amap.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 600, 700);
                } else {
                    PDF_launch("/wjx/design/setcity.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 470, 220);
                }
            }
        }
    }
}
function setCityBox(a) {
    txtCurCity.value = a;
}
function setBatchA() {
    var b = document.getElementById("divbatchq");
    var a = b.getElementsByTagName("a")[0];
    if (isKaoShi || hasCeShiQ) {
        a.innerHTML = "批量添加考试题";
        a.onclick = function() {
            PDF_launch("addbatchq.aspx?ks=1", 620, 450, null, "批量添加考试题");
        };
    } else {
        a.innerHTML = "批量添加题目";
        a.onclick = function() {
            PDF_launch("addbatchq.aspx", 620, 450, null, "批量添加题目");
        };
    }
}
function showhidebatq() {
    var a = document.getElementById("divbatchq");
    if (!a) {
        return;
    }
    if (total_question > 0 || batAddQTimes > 0) {
        a.style.display = "";
    } else {
        a.style.display = "none";
    }
    setBatchA();
}
function create_question(g) {
    var am = g._type;
    var w = g._verify;
    var A = g._height > 1;
    _likertMode = g._tag || 0;
    var K = false;
    var h = false;
    if (isMergeAnswer && isCompleteLoad) {
        h = true;
    }
    var G = document.createElement("div");
    G.className = "div_question";
    G.dataNode = g;
    G.tabIndex = -1;
    var Q = $ce("div", "", G);
    Q.className = "div_preview";
    G.div_question_preview = Q;
    var P = am == "question";
    var M = am == "slider";
    var Z = am == "sum";
    var W = am == "page";
    var J = am == "cut";
    var b = am == "check";
    var n = am == "radio";
    var u = n && _likertMode;
    var r = n && _likertMode > 1;
    var i = am == "radio_down";
    var e = am == "matrix";
    var a = am == "matrix" && _likertMode > 300;
    var L = b && _likertMode;
    var af = am == "fileupload";
    var m = n || i || b || e;
    var ak = !J && !W;
    var S = am == "gapfill";
    G.isMergeNewAdded = h;
    if (ak) {
        total_question++;
    }
    QIndentity++;
    showhidebatq();
    var l = document.createElement("div");
    if (ak) {
        var T = g._topic;
        T = T - totalHideQcount;
        var ae = T + "";
        if (T - 100 < 0) {
            ae += ".";
        }
        if (newQType == 5) {
            if (T == 1) {
                ae = "";
            } else {
                ae = (T - 1) + ".";
            }
        }
        if (hasCeShiQ) {
            if (!g._isCeShi) {
                ae = "";
                totalHideQcount++;
            }
        }
        var I = $ce("div", ae, l);
        G.divTopic = I;
        I.className = "div_topic_question";
        if (g._topic - 100 >= 0) {
            I.style.fontSize = "14px";
        }
        if (WjxActivity._use_self_topic) {
            I.style.display = "none";
        }
    }
    if (W) {
        var j = g._iszhenbie;
        var s = "<span style='font-size:14px; font-weight:bold;'>第" + g._topic + "页/共" + total_page + "页</span>";
        if (total_page == 1) {
            s = "";
        }
        var I = $ce("span", s, l);
        I.className = "div_topic_page_question";
        G.title = "分页栏";
        G.divTopic = I;
        G.divZhenBie = $ce("span", "<b style='color:red;'>--甄别页</b>", l);
        if (g._istimer) {
            $ce("span", "<b style='color:red;'>--时间页</b>", l);
        }
        G.divZhenBie.style.display = j ? "": "none";
        G.divTimeLimit = $ce("span", "", l);
        G.showTimeLimit = function() {
            var v = "";
            if (this.dataNode._istimer) {
                if (this.dataNode._mintime) {
                    v = "<b style='color:green;'>页面停留时间：" + this.dataNode._mintime + "秒</b>";
                }
            } else {
                if (this.dataNode._mintime) {
                    v = "<b style='color:green;'>最短填写时间：" + this.dataNode._mintime + "秒</b>";
                }
                if (this.dataNode._maxtime) {
                    if (v) {
                        v += "&nbsp;";
                    }
                    v += "<b style='color:red;'>最长填写时间：" + this.dataNode._maxtime + "秒</b>";
                }
            }
            if (v) {
                v = "&nbsp;&nbsp;--" + v + "";
            }
            G.divTimeLimit.innerHTML = v;
        };
        G.showTimeLimit();
        if (g._topic == "1") {
            isPrevFirstPage = true;
        }
    }
    if (J) {
        l.className = "div_title_cut_question";
    }
    if (ak) {
        l.className = "div_title_question_all";
    }
    if (g._isQingJing) {
        l.style.display = "none";
    }
    var p = $ce("div", "", l);
    var ah = g._title;
    if (S) {
        var t = "<div style='margin-top:8px;'></div>";
        ah = replaceGapFill(ah, g).replace(/\<br\s*\/\>/g, t);
    } else {
        if (J) {
            ah = ah || "请在此输入说明文字";
            if (ah.length <= 10) {
                ah = "<b>" + ah + "</b>";
            }
        }
    }
    var ac = $ce("span", ah, p);
    if (W) {
        p.className = "div_title_page_question";
        p.style.margin = "0px auto";
    } else {
        if (J && g._video) {
            var F = "<iframe height='498' width='510' src='" + g._video + "' frameborder=0 allowfullscreen></iframe>";
            G.div_video_title = $ce("div", F, p);
        } else {
            p.className = "div_title_question";
        }
    }
    G.get_div_title = function() {
        return ac;
    };
    if (ak) {
        var al = $ce("span", "&nbsp;*", p);
        G.setreqstatus = function() {
            al.style.color = "red";
            al.style.display = this.dataNode._requir ? "": "none";
            if (S) {
                if (this.checkTitle) {
                    this.checkTitle();
                }
                if (!EndGapReq || this.dataNode._partRequir) {
                    al.style.display = "none";
                }
            } else {
                if (this.dataNode._requir && this.dataNode._type == "matrix" && this.dataNode._tag == "201" && this.dataNode._partRequir) {
                    al.style.display = "none";
                }
            }
            return al;
        };
        G.setreqstatus();
        if (P) {
            var z = $ce("span", "", p);
            z.className = "font-a0";
            G.showMinMaxWord = function(ap, an) {
                var at = this.dataNode;
                var ao = "";
                var aq = type_wd_words;
                var ar = type_wd_minlimit;
                var v = at._verify == "数字" || at._verify == "小数";
                if (v) {
                    aq = "";
                    ar = type_wd_minlimitDigit;
                    ao = type_wd_digitfrom;
                }
                if (!isEmpty(ap) && !isEmpty(an)) {
                    z.innerHTML = "&nbsp;（" + ao + an + type_wd_to + ap + aq + "）";
                    z.style.display = "";
                    if (an == ap && !v) {
                        z.innerHTML = "&nbsp;（" + ap + type_wd_words + "）";
                        if (at._verify == "学号") {
                            z.innerHTML = "&nbsp;（" + ap + "位数字）";
                        }
                    }
                } else {
                    if (!isEmpty(ap)) {
                        z.innerHTML = "&nbsp;（" + ap + type_wd_limit + "）";
                        if (v) {
                            z.innerHTML = "&nbsp;（" + type_wd_maxlimitDigit + ap + "）";
                        }
                        z.style.display = "";
                    } else {
                        if (!isEmpty(an)) {
                            z.innerHTML = "&nbsp;（" + ar + an + aq + "）";
                            z.style.display = "";
                        } else {
                            z.style.display = "none";
                        }
                    }
                }
            };
            G.showMinMaxWord(g._maxword, g._minword);
            G.get_span_maxword = function() {
                return z;
            };
        }
        if (g._isCeShi && (P || n || b)) {
            var C = $ce("span", "", p);
            C.style.color = "#efa030";
            if (P) {
                G.setCeshiQTip = function() {
                    var v = "答案：" + g._answer;
                    if (g._answer == "简答题无答案") {
                        v = "无标准答案需人工评分";
                    }
                    C.innerHTML = "（" + v + "，分值：" + g._ceshiValue + "分）";
                };
                G.setCeshiQTip();
            } else {
                C.innerHTML = "（分值：" + g._ceshiValue + "分）";
            }
            G.spanCeShi = C;
        }
        if (g._isTouPiao) {
            var O = $ce("span", "", p);
            O.style.color = "#efa030";
            var U = "&nbsp;投票题";
            O.innerHTML = U;
        }
        if (b || (e && _likertMode == "102")) {
            var aj = document.createElement("span");
            G.updateSpanCheck = function() {
                var aq = this.dataNode;
                if (aq._isShop) {
                    return;
                }
                aq._lowLimit = aq._lowLimit || "";
                aq._upLimit = aq._upLimit || "";
                var v = type_check;
                if (e) {
                    v = "多选题";
                }
                var ap = "";
                var ao = false;
                if (L) {
                    ap = "-1";
                }
                var an = "";
                if (!aq._isTouPiao) {
                    an = "[";
                }
                if (aq._lowLimit != ap && aq._upLimit != ap) {
                    if (aq._lowLimit == aq._upLimit) {
                        aj.innerHTML = "&nbsp;" + an + type_check_limit1 + "<b>" + aq._lowLimit + "</b>" + type_check_limit5;
                    } else {
                        aj.innerHTML = "&nbsp;" + an + type_check_limit1 + "<b>" + aq._lowLimit + "</b>-<b>" + aq._upLimit + "</b>" + type_check_limit5;
                    }
                    ao = true;
                } else {
                    if (aq._lowLimit != ap) {
                        aj.innerHTML = "&nbsp;" + an + type_check_limit3 + "<b>" + aq._lowLimit + "</b>" + type_check_limit5;
                        ao = true;
                    } else {
                        if (aq._upLimit != ap) {
                            aj.innerHTML = "&nbsp;" + an + type_check_limit4 + "<b>" + aq._upLimit + "</b>" + type_check_limit5;
                            ao = true;
                        } else {
                            aj.innerHTML = "&nbsp;" + an + v;
                        }
                    }
                }
                if (L) {
                    if (ao) {
                        if (aq._lowLimit == "" || aq._lowLimit == aq._select.length - 1) {
                            aj.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + type_order_all + "</b>" + type_check_limit5;
                        }
                        aj.innerHTML += type_order_limit_end;
                    } else {
                        aj.innerHTML = "&nbsp;[" + type_order;
                    }
                }
                if (!aq._isTouPiao) {
                    aj.innerHTML += "]";
                }
                aj.className = "qtypetip";
            };
            G.updateSpanCheck();
            p.appendChild(aj);
        } else {
            if (a) {
                var aj = $ce("span", "", p);
                G.updateSpanCheck = function() {
                    if (this.dataNode._tag == "301" && this.dataNode._minvalue !== "" && this.dataNode._maxvalue !== "") {
                        aj.innerHTML = "&nbsp;[输入" + this.dataNode._minvalue + "到" + this.dataNode._maxvalue + "的数字]";
                        aj.className = "qtypetip";
                    } else {
                        aj.innerHTML = "";
                    }
                    aj.style.display = this.dataNode._tag == "301" ? "": "none";
                };
                G.updateSpanCheck();
            }
        }
        if (e) {
            if (g._tag == "102" || g._tag == "103") {
                var o = $ce("span", "", p);
                G.updateSpanMatrix = function() {
                    if (g._daoZhi) {
                        var v = "竖向单选";
                        if (g._tag == "102") {
                            v = "竖向多选";
                        }
                        o.innerHTML = "&nbsp;[" + v + "]";
                        o.className = "qtypetip";
                    } else {
                        o.innerHTML = "";
                    }
                };
                G.updateSpanMatrix();
            }
        }
    }
    var ab = $ce("div", "", l);
    ab.style.clear = "both";
    Q.appendChild(l);
    if (ak) {
        var y = document.createElement("div");
        y.className = "div_table_radio_question";
        var q = $ce("div", "", y);
        q.className = "div_table_clear_top";
        Q.appendChild(y);
        if (g._isQingJing) {
            y.style.paddingLeft = "0";
        }
    }
    if (P) {
        var B = $ce("div", "", y);
        B.style.position = "relative";
        var D = control_textarea("1", "50");
        B.appendChild(D);
        var d = $ce("span", "", B);
        d.style.position = "absolute";
        d.style.left = "3px";
        d.style.top = "3px";
        D.style.overflow = "auto";
        $ce("div", "", y).className = "div_table_clear_bottom";
        if (g._verify != "省市区" && g._verify != "高校") {
            D.value = g._default;
        } else {
            if (g._default) {
                D.value = "指定省份为：" + g._default;
            }
        }
        G.showTextAreaUnder = function() {
            D.className = this.dataNode._underline ? "underline": "inputtext";
        };
        G.showTextAreaWidth = function() {
            if (isEmpty(this.dataNode._width)) {
                D.style.width = "62%";
            } else {
                D.style.width = this.dataNode._width + "px";
                D.style.display = this.dataNode._width == 1 ? "none": "";
            }
        };
        G.showTextAreaHeight = function() {
            D.style.height = this.dataNode._height * 22 + "px";
        };
        G.showSmsVerify = function() {
            if (!this.divsms) {
                var v = $ce("div", "", y);
                v.style.marginTop = "15px";
                v.innerHTML = "<a href='javascript:void(0);' style='padding:5px 6px;height:20px;border:1px solid #ccc;background:#eeeeee;display:inline-block;color:#555;font-size:12px;float:left;'>发送验证短信</a><textarea style='text-align:center;width:66px;height:26px;line-height:26px;padding:2px;display:inline-block;border:1px solid #ccc;border-left:none;float:left;overflow:auto;tabindex:-1;' placeholder='验证码'></textarea><div class='divclear'></div>";
                this.divsms = v;
            }
            this.divsms.style.display = (this.dataNode._verify == "手机" && this.dataNode._needsms) ? "": "none";
        };
        G.showTextAreaDate = function() {
            var v = this.dataNode._verify;
            var an = this.dataNode._topic;
            D.onclick = null;
            var ao = "";
            d.innerHTML = "";
            if (v == "日期" || v == "生日" || v == "入学时间") {
                D.style.width = "100px";
                D.style.height = "22px";
                ao = "/images/form/date.png";
            } else {
                if (v == "数字" || v == "小数") {
                    D.style.width = "150px";
                    D.style.height = "22px";
                } else {
                    if (v == "城市单选" || v == "城市多选" || v == "省市区" || v == "高校" || v == "多级下拉" || v == "地图") {
                        var aq = "100px";
                        var ap = 1;
                        var ao = "/images/form/city.png";
                        if (v == "城市多选") {
                            aq = "400px";
                            ap = 2;
                        } else {
                            if (v == "省市区") {
                                aq = "250px";
                                ap = 3;
                            } else {
                                if (v == "高校") {
                                    aq = "250px";
                                    ap = 4;
                                    ao = "/images/form/school.png";
                                } else {
                                    if (v == "多级下拉") {
                                        aq = "400px";
                                        ap = 5;
                                        ao = "/images/form/click.png";
                                    } else {
                                        if (v == "地图") {
                                            aq = "400px";
                                            ap = 6;
                                            ao = "/images/form/map.png";
                                        }
                                    }
                                }
                            }
                        }
                        D.style.width = aq;
                        D.style.height = "22px";
                        D.onclick = function() {
                            openCityBox(this, ap, null, an);
                        };
                    } else {
                        if (v == "手机") {
                            ao = "/images/form/mobile.png";
                        } else {
                            if (v == "Email") {
                                ao = "/images/form/email.png";
                            } else {
                                if (v == "电话" || v == "固话") {
                                    ao = "/images/form/tel.png";
                                } else {
                                    if (v == "QQ") {
                                        ao = "/images/form/qq.png";
                                    } else {
                                        if (v == "姓名") {
                                            ao = "/images/form/name.png";
                                        } else {
                                            if (v == "网址") {
                                                ao = "/images/form/website.png";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        d.innerHTML = "";
                        this.showTextAreaWidth();
                        this.showTextAreaHeight();
                    }
                }
            }
            if (ao) {
                d.innerHTML = "<img src='" + ao + "' alt=''/>";
            }
        };
        G.showTextAreaUnder();
        G.showTextAreaWidth();
        G.showTextAreaHeight();
        G.showTextAreaDate();
        if (G.dataNode._needsms) {
            G.showSmsVerify();
        }
        G.get_textarea = function() {
            return D;
        };
    }
    if (af) {
        var x = $ce("div", "", y);
        var k = $ce("div", "请选择上传文件", y);
        G.updateFileUpload = function() {
            var an = g._maxsize;
            var ar = "";
            if (an % 1024 == 0) {
                ar = "（不超过" + (an / 1024) + "M）";
            } else {
                ar = "（不超过" + an + "KB）";
            }
            var at = getIEVersion();
            var ap = at && (!document.documentMode || document.documentMode < 8);
            var ao = at <= 7 || ap;
            var aq = "position:relative;";
            if (ao) {
                aq = "";
            }
            var v = '<div style="width: 200px;height: 30px; background:#fff;' + aq + ' text-align: center; line-height: 30px; overflow: hidden;border:1px solid #d5d5d5;color:#333;margin-bottom:5px;">选择文件' + ar;
            if (!ao) {
                v += '<input type="file" style="position: absolute;left: 0;top: 0;height: 30px; filter:alpha(opacity=0);opacity:0; background-color: transparent;width:200px; font-size:180px;"/>';
            }
            v += "</div>";
            x.innerHTML = v;
            if (g._ext) {
                k.innerHTML = "请选择上传文件，扩展名为" + g._ext;
            } else {
                k.innerHTML = "请选择上传文件，扩展名为" + defaultFileExt;
            }
        };
        G.updateFileUpload();
    }
    if (S) {}
    if (M) {
        var V = $ce("span", g._minvaluetext || "", y);
        V.className = "spanLeft";
        V.style.color = "red";
        G.get_span_min_value_text = function() {
            return V;
        };
        var f = $ce("span", "(" + (g._minvalue || 0) + ")", y);
        f.className = "spanLeft";
        f.style.color = "red";
        G.get_span_min_value = function() {
            return f;
        };
        var E = $ce("span", "(" + (g._maxvalue || 100) + ")", y);
        E.className = "spanRight";
        E.style.color = "red";
        G.get_span_max_value = function() {
            return E;
        };
        var H = $ce("span", g._maxvaluetext || "", y);
        H.className = "spanRight";
        H.style.color = "red";
        G.get_span_max_value_text = function() {
            return H;
        };
        $ce("div", "", y).className = "divclear";
        var N = control_image("/Images/WJX/JoinQuestionnaire/slider1.jpg");
        N.style.width = "10px";
        var ag = control_image("/Images/WJX/JoinQuestionnaire/sliderEnd.jpg");
        ag.style.width = "97%";
        ag.style.height = "23px";
        y.appendChild(N);
        y.appendChild(ag);
        $ce("div", "", y).className = "divclear";
        y.style.width = "60%";
        var D = control_textarea("1", "10");
        D.style.display = "none";
    }
    if (Z) {
        G.createSum = function() {
            var at = new StringBuilder();
            at.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                at.append("此题行标题来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                at.append("<table style='width:100%;' border='0px'  cellpadding='5' cellspacing='0'>");
                var ao = "";
                var v = "";
                at.append("<tbody>");
                var ar = new Array();
                ar = trim(g._rowtitle).split("\n");
                var aq = "";
                for (var an = 0; an < ar.length; an++) {
                    if (an == ar.length - 1) {
                        ao = "";
                        v = "";
                    }
                    if (ar[an].length > 4 && ar[an].substring(0, 4) == "【标签】") {
                        var ap = ar[an].substring(4);
                        at.append("<tr><th align='left'><b style='color:#0066ff;'>" + ap + "</b></th><td></td></tr>");
                        aq = "padding-left:10px;";
                        continue;
                    }
                    if (g._rowwidth == "") {
                        at.append("<tr><th align='left' style='" + v + aq + "'>" + ar[an] + "</th>");
                    } else {
                        at.append("<tr><th align='left' style='width:" + g._rowwidth + ";" + v + aq + "'>" + ar[an] + "</th>");
                    }
                    at.append("<td  " + ao + "align='left' width='36'><input  type='text' style='width:36px;'/></td>");
                    at.append("<td  " + ao + "align='left'><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:250px;height: 23px;'/></td>");
                    at.append("</tr>");
                }
                at.append("</tbody></table>");
            }
            at.append("<div style='margin-top:10px;'><span style='color:#666666;'>" + sum_hint + "</span></div>");
            y.innerHTML = at.toString("");
        };
        G.createSum();
    }
    if (m) {
        G.createTableRadio = function() {
            var aN = this.dataNode;
            var be = aN._isTouPiao;
            var aD = aN._isCeShi;
            var aO = aN._isCePing;
            var bO = aN._numperrow ? aN._numperrow: 1;
            var bl = aN._select;
            var aS = aN._tag;
            var aK = aN._displayThumb;
            var bD = be && aK && bl[1]._item_img;
            if (bD) {
                bO = 4;
            }
            var bw = new StringBuilder();
            bw.append("<div  class='div_table_clear_top'></div>");
            var aY = false;
            if (this._referDivQ) {
                var ay = "选项";
                if (aN._type == "matrix" || aN.type == "sum") {
                    ay = "行标题";
                }
                aY = true;
                var ap = "第" + this._referDivQ.dataNode._topic + "题";
                if (newQType == 5 && (aN._type == "matrix" || aN.type == "sum")) {
                    aY = false;
                }
                if (newQType == 5) {
                    bw.append("<span style='color:red;'>");
                    ap = "被测评对象";
                }
                bw.append("此题" + ay + "来源于" + ap + "的选中项");
                if (newQType == 5) {
                    bw.append("</span>");
                }
            } else {
                if (aN._isQingJing) {
                    var ax = this.qingjing || 1;
                    if (ax >= bl.length) {
                        ax = 1;
                    }
                    aY = true;
                    bw.append("<div style='font-size:16px;color:#333;font-weight:bold;margin-top:10px;'>" + bl[ax]._item_title + "&nbsp;<a style='font-size:16px;cursor:pointer;' onclick='if(curover)curover.createTableRadio();'>切换场景</a></div>");
                    bw.append(bl[ax]._item_desc || "请设置情景说明");
                    ax++;
                    this.qingjing = ax;
                } else {
                    if (aN._isShop) {
                        aY = true;
                        bw.append("<ul>");
                        for (var aW = 1; aW < bl.length; aW++) {
                            var a5 = bl[aW]._item_title;
                            var aP = bl[aW]._item_value;
                            var bo = bl[aW]._item_img;
                            var a3 = "";
                            if (aW > 1 && aW % 3 == 1) {
                                a3 = " style='clear:both;'";
                            }
                            bw.append("<li class='shop-item' " + a3 + ">");
                            if (bo) {
                                bw.append("<div class='img_place'><img src='" + bo + "' alt='' /></div>");
                            }
                            bw.append("<div class='text_place'>");
                            bw.append("<div class='item_name'>" + a5 + "</div>");
                            bw.append('<p class="item_price">￥' + aP + "</p>");
                            bw.append('<p class="item_select"><span class="operation remove">-</span><input class="operation itemnum" value="0" disabled="disabled"><span class="operation add">+</span></p>');
                            bw.append("</div><div class='divclear'></div></li>");
                        }
                        bw.append("</ul>");
                    }
                }
            }
            if (!aY) {
                if (i) {
                    bw.append("<select><option>" + type_radio_down + "</option>");
                    for (var aW = 1; aW < bl.length; aW++) {
                        if (bl[aW]._item_radio) {
                            bw.append("<option selected='selected'>" + trim(bl[aW]._item_title) + "</option>");
                        } else {
                            bw.append("<option>" + trim(bl[aW]._item_title) + "</option>");
                        }
                    }
                    bw.append("</select>");
                }
                if (n || (b && !L)) {
                    bw.append("<ul>");
                    var aC;
                    var bk = "%";
                    if (u) {
                        aC = 40;
                        bk = "px";
                        bO = 1;
                    } else {
                        aC = (100 / bO) - 1;
                    }
                    var aI = false;
                    var bz = 1;
                    for (var aW = 1; aW < bl.length; aW++) {
                        if (am == "radio" && aS >= 1 && aS != 101 && aW == 1) {
                            var bn = "5px";
                            bw.append("<li class='notchoice' style='padding-right:15px;padding-top:" + bn + "'><b>" + bl[1]._item_title + "</b></li>");
                            if (aS == "6") {
                                bw.append("<li><ul class='onscore'>");
                            }
                        }
                        if (n && aS > 1 && aS != 101) {
                            var br = "style='padding-left:3px;'";
                            var aA = bl.length - 1;
                            var bE = "off";
                            var bA = "on";
                            if (aS == "6") {
                                var bf = parseInt(355 / aA) - 2;
                                if (aW == aA) {
                                    bf += 355 % aA;
                                }
                                if (aA >= 18) {
                                    var aG = 12;
                                    var bd = 9;
                                    if (aA == 21) {
                                        aG = 11;
                                        bd = 10;
                                    }
                                    var a4 = (aG + 2) * bd;
                                    var aJ = aA - bd;
                                    var an = 355 - a4;
                                    if (aA >= 18) {
                                        if (aW >= bd + 1) {
                                            bf = parseInt(an / aJ) - 2;
                                        } else {
                                            bf = aG;
                                        }
                                    }
                                    if (aW == aA) {
                                        bf += an % aJ;
                                    }
                                }
                                br = "style='width:" + bf + "px' ";
                                bE = "off";
                                bA = "on";
                            }
                            if (aW == aA) {
                                bw.append("<li " + br + " class='" + bE + aN._tag + "'  >");
                            } else {
                                bw.append("<li " + br + " class='" + bA + aN._tag + "'  >");
                            }
                            if (aS == "6") {
                                var bu = bl[aW]._item_value;
                                if (bu == NoValueData) {
                                    bu = "&nbsp;";
                                }
                                bw.append(bu);
                            }
                            bw.append("</li>");
                        } else {
                            if (bl[aW]._item_label) {
                                if (aI) {
                                    bw.append("</ul></li>");
                                }
                                bw.append("<li style='width:100%;'><div><b>" + bl[aW]._item_label + "</b></div><ul>");
                                aI = true;
                                bz = 1;
                            }
                            if (aS == 101) {
                                aC = trim(bl[aW]._item_title).length * 16 + 28;
                            }
                            bw.append("<li  style='width:" + aC + bk + ";");
                            if (bl[aW]._item_img) {
                                bw.append("margin-bottom:15px;");
                            }
                            bw.append("'>");
                            var v = false;
                            if ((am == "radio" || am == "check") && bl[aW]._item_radio) {
                                v = true;
                            }
                            if (!bl[aW]._item_img) {
                                if (be) {
                                    bw.append("<div style='float:left;width:" + aN._touPiaoWidth + "%;'>");
                                } else {
                                    if (aD && bl[aW]._item_radio) {
                                        bw.append("<span style='color:#efa030;'>");
                                    }
                                }
                                var bG = "jqRadio";
                                if (!n) {
                                    bG = "jqCheckbox";
                                }
                                if (v) {
                                    bG += " jqChecked";
                                }
                                bw.append("<a href='###' class='" + bG + "' style='position:static;'></a><input style='display:none;'");
                                if (n) {
                                    bw.append(" type='radio'");
                                } else {
                                    bw.append(" type='checkbox'");
                                }
                                if (v) {
                                    bw.append(" checked='checked'");
                                }
                                if (am == "radio" && aS == 1) {
                                    var ao = trim(bl[aW]._item_value);
                                    if (ao == "-77777") {
                                        ao = "";
                                    }
                                    bw.append("/><label style='vertical-align:middle;padding-left:2px;'>" + ao + "</label>");
                                } else {
                                    bw.append("/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bl[aW]._item_title) + "</label>");
                                }
                                if (bl[aW]._item_tb) {
                                    bw.append(" <input type='text' class='underline' style='color:#999999;max-width:500px;' value='" + defaultOtherText + "'/>");
                                }
                                if (bl[aW]._item_tbr) {
                                    bw.append(" <span style='color: red;'> *</span>");
                                }
                                if (be) {
                                    bw.append("</div>");
                                    bw.append("<div style='float:left;'>");
                                    addTouPiao(bw, aN, aW);
                                    bw.append("</div><div class='divclear'></div>");
                                } else {
                                    if (aD && bl[aW]._item_radio) {
                                        bw.append("&nbsp;<label style='vertical-align:middle;'>(正确答案)</label></span>");
                                    } else {
                                        if (aO) {
                                            var bM = bl[aW]._item_value;
                                            if (bM == NoValueData || bM == "") {
                                                bM = "N/A";
                                            }
                                            bw.append("<span style='color:#efa030;font-size:14px;'>&nbsp;(分值：" + bM + ")</span>");
                                        }
                                    }
                                }
                                if (aN._hasjump && aN._anytimejumpto < 1) {
                                    var au = "跳转到下一题";
                                    if (bl[aW]._item_jump == "1") {
                                        au = "结束作答";
                                    } else {
                                        if (bl[aW]._item_jump == "-1") {
                                            au = "点下一页时提交为无效答卷";
                                        } else {
                                            if (bl[aW]._item_jump - 1 > 0) {
                                                au = "跳转到第" + bl[aW]._item_jump + "题";
                                            }
                                        }
                                    }
                                    bw.append("<span style='color:#efa030;font-size:14px;'>&nbsp;(" + au + ")</span>");
                                }
                                if (bl[aW]._item_desc) {
                                    if (aN._displayDesc) {
                                        var bJ = "divDesc_" + aN._topic + "_" + aW;
                                        var at = aN._displayDescTxt || "点击查看详情";
                                        bw.append("<div style='margin:0 0 15px 20px;'><a class='link-U333' href='javascript:' onclick='showItemDesc(\"" + bJ + "\",this);'>" + at + "</a></div><div id='" + bJ + "' style='display:none;'><div style='padding:10px;'>" + bl[aW]._item_desc + "</div></div>");
                                    } else {
                                        bw.append("<div class='div_item_desc'>" + bl[aW]._item_desc + "</div>");
                                    }
                                }
                            } else {
                                var a2 = bl[aW]._item_img;
                                var bK = "";
                                var aB = "";
                                if (bD && a2.indexOf(".sojump.com") > -1) {
                                    if (a2.indexOf("pubali") > -1) {
                                        var aT = "?x-oss-process";
                                        var bg = a2.indexOf(aT);
                                        if (bg > -1) {
                                            a2 = a2.substring(0, bg);
                                        }
                                        a2 = a2 + aT + "=image/quality,q_90/resize,m_lfit,h_150,w_150";
                                    } else {
                                        var aT = "?imageMogr2";
                                        var bg = a2.indexOf(aT);
                                        if (bg > -1) {
                                            a2 = a2.substring(0, bg);
                                        }
                                        a2 = a2 + aT + "/thumbnail/150x150!";
                                    }
                                    bK = "width:152px;height:200px;";
                                    if (bl[aW]._item_tb) {
                                        bK = "width:152px;height:210px;";
                                    }
                                    aB = " style='height:150px;' ";
                                } else {
                                    bK = "margin-right:15px;";
                                }
                                bw.append("<div style='text-align:center;padding:5px;border:1px solid #ddd;" + bK + "'>");
                                bw.append("<table align='center' cellspacing='0' cellpadding='0'><tr><td>");
                                bw.append("<div" + aB + "><img style='border:none;margin:0 auto;' src='" + a2 + "' alt='' /></div>");
                                bw.append("</td></tr>");
                                if (bl[aW]._item_desc) {
                                    bw.append("<tr><td>");
                                    if (aN._displayDesc) {
                                        var bJ = "divDesc_" + aN._topic + "_" + aW;
                                        var at = aN._displayDescTxt || "点击查看详情";
                                        bw.append("<div style='text-align:center;'><a class='link-U333' href='javascript:' onclick='showItemDesc(\"" + bJ + "\",this);'>" + at + "</a></div><div id='" + bJ + "' style='display:none;'><div style='padding:10px;'>" + bl[aW]._item_desc + "</div></div>");
                                    } else {
                                        bw.append("<div class='div_item_desc'");
                                        bw.append(" style='text-align:left;");
                                        if (bD) {
                                            bw.append("height:20px;width:150px;margin-left:0px;overflow:hidden;");
                                        }
                                        bw.append("'");
                                        bw.append(">");
                                        bw.append(bl[aW]._item_desc);
                                        bw.append("</div>");
                                    }
                                    bw.append("</td></tr>");
                                }
                                bw.append("</table>");
                                bw.append("<div style='margin-top:6px;'>");
                                if (bD) {
                                    var bG = "jqRadio";
                                    if (!n) {
                                        bG = "jqCheckbox";
                                    }
                                    if (v) {
                                        bG += " jqChecked";
                                    }
                                    bw.append("<a href='###' class='" + bG + "' style='position:static;'></a><input style='display:none;'");
                                    if (n) {
                                        bw.append(" type='radio'");
                                    } else {
                                        bw.append(" type='checkbox'");
                                    }
                                    if (v) {
                                        bw.append(" checked='checked'");
                                    }
                                    if (am == "radio" && aS == 1) {
                                        bw.append("'/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bl[aW]._item_value) + "</label>");
                                    } else {
                                        bw.append("'/>");
                                    }
                                }
                                if (!bD) {
                                    var bG = "jqRadio";
                                    if (!n) {
                                        bG = "jqCheckbox";
                                    }
                                    if (v) {
                                        bG += " jqChecked";
                                    }
                                    bw.append("<a href='###' class='" + bG + "' style='position:static;'></a><input style='display:none;'");
                                    if (n) {
                                        bw.append(" type='radio'");
                                    } else {
                                        bw.append(" type='checkbox'");
                                    }
                                    if (v) {
                                        bw.append(" checked='checked'");
                                    }
                                    if (am == "radio" && aS == 1) {
                                        bw.append("'/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bl[aW]._item_value) + "</label>");
                                    } else {
                                        bw.append("'/>");
                                    }
                                }
                                if (bD) {
                                    bw.append("<label style='display:inline-block;padding:0;overflow: hidden;text-overflow: ellipsis;max-width: 125px;white-space: nowrap;vertical-align: middle;'>" + trim(bl[aW]._item_title) + "</label>");
                                } else {
                                    if (bl[aW]._item_imgtext) {
                                        bw.append(trim(bl[aW]._item_title));
                                    } else {
                                        bw.append("&nbsp;");
                                    }
                                }
                                if (bl[aW]._item_tb) {
                                    if (bD) {
                                        bw.append("<br/>");
                                    }
                                    bw.append(" <input type='text' class='inputtext' style='color:#999999;max-width:500px;' value='" + defaultOtherText + "'/>");
                                }
                                if (bl[aW]._item_tbr) {
                                    bw.append("<span style='color: red;'> *</span>");
                                }
                                bw.append("</div>");
                                bw.append("</div>");
                                if (be) {
                                    bw.append("<div style='text-align:center;'>");
                                    addTouPiao(bw, aN, aW);
                                    bw.append("</div>");
                                }
                            }
                            bw.append("</li>");
                        }
                        if (n && aS >= 1 && aS != 101 && aW == bl.length - 1) {
                            var bn = "5px";
                            if (aS == 6) {
                                bw.append("</ul></li>");
                            }
                            bw.append("<li  class='notchoice'  style='padding-left:15px;padding-top:" + bn + "'><b>" + bl[bl.length - 1]._item_title + "</b></li>");
                        }
                        if (bO > 1 && bz % bO == 0) {
                            bw.append("<div style='clear:both;'></div></ul><ul>");
                        }
                        bz++;
                    }
                    bw.append("<div style='clear:both;'></div></ul>");
                    if (aI) {
                        bw.append("</li></ul>");
                    }
                    if (aD && aN._ceshiDesc) {
                        bw.append("<div style='color:#666;'>答案解析：" + aN._ceshiDesc + "</div>");
                    }
                }
                if (L) {
                    bw.append("<div><ul>");
                    var aC;
                    aC = 100 / bO;
                    for (var aW = 1; aW < bl.length; aW++) {
                        var bt = "sortnum";
                        var av = "";
                        bw.append("<li style='float:none;margin-bottom:6px;padding:3px 0;'><input type='checkbox' style='display:none;' /><span class='" + bt + "'>" + av + "</span>" + trim(bl[aW]._item_title));
                        if (bl[aW]._item_tb) {
                            bw.append(" <input type='text' class='underline' style='color:#999999;' value=''/>");
                        }
                        if (bl[aW]._item_tbr) {
                            bw.append(" <span style='color: red;'> *</span>");
                        }
                        bw.append("</li>");
                    }
                    bw.append("</ul>");
                }
                if (e) {
                    var bI = aN._daoZhi;
                    var aH = "100%";
                    if (aN._mainWidth) {
                        aH = aN._mainWidth + "%";
                    }
                    bw.append("<table style='width:" + aH + ";' border='0px'  cellpadding='5' cellspacing='0'>");
                    var aR = "";
                    var ar = "";
                    var a7 = "radio";
                    var bN = new Array();
                    bN = trim(aN._rowtitle).split("\n");
                    var aQ = trim(aN._rowtitle2).split("\n");
                    var aX = trim(aN._rowtitle2) ? true: false;
                    if (this._referDivQ) {
                        bN = new Array();
                        for (var bC = 1; bC < this._referDivQ.dataNode._select.length; bC++) {
                            bN.push(this._referDivQ.dataNode._select[bC]._item_title);
                            if (bC == 3) {
                                break;
                            }
                        }
                        bN.push("......");
                        aX = false;
                    }
                    var bm = false;
                    var bq = "";
                    if ((aS == 0) || (aS > 100 && aS < 200) || aS > 300) {
                        bw.append("<thead><tr><th></th>");
                        if (aS > 300) {
                            var bh = trim(aN._columntitle).split("\n");
                            for (var aW = 0; aW < bh.length; aW++) {
                                bw.append("<td align='center'>" + trim(bh[aW]) + "</td>");
                            }
                        } else {
                            if (bI) {
                                for (var aW = 0; aW < bN.length; aW++) {
                                    if (bN[aW].length > 4 && bN[aW].substring(0, 4) == "【标签】") {
                                        continue;
                                    }
                                    bw.append("<td align='center'>" + trim(bN[aW]) + "</td>");
                                }
                            } else {
                                var a0 = 100;
                                var bx = 12;
                                var bv = 1;
                                for (var aW = 1; aW < bl.length; aW++) {
                                    var bj = trim(bl[aW]._item_title).length;
                                    if (bj > bv) {
                                        bv = bj;
                                    }
                                }
                                if (bv == 2) {
                                    bx = 6;
                                } else {
                                    if (bv == 3) {
                                        bx = 8;
                                    } else {
                                        var aZ = 75 / (bl.length - 1);
                                        bx = 2.4 * bv;
                                        if (bx > aZ) {
                                            bx = aZ;
                                        }
                                    }
                                }
                                if (aN._rowwidth) {
                                    a0 -= parseInt(aN._rowwidth);
                                    bx = a0 / (bl.length - 1);
                                }
                                if (aQ.length > 0 && aN._rowwidth2) {
                                    a0 -= parseInt(aN._rowwidth2);
                                    bx = a0 / (bl.length - 1);
                                }
                                for (var aW = 1; aW < bl.length; aW++) {
                                    bw.append("<td");
                                    if (bv > 1) {
                                        bw.append(" width='" + bx + "%'");
                                    }
                                    bw.append(" align='center'>" + trim(bl[aW]._item_title) + "</td>");
                                }
                            }
                        }
                        ar = "border-bottom:1px solid #efefef;";
                        aR = "style='" + ar + "'";
                        bw.append("</tr>");
                        if (aS == 101) {
                            bw.append("<tr><th style='color:#efa030;font-size:14px;' align='left'>分值</th>");
                            for (var aW = 1; aW < bl.length; aW++) {
                                var bM = trim(bl[aW]._item_value);
                                if (bM == -77777) {
                                    bM = "";
                                }
                                bw.append("<td align='center' style='color:#efa030;font-size:14px;'>" + bM + "</td>");
                            }
                            bw.append("</tr>");
                        }
                        bw.append("</thead>");
                        if (aS == 102) {
                            a7 = "checkbox";
                        }
                    }
                    if (aS == 301) {
                        a7 = "text";
                    }
                    bw.append("<tbody>");
                    if (aS == "202") {
                        var bH = aN._minvalue;
                        var az = aN._maxvalue;
                        var aw = " width='60%'";
                        var a9 = "70";
                        if (aX) {
                            aw = "";
                            a9 = "90";
                        }
                        bw.append("<tr><th></th><td align='left' width='410'><table width='100%'><tr><td " + aw + "><div style='width:" + a9 + "%'><div style='float:left;color:red;'>" + bH + "</div><div style='float:right;color:red;'>" + az + "</div><div style='clear:both;'></div></div></td></tr></table></td><th></th>");
                    }
                    var bi = false;
                    if (aS == 201 && aN._requir && aN._rowVerify) {
                        for (var aW = 0; aW < aN._rowVerify.length; aW++) {
                            if (aN._rowVerify[aW]._isRequir == false) {
                                bi = true;
                                break;
                            }
                        }
                        aN._partRequir = bi;
                        if (bi) {
                            G.setreqstatus();
                        }
                    }
                    if (!bI) {
                        var a8 = 0;
                        var bL = false;
                        var bs = "";
                        for (var aW = 0; aW < bN.length; aW++) {
                            if (aW == bN.length - 1) {
                                aR = "";
                                ar = "";
                            }
                            if (bN[aW].length > 4 && bN[aW].substring(0, 4) == "【标签】") {
                                var ba = bN[aW].substring(4);
                                bw.append("<tr class='labelname'><th align='left'><b>" + ba + "</b></th><td colspan='" + bl.length + "'></td>");
                                bw + "</tr>";
                                bm = true;
                                bq = "padding-left:20px;";
                                bL = !bL;
                                continue;
                            }
                            if (aN._rowwidth == "") {
                                bw.append("<tr><th align='left' style='" + ar + bq + "'>" + bN[aW] + "</th>");
                            } else {
                                bw.append("<tr><th align='left' style='width:" + aN._rowwidth + ";" + ar + bq + "'>" + bN[aW] + "</th>");
                            }
                            if (aS < 100 && aS) {
                                bw.append("<td>");
                                bw.append("<ul");
                                if (aS == 6) {
                                    bw.append(" class='onscore'");
                                }
                                bw.append(">");
                            }
                            if (aS > 200 && aS < 300) {
                                if (aS == 201) {
                                    var a6 = aN._rowVerify && aN._rowVerify[a8] ? aN._rowVerify[a8]._verify: "";
                                    var bB = "";
                                    var aV = "";
                                    var aF = aN._rowVerify && aN._rowVerify[a8] ? aN._rowVerify[a8]._width: "";
                                    if (aF) {
                                        aF = "width:" + aF + "%";
                                    }
                                    if (a6 == "日期") {
                                        bB = "/images/form/date.png";
                                    } else {
                                        if (a6 == "地图") {
                                            bB = "/images/form/map.png";
                                        } else {
                                            if (a6 == "手机") {
                                                bB = "/images/form/mobile.png";
                                            } else {
                                                if (a6 == "Email") {
                                                    bB = "/images/form/email.png";
                                                } else {
                                                    if (a6 == "电话" || a6 == "固话") {
                                                        bB = "/images/form/tel.png";
                                                    } else {
                                                        if (a6 == "QQ") {
                                                            bB = "/images/form/qq.png";
                                                        } else {
                                                            if (a6 == "姓名") {
                                                                bB = "/images/form/name.png";
                                                            } else {
                                                                if (a6 == "网址") {
                                                                    bB = "/images/form/website.png";
                                                                } else {
                                                                    if (a6 == "指定选项") {
                                                                        aV = aN._rowVerify[a8]._choice;
                                                                    } else {
                                                                        if (a6 == "高校") {
                                                                            bB = "/images/form/school.png";
                                                                        } else {
                                                                            if (a6 == "城市单选" || a6 == "城市多选" || a6 == "省市区") {
                                                                                bB = "/images/form/city.png";
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    bw.append("<td  " + aR + "align='left'>");
                                    bw.append("<div style='position:relative;'>");
                                    if (aV) {
                                        var aE = aV.split(/[,，]/);
                                        var bp = "<select style='border:1px solid #d5d5d5;vertical-align:middle;'><option value=''>请选择</option>";
                                        for (var aM = 0; aM < aE.length; aM++) {
                                            var a1 = aE[aM];
                                            bp += "<option value='" + a1 + "'>" + a1 + "</option>";
                                        }
                                        bp += "</select>";
                                        bw.append(bp);
                                    } else {
                                        bw.append("<textarea class='inputtext' style='overflow:auto;height:22px;" + aF + "'></textarea>");
                                        if (bB) {
                                            bw.append("<img src='" + bB + "' alt='' style='position:absolute;top:3px;left:3px;'/>");
                                        }
                                    }
                                    var bF = true;
                                    if (aN._rowVerify[a8] && aN._rowVerify[a8]._isRequir == false) {
                                        bF = false;
                                    }
                                    if (bi && bF) {
                                        bw.append("<span class='req'>&nbsp;*</span>");
                                    }
                                    bw.append("</div>");
                                    bw.append("</td>");
                                } else {
                                    if (aS == 202) {
                                        var aw = " width='60%'";
                                        var a9 = "70";
                                        if (aX) {
                                            aw = "";
                                            if (!aN._rowwidth2) {
                                                aw = " width='30%'";
                                            }
                                            a9 = "90";
                                        }
                                        bw.append("<td  " + aR + "align='left' " + aw + "><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:" + a9 + "%;height: 23px;'/></td>");
                                    }
                                }
                            } else {
                                if (aS > 300) {
                                    var by = "";
                                    if (aS == "303") {
                                        by += "<select><option>" + type_radio_down + "</option>";
                                        for (var bc = 1; bc < bl.length; bc++) {
                                            by += "<option>" + trim(bl[bc]._item_title) + "</option>";
                                        }
                                        by += "</select>";
                                    }
                                    var bh = trim(aN._columntitle).split("\n");
                                    var bb = Number(300 / bh.length);
                                    for (var aU = 0; aU < bh.length; aU++) {
                                        var aq = "";
                                        if (aS == "303") {
                                            bw.append("<td  " + aR + "align='center'>" + by + "</td>");
                                        } else {
                                            if (aS == "301") {
                                                bb = "30";
                                            }
                                            bw.append("<td  " + aR + "align='center'>");
                                            var aV = "";
                                            if (aS == "302") {
                                                var a6 = aN._rowVerify && aN._rowVerify[aU] ? aN._rowVerify[aU]._verify: "";
                                                if (a6 == "指定选项") {
                                                    aV = aN._rowVerify[aU]._choice;
                                                }
                                                if (aV) {
                                                    var aE = aV.split(/[,，]/);
                                                    var bp = "<select style='border:1px solid #d5d5d5;vertical-align:middle;'><option value=''>请选择</option>";
                                                    for (var aM = 0; aM < aE.length; aM++) {
                                                        var a1 = aE[aM];
                                                        bp += "<option value='" + a1 + "'>" + a1 + "</option>";
                                                    }
                                                    bp += "</select>";
                                                    bw.append(bp);
                                                }
                                            }
                                            if (!aV) {
                                                if (aq) {
                                                    bw.append("<div style='position:relative;'>");
                                                }
                                                bw.append("<textarea class='inputtext' type='text' style='overflow:auto;height:22px;width:" + bb + "px;'></textarea>");
                                                if (aq) {
                                                    bw.append(aq);
                                                    bw.append("</div>");
                                                }
                                            }
                                            bw.append("</td>");
                                        }
                                    }
                                } else {
                                    for (var aU = 1; aU < bl.length; aU++) {
                                        if (aS > 100 || aS == 0) {
                                            var bG = "jqRadio";
                                            if (a7 == "checkbox") {
                                                bG = "jqCheckbox";
                                            }
                                            bw.append("<td " + aR + "align='center'");
                                            if ((aS == 102 || aS == 103 || aS == 101) && bl[aU]._item_tb) {
                                                bw.append(" onmouseover=showFillData(this); onmouseout=' sb_setmenunav(toolTipLayer, false);' ");
                                            }
                                            bw.append(">");
                                            bw.append("<a href='###' class='" + bG + "' style='position:static;'></a><input style='display:none;' type='" + a7 + "'/>");
                                            bw.append("</td>");
                                        } else {
                                            var br = "style='padding-left:3px;'";
                                            var aA = bl.length - 1;
                                            var bE = "off";
                                            var bA = "on";
                                            if (aS == "6") {
                                                var bf = parseInt(355 / aA) - 2;
                                                if (aU == bl.length - 1) {
                                                    bf += 355 % aA;
                                                }
                                                br = "style='width:" + bf + "px' ";
                                                bE = "off";
                                                bA = "on";
                                            }
                                            if (aU == bl.length - 1) {
                                                bw.append("<li " + br + " class='" + bE + aS + "'>");
                                            } else {
                                                bw.append("<li " + br + " class='" + bA + aN._tag + "'>");
                                            }
                                            if (aS == "6") {
                                                var bu = bl[aU]._item_value;
                                                if (bu == NoValueData) {
                                                    bu = "&nbsp;";
                                                }
                                                bw.append(bu);
                                            }
                                            bw.append("</li>");
                                        }
                                    }
                                }
                            }
                            if (aS < 100 && aS) {
                                bw.append("</ul></td>");
                            }
                            var aL = "";
                            if (a8 < aQ.length) {
                                aL = aQ[a8];
                            }
                            if (aN._rowwidth2 == "") {
                                bw.append("<th " + aR + ">" + aL + "</th>");
                            } else {
                                bw.append("<th style='width:" + aN._rowwidth2 + ";" + ar + "'>" + aL + "</th>");
                            }
                            bw.append("</tr>");
                            bL = !bL;
                            a8++;
                        }
                    } else {
                        for (var aW = 1; aW < bl.length; aW++) {
                            if (aW == bl.length - 1) {
                                aR = "";
                                ar = "";
                            }
                            if (aN._rowwidth == "") {
                                bw.append("<tr><th align='left' style='" + ar + bq + "'>" + trim(bl[aW]._item_title) + "</th>");
                            } else {
                                bw.append("<tr><th align='left' style='width:" + aN._rowwidth + ";" + ar + bq + "'>" + trim(bl[aW]._item_title) + "</th>");
                            }
                            for (var aU = 0; aU < bN.length; aU++) {
                                if (bN[aU].length > 4 && bN[aU].substring(0, 4) == "【标签】") {
                                    continue;
                                }
                                bw.append("<td  " + aR + "align='center'><input  type='" + a7 + "'/></td>");
                            }
                            bw.append("</tr>");
                        }
                    }
                    bw.append("</tbody></table>");
                }
            }
            bw.append("<div class='div_table_clear_bottom'></div>");
            y.innerHTML = bw.toString("");
        };
        G.createTableRadio(true);
    }
    if (ak) {
        var X = document.createElement("div");
        X.className = "div_ins_question";
        X.innerHTML = g._ins ? subjectInfo + g._ins: "";
        Q.appendChild(X);
        G.get_div_ins = function() {
            return X;
        };
    }
    var aa = $ce("div", "", Q);
    aa.style.height = "18px";
    aa.className = "spanLeft";
    if (ak) {
        var Y = document.createElement("div");
        Y.className = "div_ins_question spanLeft";
        Y.style.clear = "none";
        aa.appendChild(Y);
        G.set_jump_ins = function() {
            var v = "*" + jump_info;
            Y.style.display = this.dataNode._hasjump ? "": "none";
            if (this.dataNode._hasjump) {
                if (this.dataNode._anytimejumpto < 1) {} else {
                    if (this.dataNode._anytimejumpto == "1") {
                        v += "<span style='color:#ff6600;'>(结束作答)</span>";
                    } else {
                        v += "<span style='color:#ff6600;'>(跳转到第" + this.dataNode._anytimejumpto + "题)</span>";
                    }
                }
            }
            Y.innerHTML = v;
        };
        G.set_jump_ins();
    }
    if (ak || J) {
        var c = document.createElement("div");
        c.className = "div_ins_question spanLeft";
        c.style.clear = "none";
        c.innerHTML = "";
        G.getRelation = function() {
            var ao = this.dataNode._relation;
            if (!ao) {
                return;
            }
            var av = ao.split(",");
            var aw = "依赖于第" + av[0] + "题的第" + av[1] + "个选项";
            var az = getDataNodeByTopic(av[0]);
            if (!az) {
                return;
            }
            if (WjxActivity._use_self_topic) {
                var aA = az._title.match(/^\s*\d+[、\.\-\_\(\/]?\d*\)?/);
                if (aA) {
                    aw = "依赖于第" + aA + "题的第" + av[1] + "个选项";
                }
            }
            var ap = "";
            var v = av[1].split(";");
            var aq = "选择";
            var an = "";
            if (v.length > 1) {
                an = "中的任何一个选项";
            }
            for (var ar = 0; ar < v.length; ar++) {
                var ax = v[ar];
                if (ax - 0 < 0) {
                    ax = ax * -1;
                    aq = "没有选择";
                }
                if (az._select && az._select[ax]) {
                    if (ap) {
                        ap += "、";
                    }
                    ap += "[" + az._select[ax]._item_title + "]";
                } else {
                    return;
                }
            }
            var at = az._topic + ".";
            if (WjxActivity._use_self_topic) {
                at = "";
            }
            var ay = "当题目<span style='color:#0066ff;'>" + at + az._title + "</span>" + aq + "<span style='color:#0066ff;font-size:12px;'>" + ap + "</span>" + an + "时，<b>此题才显示</b>";
            var au = new Array();
            au.push(aw);
            au.push(ay);
            return au;
        };
        c.style.display = g._relation ? "": "none";
        var ad = G.getRelation();
        if (ad) {
            c.innerHTML = ad[0];
            c.dtitle = ad[1];
            c.onmouseover = function() {
                toolTipLayer.style.width = "350px";
                toolTipLayer.innerHTML = this.dtitle;
                sb_setmenunav(toolTipLayer, true, this);
            };
            c.onmouseout = function(v) {
                sb_setmenunav(toolTipLayer, false, this);
            };
        }
        aa.appendChild(c);
        G.RelationIns = c;
    }
    if (g._relation == "0") {
        G.style.display = "none";
    }
    var R = document.createElement("div");
    R.className = "div_ins_question spanLeft";
    R.innerHTML = "<a href='javascript:void(0);' onclick='insertQ(curover);return false;' class='link-UF90' style='text-decoration:underline;'>在此题后插入新题</a>";
    R.style.clear = "none";
    R.style.visibility = "hidden";
    Q.appendChild(R);
    G.divInsertOp = R;
    var ai = document.createElement("div");
    ai.className = "spanRight";
    ai.style.clear = "none";
    Q.appendChild(ai);
    G.divTableOperation = ai;
    if (g._hasjump || g._relation) {
        G.divTableOperation.style.visibility = "";
    }
    $ce("div", "", Q).style.clear = "both";
    if (W || J) {
        $ce("div", "", Q).style.clear = "both";
    }
    cancelInputClick(G);
    return G;
}
function cancelInputClick(c) {
    var d = c.div_question_preview;
    var a = $$("input", d);
    for (var b = 0; b < a.length; b++) {
        a[b].onclick = function() {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        a[b].onkeydown = function() {
            this.value = "";
            return false;
        };
    }
}
var needCheckLeave = true;
window.onbeforeunload = function() {
    if (needCheckLeave) {
        return "系统可能不会保存您所做的更改。";
    }
};
window.onunload = function() {
    finishEditing();
};
function windowGotoUrl(a) {
    needCheckLeave = false;
    window.location.href = a;
}
function chkAutoSave_Click(a) {}
function returnOld() {
    if (window.confirm("确认使用旧版编辑界面吗？")) {
        save_paper("old", true);
    }
}
var havereturn = false;
var timeoutTimer = null;
var errorTimes = 0;
function processError() {
    if (!havereturn) {
        havereturn = true;
        errorTimes++;
        var a = "网络异常，可能是您电脑上的防火墙拦截了保存的问卷数据，请关闭防火墙试试！";
        saveClient();
        show_status_tip(a, 0);
    }
    if (timeoutTimer) {
        clearTimeout(timeoutTimer);
    }
}
function saveClient() {
    try {
        if (window.localStorage && sendStr) {
            window.localStorage.setItem("lastsavedata" + activityID, sendStr);
        }
    } catch(a) {}
}
function removeClient() {
    try {
        if (window.localStorage) {
            window.localStorage.removeItem("lastsavedata" + activityID);
        }
    } catch(a) {}
}
var sendStr = "";
var hasLogicNotify = false;
var saveNotifyText = "";
function save_paper(c, af, L) {
    if (c != "init" && questionHolder.length == 0) {
        show_status_tip("您还未添加题目！", 3000);
        return false;
    }
    show_status_tip("正在保存，请耐心等候...", 0);
    if (c != "init" && !save_paper_validate(af)) {
        return false;
    }
    var U = document.getElementById("paper_attr_title");
    var u = document.getElementById("paper_attr_desc");
    var ar = new Array();
    ar[0] = new Object();
    ar[0]._title = U.value;
    ar[0]._tag = u.value;
    ar[0]._display_part = false;
    ar[0]._display_part_num = 0;
    ar[0]._partset = "";
    ar[0]._random_mode = WjxActivity._random_mode;
    if (ar[0]._random_mode == "3") {
        ar[0]._partset = WjxActivity._partset;
        var z = WjxActivity._partset.split(",");
        var y = "";
        var d = true;
        for (var ao = 0; ao < z.length; ao++) {
            var ap = z[ao].split(";");
            var W = parseInt(ap[0]);
            var ai = parseInt(ap[1]);
            var am = getPageQCount()[W];
            var ab = am + ":" + ai;
            if (!y) {
                y = ab;
            } else {
                if (y != ab) {
                    d = false;
                }
            }
        }
        if (z.length < 2) {
            d = false;
        }
        if (d) {
            ar[0]._partset += "|true";
        }
    } else {
        if (ar[0]._random_mode == "4") {
            ar[0]._partset = WjxActivity._partset;
        }
    }
    ar[0]._display_part = WjxActivity._display_part;
    ar[0]._display_part_num = WjxActivity._display_part_num;
    ar[0]._random_begin = WjxActivity._random_begin;
    ar[0]._random_end = WjxActivity._random_end;
    ar[1] = firstPage.dataNode;
    var ag = false;
    var O = false;
    var K = false;
    var I = 1;
    var o = 2;
    for (var ao = 0; ao < questionHolder.length; ao++) {
        if (questionHolder[ao].checkValid && questionHolder[ao].checkValid() == false) {
            ar[ao + 2] = questionHolder[ao].validate();
        }
        ar[ao + 2] = questionHolder[ao].dataNode;
        var au = ar[ao + 2]._type;
        if (au == "page") {
            if (ar[ao + 2]._topic != o) {
                ar[ao + 2]._topic = o;
            }
            o++;
        } else {
            if (au != "cut") {
                if (ar[ao + 2]._topic != I) {
                    ar[ao + 2]._topic = I;
                }
                I++;
            }
        }
        if (ar[ao + 2]._hasjump) {
            O = true;
        }
        var C = ar[ao + 2]._relation;
        if (C && C != "0") {
            var X = C.split(",");
            var F = true;
            K = true;
            var N = X[0];
            var k = X[1].split(";");
            var m = getDataNodeByTopic(N);
            var Z = false;
            if (au == "cut" && m) {
                var at = getDivIndex(N);
                if (at < ao) {
                    Z = true;
                }
            } else {
                Z = m && ar[ao + 2]._topic - N > 0;
            }
            if (Z) {
                var P = m._select;
                var au = m._type;
                if (au == "radio" || au == "radio_down" || au == "check") {
                    for (var R = 0; R < k.length; R++) {
                        var h = k[R];
                        if (h == 0 || h >= P.length) {
                            F = false;
                        }
                    }
                } else {
                    F = false;
                }
            } else {
                F = false;
            }
            if (!F) {
                ar[ao + 2]._relation = "";
            }
        }
        ar[ao + 2]._referTopic = "";
        ar[ao + 2]._referedTopics = "";
        if (questionHolder[ao]._referDivQ) {
            ar[ao + 2]._referTopic = questionHolder[ao]._referDivQ.dataNode._topic;
            ag = true;
        }
        if (questionHolder[ao]._referedArray) {
            ar[ao + 2]._referedTopics = "";
            for (var S = 0; S < questionHolder[ao]._referedArray.length; S++) {
                if (S > 0) {
                    ar[ao + 2]._referedTopics += ",";
                }
                ar[ao + 2]._referedTopics += questionHolder[ao]._referedArray[S].dataNode._topic;
            }
        }
    }
    saveNotifyText = "";
    if (ar[0]._random_mode != "0") {
        var w = "";
        var ah = false;
        if (O) {
            w = "跳题逻辑";
            ah = true;
        } else {
            if (ag) {
                w = "引用逻辑";
                ah = true;
            } else {
                if (K) {
                    w = "关联逻辑";
                    ah = true;
                }
            }
        }
        if (ah) {
            var A = "此问卷包含" + w + "，设置随机逻辑可能会导致" + w + "失效，请注意检查！";
            if (!hasLogicNotify && c != "init") {
                alert(A);
                hasLogicNotify = true;
            }
            saveNotifyText = A;
        }
    }
    var J = 0;
    for (var ao = 1; ao < ar.length; ao++) {
        if (ar[ao]._type == "page") {
            J++;
        }
    }
    ar[0]._total_page = J;
    var l = new StringBuilder();
    var an = false;
    var b = false;
    var x = false;
    var t = false;
    var G = false;
    var a = ar[0]._title + "§" + ar[0]._tag + "§" + ar[0]._random_begin + "§" + ar[0]._random_end + "§" + ar[0]._random_mode + "§" + WjxActivity._use_self_topic;
    if ((ar[0]._random_mode == "1" || ar[0]._random_mode == "2") && ar[0]._display_part) {
        a += "§" + ar[0]._display_part + "§" + ar[0]._display_part_num;
    } else {
        if (ar[0]._random_mode == "3" || ar[0]._random_mode == "4") {
            a += "§" + ar[0]._partset + "§";
        } else {
            a += "§§";
        }
    }
    a += "§" + designversion;
    var n = 0;
    for (var ao = 1; ao < ar.length; ao++) {
        var T = "";
        var s = ar[ao]._title.match(/\[q(\d+)\]/);
        if (s && isInt(s[1])) {
            T = "〒" + s[1];
        }
        switch (ar[ao]._type) {
        case "question":
            var C = ar[ao]._relation || "";
            var Q = ar[ao]._needOnly;
            if (ar[ao]._needsms) {
                Q += "〒" + ar[ao]._needsms;
            }
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + T + "§" + ar[ao]._tag + "§" + ar[ao]._height + "§" + ar[ao]._maxword + "§" + ar[ao]._requir + "§" + ar[ao]._norepeat + "§" + ar[ao]._default + "§" + ar[ao]._ins + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto + "§" + ar[ao]._verify + "§" + Q + "§" + ar[ao]._hasList + "§" + ar[ao]._listId + "§" + ar[ao]._width + "§" + ar[ao]._underline + "§" + ar[ao]._minword);
            if (ar[ao]._isCeShi) {
                l.append("§" + ar[ao]._ceshiValue + "〒" + ar[ao]._answer + "〒" + ar[ao]._ceshiDesc + "〒" + ar[ao]._include);
                t = true;
            } else {
                if (ar[ao]._verify == "多级下拉") {
                    l.append("§" + (ar[ao]._levelData || ""));
                }
            }
            n++;
            break;
        case "gapfill":
            var C = ar[ao]._relation || "";
            var aq = getGapFillCount(ar[ao]._title);
            var r = ar[ao]._useTextBox ? "true": "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + T + "§" + ar[ao]._tag + "§" + ar[ao]._requir + "§" + aq + "§" + ar[ao]._ins + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto);
            l.append("§");
            if (ar[ao]._rowVerify) {
                for (var e = 0; e < aq; e++) {
                    if (e > 0) {
                        l.append("〒");
                    }
                    if (!ar[ao]._rowVerify[e]) {
                        continue;
                    }
                    var q = ar[ao]._rowVerify[e];
                    l.append(q._verify || "");
                    if (q._verify == "指定选项") {
                        l.append("¦");
                        l.append(q._choice || "");
                    } else {
                        l.append(",");
                        l.append(q._minword || "");
                        l.append(",");
                        l.append(q._maxword || "");
                    }
                    if (ar[ao]._isCeShi) {
                        l.append(",");
                        l.append(q._ceshiValue || "1");
                        l.append(",");
                        var ac = q._answer || "";
                        ac = ac.replace(/,/g, "，");
                        l.append(ac);
                        l.append(",");
                        var ak = q._ceshiDesc || "";
                        ak = ak.replace(/,/g, "，");
                        l.append(ak);
                        l.append(",");
                        l.append(q._include);
                    } else {
                        if (q._verify != "指定选项") {
                            l.append(",");
                            if (ar[ao]._requir && q._isRequir == false) {
                                l.append("false");
                            }
                        }
                    }
                }
            }
            l.append("§");
            l.append(r);
            if (ar[ao]._isCeShi) {
                l.append("§1");
                t = true;
            }
            n++;
            break;
        case "slider":
            var C = ar[ao]._relation || "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + T + "§" + ar[ao]._tag + "§" + ar[ao]._requir + "§" + ar[ao]._minvalue + "§" + ar[ao]._maxvalue + "§" + ar[ao]._minvaluetext + "§" + ar[ao]._maxvaluetext + "§" + ar[ao]._ins + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto);
            n++;
            break;
        case "fileupload":
            var C = ar[ao]._relation || "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + T + "§" + ar[ao]._tag + "§" + ar[ao]._requir + "§" + ar[ao]._width + "§" + ar[ao]._ext + "§" + ar[ao]._maxsize + "§" + ar[ao]._ins + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto);
            n++;
            break;
        case "sum":
            var C = ar[ao]._relation || "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + T + "§" + ar[ao]._tag + "§" + ar[ao]._requir + "§" + ar[ao]._total + "§" + ar[ao]._rowtitle + "§" + ar[ao]._rowwidth + "§0§" + ar[ao]._ins + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto);
            l.append("§" + ar[ao]._referTopic + "§" + ar[ao]._referedTopics);
            n++;
            break;
        case "cut":
            var C = ar[ao]._relation || "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._title + "§" + (ar[ao]._video || "") + "§" + C + T);
            break;
        case "page":
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "§" + ar[ao]._tag);
            var B = ar[ao]._iszhenbie ? "true": "";
            B = ar[ao]._istimer ? "time": B;
            l.append("§" + B);
            l.append("§" + ar[ao]._mintime);
            if (ar[ao]._mintime) {
                an = true;
            }
            l.append("§" + ar[ao]._maxtime);
            if (ar[ao]._maxtime) {
                b = true;
            }
            break;
        case "check":
        case "radio_down":
        case "radio":
        case "matrix":
            var C = ar[ao]._relation || "";
            ar[ao]._tag = isNaN(ar[ao]._tag) ? 0 : ar[ao]._tag;
            var aj = ar[ao]._mainWidth || "";
            l.append("¤" + ar[ao]._type + "§" + ar[ao]._topic + "§" + ar[ao]._title + "〒" + ar[ao]._keyword + "〒" + C + "〒" + aj + T + "§" + ar[ao]._tag + "§");
            if (ar[ao]._type == "matrix") {
                if (ar[ao]._referTopic) {
                    ar[ao]._rowtitle2 = "";
                }
                l.append(ar[ao]._rowtitle + "〒" + ar[ao]._rowtitle2 + "〒" + ar[ao]._columntitle);
            } else {
                l.append(ar[ao]._numperrow + "〒" + ar[ao]._randomChoice);
            }
            l.append("§" + ar[ao]._hasvalue + "§" + ar[ao]._hasjump + "§" + ar[ao]._anytimejumpto + "§" + ar[ao]._requir);
            if (ar[ao]._type == "check" || (ar[ao]._type == "matrix" && ar[ao]._tag == "102")) {
                if (ar[ao]._isShop) {
                    l.append(",shop");
                    G = true;
                } else {
                    l.append("," + ar[ao]._lowLimit + "," + ar[ao]._upLimit);
                }
            } else {
                if (ar[ao]._type == "radio" && ar[ao]._isQingJing) {
                    l.append(",1");
                }
            }
            if (ar[ao]._type == "matrix") {
                var H = ar[ao]._rowwidth;
                if (ar[ao]._randomRow) {
                    H += ",true";
                }
                l.append("§" + H + "〒" + ar[ao]._rowwidth2);
                if (ar[ao]._tag == "202" || ar[ao]._tag == "301") {
                    l.append("〒" + ar[ao]._minvalue + "〒" + ar[ao]._maxvalue);
                    if (ar[ao]._tag == "301" && ar[ao]._digitType == 1) {
                        l.append(",1");
                    }
                } else {
                    if (ar[ao]._tag == "102" || ar[ao]._tag == "103") {
                        var p = ar[ao]._daoZhi || "";
                        l.append("〒" + p);
                    } else {
                        if (ar[ao]._tag == "201" || ar[ao]._tag == "302") {
                            if (ar[ao]._rowVerify) {
                                l.append("〒");
                                var V = trim(ar[ao]._rowtitle).split("\n");
                                if (ar[ao]._tag == "302") {
                                    V = trim(ar[ao]._columntitle).split("\n");
                                }
                                var aa = 0;
                                for (var e = 0; e < V.length; e++) {
                                    if (ar[ao]._tag == "201" && V[e].substring(0, 4) == "【标签】") {
                                        continue;
                                    }
                                    if (ar[ao]._rowVerify[aa]) {
                                        var q = ar[ao]._rowVerify[aa];
                                        if (q._verify == "指定选项") {
                                            l.append(aa + "¦");
                                            l.append(q._verify + "¦");
                                            l.append(q._choice || "");
                                        } else {
                                            l.append(aa + ",");
                                            l.append(q._verify || "");
                                            l.append(",");
                                            l.append(q._minword || "");
                                            l.append(",");
                                            l.append(q._maxword || "");
                                            l.append(",");
                                            l.append(q._width || "");
                                            l.append(",");
                                            if (ar[ao]._requir && q._isRequir == false) {
                                                l.append("false");
                                            }
                                        }
                                        l.append(";");
                                    }
                                    aa++;
                                }
                            }
                        }
                    }
                }
            } else {
                if (ar[ao]._isTouPiao) {
                    var ae = ar[ao]._displayDescTxt || "";
                    l.append("§" + ar[ao]._isTouPiao + "〒" + ar[ao]._touPiaoWidth + "〒" + ar[ao]._displayDesc + "〒" + ar[ao]._displayNum + "〒" + ar[ao]._displayPercent + "〒" + ar[ao]._displayThumb + "〒" + ae);
                    x = true;
                } else {
                    if (ar[ao]._isCeShi) {
                        l.append("§ceshi〒" + ar[ao]._ceshiValue + "〒" + ar[ao]._ceshiDesc);
                        t = true;
                    } else {
                        if (ar[ao]._isCePing) {
                            l.append("§ceping");
                        } else {
                            if (ar[ao]._displayDesc) {
                                var ae = ar[ao]._displayDescTxt || "";
                                l.append("§desc〒" + ae);
                            } else {
                                l.append("§");
                            }
                        }
                    }
                }
            }
            var E = ar[ao]._verify;
            if (ar[ao]._type == "matrix" && ar[ao]._nocolumn) {
                E += ",true";
            }
            l.append("§" + ar[ao]._ins + "§" + E);
            l.append("§" + ar[ao]._referTopic + "§" + ar[ao]._referedTopics);
            for (var al = 1; al < ar[ao]._select.length; al++) {
                var D = "";
                if (ar[ao]._select[al]._item_huchi) {
                    D = "〒true";
                }
                var M = ar[ao]._select[al]._item_value;
                if (ar[ao]._select[al]._item_value == "") {
                    M = NoValueData;
                }
                l.append("§" + ar[ao]._select[al]._item_title + "〒" + ar[ao]._select[al]._item_radio + "〒" + M + "〒" + ar[ao]._select[al]._item_jump + "〒" + ar[ao]._select[al]._item_tb + "〒" + ar[ao]._select[al]._item_tbr + "〒" + ar[ao]._select[al]._item_img + "〒" + ar[ao]._select[al]._item_imgtext + "〒" + ar[ao]._select[al]._item_desc + "〒" + ar[ao]._select[al]._item_label + D);
            }
            n++;
            break;
        }
    }
    clearInterval(interval_time);
    var v = getXmlHttp();
    L = L || false;
    var g = "curID=" + activityID;
    if (window.isTiKu) {
        g = "tid=" + tikuId;
    }
    var f = "/Handler/designQHandler.ashx?submitType=redesign&" + g + "&userguid=" + userGuid + "&validate_text=ys&t=" + (new Date()).valueOf() + "&sstate=" + encodeURIComponent(c);
    f += "&totalq=" + n;
    if (c == "pub") {
        f += "&pub=1";
    }
    if (c == "pub2") {
        f += "&pub=2";
    }
    if (L) {
        v.open("post", f, false);
    } else {
        v.open("post", f);
    }
    v.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (!L) {
        v.onreadystatechange = function() {
            if (v.readyState == 4) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                if (v.status == 200) {
                    afterSave(unescape(v.responseText), c);
                } else {
                    clearInterval(interval_time);
                    show_status_tip("很抱歉，由于网络异常您的保存没有成功，请再试一次！", 6000);
                    interval_time = setInterval(autoSave, 90 * 1000);
                    saveClient();
                }
            }
        };
    }
    a += "§" + ag + "§" + an + "§" + b + "§" + x + "§" + t + "§" + G;
    sendStr = a + l.toString("");
    if (window.filterKeyword && filterKeyword.indexOf("|") > -1) {
        var ad = new RegExp("(" + filterKeyword + ")", "ig");
        sendStr = sendStr.replace(ad, "**");
    }
    l.clear();
    if (c == "init") {
        prevSaveData = sendStr;
        show_status_tip("成功加载", 1000);
        divSurvey.scrollTop = 0;
        return true;
    }
    havereturn = false;
    if (sendStr == prevSaveData && c != "pub2") {
        saveSuc(c);
    } else {
        if (!L) {
            timeoutTimer = setTimeout(function() {
                processError();
            },
            20000);
            if (errorTimes == 0) {
                v.send("surveydata=" + encodeURIComponent(sendStr));
            } else {
                postWithIframe(f);
            }
        }
        if (L) {
            v.send("surveydata=" + encodeURIComponent(sendStr));
            var Y = afterSave(unescape(v.responseText), c);
            if (Y == false) {
                return false;
            }
        }
    }
    return true;
}
function postWithIframe(b) {
    var a = document.createElement("div");
    a.style.display = "none";
    a.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='surveydata' name='surveydata' type='hidden'><input type='submit' value='提交' ></form>";
    document.body.appendChild(a);
    $("surveydata").value = sendStr;
    var c = $("frameform");
    c.action = b + "&iframe=1";
    c.submit();
}
function tiyanReg(a) {
    show_status_tip("保存问卷成功，请注册或者登录以便管理此问卷！", 5000);
    needCheckLeave = false;
    PDF_launch("/register/registers.aspx", 640, 480,
    function() {
        var b = true;
        if (isTiyan) {
            if (window.confirm("如果您不注册或者登录，您将无法再管理此问卷。\r\n点击“确定”返回继续操作，点击“æ¶âç¦»å¼ç¼è¾é®å·çé¢")) {
                b = false;
            }
        }
        if (b) {
            goBack();
        }
    },
    "æ³¨åé®å·æ");
}
function finishEditing(c) {
    var a = getXmlHttp();
    var d = "curID=" + activityID;
    if (window.isTiKu) {
        d = "tid=" + tikuId;
    }
    var b = "Handler/designqfinish.ashx?" + d;
    a.open("post", b, false);
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    a.send("edit=true");
    if (c) {
        c();
    }
}
function afterSave(e, d) {
    havereturn = true;
    var b = false;
    if (e == "error") {
        windowGotoUrl("/Error/Error.aspx?source=designQHandler");
    } else {
        if (e == "timeout") {
            show_status_tip("æ¨çç»å½ä¿¡æ¯è¶æ¶ï¼è¯·éæ°ç»å½ï¼è°¢è°¢ï¼", 10000);
            PDF_launch("/loginsmall.aspx?err=1", 480, 522, null, "ç»å½é®å·æ");
        } else {
            if (e == "timeout2") {
                show_status_tip("æç¤ºï¼æ¨ç»å½çç¨æ·åä¸é®å·çå®éåå¸èä¸ä¸è´ï¼è¯·ç¡®è®¤å¹¶éæ°ç»å½ï¼è°¢è°¢ï¼", 10000);
                PDF_launch("/loginsmall.aspx?err=2", 480, 522, "ç»å½é®å·æ");
            } else {
                if (e == "badcontent") {
                    alert("å¾æ±æ­ï¼é®å·åå®¹æªéè¿å®¡æ ¸ï¼å¯è½æ¯å ä¸ºæ¨çé®å·åå«ä¸å½ä¿¡æ¯ã\r\nå¦ææ¨ç¡®è®¤æ¨çé®å·åå®¹æ²¡æä»»ä½é®é¢ï¼è¯·ä¸æä»¬çµè¯èç³»ï¼");
                    window.location = "/html/contactus.aspx";
                } else {
                    if (e == "large") {
                        saveClient();
                        alert("æ¨çé®å·åå«çæ°æ®è¿å¤ï¼è¯·éå½ç²¾ç®ï¼è°¢è°¢ï¼");
                    } else {
                        if (e == "empty") {
                            errorTimes = 1;
                            saveClient();
                            alert("æ¨æäº¤å°æå¡å¨çåå®¹ä¸ºç©ºï¼å¯è½æ¯å ä¸ºé²ç«å¢æ¦æªçåå ãè¯·éæ°åè¯ä¸æ¬¡ï¼å¦æè¿æ¯æéè¯¯ï¼è¯·æ´æ¢æµè§å¨æèèç³»æä»¬ï¼è°¢è°¢ï¼");
                        } else {
                            clearInterval(interval_time);
                            var a = e.split("&");
                            var c = a[0];
                            switch (c) {
                            case "true":
                                if (sendStr) {
                                    prevSaveData = sendStr;
                                }
                                removeClient();
                                saveSuc(d);
                                b = true;
                                break;
                            case "false":
                                alert("æ¨è¾å¥çéªè¯ç æè¯¯ï¼è¯·éæ°è¾å¥ï¼");
                                break;
                            case "version":
                                alert("å¾æ±æ­ï¼ç±äºé®å·æç³»ç»çæ¬åçº§ï¼æ¨æ¬æ¬¡æä½æªè½æåæ§è¡ï¼è¯·æ¨å·æ°é¡µé¢æèéå¯æµè§å¨ååæ¬¡å°è¯ï¼\nè¯·æ³¨æï¼é¡µé¢ä¸çä¿¡æ¯å¯è½æ²¡æä¿å­ï¼è¯·æ¨åä¿å­éè¦çæ°æ®ååå·æ°æéå¯æµè§å¨ï¼");
                                break;
                            case "partdata":
                                alert("å¾æ±æ­ï¼æ¨ä¸ä¼ å°æå¡å¨çæ°æ®ä¸å®æ´ï¼è¯·ç¹å»âé¢è§é®å·âéæ°ä¿å­ï¼å¹¶æ£æ¥ä¿å­çé®å·æ¯å¦æ­£ç¡®ï¼");
                                show_status_tip("æ¨çé®å·æ»é¢ç®æ°ä¸ºï¼" + a[1] + "ï¼ä¿å­å°æå¡å¨çé¢ç®æ°ä¸º" + a[2] + "é¢ï¼è¯·ç¹å»âé¢è§é®å·âéæ°ä¿å­ï¼");
                                prevSaveData = "";
                                break;
                            default:
                                saveClient();
                                errorTimes++;
                                alert("æå¡å¨è¿åéè¯¯ï¼è¯·å·æ°é¡µé¢æèéæ°åè¯ä¸æ¬¡ï¼å¦æè¿æ¯æéè¯¯ï¼è¯·åå»è¿åâæçé®å·âéæ©æ¾å¼æ´æ¹å¹¶è¿åãè¿åç ï¼" + e);
                                break;
                            }
                        }
                    }
                    interval_time = setInterval(autoSave, 60 * 1000);
                }
            }
        }
    }
    return b;
}
function goBack() {
    var a = "/wjx/design/designstart.aspx?activity=" + activityID;
    if (window.isTiKu) {
        a = "/wjx/manage/finishtiku.aspx?tid=" + tikuId;
    }
    windowGotoUrl(a);
}
function saveSuc(a) {
    show_status_tip("ä¿å­é®å·æåï¼" + saveNotifyText, 3000);
    if (a == "pub" || a == "pub2") {
        if (isTiyan) {
            tiyanReg(true);
        } else {
            if (a == "pub") {
                goBack();
            } else {
                windowGotoUrl("/wjx/design/designstart.aspx?activity=" + activityID + "&action=1");
            }
        }
    } else {
        if (a == "old") {
            windowGotoUrl("design.aspx?openType=redesign&curid=" + activityID);
        } else {
            if (a == "upgrade") {
                windowGotoUrl("/register/usertype.aspx");
            } else {
                if (a == "preview") {}
            }
        }
    }
}
function doSaveValidate(a) {
    if (!a.createAttr) {
        return;
    }
    if (!a.hasCreatedAttr) {
        a.createOp();
        a.createAttr();
        a.setDataNodeToDesign();
        a.tabAttr.style.display = "none";
    }
    a.validate();
}
function isJumpToValid(b, a) {
    if (b != "" && b != 0 && b != 1 && b != -1) {
        if (toInt(b) <= a.dataNode._topic || toInt(b) > total_question) {
            return false;
        }
    }
    return true;
}
function save_paper_validate(k) {
    var l = document.getElementById("paper_attr_title");
    if (trim(l.value) == "") {
        alert("è¯·å¡«åé®å·æ é¢");
        show("tab3_div");
        l.value = "è¯·è¾å¥æ¨çé®å·çæ é¢";
        l.select();
        return false;
    }
    var d = true;
    var e;
    for (var h = 0; h < questionHolder.length; h++) {
        var f = questionHolder[h];
        if (f.checkValid && f.checkValid() == false) {
            doSaveValidate(f);
            if (questionHolder[h].checkValid() == false) {
                d = false;
                if (!e) {
                    e = questionHolder[h];
                }
            }
        } else {
            if (f.dataNode._hasjump) {
                if (!f.dataNode._anytimejumpto || f.dataNode._anytimejumpto == "0") {
                    var b = f.dataNode._select;
                    if (!b) {
                        continue;
                    }
                    var m = b.length;
                    for (var g = 1; g < m; g++) {
                        var c = trim(b[g]._item_jump);
                        if (!isJumpToValid(c, f)) {
                            doSaveValidate(f);
                            d = false;
                            if (!e) {
                                e = questionHolder[h];
                            }
                            break;
                        }
                    }
                } else {
                    var c = f.dataNode._anytimejumpto;
                    if (!isJumpToValid(c, f)) {
                        doSaveValidate(f);
                        d = false;
                        if (!e) {
                            e = questionHolder[h];
                        }
                    }
                }
            } else {
                if (f.dataNode._isCeShi) {
                    var b = f.dataNode._select;
                    if (!b) {
                        continue;
                    }
                    var m = b.length;
                    var a = false;
                    for (var g = 1; g < m; g++) {
                        if (b[g]._item_radio) {
                            a = true;
                        }
                    }
                    if (!a) {
                        doSaveValidate(f);
                        d = false;
                        if (!e) {
                            e = questionHolder[h];
                        }
                    }
                }
            }
        }
    }
    if (!d) {
        if (k) {
            if (e.ondblclick) {
                e.ondblclick();
            }
            e.scrollIntoView(false);
            show_status_tip("æ­¤é¢æ²¡æéè¿éªè¯ï¼ä¿å­å¤±è´¥ï¼è¯·æéè¯¯æç¤ºä¿¡æ¯ä¿®æ¹ã", 6000);
        } else {
            show_status_tip("ç¬¬" + e.dataNode._topic + "é¢æ²¡æéè¿éªè¯ï¼èªå¨ä¿å­å¤±è´¥ï¼è¯·æéè¯¯æç¤ºä¿¡æ¯ä¿®æ¹ã", 6000);
        }
        return false;
    }
    d = true;
    e = null;
    return true;
}