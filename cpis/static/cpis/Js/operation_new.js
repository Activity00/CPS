var toolbar_start = "<ul class='stuff'>";
var toolbar_add = "<li style='border: 1px solid #ff9900;'><a href='javascript:void(0);' onclick='editQ(this);return false;' title='您也可以双击题目来进行编辑'><span class='design-icon design-edit'></span><span>编辑</span></a></li>";
var toolbar_copy = "<li><a href='javascript:void(0);' onclick='curover.copyQ();return false;' title='复制此题'><span class='design-icon design-copy'></span><span>复制</span></a></li>";
var toolbar_moveup = "<li><a href='javascript:void(0);' onclick='curover.moveUp();return false;'  title='将此题上移'><span class='design-icon design-up'></span><span>上移</span></a></li>";
var toolbar_movedown = "<li><a href='javascript:void(0);' onclick='curover.moveDown();return false;'  title='将此题下移'><span class='design-icon design-down'></span><span>下移</span></a></li>";
var toolbar_movefirst = "<li><a href='javascript:void(0);' onclick='curover.moveFirst();return false;'  title='将此题移动到第一题'><span class='design-icon design-first'></span><span>最前</span></a></li>";
var toolbar_movelast = "<li><a href='javascript:void(0);' onclick='curover.moveLast();return false;'  title='将此题移动到最后一题'><span class='design-icon design-last'></span><span>最后</span></a></li>";
var toolbar_del = "<li onmouseover='openDelWindow(curover,this);' onmouseout='sb_setmenunav(batchDeleteMenu,false);'><a href='javascript:;' onclick='curover.deleteQ();sb_setmenunav(batchDeleteMenu,false);return false;' ><span class='design-icon design-delete'></span><span>删除</span></a></li>";
var toolbar_del_move = toolbar_del + toolbar_moveup + toolbar_movedown + toolbar_movefirst + toolbar_movelast;
var toolbar_end = "<div style='clear:both;'></div></ul>";
var clickKaoShi = false;
Array.prototype.indexOf = function (c) {
    for (var b = 0, a = this.length; b < a; b++) {
        if (this[b] == c) {
            return b;
        }
    }
    return -1;
};
Array.prototype.moveUp = function (b) {
    var a = this.indexOf(b);
    return this._moveElement(a, -1);
};
Array.prototype.moveFirst = function (b) {
    var a = this.indexOf(b);
    while (this._moveElement(a--, -1)) {}
};
Array.prototype.moveDown = function (b) {
    var a = this.indexOf(b);
    return this._moveElement(a, 1);
};
Array.prototype.moveLast = function (b) {
    var a = this.indexOf(b);
    while (this._moveElement(a++, 1)) {}
};
Array.prototype.moveTo = function (d, e) {
    var a = this.indexOf(d);
    var c = Math.abs(e - a);
    if (a < e) {
        for (var b = 0; b < c; b++) {
            this._moveElement(a++, 1);
        }
    } else {
        for (var b = 0; b < c; b++) {
            this._moveElement(a--, -1);
        }
    }
};
Array.prototype._moveElement = function (a, d) {
    var c, b;
    if (a < 0 || a >= this.length) {
        return false;
    }
    c = a + d;
    if (c < 0 || c >= this.length || c == a) {
        return false;
    }
    b = this[c];
    this[c] = this[a];
    this[a] = b;
    return true;
};
Array.prototype.insertAt = function (b, a) {
    this.splice(a, 0, b);
};
Array.prototype.insertBefore = function (b, a) {
    this.insertAt(b, this.indexOf(a));
};
Array.prototype.remove = function (a) {
    this.removeAt(this.indexOf(a));
    return a;
};
Array.prototype.removeAt = function (a) {
    var b = this[a];
    if (b) {
        this.splice(a, 1);
    }
    return b;
};

function updateTopic(o) {
    var a = 1;
    var b = 1;
    firstPage.divTopic.innerHTML = "<span style='font-size:14px; font-weight:bold;'>第" + (b) + "页/共" + total_page + "页</span>";
    if (total_page == 1) {
        firstPage.divTopic.innerHTML = "";
    }
    b++;
    totalHideQcount = 0;
    var j = 1;
    var g = new Object();
    for (var e = 0; e < questionHolder.length; e++) {
        var d = questionHolder[e].dataNode;
        var f = d._type;
        if (f != "page" && f != "cut") {
            if (d._topic - a != 0) {
                if (d._hasjump) {
                    if (d._anytimejumpto - 1 > 0) {
                        d._anytimejumpto = parseInt(d._anytimejumpto) + (a - d._topic);
                        if (questionHolder[e].setAnyTimeJumpTo) {
                            questionHolder[e].setAnyTimeJumpTo();
                        }
                    } else {
                        if (d._select) {
                            for (var s = 1; s < d._select.length; s++) {
                                if (d._select[s]._item_jump - 1 > 0) {
                                    d._select[s]._item_jump = parseInt(d._select[s]._item_jump) + (a - d._topic);
                                }
                            }
                            if (questionHolder[e].setItemJump) {
                                questionHolder[e].setItemJump();
                            }
                        }
                    }
                }
                if (curNewQ != questionHolder[e]) {
                    g[d._topic] = a;
                }
            }
            d._topic = a;
            if (questionHolder[e].divTopic) {
                var n = a;
                n = n - totalHideQcount;
                var h = n + "";
                if (n - 100 < 0) {
                    h += ".";
                }
                if (newQType == 5) {
                    if (n == 1) {
                        h = "";
                    } else {
                        h = (n - 1) + ".";
                    }
                }
                if (hasCeShiQ) {
                    if (!d._isCeShi) {
                        h = "";
                        totalHideQcount++;
                    }
                }
                questionHolder[e].divTopic.innerHTML = h;
            }
            if (questionHolder[e]._referDivQ) {
                if (questionHolder[e].createTableRadio) {
                    questionHolder[e].createTableRadio();
                } else {
                    if (questionHolder[e].createSum) {
                        questionHolder[e].createSum();
                    }
                } if (questionHolder[e].updateReferQ) {
                    questionHolder[e].updateReferQ();
                    questionHolder[e].updateSelCheck();
                }
            }
            a++;
        } else {
            if (f == "page") {
                questionHolder[e].dataNode._topic = b;
                questionHolder[e].divTopic.innerHTML = "<span style='font-size:14px; font-weight:bold;'>第" + b + "页/共" + total_page + "页</span>";
                b++;
            }
        }
    }
    for (var e = 0; e < questionHolder.length; e++) {
        var d = questionHolder[e].dataNode;
        if (!d._relation) {
            continue;
        }
        var m = d._relation.split(",");
        var l = parseInt(m[0]);
        if (g[l]) {
            var a = g[l];
            var c = a + "," + m[1];
            d._relation = c;
            var k = questionHolder[e].getRelation();
            var r = questionHolder[e].RelationIns;
            if (k) {
                r.innerHTML = k[0];
                r.title = k[1];
            }
        }
    }
}

function recreateEditor(a) {
    if (a.hasCreatedAttr) {
        if (!KE.browser.IE) {
            var b = a.titleId;
            if (!b) {
                return;
            }
            KE.remove(b);
            KE.create(b);
            KE.util.focus(b);
        }
    }
}

function setMoveStyle(b) {
    var a = b;
    setTimeout(function () {
        a.className = "div_question div_question_move";
        if (prevcurmove && prevcurmove != a && prevcurmove.className.toLowerCase() == "div_question div_question_move") {
            prevcurmove.className = "div_question div_question_mouseout";
        }
        prevcurmove = a;
        prevcurmove.divTableOperation.style.visibility = "hidden";
    }, 2);
}

function afterMove(b, a) {
    recreateEditor(b);
    recreateEditor(a);
    updateTopic(b.dataNode._type);
    b.onmouseout();
    b.focus();
    setMoveStyle(b);
}

function moveUp() {
    var c = this.dataNode._type;
    var b = c == "page" || c == "cut";
    if (isMergeAnswer && !b) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许上移题目！");
        return;
    }
    if (this._referDivQ) {
        var e = parseInt(this.dataNode._topic) - 1;
        var g = this._referDivQ.dataNode._topic;
        if (e <= g) {
            var d = "选项";
            if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
                d = "行标题";
            }
            show_status_tip("此题" + d + "来源于第" + g + "题的选中项，不能再将此题移到第" + g + "题上方！", 4000);
            return;
        }
    }
    var a = questionHolder.indexOf(this);
    if (a > 0) {
        if (a == 1 && isCepingQ) {
            show_status_tip("不能移动到被测评对象上面", 3000);
            return;
        }
        var f = questionHolder[a - 1];
        this.parentNode.insertBefore(this, f);
        questionHolder.moveUp(this);
        afterMove(this, f);
    } else {
        show_status_tip("第1题不能再上移", 3000);
    }
}

function moveDown() {
    var e = this.dataNode._type;
    var g = e == "page" || e == "cut";
    if (isMergeAnswer && !this.isMergeNewAdded && !g) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许下移题目！");
        return;
    }
    if (this._referedArray) {
        var c = "";
        var f = parseInt(this.dataNode._topic) + 1;
        for (var d = 0; d < this._referedArray.length; d++) {
            var a = this._referedArray[d].dataNode._topic;
            if (f - a >= 0) {
                var j = "选项";
                if (this._referedArray[d].dataNode._type == "matrix" || this._referedArray[d].dataNode._type == "sum") {
                    j = "行标题";
                }
                show_status_tip("第" + a + "题的" + j + "来源于此题的选中项，不能将此题移到第" + a + "题下方！", 4000);
                return;
            }
        }
    }
    var h = questionHolder.indexOf(this);
    if (h < questionHolder.length - 1) {
        var b = questionHolder[h + 1];
        this.parentNode.insertBefore(b, this);
        questionHolder.moveDown(this);
        afterMove(this, b);
    } else {
        show_status_tip("最后1题不能再下移", 3000);
    }
}

function moveFirst() {
    var c = this.dataNode._type;
    var b = c == "page" || c == "cut";
    if (isMergeAnswer && !b) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许上移题目！");
        return;
    }
    if (this._referDivQ) {
        var d = "选项";
        if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
            d = "行标题";
        }
        show_status_tip("此题" + d + "来源于第" + this._referDivQ.dataNode._topic + "题的选中项，不能将此题移动最前！", 4000);
        return;
    }
    var a = questionHolder.indexOf(this);
    if (a > 0) {
        var e = questionHolder[0];
        this.parentNode.insertBefore(this, e);
        questionHolder.moveFirst(this);
        afterMove(this, e);
    } else {
        show_status_tip("第1题不能再上移", 3000);
    }
}

function moveLast() {
    if (this._referedArray) {
        var a = "";
        for (var c = 0; c < this._referedArray.length; c++) {
            if (c > 0) {
                a += ",";
            }
            a += this._referedArray[c].dataNode._topic;
        }
        show_status_tip("第" + a + "题的选项或行标题来源于此题的选中项，不能将此题移动到最后！", 4000);
        return;
    }
    var b = questionHolder.indexOf(this);
    if (b < questionHolder.length - 1) {
        var d = questionHolder[questionHolder.length - 1];
        this.parentNode.insertBefore(this, d);
        this.parentNode.insertBefore(d, this);
        questionHolder.moveLast(this);
        afterMove(this, d);
    } else {
        show_status_tip("最后1题不能再下移", 3000);
    }
}

function insertQ(c) {
    var a = curinsert == c;
    if (a) {
        resetInsertQ();
    } else {
        curinsert = c;
        if (isCepingQ && c.dataNode._type == "page" && c.dataNode._topic == "1") {
            alert("提示：不能在被测评对象前面插入题目！");
            resetInsertQ();
            return;
        }
        var b = $$("a", curinsert.divInsertOp)[0];
        if (b) {
            b.innerHTML = "取消插入点";
        }
        setMoveStyle(curinsert);
        if (isMergeAnswer) {
            show_status_tip("提示：部分编辑模式下，只能插入分页和段落说明题型，其它题型只能添加在问卷最后！", 10000);
        } else {
            show_status_tip("请在页面的最上方选择相应的题型插入到此题的后面", 10000);
        }
    }
}

function resetInsertQ() {
    if (curinsert != null) {
        if (curinsert.className.toLowerCase() == "div_question div_question_move") {
            curinsert.className = "div_question div_question_mouseout";
        }
        var a = $$("a", curinsert.divInsertOp)[0];
        if (a) {
            a.innerHTML = "在此题后插入新题";
        }
        curinsert = null;
    }
}

function change_dataNode(g, d) {
    var b = new Object();
    b._isTouPiao = false;
    b._isCeShi = false;
    b._isCePing = false;
    var f = false;
    var e = false;
    if (d == "likert") {
        b._tag = 2;
        b._type = "radio";
    } else {
        if (d == "order") {
            b._tag = 1;
            b._type = "check";
            b._upLimit = b._lowLimit = "-1";
        } else {
            if (d.indexOf("matrix") > -1) {
                var h = d.split(",")[1];
                b._type = "matrix";
                b._tag = h;
                b._rowtitle = g._rowtitle;
                b._rowtitle2 = g._rowtitle2;
                if (g._columntitle) {
                    b._columntitle = g._columntitle;
                }
                b._rowwidth = g._rowwidth;
                b._rowwidth2 = g._rowwidth2;
                if (h == "202" || h == "301") {
                    b._minvalue = 0;
                    b._maxvalue = 10;
                }
                if (h - 101 <= 0 || h == "303") {
                    e = true;
                }
            } else {
                if (d == "toupiaoradio" || d == "toupiaocheck") {
                    b._type = d == "toupiaoradio" ? "radio" : "check";
                    b._isTouPiao = true;
                    b._touPiaoWidth = g._touPiaoWidth || 50;
                    b._displayTiao = g._displayTiao || true;
                    b._displayNum = g._displayNum || true;
                    b._displayPercent = g._displayPercent || true;
                } else {
                    if (d == "ceshiradio" || d == "ceshicheck") {
                        b._type = d == "ceshiradio" ? "radio" : "check";
                        b._isCeShi = true;
                        b._ceshiValue = 5;
                        b._ceshiDesc = "";
                        f = true;
                    } else {
                        if (d == "ceshiq") {
                            b._type = "question";
                            b._isCeShi = true;
                            b._ceshiValue = 5;
                            b._ceshiDesc = "";
                            b._answer = "请设置答案";
                            f = true;
                        } else {
                            if (d == "ceshigap") {
                                b = g;
                                b._isCeShi = true;
                                b._ceshiValue = 5;
                                b._ceshiDesc = "";
                                f = true;
                                return b;
                            } else {
                                if (d == "gapfill") {
                                    b = g;
                                    b._isCeShi = false;
                                    return b;
                                } else {
                                    if (d == "cepingradio" || d == "cepingcheck") {
                                        b._type = d == "cepingradio" ? "radio" : "check";
                                        b._isCePing = true;
                                    } else {
                                        b._type = d;
                                        b._tag = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    b._verify = "0";
    b._topic = g._topic;
    b._title = g._title;
    b._requir = g._requir;
    b._ins = g._ins;
    b._hasjump = g._hasjump;
    b._anytimejumpto = g._anytimejumpto;
    b._keyword = g._keyword;
    if (d == "ceshiq") {
        b._maxword = "";
        b._minword = "";
        b._height = g._height;
        if (b._height > 1) {
            b._answer = "简答题无答案";
        }
        b._width = "";
        b._hasList = false;
        b._underline = false;
        b._norepeat = false;
        b._default = "";
        return b;
    }
    if (g._type == "question") {
        b._hasvalue = false;
        b._randomChoice = false;
        b._isTouPiao = false;
        b._isCeShi = false;
        b._numperrow = "1";
        b._select = new Array();
        for (var a = 1; a < 3; a++) {
            b._select[a] = new Object();
            b._select[a]._item_title = "选项" + a;
            b._select[a]._item_radio = false;
            b._select[a]._item_value = 0;
            b._select[a]._item_jump = 0;
            b._select[a]._item_tb = false;
            b._select[a]._item_tbr = false;
            b._select[a]._item_img = "";
            b._select[a]._item_imgtext = false;
            b._select[a]._item_desc = "";
            b._select[a]._item_label = "";
        }
        if (d == "likert") {
            b._hasvalue = true;
        }
        return b;
    } else {
        if (d == "question") {
            b._height = "1";
            b._maxword = "";
            b._minword = "";
            b._width = "";
            b._hasList = false;
            b._listId = "";
            b._underline = false;
            b._norepeat = false;
            b._default = "";
            return b;
        } else {
            b._hasvalue = false;
            if (b._isCePing) {
                b._hasvalue = true;
            }
            if (d.indexOf("matrix") > -1) {
                b._hasvalue = e;
            }
            b._randomChoice = g._randomChoice || false;
            b._numperrow = g._numperrow || 0;
            b._select = g._select;
            if (g._type == "check" || d == "likert" || d == "order" || b._isCePing) {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_radio = false;
                }
            }
            if (d == "order") {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_tb = false;
                    b._select[c]._item_tbr = false;
                }
            }
            if (d == "check" && b._hasjump && b._anytimejumpto == "0") {
                b._hasjump = false;
            }
            if (d == "likert" || e || d == "cepingradio") {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_value = c;
                }
                b._hasvalue = true;
            }
            if (f) {
                b._hasvalue = false;
                b._hasjump = false;
                if (!g._isCeShi) {
                    for (var c = 1; c < b._select.length; c++) {
                        if (c == 1) {
                            b._select[c]._item_radio = true;
                        } else {
                            b._select[c]._item_radio = false;
                        }
                        b._select[c]._item_tb = false;
                    }
                }
            }
            return b;
        }
    }
}

function changeQ(d) {
    cur.validate();
    if (cur._referDivQ) {
        var c = "选项";
        if (cur.dataNode._type == "matrix" || cur.dataNode._type == "sum") {
            c = "行标题";
        }
        show_status_tip("此题" + c + "来源于第" + cur._referDivQ.dataNode._topic + "题的选中项，不能转换题型！", 4000);
        return;
    }
    if (cur._referedArray) {
        var a = "";
        for (var b = 0; b < cur._referedArray.length; b++) {
            if (b > 0) {
                a += ",";
            }
            a += cur._referedArray[b].dataNode._topic;
        }
        show_status_tip("第" + a + "题的选项或行标题来源于此题的选中项，不能转换题型！", 4000);
        return;
    }
    if (cur.checkValid()) {
        var e = copyNode(cur.dataNode);
        var f = change_dataNode(e, d);
        f._topic = cur.dataNode._topic;
        createQ(f, true);
    }
}

function createFreQ(a, g, h) {
    var f = createFreQdataNode(a, g, h);
    var e = createQ(f);
    if (firstPage) {
        firstPage.style.display = "";
    }
    var d = !f._tag && (f._type == "radio" || f._type == "radio_down");
    var b = f._type == "check";
    var i = /^[a-zA-Z_]+$/.test(a);
    if (newQType == 5 && f._type == "matrix") {
        f._referTopic = "1";
        var c = questionHolder[0];
        e._referDivQ = c;
        if (!c._referedArray) {
            c._referedArray = new Array();
        }
        if (c._referedArray.indexOf(e) == -1) {
            c._referedArray.push(e);
        }
        c._referedArray.sort(function (k, j) {
            return k.dataNode._topic - j.dataNode._topic;
        });
    }
    if ((d || b) && i) {
        e.newAddQ = true;
    }
    if (!vipUser && !clickKaoShi) {
        clickKaoShi = true;
    }
}

function createFromText() {
    if (isMergeAnswer) {
        alert("很抱歉，您正在以合并答卷模式编辑问卷，不能使用此功能！");
    } else {
        if (confirm("您确定要放弃对此问卷的更改并重新生成此问卷吗？")) {
            windowGotoUrl("/MySojump/DesignQbytxt.aspx?activity=" + activityID);
        }
    }
}

function createFreQdataNode(c, i, F) {
    var p;
    var D;
    var d = "请在此输入问题标题";
    var C = "question§1§";
    var v = "§0§1§§false§false§§§false§§" + c;
    var h = "";
    if (c == "check" && F) {
        h = "-1";
    }
    var I = "请选择您认为正确的答案？";
    var b = "2009最受关注的中文网站/应用/服务";
    var e = "淘宝网〒false〒0〒0〒false〒false〒〒false〒〒§开心网〒false〒1〒0〒false〒false〒〒false〒〒§百度〒false〒1〒0〒false〒false〒〒false〒〒§腾讯〒false〒1〒0〒false〒false〒〒false〒〒§人人网〒false〒1〒0〒false〒false〒〒false〒〒";
    var u = "选项" + (select_item_num + 1) + "〒false〒1〒0〒false〒false〒〒false〒〒§选项" + (select_item_num + 2) + "〒false〒2〒0〒false〒false〒〒false〒〒";
    var x = "选项1〒true〒0〒0〒false〒false〒〒false〒〒§选项2〒false〒1〒0〒false〒false〒〒false〒〒";
    var t = "很不满意〒false〒1〒0§不满意〒false〒2〒0§一般〒false〒3〒0§满意〒false〒4〒0§很满意〒false〒5〒0";
    var r = "";
    var l = false;
    var E = "§§§§200§false§";
    var g = "";
    switch (c) {
    case "电话":
        r = "您常用的电话号码：";
        l = true;
        g = E;
        break;
    case "Email":
        r = "您常用的Email地址：";
        l = true;
        g = E;
        break;
    case "城市单选":
    case "城市多选":
        r = "请选择城市:";
        l = true;
        break;
    case "省市区":
        r = "请选择省份城市与地区:";
        l = true;
        break;
    case "地图":
        r = "您的地理位置:";
        l = true;
        break;
    case "多级下拉":
        r = "请选择：";
        l = true;
        break;
    case "生日":
    case "日期":
        r = "请输入您的出生日期：";
        l = true;
        break;
    case "手机":
        r = "请输入您的手机号码：";
        l = true;
        g = E;
        break;
    case "手机验证":
        r = "请输入您的手机号码：";
        l = true;
        g = "§false〒true§§§150§false§";
        v = "§0§1§§true§false§§§false§§手机";
        break;
    case "高校":
        r = "您所在或者毕业的高校名称：";
        l = true;
        break;
    case "时间":
        p = "gapfill§1§请选择时间：" + GapFillStr + "：" + GapFillStr + "§0§true§1§§false§0§";
        break;
    case "姓名":
        r = "您的姓名：";
        l = true;
        v = "§0§1§§true§false§§§false§§" + c;
        break;
    case "性别":
        p = "radio§3§您的性别：§0§8§false§false§§true§0000§§性别§§§男〒false〒0〒0§女〒false〒0〒0";
        break;
    case "年龄段":
        p = "radio§3§您的年龄段：§0§7§false§false§§true§0000§§年龄段§§§18岁以下〒false〒0〒0§18~25〒false〒0〒0§26~30〒false〒0〒0§31~40〒false〒0〒0§41~50〒false〒0〒0§51~60〒false〒0〒0§60以上〒false〒0〒0";
        break;
    case "行业":
        p = "radio_down§10§您目前从事的行业：§0§1§false§false§§true§0000§§行业§§§";
        var m = "IT/软硬件服务/电子商务/因特网运营,快速消费品(食品/饮料/化妆品),批发/零售,服装/纺织/皮革,家具/工艺品/玩具,教育/培训/科研/院校,家电,通信/电信运营/网络设备/增值服务,制造业,汽车及零配件,餐饮/娱乐/旅游/酒店/生活服务,办公用品及设备,会计/审计,法律,银行/保险/证券/投资银行/风险基金,电子技术/半导体/集成电路,仪器仪表/工业自动化,贸易/进出口,机械/设备/重工,制药/生物工程/医疗设备/器械,医疗/护理/保健/卫生,广告/公关/媒体/艺术,出版/印刷/包装,房地产开发/建筑工程/装潢/设计,物业管理/商业中心,中介/咨询/猎头/认证,交通/运输/物流,航天/航空/能源/化工,农业/渔业/林业,其他行业";
        var K = m.split(",");
        var z = "";
        for (var H = 0; H < K.length; H++) {
            if (H > 0) {
                z += "§";
            }
            z += K[H] + "〒false〒0〒0";
        }
        p += z;
        break;
    case "职业":
        p = "radio_down§11§您目前从事的职业：§0§1§false§false§§true§0000§§职业§§§全日制学生〒false〒0〒0§生产人员〒false〒0〒0§销售人员〒false〒0〒0§市场/公关人员〒false〒0〒0§客服人员〒false〒0〒0§行政/后勤人员〒false〒0〒0§人力资源〒false〒0〒0§财务/审计人员〒false〒0〒0§文职/办事人员〒false〒0〒0§技术/研发人员〒false〒0〒0§管理人员〒false〒0〒0§教师〒false〒0〒0§顾问/咨询〒false〒0〒0§专业人士(如会计师、律师、建筑师、医护人员、记者等)〒false〒0〒0§其他〒false〒0〒0";
        break;
    case "省份":
        p = "radio§19§您所在的省份：§0§8§false§false§§true§0000§§省份§§§安徽〒false〒0〒0§北京〒false〒1〒0§重庆〒false〒1〒0§福建〒false〒1〒0§甘肃〒false〒1〒0§广东〒false〒1〒0§广西〒false〒1〒0§贵州〒false〒1〒0§海南〒false〒1〒0§河北〒false〒1〒0§黑龙江〒false〒1〒0§河南〒false〒1〒0§香港〒false〒1〒0§湖北〒false〒1〒0§湖南〒false〒1〒0§江苏〒false〒1〒0§江西〒false〒1〒0§吉林〒false〒1〒0§辽宁〒false〒1〒0§澳门〒false〒1〒0§内蒙古〒false〒1〒0§宁夏〒false〒1〒0§青海〒false〒1〒0§山东〒false〒1〒0§上海〒false〒1〒0§山西〒false〒1〒0§陕西〒false〒1〒0§四川〒false〒1〒0§台湾〒false〒1〒0§天津〒false〒1〒0§新疆〒false〒1〒0§西藏〒false〒1〒0§云南〒false〒1〒0§浙江〒false〒1〒0§海外〒false〒1〒0";
        break;
    case "邮寄地址":
        p = "matrix§1§请输入您的联系地址：§201§姓名：\n所在地区：\n街道地址:\n邮政编码:\n手机或固话：〒〒§false§false§§true§15%〒〒0,,,;1,省市区,,,50;2,,,,50;3,数字,,;4,电话,,〒10§§§§§" + t;
        break;
    case "基本信息":
        p = "matrix§1§基本信息：§201§姓名：\n部门：\n员工编号:〒〒§false§false§§true§15%〒〒0,,,;1,,,;2,,,〒10§§§§§" + t;
        break;
    case "radio":
    case "radio_down":
    case "check":
    case "qingjing":
    case "shop":
        var s = c == "check" ? "true," + h + "," + h : "true";
        if (c == "qingjing") {
            s = "true,1";
            c = "radio";
            u = "情景1〒false〒50〒0§情景2〒false〒50〒0§情景3〒false〒50〒0§情景4〒false〒50〒0";
        } else {
            if (c == "shop") {
                c = "check";
                d = "请选择商品：";
                s = "false,shop";
                u = "商品1〒false〒10〒§商品2〒false〒10〒§商品3〒false〒10〒";
            }
        } if (i) {
            u += "§其它〒false〒1〒0〒true〒false〒〒false〒〒";
        }
        var B = F || 0;
        p = c + "§1§" + d + "§" + F + "§1§false§false§§" + s + "§§§§§§" + u;
        break;
    case "toupiao":
        c = i == 1 ? "radio" : "check";
        p = c + "§1§" + b + "§" + F + "§1§false§false§§true§true〒50〒false〒true〒true§§§§§" + e;
        break;
    case "ceshi":
        if (i == 3 || i == 6) {
            var J = "请设置答案";
            var a = 1;
            if (i == 6) {
                J = "简答题无答案";
                a = 3;
            }
            p = "question§1§" + d + "§0§" + a + "§§true§false§§§false§§§false§§§§§§5〒" + J;
        } else {
            if (i == 4) {
                p = "gapfill§1§您的问题：" + getFillStr(3) + "§0§true§1§§false§0§§§1";
            } else {
                if (i == 5) {
                    c = "radio";
                    p = c + "§1§" + I + "§" + F + "§1§true§false§§true§ceshi〒5〒§§§§§对〒true〒0〒0〒false〒false〒〒false〒〒§错〒false〒1〒0〒false〒false〒〒false〒〒";
                } else {
                    c = i == 1 ? "radio" : "check";
                    p = c + "§1§" + I + "§" + F + "§1§true§false§§true§ceshi〒5〒§§§§§" + x;
                }
            }
        }
        hasCeShiQ = true;
        showCeShiInfo();
        if (WjxActivity._random_mode && WjxActivity._random_mode != "0") {
            show_status_tip("提示：您设置了题库随机逻辑，添加题目后请进行同步修改！<a href='javascript:' onclick='setTikuRandom();return false;' class='titlelnk' style='font-weight: bold;'>题库随机设置</a>", 15000);
        }
        break;
    case "ceping":
        c = i == 1 ? "radio" : "check";
        p = c + "§1§" + d + "§0§1§true§false§§true§ceping§§§§§" + u;
        break;
    case "boolean":
        p = c + "§1§" + d + "§0§8§true§false§§true§0000§§§§§是〒false〒1〒0§否〒false〒0〒0";
        break;
    case "likert":
        p = "radio§1§" + d + "§1§1§true§false§§true§0000§§§§§" + t;
        break;
    case "matrix":
        var w = i || 2;
        var k = "";
        var j = "";
        var f = 10;
        if (w == "202") {
            f = 100;
        }
        var o = w < 102 || w == 303;
        var G = o ? "true" : "false";
        if (i - 300 > 0) {
            k = "百度\n谷歌\n腾讯搜搜\n网易有道\n搜狐搜狗";
        }
        if (w == 101) {
            p = "matrix§1§请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意§" + w + "§外观\n功能〒〒" + k + "§" + G + "§false§§true§" + j + "〒〒0〒" + f + "§§§§§1〒false〒1〒0§2〒false〒2〒0§3〒false〒3〒0§4〒false〒4〒0§5〒false〒5〒0";
        } else {
            if (w == 102) {
                var q = "速度快〒false〒1〒0§准确率高〒false〒2〒0§信息量多〒false〒3〒0§界面更美观〒false〒4〒0";
                p = "matrix§1§请评议下面的搜索引擎：§" + w + "§百度\nGoogle\n搜狗〒〒" + k + "§" + G + "§false§§true§" + j + "〒〒0〒" + f + "§§§§§" + q;
            } else {
                p = "matrix§1§" + d + "§" + w + "§外观\n性能〒〒" + k + "§" + G + "§false§§true§" + j + "〒〒0〒" + f + "§§§§§" + t;
            }
        }
        break;
    case "question":
        var a = i || 1;
        var A = F || false;
        p = "question§1§" + d + "§0§" + a + "§§false§false§§§false§§§" + A + "§§§§§";
        break;
    case "gapfill":
        p = "gapfill§1§姓名：" + getFillStr(3) + "&nbsp;&nbsp;&nbsp;&nbsp;年龄：" + GapFillStr + "岁<br/>电话：" + getFillStr(4) + "§0§true§1§§false§0§";
        break;
    case "slider":
        p = "slider§1§" + d + "§0§true§0§100§不满意§满意§§false§0§";
        break;
    case "sum":
        p = "sum§1§" + d + "§0§true§100§外观\n性能§15%§0§§false§0§";
        break;
    case "fileupload":
        p = "fileupload§1§" + d + "§0§true§200§" + defaultFileExt + "§4096§§false§0§";
        break;
    case "page":
        var n = i || "";
        p = c + "§1§§§" + n;
        break;
    case "cut":
        var r = i ? i : "";
        p = c + "§" + r + "§";
        break;
    }
    if (l) {
        p = C + r + v + g;
    }
    D = set_string_to_dataNode(p);
    if (c == "时间") {
        D._rowVerify = [];
        D._rowVerify[0] = new Object();
        D._rowVerify[0]._verify = "指定选项";
        D._rowVerify[0]._choice = "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23|小时";
        D._rowVerify[1] = new Object();
        D._rowVerify[1]._verify = "指定选项";
        D._rowVerify[1]._choice = "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59|分钟";
    }
    return D;
}
var curNewQ = null;

function addNewQ(d, f, a, g) {
    var e;
    var c = d._type;
    e = create_question(d);
    curNewQ = e;
    setQHandler(e);
    setAttrHander(e);
    if (curinsert != null) {
        g = curinsert;
    }
    if (a) {
        g = curover;
    }
    if (!f) {
        if ((!isMergeAnswer || c == "page" || c == "cut") && g) {
            if (questions.lastChild == g) {
                questions.appendChild(e);
            } else {
                questions.insertBefore(e, g.nextSibling);
            } if (g == firstPage) {
                questionHolder.unshift(e);
            } else {
                questionHolder.insertBefore(e, g);
                questionHolder.moveUp(g);
            }
            updateTopic();
        } else {
            if (curinsert != null) {
                alert("提示：部分编辑模式下，只能插入分页和段落说明题型，其它题型只能添加在问卷最后！");
            }
            questions.appendChild(e);
            questionHolder.push(e);
            updateTopic();
        }
    } else {
        cur.parentNode.insertBefore(e, cur);
        e.isMergeNewAdded = cur.isMergeNewAdded;
        questionHolder[questionHolder.indexOf(cur)] = e;
        cur.deleteQ("noNeedConfirm");
        cur = null;
    } if (curinsert != null) {
        resetInsertQ();
    }
    if (a && curover) {
        if (curover._referDivQ) {
            var b = curover._referDivQ;
            e._referDivQ = b;
            if (!b._referedArray) {
                b._referedArray = new Array();
            }
            if (b._referedArray.indexOf(e) == -1) {
                b._referedArray.push(e);
            }
            b._referedArray.sort(function (i, h) {
                return i.dataNode._topic - h.dataNode._topic;
            });
        }
    }
    curNewQ = null;
    return e;
}

function createQ(c, e, a) {
    if (cur) {
        cur.divTableOperation.style.visibility = "hidden";
    }
    var d = addNewQ(c, e, a);
    if (!isMergeAnswer && window.makeDrag) {
        makeDrag(d);
    }
    d.createOp();
    var b = new Date().getTime();
    if (!useShortCutAddNewQ) {
        if (lastAddNewQTime && !e) {
            var f = b - lastAddNewQTime;
            if (f > 8000) {
                d.ondblclick();
            } else {
                if (cur && cur.isEditing) {
                    qonclick.call(cur);
                }
                setMoveStyle(d);
            }
        } else {
            d.ondblclick();
        }
    } else {
        setMoveStyle(d);
    }
    d.focus();
    lastAddNewQTime = b;
    return d;
}

function copyQ() {
    if (this.validate) {
        this.validate();
    }
    if (!this.checkValid || this.checkValid()) {
        var a = copyNode(this.dataNode);
        a._hasjump = false;
        a._needOnly = false;
        a._hasList = false;
        a._listId = -1;
        a._referedTopics = "";
        createQ(a, false, true);
        show_status_tip("复制成功！", 4000);
    }
}

function copyNode(f) {
    var a = new Object();
    for (var c in f) {
        a[c] = f[c];
    }
    if (f._select) {
        a._select = new Array();
        for (var b = 1; b < f._select.length; b++) {
            a._select[b] = new Object();
            for (var d in f._select[b]) {
                a._select[b][d] = f._select[b][d];
            }
        }
    }
    if (f._rowVerify) {
        a._rowVerify = new Array();
        for (var b = 0; b < f._rowVerify.length; b++) {
            a._rowVerify[b] = new Object();
            for (var d in f._rowVerify[b]) {
                a._rowVerify[b][d] = f._rowVerify[b][d];
            }
        }
    }
    return a;
}

function deleteQ(b) {
    var f = this.dataNode._type;
    var h = f == "page" || f == "cut";
    if (this._referedArray) {
        var d = "";
        for (var e = 0; e < this._referedArray.length; e++) {
            if (e > 0) {
                d += ",";
            }
            d += this._referedArray[e].dataNode._topic;
        }
        show_status_tip("提示：第" + d + "题的选项或行标题来源于此题的选中项，不能删除此题！", 4000);
        return;
    }
    if (f != "page") {
        for (var e = 0; e < questionHolder.length; e++) {
            var c = questionHolder[e].dataNode;
            if (!c._relation) {
                continue;
            }
            var k = c._relation.split(",");
            var l = parseInt(k[0]);
            if (this.dataNode._topic == l) {
                var j = c._topic;
                if (WjxActivity._use_self_topic) {
                    var n = c._title.match(/^\s*\d+[\.\-\_\(\/]?\d+?\)?/);
                    if (n) {
                        j = n;
                    }
                }
                var m = "第" + j + "题";
                if (!j) {
                    m = "段落说明";
                }
                show_status_tip("提示：" + m + "关联于此题的第" + k[1] + "个选项，不能删除此题！", 4000);
                return;
            }
        }
    }
    if (b != "noNeedConfirm") {
        if (isMergeAnswer && !this.isMergeNewAdded && !h) {
            show_status_tip("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许删除原始问卷中的题目！", 4000);
            return;
        }
        show_status_tip("可以通过Ctrl+Z恢复删除的问题", 4000);
    }
    if (this.dataNode._isCeShi) {
        if (WjxActivity._random_mode && WjxActivity._random_mode != "0") {
            show_status_tip("提示：您设置了题库随机逻辑，删除题目后请进行同步修改！<a href='javascript:' onclick='setTikuRandom();return false;' class='titlelnk' style='font-weight: bold;'>题库随机设置</a>", 15000);
        }
    }
    if (f == "page") {
        total_page--;
    } else {
        if (f != "cut") {
            total_question--;
        }
    }
    showhidebatq();
    if (this.tabAttr) {
        this.tabAttr.parentNode.removeChild(this.tabAttr);
        this.tabAttr = null;
        this.hasCreatedAttr = false;
    }
    if (this._referDivQ) {
        this._referDivQ._referedArray.remove(this);
        if (!this._referDivQ._referedArray.length) {
            this._referDivQ._referedArray = null;
        }
        this._referDivQ = null;
    }
    if (b != "noNeedConfirm") {
        var g = questionHolder.indexOf(this);
    }
    this.className = "div_question div_question_mouseout";
    this.parentNode.removeChild(this);
    questionHolder.remove(this);
    updateTopic(this.dataNode._type);
    if (b != "noNeedConfirm") {
        var a = firstPage;
        if (g > 0) {
            a = questionHolder[g - 1];
        }
        new DeleteAction(this, a).exec();
    }
    if (cur == this) {
        cur = null;
    }
}

function qSelect() {}

function qonclick() {
    if (this.isCepingQ) {
        show_status_tip("被测评对象题不能进行编辑，请通过设置测评关系进行设置，设置好后此处会自动变化！");
        return;
    }
    try {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    } catch (a) {}
    this.className = "div_question div_question_onclick";
    this.title = "";
    resetInsertQ();
    this.divInsertOp.style.visibility = "hidden";
    if (cur != this || (cur == this && cur.isEditing)) {
        if (cur != null) {
            if (cur.updateItem) {
                cur.updateItem();
            }
            cur.className = "div_question";
            if (cur.hasCreatedAttr) {
                cur.tabAttr.style.display = "none";
            }
            cur.isEditing = false;
            cur.ondblclick = qonclick;
            cur.style.cursor = "move";
            changeEditText(cur.editQLink, false);
        }
        if (cur && cur.createAttr && (cur.checkValid && !cur.checkValid())) {
            cur.validate();
        }
        if (cur == this) {
            cur.focus();
            cancelInputClick(this);
            return false;
        }
    }
    cancelInputClick(this);
    cur = this;
    var b = this.dataNode;
    this.isEditing = true;
    this.ondblclick = null;
    hasDisplayEditTip = true;
    this.style.cursor = "default";
    changeEditText(this.editQLink, true);
    if (this.hasCreatedAttr) {
        this.tabAttr.style.display = "";
        cancelDblClick(this);
        if (this.hasDisplaySelCheck) {
            this.updateSelCheck();
        }
        this.focus();
        setQTopPos(this);
    } else {
        if (this.createAttr) {
            var c = this;
            setTimeout(function () {
                c.createAttr();
                cancelDblClick(c);
                c.setDataNodeToDesign();
                setQTopPos(c);
            }, 0);
        } else {
            show_status_tip("正在加载问题属性，请耐心等待....", 4000);
        }
    }
    return false;
}

function editQ(a) {
    if (curover) {
        qonclick.call(curover);
    }
}

function changeEditText(c, a) {
    if (!c) {
        return;
    }
    if (a) {
        var b = c.nextSibling;
        if (b.nodeType == 3) {
            b = b.nextSibling;
        }
        b.innerHTML = "完成";
        c.className = "design-icon design-finish";
    } else {
        c.className = "design-icon design-edit";
        var b = c.nextSibling;
        if (b.nodeType == 3) {
            b = b.nextSibling;
        }
        b.innerHTML = "编辑";
    }
}

function createOp() {
    if (this.divTableOperation.OpCreated) {
        this.divTableOperation.style.visibility = "visible";
    } else {
        this.deleteQ = deleteQ;
        this.copyQ = copyQ;
        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveFirst = moveFirst;
        this.moveLast = moveLast;
        var c = this.divTableOperation;
        var a = this.dataNode._type;
        if (a == "page") {
            if (this.dataNode._topic > 1) {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
            } else {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_end;
            }
        } else {
            if (a == "cut") {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
            } else {
                if (isMergeAnswer && !this.isMergeNewAdded) {
                    c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_end;
                } else {
                    if (isMergeAnswer) {
                        c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del + toolbar_movedown + toolbar_movelast + toolbar_end;
                    } else {
                        c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del_move + toolbar_end;
                    }
                }
            }
        } if (this.isCepingQ) {
            c.innerHTML = "";
        }
        c.OpCreated = true;
        this.divTableOperation.style.visibility = "visible";
        var b = $$("span", c)[0];
        this.editQLink = b;
    }
}
var hasDisplayEditTipTimes = 0;

function qonmouseover(c) {
    if (!this.isEditing) {
        this.divInsertOp.style.visibility = "visible";
    }
    var b = this.className.toLowerCase();
    if (b.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (b.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseover";
        } else {
            this.className = "div_question div_question_mouseover div_question_error";
        }
    }
    this.createOp();
    if (isMergeAnswer) {
        this.style.cursor = "default";
    }
    curover = this;
    var a = this;
}

function qonmouseout(b) {
    this.divInsertOp.style.visibility = "hidden";
    var a = this.className.toLowerCase();
    if (a.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (a.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseout";
        } else {
            this.className = "div_question div_question_mouseout div_question_error";
        }
    }
    if (this.hasDisplayEditTip) {
        sb_setmenunav(toolTipLayer, false, this);
        this.hasDisplayEditTip = false;
    }
    if (this.divTableOperation) {
        this.divTableOperation.style.visibility = "hidden";
    }
}

function getObjPos(d) {
    var a = y = 0;
    if (d.getBoundingClientRect) {
        var b = d.getBoundingClientRect();
        var c = document.documentElement;
        a = b.left + Math.max(c.scrollLeft, document.body.scrollLeft) - c.clientLeft;
        y = b.top + Math.max(c.scrollTop, document.body.scrollTop) - c.clientTop;
    } else {
        while (d && d != document.body) {
            a += d.offsetLeft;
            y += d.offsetTop;
            d = d.offsetParent;
        }
    }
    return {
        x: a,
        y: y
    };
}

function getCurPos(b) {
    b = b || window.event;
    var a = document.documentElement || document.body;
    if (b.pageX) {
        return {
            x: b.pageX,
            y: b.pageY
        };
    }
    return {
        x: b.clientX + a.scrollLeft - a.clientLeft,
        y: b.clientY + a.scrollTop - a.clientTop
    };
}

function mouseOverout(a) {
    a.onmouseover = qonmouseover;
    a.onmouseout = qonmouseout;
}

function setQHandler(a) {
    mouseOverout(a);
    a.createOp = createOp;
    a.ondblclick = qonclick;
    a.deleteQ = deleteQ;
}
initEventHandler();

function initEventHandler() {
    var a = $("divId");
    a.onmouseover = function () {
        this.style.border = "2px solid #FDB553";
    };
    a.onmouseout = function () {
        this.style.border = "2px solid #ffffff";
    };
    firstPage.ondblclick = qonclick;
    mouseOverout(firstPage);
    firstPage.createOp = createOp;
    for (var c = 0; c < questionHolder.length; c++) {
        var b = questionHolder[c];
        setQHandler(b);
    }
}

function cancelDblClick(d) {
    var a = d.tabAttr;
    if (a) {
        var b = $$("input", a);
        for (var c = 0; c < b.length; c++) {
            b[c].ondblclick = function (f) {
                f = window.event || f;
                if (f) {
                    f.cancelBubble = true;
                    if (f.stopPropagation) {
                        f.stopPropagation();
                    }
                }
            };
        }
    }
}
var actionStack = new Array();
var actionIndex = 0;

function BaseAction() {}
BaseAction.prototype.exec = function () {
    actionStack[actionIndex++] = this;
};
BaseAction.prototype.undo = function () {
    return false;
};
BaseAction.prototype.redo = function () {
    return false;
};

function DeleteAction(b, a) {
    this.deleteDiv = b;
    this.prevDiv = a;
    this.status = "done";
}
DeleteAction.prototype = new BaseAction();
DeleteAction.prototype.undo = function () {
    if (this.status != "done") {
        return;
    }
    this.prevDiv.parentNode.insertBefore(this.deleteDiv, this.prevDiv);
    this.prevDiv.parentNode.insertBefore(this.prevDiv, this.deleteDiv);
    if (this.prevDiv == firstPage) {
        questionHolder.unshift(this.deleteDiv);
    } else {
        questionHolder.insertBefore(this.deleteDiv, this.prevDiv);
        questionHolder.moveUp(this.prevDiv);
    }
    updateTopic();
    this.deleteDiv.focus();
    this.status = "undone";
};
DeleteAction.prototype.redo = function () {
    if (this.status != "undone") {
        return;
    }
    this.deleteDiv.deleteQ();
    this.status = "done";
};

function undo() {
    if (actionIndex > 0) {
        actionStack[--actionIndex].undo();
    }
}

function redo() {
    if (actionIndex < actionStack.length) {
        actionStack[actionIndex++].redo();
    }
}