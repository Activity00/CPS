function setListId(a, b) {
    PDF_close(a);
}
var pre_satisfaction = "很不满意\n不满意\n一般\n满意\n很满意";
var pre_agree = "很不同意\n不同意\n一般\n同意\n很同意";
var pre_import = "很不重要\n不重要\n一般\n重要\n很重要";
var pre_accord = "很不符合\n不符合\n一般\n符合\n很符合";
var pre_wanting = "很不愿意\n不愿意\n一般\n愿意\n很愿意";
var pre_bool_1 = "是\n否";
var pre_bool_2 = "对\n错";
var pre_bool_3 = "满意\n不满意";
var pre_bool_4 = "同意\n不同意";
var pre_bool_5 = "正确\n错误";
var pre_bool_6 = "支持\n反对";
var pre_bool_7 = "Ture\nFalse";
var pre_bool_8 = "Yes\nNo";
var currentRelation = "";
var itemImage = "";

function setFloat(a) {
    a.className = "spanLeft";
}

function getEditorIndex() {
    return EditorIndex++;
}

function getVerifyHtml(f) {
    var b = "验证：<select onchange='cur.setVerify(this);'>";
    var e = ["0,无", "数字,整数", "小数", "日期", "手机", "固话", "电话,手机或固话", "Email,邮件", "城市单选,省份城市", "省市区", "高校", "地图", "指定选项", "网址", "身份证号", "学号", "QQ", "汉字", "姓名,中文姓名", "英文"];
    for (var d = 0; d < e.length; d++) {
        var g = e[d];
        var h = g.split(",");
        var a = h[0];
        var c = h.length == 2 ? h[1] : h[0];
        if (g == "指定选项" && f == 0) {
            continue;
        }
        b += "<option value='" + a + "'>" + c + "</option>";
    }
    b += "</select>";
    return b;
}

function checkVerifyMinMax(d, a, e) {
    var b = d.value;
    var c = a.value;
    if (b && !isInt(b)) {
        return "您输入的数据不正确";
    }
    if (c && !isInt(b)) {
        return "您输入的数据不正确";
    }
    if (b && c && b - c > 0) {
        return "您输入的数据不正确";
    }
    if (e == "数字" || e == "小数") {
        return "";
    }
    if (b && b - 3000 > 0) {
        return "字数不能超过3000";
    }
    if (c && c - 3000 > 0) {
        return "字数不能超过3000";
    }
    return "";
}

function createAttr() {
    var ai = new Date().getTime();
    var dX;
    var A = document.createElement("div");
    this.appendChild(A);
    var aF = document.createDocumentFragment();
    this.tabAttr = A;
    var cx = this;
    var n = this.dataNode;
    var cu = n._type;
    var cR = this.dataNode._tag || 0;
    var cD = cu == "question";
    var cd = cu == "slider";
    var t = cu == "sum";
    var bo = cu == "page";
    var E = cu == "cut";
    var bh = cu == "check";
    var aI = cu == "radio";
    var aV = aI && cR;
    var cP = cu == "radio_down";
    var ar = cu == "matrix";
    var bU = cu == "matrix" && cR > 300;
    var dY = cu == "fileupload";
    var dR = cu == "gapfill";
    var dL = bh && cR;
    var dP = aI || cP || bh || ar;
    var ea = !E && !bo;
    var dt = n._verify || "0";
    var a0 = dt != "0";
    var bA = n._isTouPiao;
    var bL = n._isCeShi;
    var M = n._isQingJing;
    var cN = n._isShop;
    var d9 = n._isCePing;
    var az = ar && cR < 102;
    var aa = this.get_div_title();
    var dG = "";
    var cU = new Array();
    this.option_radio = cU;
    var aB = document.createElement("div");
    aB.className = "div_title_attr_question";
    if (bL && !dR) {
        this.addCeShiSetting = function (en) {
            var ei = $ce("div", "", en);
            ei.style.marginTop = "15px";
            var el = $ce("span", "<b>题目分数：</b>", ei);
            var ek = "<select onchange='cur.setTValue(this.value);'>";
            for (var eh = 1; eh <= 50; eh++) {
                ek += "<option value='" + eh + "'>" + eh + "</option>";
            }
            ek += "</select>&nbsp;";
            el.innerHTML += ek;
            this.setTValue = function (i) {
                cx.dataNode._ceshiValue = parseInt(i);
                dw.style.display = "";
                if (cD) {
                    cx.setCeshiQTip();
                } else {
                    cx.spanCeShi.innerHTML = "（分值：" + cx.dataNode._ceshiValue + "分）";
                }
            };
            this.initValue = function () {
                if (this.dataNode._ceshiValue) {
                    var i = $$("select", el)[0];
                    i.value = this.dataNode._ceshiValue;
                }
            };
            ei.appendChild(el);
            var dw = $ce("span", "<a onclick='cur.copyScore(this);return false;' class='titlelnk' href='javascript:'>复制分数</a>", ei);
            dw.style.display = "none";
            this.copyScore = function (i) {
                PDF_launch("/wjx/design/applyscore.aspx?ct=" + cx.dataNode._topic, 500, 240);
            };
            if (cD) {
                var em = $ce("span", "&nbsp;答案：", ei);
                var ej = control_text("14");
                em.appendChild(ej);
                $ce("span", "<a title='如果有多个答案，请以“|”分隔' href='javascript:void(0);'  onclick='alert(this.title);return false;' style='color:green;'><b>(?)</b></a>&nbsp;&nbsp;", em);
                ej.value = n._answer;
                ej.onfocus = function () {
                    if (this.value == "请设置答案") {
                        this.value = "";
                    }
                };
                ej.onchange = ej.onblur = function () {
                    if (this.value == "") {
                        this.value = "请设置答案";
                    }
                    var i = trim(this.value);
                    if (/^[A-Za-z\s]+$/.test(i)) {
                        i = i.replace(/\s+/g, " ");
                    }
                    this.value = i;
                    cx.dataNode._answer = i;
                    cx.setCeshiQTip();
                };
                ej.onchange();
                var j = control_check();
                em.appendChild(j);
                $ce("span", "<b>包含答案即可得分</b><a title='用户提交的答案不需要跟设置的答案完全一样，只要包含设置的答案就可得分。' href='javascript:void(0);' onclick='alert(this.title);return false;' style='color:green;'><b>(?)</b></a>", em);
                j.onclick = function () {
                    if (!vipUser) {
                        alert("此功能只对企业版用户开放，请升级！");
                        this.checked = false;
                        return;
                    }
                    cx.dataNode._include = this.checked;
                };
                j.checked = n._include;
                if (ej.value == "简答题无答案") {
                    em.style.display = "none";
                }
            }
            var eg = $ce("span", "&nbsp;&nbsp;答案解析<a title='您可以填写针对此题答案的一些解析说明，在用户参与完测试后会看到此解析' href='javascript:void;' onclick='alert(this.title);return false;' style='color:green;'><b>(?)</b></a>：", ei);
            var ef = control_text("14");
            eg.appendChild(ef);
            ef.value = n._ceshiDesc;
            ef.onchange = ef.onblur = function () {
                cx.dataNode._ceshiDesc = this.value;
            };
            ef.onchange();
            ef.style.display = "none";
            $ce("span", "&nbsp;", ei);
            var eo = $ce("a", "设置答案解析", ei);
            eo.href = "javascript:void(0)";
            eo.className = "link-U666";
            eo.onclick = function () {
                if (!vipUser) {
                    alert("此功能只对企业版用户开放，请升级！");
                    return;
                }
                openTitleEditor(ef, function (i) {
                    if (i == "-1nc" || i == undefined) {
                        return;
                    }
                    ef.value = trim(i);
                    ef.onchange();
                });
                return false;
            };
            this.initValue();
        };
    }
    var cX = document.createElement("div");
    cX.style.marginLeft = "8px";
    var ad = n._title == "请在此输入问题标题" || n._title == "请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意";
    var ch = $ce("div", "", cX);
    if (M) {
        ch.style.display = "none";
    }
    var c = n._title.indexOf("<") > -1;
    if (!c) {
        var aT = "";
        if ((ea && n._topic - 1 > 0) || E) {
            aT = "&nbsp;<a href='javascript:' onclick='openReferWindow(cur,this);return false;' onmouseout='sb_setmenunav(toolTipLayer,false);' class='link-U666' title='引用前面题目的答案'>引用</a>";
        }
        var ab = $ce("div", "<span style='float:left;'>&nbsp;<b style='font-size:14px;'>标题</b>" + aT + "</span>", ch);
        ab.style.background = "#e2e0e1";
        ab.style.height = "27px";
        ab.style.lineHeight = "27px";
        ab.style.width = "395px";
        var bw = $ce("span", "", ab);
        bw.className = "spanRight";
        bw.style.paddingRight = "5px";
        var d2 = $ce("a", "设置标题字体、插入图片视频", bw);
        d2.href = "javascript:void(0);";
        d2.className = "link-U666";
        d2.onclick = function () {
            cx.createEditBox();
            return false;
        };
        $ce("div", "", ab).className = "divclear";
    }
    var bk = $ce("div", "", ch);
    var dO = $ce("div", "", bk);
    bk.style.width = "395px";
    var F = control_textarea("4", "29");
    F.tabIndex = 1;
    if (ad) {
        F.defValue = n._title;
    }
    if (ea) {
        F.title = "例如：您最喜欢的车型？";
        F.value = n.title;
    }
    if (bo) {
        F.title = "您可以在此输入本页的页面标题信息（选填）";
    }
    if (E) {
        F.title = "请在此输入内容";
        F.value = n.title;
    }
    var v = "tc" + n._type + getEditorIndex();
    F.value = n._title;
    F.id = v;
    F.style.overflow = "auto";
    F.style.padding = "5px 0 0 5px";
    F.style.border = "1px solid #dddddd";
    dO.appendChild(F);
    if (ea) {
        F.style.width = "388px";
        if (!c) {
            F.style.height = "70px";
            if (dR) {
                F.style.height = "90px";
            }
        } else {
            F.style.height = "102px";
        }
    } else {
        F.style.width = "388px";
        F.style.height = "130px";
    }
    F.onkeyup = F.onchange = function () {
        cx.checkTitle();
    };
    F.onfocus = function () {
        if (this.value == "请在此输入问题标题" || this.value == "请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意") {
            this.value = "";
        }
    };
    F.onblur = function () {
        if (!this.value && cx.dataNode._type != "page") {
            this.value = this.defValue || "";
            cx.checkTitle();
        }
    };
    cx.gettextarea = function () {
        return F;
    };
    var bE = "";
    if (bA) {
        if (aI) {
            bE = "<option value='radio'>列表单选题</option><option value='toupiaocheck'>投票多选题</option>";
        } else {
            if (bh) {
                if (!isMergeAnswer || this.isMergeNewAdded) {
                    bE = "<option value='toupiaoradio'>投票单选题</option><option value='check'>多选题</option>";
                } else {
                    bE = "<option value='check'>多选题</option>";
                }
            }
        }
    } else {
        if (dR) {
            if (bL) {
                bE = "<option value='gapfill'>多项填空题</option>";
            } else {
                bE = "<option value='ceshigap'>考试多项填空</option>";
            }
        } else {
            if (bL) {
                if (aI) {
                    bE = "<option value='radio'>列表单选题</option><option value='ceshicheck'>考试多选题</option>";
                } else {
                    if (bh) {
                        if (!isMergeAnswer || this.isMergeNewAdded) {
                            bE = "<option value='ceshiradio'>考试单选题</option><option value='check'>多选题</option>";
                        } else {
                            bE = "<option value='check'>多选题</option>";
                        }
                    }
                }
            } else {
                if (d9) {
                    if (aI) {
                        bE = "<option value='radio'>列表单选题</option><option value='cepingcheck'>评分多选题</option>";
                    } else {
                        if (bh) {
                            if (!isMergeAnswer || this.isMergeNewAdded) {
                                bE = "<option value='cepingradio'>评分单选题</option><option value='check'>列表多选题</option>";
                            } else {
                                bE = "<option value='check'>列表多选题</option>";
                            }
                        }
                    }
                } else {
                    if (!isMergeAnswer || this.isMergeNewAdded) {
                        if (cD) {
                            bE = "<option value='radio'>列表单选题</option><option value='radio_down'>下拉框单选题</option><option value='check'>多选题</option><option value='likert'>量表题</option><option value='order'>排序题</option><option value='ceshiq'>考试填空题</option>";
                        } else {
                            if (ar) {
                                if (bU) {
                                    if (cR != 303) {
                                        bE += "<option value='matrix,303'>表格下拉框</option>";
                                    }
                                    if (cR != 301) {
                                        bE += "<option value='matrix,301'>表格数值题</option>";
                                    }
                                    if (cR != 302) {
                                        bE += "<option value='matrix,302'>表格文本框</option>";
                                    }
                                } else {
                                    if (cR <= 101) {
                                        bE += "<option value='matrix,103'>矩阵单选题</option>";
                                        bE += "<option value='matrix,102'>矩阵多选题</option>";
                                        bE += "<option value='matrix,201'>矩阵文本题</option>";
                                        bE += "<option value='matrix,202'>矩阵滑动条</option>";
                                    } else {
                                        bE += "<option value='matrix,101'>矩阵量表题</option>";
                                        if (cR != 103) {
                                            bE += "<option value='matrix,103'>矩阵单选题</option>";
                                        }
                                        if (cR != 102) {
                                            bE += "<option value='matrix,102'>矩阵多选题</option>";
                                        }
                                        if (cR != 201) {
                                            bE += "<option value='matrix,201'>矩阵文本题</option>";
                                        }
                                        if (cR != 202) {
                                            bE += "<option value='matrix,202'>矩阵滑动条</option>";
                                        }
                                    }
                                }
                            } else {
                                if (dP) {
                                    if (!aI || aV) {
                                        bE += "<option value='radio'>列表单选题</option>";
                                    }
                                    if (!cP) {
                                        bE += "<option value='radio_down'>下拉框单选题</option>";
                                    }
                                    if (!bh || dL) {
                                        bE += "<option value='check'>多选题</option>";
                                    }
                                    if (!aV) {
                                        bE += "<option value='likert'>量表题</option>";
                                    }
                                    if (!dL) {
                                        bE += "<option value='order'>排序题</option>";
                                    }
                                    if (aI) {
                                        bE += "<option value='toupiaoradio'>投票单选题</option>";
                                        bE += "<option value='ceshiradio'>考试单选题</option>";
                                        bE += "<option value='cepingradio'>评分单选题</option>";
                                    } else {
                                        if (bh && !dL) {
                                            bE += "<option value='toupiaocheck'>投票多选题</option>";
                                            bE += "<option value='ceshicheck'>考试多选题</option>";
                                        }
                                    }
                                    bE += "<option value='question'>问答题</option>";
                                }
                            }
                        }
                    } else {
                        if ((aI || cP) && cR == 0) {
                            bE = "<option value='likert'>量表题</option><option value='check'>多选题</option><option value='toupiaoradio'>投票单选题</option><option value='cepingradio'>评分单选题</option><option value='ceshiradio'>考试单选题</option>";
                        } else {
                            if (bh && !dL) {
                                bE = "<option value='toupiaocheck'>投票多选题</option>";
                                bE += "<option value='ceshicheck'>考试多选题</option>";
                            } else {
                                if (ar && (cR == 103 || cR == 101)) {
                                    if (cR != 101) {
                                        bE += "<option value='matrix,101'>矩阵量表题</option>";
                                    }
                                    if (cR != 103) {
                                        bE += "<option value='matrix,103'>矩阵单选题</option>";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } if (bE) {
        bE = "<select style='width:90px;' onchange='javascript:cur.selChangeType(this.value);'><option value='0'>转换题型</option>" + bE + "</select>";
    }
    if (ea || E) {
        var dI = $ce("div", "", cX);
    }
    if (ea) {
        setFloat(ch);
        this.getQType = function () {
            var i = cx.dataNode._type;
            if (i == "question") {
                return "文本题";
            } else {
                if (i == "gapfill") {
                    if (cx.dataNode._isCeShi) {
                        return "考试多项填空";
                    }
                    return "多项填空题";
                } else {
                    if (i == "radio") {
                        if (cx.dataNode._isTouPiao) {
                            return "投票单选题";
                        } else {
                            if (cx.dataNode._isCeShi) {
                                return "考试单选题";
                            } else {
                                if (cx.dataNode._isCePing) {
                                    return "评分单选题";
                                } else {
                                    if (cR) {
                                        return "量表题";
                                    } else {
                                        if (cx.dataNode._isQingJing) {
                                            return "情景随机题";
                                        }
                                    }
                                }
                            }
                        }
                        return "单选题";
                    } else {
                        if (i == "radio_down") {
                            return "下拉框单选";
                        } else {
                            if (i == "check") {
                                if (cx.dataNode._isTouPiao) {
                                    return "投票多选题";
                                } else {
                                    if (cx.dataNode._isCeShi) {
                                        return "考试多选题";
                                    } else {
                                        if (cx.dataNode._isCePing) {
                                            return "评分多选题";
                                        } else {
                                            if (cR) {
                                                return "排序题";
                                            }
                                        }
                                    }
                                }
                                return "多选题";
                            } else {
                                if (i == "fileupload") {
                                    return "上传文件题";
                                } else {
                                    if (i == "matrix") {
                                        if (cR == 201) {
                                            return "矩阵文本题";
                                        } else {
                                            if (cR == 202) {
                                                return "矩阵滑动条";
                                            } else {
                                                if (cR == 301) {
                                                    return "表格数值题";
                                                } else {
                                                    if (cR == 302) {
                                                        return "表格文本题";
                                                    } else {
                                                        if (cR == 303) {
                                                            return "表格下拉框";
                                                        } else {
                                                            if (az) {
                                                                return "矩阵量表题";
                                                            } else {
                                                                if (cR == 103) {
                                                                    return "矩阵单选题";
                                                                } else {
                                                                    if (cR == 102) {
                                                                        return "矩阵多选题";
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        if (i == "sum") {
                                            return "比重题";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "";
        };
        setFloat(dI);
        if (bE && !M && !cN) {
            var ay = $ce("div", "", dI);
            var aS = this.getQType();
            var ba = aS;
            if (aS) {
                aS = "&nbsp;&nbsp;当前题型：<b>" + aS + "</b>";
            }
            ay.innerHTML = aS + "&nbsp;&nbsp;" + bE;
            this.selChangeType = function (j, i) {
                if (j == "0") {
                    return;
                }
                if (j == "question") {
                    if (confirm("转换成问答题将丢失所有选项信息，是否继续？") == false) {
                        return;
                    }
                }
                changeQ(j);
                window.focus();
            };
            if (ba == "考试单选题" || ba == "评分单选题" || ba == "量表题") {
                var am = false;
                var bI = 0;
                var a8 = cx.dataNode._topic;
                for (var dC = 0; dC < questionHolder.length; dC++) {
                    var I = questionHolder[dC].dataNode;
                    var af = I._type;
                    if (af == "cut" || af == "page") {
                        continue;
                    }
                    var dX = I._topic;
                    if (dX - a8 <= 0) {
                        continue;
                    }
                    if (I._type != "radio") {
                        break;
                    }
                    bI++;
                }
                if (bI >= 2) {
                    am = true;
                }
                if (am) {
                    var D = $ce("span", "&nbsp;&nbsp;<a href='javascript:void(0);' class='link-U00a6e6' title='批量复制此题的题型到后面的题目'>批量复制</a>", ay);
                    D.onclick = function () {
                        var i = "/wjx/design/applyqtype.aspx";
                        var j = cx.dataNode._topic;
                        i += "?ct=" + j;
                        PDF_launch(i, 500, 240);
                        return false;
                    };
                }
            }
        }
        var dZ = $ce("div", "", dI);
        if (M || cN) {
            dZ.style.display = "none";
        }
        dZ.innerHTML = "&nbsp;&nbsp;";
        var m = control_check();
        m.title = "用户在填写问卷时必须回答这道题";
        var dm = document.createTextNode("必答题");
        dZ.appendChild(m);
        dZ.appendChild(dm);
        var W = document.createElement("span");
        W.style.display = "none";
        W.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;将所有题目设为：<a href='javascript:setAllRequired(true);' class='link-U00a6e6'>必答</a>&nbsp;<a href='javascript:setAllRequired(false);' class='link-U00a6e6'>非必答</a>";
        dZ.appendChild(W);
        m.onclick = function () {
            cx.dataNode._requir = this.checked;
            cx.setreqstatus();
            W.style.display = "";
        };
        this.get_requir = function () {
            return m;
        };
        var e = document.createElement("div");
        if (M || cN) {
            e.style.display = "none";
        }
        e.innerHTML = "&nbsp;&nbsp;";
        var aA = control_check();
        e.appendChild(aA);
        var bi = document.createTextNode("填写提示");
        e.appendChild(bi);
        var cJ = $ce("span", "&nbsp;", e);
        var dU = control_text("14");
        dU.style.height = "15px";
        cJ.appendChild(dU);
        $ce("span", "&nbsp;", cJ);
        var V = $ce("a", "高级编辑模式", cJ);
        V.href = "javascript:";
        V.className = "link-U00a6e6";
        cJ.style.display = "none";
        var be = false;
        aA.onclick = function () {
            cJ.style.display = this.checked ? "" : "none";
            if (!this.checked) {
                cx.dataNode._oldins = dU.value;
                dU.value = "";
            } else {
                dU.value = cx.dataNode._oldins || "";
            }
            dU.onchange();
        };
        V.onclick = function () {
            openTitleEditor(dU, function (i) {
                if (i == "-1nc" || i == undefined) {
                    return false;
                }
                dU.value = trim(i);
                dU.onchange();
            });
            return false;
        };
        dU.onchange = dU.onblur = function () {
            this.value = replace_specialChar(this.value);
            if (dU.value.length > 0) {
                cx.get_div_ins().innerHTML = subjectInfo + this.value;
                cx.get_div_ins().style.visibility = "visible";
            } else {
                cx.get_div_ins().style.visibility = "hidden";
            }
            cx.dataNode._ins = this.value;
            if (this.value.indexOf("<") > -1) {
                this.style.display = "none";
                V.innerHTML = "编辑填写提示";
            } else {
                this.style.display = "";
                V.innerHTML = "高级编辑模式";
            } if (cx.checkTextJump) {
                cx.checkTextJump(this.value);
            }
        };
        dI.appendChild(e);
        var a5 = $ce("div", "", dI);
        if (M || cN) {
            a5.style.display = "none";
        }
        a5.innerHTML = "&nbsp;&nbsp;";
        var bO = control_check();
        var cb = document.createTextNode("无条件跳题");
        var cT = document.createElement("span");
        cT.style.display = "none";
        var ca = document.createElement("span");
        ca.innerHTML = "，填写此题后跳转到第";
        var by = control_text("3");
        by.style.height = "15px";
        by.onclick = function () {
            openJumpWindow(cx, this, true);
            by.openJumped = true;
        };
        by.onmouseout = function () {
            sb_setmenunav(toolTipLayer, false);
        };
        by.onmouseover = function () {
            if (!this.error) {
                if (!this.title || this.hasChanged) {
                    this.title = getJumpTitle(this.value);
                }
            }
        };
        var b9 = document.createElement("span");
        b9.innerHTML = "题";
        cT.appendChild(ca);
        cT.appendChild(by);
        cT.appendChild(b9);
        a5.appendChild(bO);
        a5.appendChild(cb);
        a5.appendChild(cT);
        var bQ = $ce("i", "", a5);
        bQ.className = "design-icon design-qmark";
        bQ.onmouseover = function () {
            toolTipLayer.style.width = "250px";
            toolTipLayer.innerHTML = "通过配合设置其他题目的“按选项跳题”实现更复杂的跳题逻辑 <a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=218&h=1'>查看示例</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        bQ.onmouseout = function () {
            sb_setmenunav(toolTipLayer, false, this);
        };
        bO.onclick = function () {
            if (this.checked) {
                if (bK && bK.value != "") {
                    if (confirm("设置跳转逻辑将清空本题的默认值，是否继续？")) {
                        bK.value = "";
                        cx.dataNode._default = "";
                        bT.value = "";
                    } else {
                        this.checked = false;
                    }
                }
                if (cV && cV.checked) {
                    cV.click();
                }
                if (!m.checked) {
                    show_status_tip("由于设置了无条件跳题，建议将此题设为必答", 4000);
                }
            }
            if (cx.defaultCheckSet) {
                cx.defaultCheckSet();
            }
            if (bK) {
                bK.disabled = this.checked;
            }
            cT.style.display = this.checked ? "" : "none";
            cx.dataNode._anytimejumpto = cx.dataNode._anytimejumpto == "0" ? "" : cx.dataNode._anytimejumpto;
            if (this.checked && cx.dataNode._anytimejumpto) {
                cx.dataNode._hasjump = true;
            } else {
                if (!this.checked) {
                    cx.dataNode._hasjump = false;
                }
            }
            cx.set_jump_ins();
            by.value = cx.dataNode._anytimejumpto;
        };
        by.onblur = function () {
            if (this.value == this.prevValue) {
                this.hasChanged = false;
                return;
            }
            this.hasChanged = true;
            this.prevValue = this.value;
            cx.checkAnyJump(true);
            cx.set_jump_ins();
        };
        $ce("div", "", cX).style.clear = "both";
    }
    if (ea || E) {
        var l = $ce("div", "", dI);
        if (!E) {
            l.innerHTML = "&nbsp;&nbsp;";
        } else {
            l.style.marginTop = "6px";
        } if (M) {
            l.innerHTML = "";
        }
        var ct = control_check();
        var bW = document.createElement("span");
        bW.style.color = "#222";
        bW.innerHTML = "关联逻辑";
        var d7 = document.createElement("span");
        var a3 = document.createElement("a");
        a3.innerHTML = "设置关联逻辑";
        a3.href = "javascript:void(0);";

        function aL() {
            cur.dataNode._relation = currentRelation || "";
            cur.displayRelation();
            return false;
        }
        d7.appendChild(a3);
        cx.initRelation = function () {
            this.dataNode._relation = "";
            a3.innerHTML = "设置关联逻辑";
            ct.checked = false;
            if (cx.RelationIns) {
                cx.RelationIns.style.display = "none";
            }
            d7.style.display = "none";
            bW.style.display = "";
            if (bu) {
                bu.style.display = "none";
            }
        };
        cx.displayRelation = function () {
            var j = this.dataNode._relation;
            if (!j) {
                this.initRelation();
                return false;
            } else {
                if (j == "0") {
                    ct.checked = true;
                    return false;
                }
            }
            ct.checked = true;
            var i = this.getRelation();
            if (i) {
                a3.innerHTML = i[0];
                a3.dtitle = i[1];
                a3.className = "link-444";
                a3.onmouseover = function () {
                    toolTipLayer.style.width = "250px";
                    if (this == cx.RelationIns) {
                        toolTipLayer.style.width = "350px";
                    }
                    toolTipLayer.innerHTML = this.dtitle;
                    sb_setmenunav(toolTipLayer, true, this);
                };
                a3.onmouseout = function (ef) {
                    sb_setmenunav(toolTipLayer, false, this);
                };
                if (!cx.RelationIns.onmouseover) {
                    cx.RelationIns.onmouseover = a3.onmouseover;
                    cx.RelationIns.onmouseout = a3.onmouseout;
                }
                cx.RelationIns.innerHTML = i[0];
                cx.RelationIns.dtitle = i[1];
                cx.RelationIns.style.display = "";
                bW.style.display = "none";
                d7.style.display = "inline-block";
                d7.style.width = "";
                var j = cx.dataNode._relation;
                if (j) {
                    var dw = j.split(",");
                    if (dw[1] && dw[1].split(";").length > 4) {
                        d7.style.width = "170px";
                    }
                }
                d7.style.fontSize = "12px";
                d7.style.overflow = "hidden";
                d7.style.verticalAlign = "bottom";
                d7.style.whiteSpace = "nowrap";
                d7.style.textOverflow = "ellipsis";
                if (!E && !M && !cN) {
                    bu.style.display = "";
                }
                bu.onclick = function () {
                    var eg = "/wjx/design/applyrelation.aspx";
                    var eh = cx.dataNode._topic;
                    eg += "?ct=" + eh;
                    var ef = cx.dataNode._relation;
                    if (ef) {
                        eg += "&rt=" + ef;
                    }
                    PDF_launch(eg, 500, 320);
                };
            }
        };
        a3.onclick = function () {
            var j = "/wjx/design/setrelation.aspx";
            var dw = cx.dataNode._topic;
            if (E) {
                dw = "0";
            }
            if (dw == "1") {
                show_status_tip("第1题不能设置关联逻辑", 5000);
                ct.checked = false;
                return false;
            }
            j += "?ct=" + dw;
            var i = cx.dataNode._relation;
            if (i) {
                j += "&rt=" + i;
            }
            currentRelation = i || "";
            PDF_launch(j, 500, 320, aL);
            return false;
        };
        ct.onclick = function () {
            if (!this.checked) {
                cx.initRelation();
                return;
            } else {
                a3.onclick();
            }
            return;
        };
        l.appendChild(ct);
        l.appendChild(bW);
        l.appendChild(d7);
        var bm = $ce("span", "<i class='design-icon design-qmark'></i>", l);
        bm.onmouseover = function () {
            toolTipLayer.style.width = "290px";
            toolTipLayer.innerHTML = "当前面题目<b>选中某些选项时</b>才出现此题 <a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=216&h=1'>查看帮助</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        bm.onmouseout = function () {
            sb_setmenunav(toolTipLayer, false, this);
        };
        var bu = $ce("span", "&nbsp;&nbsp;<a href='###' class='link-U00a6e6'>复制到后面的题目</a>", l);
        bu.style.display = "none";
        this.displayRelation();
    }
    if (dR) {
        var cK = $ce("div", "", dI);
        cK.style.marginLeft = "8px";
        var dg = control_check();
        cK.appendChild(dg);
        dg.onclick = function () {
            cx.dataNode._useTextBox = this.checked;
            cx.checkTitle();
        };
        $ce("span", "文本框样式&nbsp;&nbsp;", cK);
        var U = document.createElement("a");
        U.innerHTML = "<b>插入填空</b>";
        U.className = "link-U00a6e6";
        U.href = "javascript:void(0);";
        U.title = "填空用连续超过三个的下划线'_ _ _'表示";
        U.onclick = function () {
            if (KE.g[v] && KE.g[v].wyswygMode) {
                KE.util.focus(v);
                KE.util.selection(v);
                KE.util.insertHtml(v, GapFillStr);
                KE.util.focus(v);
            } else {
                var i = F.value.length;
                F.focus();
                if (typeof document.selection != "undefined") {
                    document.selection.createRange().text = GapFillStr;
                } else {
                    F.value = F.value.substr(0, F.selectionStart) + GapFillStr + F.value.substring(F.selectionEnd, i);
                }
                cx.checkTitle();
            }
            return false;
        };
        cK.appendChild(U);
    }
    aB.appendChild(cX);
    aF.appendChild(aB);
    if (bo) {
        var dl = document.createElement("span");
        dl.innerHTML = "此页是否是甄别页：";
        dl.title = "可以在此页设置筛选规则，如果用户提交的答卷不符合要求，则会终止后面的答题";
        var s = control_check();
        s.title = dl.title;
        s.onclick = function () {
            cx.dataNode._iszhenbie = this.checked;
            cx.divZhenBie.style.display = this.checked ? "" : "none";
        };
        cX.appendChild(dl);
        cX.appendChild(s);
        var dV = $ce("i", "", cX);
        dV.className = "design-icon design-qmark";
        dV.onmouseover = function () {
            toolTipLayer.style.width = "300px";
            toolTipLayer.innerHTML = "可以对此页的题目设置无效答卷筛选规则，用户点击下一页时，如果此页的答题不符合要求，系统会终止该用户继续答题。<a href='/help/help.aspx?helpid=76&h=1' class='titlelnk' target='_blank'>如何设置筛选规则？</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        dV.onmouseout = function (i) {
            sb_setmenunav(toolTipLayer, false, this);
        };
        var bx = !vipUser && !window.isPromote;
        if (bx) {
            dl.style.display = s.style.display = dV.style.display = "none";
        }
        var ae = document.createElement("div");
        ae.style.margin = "10px 0 0 15px";
        aB.appendChild(ae);
        var cS = document.createElement("div");
        cS.style.margin = "10px 0 0 15px";
        $ce("span", "<b>填写时间控制</b>&nbsp;", cS);
        aB.appendChild(cS);
        var bg = control_text(3);
        $ce("span", "此页允许停留时间为：<b>最短</b>", cS).appendChild(bg);
        var du = control_text(3);
        var g = $ce("span", "秒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>最长</b>", cS);
        g.appendChild(du);
        $ce("span", "秒（空表示不限制）", cS);
        bg.parDiv = cx;
        bg.onblur = bg.onchange = function () {
            var dw = this;
            var ef = dw.value;
            var j = this.parDiv;
            var eg = j.dataNode._maxtime;
            j.dataNode._istimer = false;
            if (ef) {
                if (isPositive(ef) && (!eg || (ef - eg <= 0))) {
                    if (eg && ef - eg == 0) {
                        j.dataNode._istimer = true;
                    }
                    j.dataNode._mintime = parseInt(ef);
                } else {
                    show_status_tip("最短时间必须为正整数并且少于最长时间", 4000);
                    dw.value = "";
                    j.dataNode._mintime = "";
                }
            } else {
                j.dataNode._mintime = "";
            } if (cur.dataNode._mintime && cur.dataNode._mintime == cur.dataNode._maxtime) {
                if (total_page == 1 && !window.alertTime) {
                    window.alertTime = 1;
                    alert("提示：您设置的最短填写时间等于最长填写时间，这个一般用于控制用户在确定的时间内观看图片或者视频！");
                }
            }
            var i = j.dataNode._mintime || j.dataNode._maxtime;
            b5.style.display = (window.isPromote || vipUser) && i ? "" : "none";
            j.showTimeLimit();
        };
        bg.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能设置每页最短填写时间，请升级！");
                this.value = "";
                this.blur();
                return;
            }
        };
        du.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能设置每页最长填写时间，请升级！");
                this.value = "";
                this.blur();
                return;
            }
        };
        du.onblur = du.onchange = function () {
            var dw = this;
            var ef = dw.value;
            var j = cur.dataNode._mintime;
            cur.dataNode._istimer = false;
            if (ef) {
                if (isPositive(ef) && (!j || (ef - j >= 0))) {
                    if (j && ef - j == 0) {
                        cur.dataNode._istimer = true;
                    }
                    cur.dataNode._maxtime = parseInt(ef);
                } else {
                    show_status_tip("最长时间必须为正整数并且大于最短时间", 4000);
                    dw.value = "";
                }
            } else {
                cur.dataNode._maxtime = "";
            }
            var i = cur.dataNode._mintime || cur.dataNode._maxtime;
            if (cur.dataNode._mintime && cur.dataNode._mintime == cur.dataNode._maxtime) {
                if (total_page == 1 && !window.alertTime) {
                    window.alertTime = 1;
                    alert("提示：您设置的最短填写时间等于最长填写时间，这个一般用于控制用户在确定的时间内观看图片或者视频！");
                }
            }
            b5.style.display = (window.isPromote || vipUser) && i ? "" : "none";
            cx.showTimeLimit();
        };
        cx.setMinMaxTime = function () {
            if (bg) {
                bg.value = this.dataNode._mintime;
            }
            if (du) {
                du.value = this.dataNode._maxtime;
            }
        };
        var cg = $ce("i", "", cS);
        cg.className = "design-icon design-qmark";
        cg.onmouseover = function () {
            toolTipLayer.style.width = "250px";
            toolTipLayer.innerHTML = "说明：从进入此页开始计时，在还未达到最短填写时间时不能进入下一页或提交答卷，当到达最长填写时间后还未做答完成将自动跳转到下一页或提交答卷。如果要控制用户观看图片或者视频的时间，可以设置最短填写时间等于最长填写时间，<a href='http://www.sojump.com/jq/3690298.aspx' target='_blank' class='titlelnk'>查看示例问卷</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        cg.onmouseout = function (i) {
            sb_setmenunav(toolTipLayer, false, this);
        };
        var b5 = $ce("div", "将上面的填写时间复制到&nbsp;", cS);
        b5.style.margin = "6px 0 0 86px";
        var ap = 1;
        var w = 1;
        var Z = total_page;
        $ce("span", "<input type='radio'  name='rbltimesp' onclick='cur.setTimePageTime(1);'  checked='checked'  />所有页<input type='radio' name='rbltimesp'  onclick='cur.setTimePageTime(2);'/>指定页", b5);
        var L = $ce("span", "：第<input type='text' value='1' onblur='cur.setTimePageStart(this);' style='width:20px;'/>页到<input type='text' value='" + Z + "' onblur='cur.setTimePageEnd(this);' style='width:20px;'/>页", b5);
        L.style.display = "none";
        cx.setTimePageTime = function (i) {
            ap = i;
            L.style.display = i == 1 ? "none" : "";
        };
        cx.setTimePageStart = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - Z >= 0) {
                i.value = 1;
                show_status_tip("必须为正数，并且小于最大页数", 4000);
            }
            w = i.value;
        };
        cx.setTimePageEnd = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - total_page > 0) {
                i.value = total_page;
                show_status_tip("必须为正数，并且小于总页数", 4000);
            } else {
                if (j - w <= 0) {
                    i.value = total_page;
                    show_status_tip("必须大于最小页数", 4000);
                }
            }
            Z = i.value;
        };
        var d3 = $ce("span", "&nbsp;", b5);
        var aH = control_btn("复制");
        aH.className = "finish cancle";
        d3.appendChild(aH);
        aH.onclick = function () {
            if (ap == 1) {
                Z = total_page;
            }
            dn(firstPage);
            for (var j = 0; j < questionHolder.length; j++) {
                dn(questionHolder[j]);
            }
            show_status_tip("成功复制", 4000);
        };
        var c2 = $ce("div", "", aB);
        c2.style.margin = "10px 0px 0px 15px";
        if (!vipUser && !window.isPromote) {
            c2.style.display = "none";
        }
        $ce("span", "<b>批量插入分页符</b>&nbsp;", c2);
        var ed = $ce("span", "每隔", c2);
        var a6 = control_text(3);
        a6.value = "1";
        ed.appendChild(a6);
        $ce("span", "题插入一个分页符", ed);
        a6.maxlength = 2;
        a6.onblur = a6.onchange = function () {
            if (!isPositive(this.value)) {
                this.value = 1;
            }
        };
        var c4 = 1;
        var aY = 1;
        var dj = total_question;
        $ce("span", "&nbsp;&nbsp;&nbsp;范围：<input type='radio' name='rblPageScope' onclick='cur.setInsertScopeType(1);' checked='checked'/>全部题<input type='radio' name='rblPageScope' onclick='cur.setInsertScopeType(2);'/>指定题", c2);
        var o = $ce("span", "&nbsp;第<input type='text' style='width:20px;' value='1' onblur='cur.setInsertMinPage(this);'>至第<input type='text' style='width:20px;'  onblur='cur.setInsertMaxPage(this);' value='" + dj + "'>题", c2);
        o.style.display = "none";
        cx.setInsertScopeType = function (i) {
            c4 = i;
            o.style.display = i == 1 ? "none" : "";
        };
        cx.setInsertMinPage = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - dj >= 0) {
                i.value = 1;
                show_status_tip("必须为正数，并且小于最大题数", 4000);
            }
            aY = i.value;
        };
        cx.setInsertMaxPage = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - total_question > 0) {
                i.value = total_question;
                show_status_tip("必须为正数，并且小于总题数", 4000);
            } else {
                if (j - aY <= 0) {
                    i.value = total_question;
                    show_status_tip("必须大于最小题数", 4000);
                }
            }
            dj = i.value;
        };
        var ee = $ce("span", "", c2);
        var S = control_btn("批量插入");
        S.className = "finish cancle";
        ee.appendChild(S);
        $ce("span", "&nbsp;", ee);
        var b6 = control_btn("删除");
        b6.className = "finish cancle";
        b6.title = "删除除第一页之外的所有分页";
        ee.appendChild(b6);
        b6.onclick = function () {
            if (confirm("确定删除除第一页之外的所有分页吗？")) {
                var ef = new Array();
                for (var j = 0; j < questionHolder.length; j++) {
                    var dw = questionHolder[j].dataNode;
                    if (dw._type == "page") {
                        ef.push(questionHolder[j]);
                    }
                }
                for (var j = 0; j < ef.length; j++) {
                    ef[j].deleteQ("noNeedConfirm");
                }
            }
        };
        S.onclick = function () {
            var eh = new Array();
            for (var eg = 0; eg < questionHolder.length; eg++) {
                var ej = questionHolder[eg].dataNode;
                questionHolder[eg].pageNext = false;
                if (ej._type != "page" && ej._type != "cut") {
                    eh.push(questionHolder[eg]);
                } else {
                    if (ej._type == "page") {
                        if (eg > 0) {
                            questionHolder[eg - 1].pageNext = true;
                        }
                    }
                }
            }
            var j = eh.length;
            if (j > 1) {
                var dw = parseInt(a6.value);
                var ek = (aY - 1) || dw - 1;
                if (c4 == 1) {
                    dj = total_question;
                }
                for (var eg = ek; eg < dj - 1; eg += dw) {
                    var ei = questionHolder[eg + 1];
                    if (eh[eg].pageNext) {
                        continue;
                    }
                    var ef = createFreQdataNode("page");
                    addNewQ(ef, false, false, eh[eg]);
                }
            } else {
                show_status_tip("最后一题不需要添加分页", 4000);
            }
        };

        function dn(j) {
            var dw = j.dataNode;
            if (dw._type == "page") {
                var i = parseInt(dw._topic);
                if (i >= w && i <= Z) {
                    dw._mintime = cur.dataNode._mintime;
                    dw._maxtime = cur.dataNode._maxtime;
                    if (j.setMinMaxTime) {
                        j.setMinMaxTime();
                    }
                }
            }
        }
    }
    if (dP || t) {
        var bv = "link-U666";
        if (newQType == 5) {
            bv = "link-UF90";
        }
        var a4 = "<a href='javascript:' onclick='cur.show_divAddFromCheck();return false;' class='" + bv + "' title='引用其它题的选中项'>引用其它题选中项</a>&nbsp;";
        var T = document.createElement("div");
        T.style.margin = "10px 0px";
        var bj = $ce("select", "", T);
        this.selAddFromCheck = bj;
        bj.style.width = "220px";
        T.style.display = "none";
        var d1 = document.createElement("span");
        d1.style.display = "none";
        this.show_divAddFromCheck = function () {
            if (!T.inited) {
                bj.onchange = function () {
                    if (!vipUser) {
                        alert("只有企业版用户才能使用引用逻辑，请升级！");
                        this.value = "0";
                        return;
                    }
                    cur.addFromCheck(this);
                };
                T.inited = true;
                var i = $ce("label", "<i class='design-icon design-qmark'></i>", T);
                i.onmouseover = function () {
                    toolTipLayer.style.width = "300px";
                    toolTipLayer.innerHTML = "引用前面多选题或者排序题的选中项 <a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=217&h=1'>查看示例</a>";
                    sb_setmenunav(toolTipLayer, true, this);
                };
                i.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false, this);
                };
            }
            T.style.display = T.style.display == "" ? "none" : "";
            if (isMergeAnswer && !this.isMergeNewAdded) {
                T.style.display = "none";
            }
            if (newQType == 5) {
                T.style.display = "none";
            }
            if (ar) {
                if (bH) {
                    bH.style.display = T.style.display == "" ? "none" : "";
                }
                if (dc && !dc.checked) {
                    bH.style.display = "none";
                }
                if (bj.value > 0 && bH) {
                    bH.style.display = "none";
                }
            }
            this.updateSelCheck();
            this.hasDisplaySelCheck = T.style.display == "";
        };
        this.updateSelCheck = function () {
            for (var eg = 0; eg < bj.options.length; eg++) {
                bj.options[eg] = null;
            }
            bj.options[0] = new Option("请选择来源题目(多选或排序题)", 0);
            var ek = 1;
            for (var eg = 0; eg < questionHolder.length; eg++) {
                var ej = questionHolder[eg].dataNode;
                var em = this.dataNode._topic;
                if (ej._type == "check" && ej._topic - em < 0 && !questionHolder[eg]._referDivQ) {
                    var dw = "[多选题]";
                    if (ej._tag) {
                        dw = "[排序题]";
                    }
                    var ef = ej._title;
                    ef = ef.replace(/<(?!img|embed).*?>/ig, "");
                    ef = ef.replace(/&nbsp;/ig, " ").substring(0, 16);
                    var ei = ef + "  " + dw;
                    if (!WjxActivity._use_self_topic) {
                        ei = ej._topic + "." + ei;
                    }
                    var eh = new Option(ei, ej._topic);
                    eh.referDivQ = questionHolder[eg];
                    bj.options[ek++] = eh;
                }
            }
            if (this._referDivQ) {
                var el = bj.options;
                for (var eg = 0; eg < el.length; eg++) {
                    var j = el[eg];
                    if (j.referDivQ == this._referDivQ) {
                        bj.value = j.value;
                        break;
                    }
                }
            }
        };
        this.addFromCheck = function (eh) {
            var ef = bj.selectedIndex;
            if (aI || bh) {
                if (ef > 0 && b0.checked) {
                    b0.checked = false;
                    b0.onclick();
                }
                b0.disabled = ef > 0 ? true : false;
                cm.style.display = ef > 0 ? "none" : "";
            } else {
                eb.style.display = ef > 0 ? "none" : "";
                if (aE) {
                    aE.style.display = eb.style.display;
                }
            }
            d1.style.display = ef > 0 ? "" : "none";
            this.clearReferQ();
            if (bj.value > 0) {
                if (this._referedArray) {
                    var dw = "";
                    for (var eg = 0; eg < this._referedArray.length; eg++) {
                        if (eg > 0) {
                            dw += ",";
                        }
                        dw += this._referedArray[eg].dataNode._topic;
                    }
                    show_status_tip("第" + dw + "题的选项或行标题来源于此题的选中项，此题不能再引用其他题");
                    bj.value = "0";
                    this.show_divAddFromCheck();
                    return;
                }
                var j = bj.options[bj.selectedIndex].referDivQ;
                this._referDivQ = j;
                if (!j._referedArray) {
                    j._referedArray = new Array();
                }
                if (j._referedArray.indexOf(this) == -1) {
                    j._referedArray.push(this);
                }
                j._referedArray.sort(function (ei, i) {
                    return ei.dataNode._topic - i.dataNode._topic;
                });
                this.updateReferQ();
            } else {
                this.show_divAddFromCheck();
            } if (this.dataNode._daoZhi) {
                if (cB) {
                    cB.checked = false;
                    this.dataNode._daoZhi = false;
                    cx.updateSpanMatrix();
                    show_status_tip("使用引用逻辑后，不能再使用竖向选择", 5000);
                }
            }
            if (this.updateItem) {
                this.updateItem();
            } else {
                if (this.createSum) {
                    this.createSum();
                }
            }
        };
        this.removeRefer = function () {
            bj.value = "0";
            this.addFromCheck();
        };
        this.clearReferQ = function () {
            if (this._referDivQ) {
                this._referDivQ._referedArray.remove(this);
                if (!this._referDivQ._referedArray.length) {
                    this._referDivQ._referedArray = null;
                }
                this._referDivQ = null;
            }
        };
        this.clearReferedQ = function () {
            if (this._referedArray) {
                for (var j = 0; j < this._referedArray.Length; j++) {
                    var dw = this._referedArray[j];
                    dw._referDivQ = null;
                    if (dw.updateItem) {
                        dw.updateItem();
                    } else {
                        if (dw.createSum) {
                            dw.createSum();
                        }
                    }
                }
            }
        };
        this.updateReferQ = function () {
            if (this._referDivQ) {
                var i = this._referDivQ;
                var dw = "选项";
                if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
                    dw = "行标题";
                }
                var j = "&nbsp;<a href='javascript:' onclick='cur.removeRefer();return false;' class='link-U666'>取消引用</a>&nbsp;";
                if (isMergeAnswer && !this.isMergeNewAdded) {
                    j = "";
                }
                d1.innerHTML = j;
            }
        };
    }
    if (ea) {
        $ce("div", "", aB).style.clear = "both";
        var c5 = document.createElement("div");
        c5.style.marginLeft = "8px";
        if (!dP) {
            var dM = document.createElement("div");
            dM.style.margin = "10px 0";
            c5.appendChild(dM);
        }
        aB.appendChild(c5);
    }
    if (cd) {
        $ce("span", "最小值：", dM);
        var aG = control_text("3");
        aG.title = "用户可以选择的最小值";
        aG.maxLength = 4;
        aG.style.height = "20px";
        dM.appendChild(aG);
        $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;最小值显示文本：", dM);
        var b7 = control_text("10");
        b7.style.height = "20px";
        dM.appendChild(b7);
        var bF = document.createElement("br");
        dM.appendChild(bF);
        $ce("div", "", dM).style.height = "6px";
        $ce("span", "最大值：", dM);
        var d = control_text("3");
        d.style.height = "20px";
        d.title = "用户可以选择的最大值";
        d.maxLength = 4;
        dM.appendChild(d);
        $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;最大值显示文本：", dM);
        var aq = control_text("10");
        aq.style.height = "20px";
        dM.appendChild(aq);
        aG.onchange = aG.onblur = function () {
            var i = 100;
            if (!isInt(this.value) || this.value - d.value > 0) {
                show_status_tip("最小值不合法", 4000);
                i = (0 - d.value < 0) ? 0 : toInt(d.value) - 1;
            } else {
                i = toInt(this.value);
            }
            cx.dataNode._minvalue = i;
            this.value = i;
            cx.get_span_min_value().innerHTML = "(" + i + ")";
        };
        d.onchange = d.onblur = function () {
            if (!isInt(this.value) || this.value - aG.value < 0) {
                show_status_tip("最大值不合法", 4000);
                val = (100 - aG.value > 0) ? 100 : toInt(aG.value) + 1;
            } else {
                val = toInt(this.value);
            }
            cx.dataNode._maxvalue = val;
            this.value = val;
            cx.get_span_max_value().innerHTML = "(" + val + ")";
        };
        b7.onchange = b7.onblur = function () {
            this.value = replace_specialChar(this.value);
            cx.get_span_min_value_text().innerHTML = cx.dataNode._minvaluetext = this.value;
        };
        aq.onchange = aq.onblur = function () {
            this.value = replace_specialChar(this.value);
            cx.get_span_max_value_text().innerHTML = cx.dataNode._maxvaluetext = this.value;
        };
    }
    if (dY) {
        dM.innerHTML = "<span style='font-size:10px'>●&nbsp;</span>";
        $ce("span", "上传文件允许的最大文件大小(KB)：", dM);
        var J = control_text("8");
        var dy = fileMaxSize / 1024;
        J.maxLength = 5;
        dM.appendChild(J);
        $ce("span", "&nbsp;不能超过" + fileMaxSize + "KB(" + dy + "M)", dM);
        J.onblur = J.onchange = function () {
            var i = J.value;
            if (i) {
                if (isPositive(i) && i - fileMaxSize <= 0) {
                    cx.dataNode._maxsize = i;
                } else {
                    cx.dataNode._maxsize = fileMaxSize;
                    show_status_tip("最大文件大小必须为正数，并且不能超过" + fileMaxSize + "KB（即" + dy + "M）", 3000);
                    this.value = "";
                }
            } else {
                cx.dataNode._maxsize = fileMaxSize;
            }
            cx.updateFileUpload();
        };
        $ce("br", "", dM);
        $ce("span", "<span style='font-size:10px'>●&nbsp;</span>上传文件允许的扩展名：", dM);
        var ak = "<div><b>&nbsp;&nbsp;图片文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.gif'/>.gif&nbsp;<input type='checkbox' value='.png'/>.png&nbsp;<input type='checkbox' value='.jpg'/>.jpg&nbsp;<input type='checkbox' value='.jpeg'/>.jpeg&nbsp;<input type='checkbox' value='.bmp'/>.bmp&nbsp;</div>";
        ak += "<div><b>&nbsp;&nbsp;文档文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.doc'/>.doc&nbsp;<input type='checkbox' value='.docx'/>.docx&nbsp;<input type='checkbox' value='.pdf'/>.pdf&nbsp;<input type='checkbox' value='.xls'/>.xls&nbsp;<input type='checkbox' value='.xlsx'/>.xlsx&nbsp;<input type='checkbox' value='.ppt'/>.ppt&nbsp;<input type='checkbox' value='.pptx'/>.pptx&nbsp;<input type='checkbox' value='.txt'/>.txt&nbsp;</div>";
        ak += "<div><b>&nbsp;&nbsp;压缩文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.rar'/>.rar&nbsp;<input type='checkbox' value='.zip'/>.zip&nbsp;<input type='checkbox' value='.gzip'/>.gzip</div><div style='margin-top:10px;'>&nbsp;&nbsp;提示：用户上传的文件在您不删除的情况下默认会保存5年时间。</div>";
        var dN = $ce("div", ak, dM);
        cx.updateExt = function (ef) {
            var i = $$("input", dN);
            var dw = "";
            for (var j = 0; j < i.length; j++) {
                if (i[j].checked && i[j].value) {
                    if (dw) {
                        dw += "|";
                    }
                    dw += i[j].value;
                }
            }
            this.dataNode._ext = dw;
            this.updateFileUpload();
        };
    }
    if (cD && cx.dataNode._verify != "多级下拉") {
        if (bL) {
            var bP = document.createElement("div");
            c5.appendChild(bP);
            this.addCeShiSetting(bP);
        }
        var cM = this.get_span_maxword();
        var bT = this.get_textarea();
        var bB = $ce("span", "高度：", dM);
        var dF = "<select onchange='cur.setTHeight(this);'><option value='1'>1行</option><option value='2'>2行</option><option value='3'>3行</option><option value='4'>4行</option><option value='5'>5行</option><option value='10'>10行</option><option value='自定义'>自定义</option></select>&nbsp;";
        bB.innerHTML += dF;
        var c8 = $ce("span", "", dM);
        var aM = control_text("3");
        aM.maxLength = 3;
        aM.onchange = aM.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && !isInt(i)) {
                show_status_tip("您输入的高度不合法！");
                this.value = "";
                cx.dataNode._height = "1";
            } else {
                cx.dataNode._height = i ? parseInt(i) : "";
            }
            cx.showTextAreaHeight();
        };
        this.setTHeight = function (i) {
            if (i.value != "自定义") {
                aM.value = i.value;
                c8.style.display = "none";
                aM.onchange();
            } else {
                c8.style.display = "";
            }
        };
        this.initHeight = function () {
            if (this.dataNode._height) {
                var i = $$("select", bB)[0];
                i.value = this.dataNode._height;
                if (i.selectedIndex == -1) {
                    i.value = "自定义";
                    this.setTHeight(selWidth);
                }
            }
        };
        c8.style.display = "none";
        c8.appendChild(aM);
        c8.appendChild(document.createTextNode("行"));
        var cw = $ce("span", "&nbsp;&nbsp;宽度：", dM);
        var cH = "<select onchange='cur.setTWidth(this);'><option value=''>默认</option><option value='50'>50</option><option value='100'>100</option><option value='200'>200</option><option value='300'>300</option><option value='400'>400</option><option value='500'>500</option><option value='600'>600</option><option value='自定义'>自定义</option></select>&nbsp;";
        cw.innerHTML += cH;
        var aR = control_text("5");
        aR.maxLength = 3;
        aR.onchange = aR.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && !isInt(i)) {
                show_status_tip("您输入的宽度不合法！");
                this.value = "";
                cx.dataNode._width = "";
            } else {
                cx.dataNode._width = i ? parseInt(i) : "";
                if (i == "1" && cx.dataNode._requir) {
                    m.click();
                }
            }
            cx.showTextAreaWidth();
        };
        this.setTWidth = function (i) {
            if (i.value != "自定义") {
                aR.value = i.value;
                aR.style.display = "none";
                aR.onchange();
            } else {
                aR.style.display = "";
            }
        };
        this.initWidth = function () {
            if (this.dataNode._width) {
                var i = $$("select", cw)[0];
                i.value = this.dataNode._width;
                if (i.selectedIndex == -1 || this.dataNode._width == "1") {
                    i.value = "自定义";
                    this.setTWidth(i);
                }
            }
        };
        dM.appendChild(cw);
        aR.style.display = "none";
        dM.appendChild(aR);
        var N = $ce("span", "&nbsp;&nbsp;", dM);
        var ck = control_check();
        N.appendChild(ck);
        N.appendChild(document.createTextNode("下划线样式"));
        ck.onclick = function () {
            cx.dataNode._underline = this.checked;
            cx.showTextAreaUnder();
        };
        var aQ = $ce("span", "&nbsp;&nbsp;", dM);
        var z = control_check();
        aQ.appendChild(z);
        var cG = "默认值";
        var cn = $ce("span", cG, aQ);
        var bK = control_textarea("1", "18");
        bK.style.overflow = "auto";
        bK.style.height = "";
        bK.style.display = "none";
        bK.style.verticalAlign = "middle";
        bK.maxLength = "20";
        bK.title = "最多输入20个字符";
        z.onclick = function () {
            bK.style.display = bK.style.display == "none" ? "" : "none";
            if (!this.checked) {
                cx.dataNode._olddefault = bK.value;
                bK.value = "";
            } else {
                bK.value = cx.dataNode._olddefault || "";
            }
            bK.onchange();
        };
        aQ.appendChild(bK);
        bK.onchange = bK.onblur = function () {
            if (cx.checkDefault) {
                cx.checkDefault();
            }
        };
        this.changeDefaultAttr = function (i) {
            if (this.dataNode._verify == "省市区" || this.dataNode._verify == "高校") {
                cn.innerHTML = "指定省份";
                bK.onmouseover = function () {
                    openProvinceWindow(cx, this);
                };
                bK.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false);
                };
            } else {
                cn.innerHTML = cG;
                bK.onmouseover = bK.onmouseout = null;
            } if (i) {
                bK.value = "";
                bK.onchange();
            }
        };
        var cY = document.createElement("div");
        var b4 = control_check();
        var cj = document.createElement("span");
        var aD = getVerifyHtml(0);
        cj.innerHTML = aD;
        cY.appendChild(cj);
        this.setVerify = function (j) {
            var i = false;
            if (this.dataNode._verify == "省市区" || j.value == "省市区" || this.dataNode._verify == "高校" || j.value == "高校") {
                i = true;
            }
            this.dataNode._verify = j.value;
            if (this.dataNode._verify == "数字" || this.dataNode._verify == "小数") {
                aC.innerHTML = aC.innerHTML.replace("字数", "值");
                aj.innerHTML = aj.innerHTML.replace("字数", "值");
                ag = "值";
            } else {
                aC.innerHTML = aC.innerHTML.replace("值", "字数");
                aj.innerHTML = aj.innerHTML.replace("值", "字数");
                ag = "字数";
            }
            this.changeDefaultAttr(i);
            this.showTextAreaDate();
            this.showByVerify();
            this.showSmsVerify();
            cZ.getElementsByTagName("span")[0].innerHTML = this.dataNode._verify == "地图" ? "不允许填写者修改&nbsp;" : "不允许重复&nbsp;";
        };
        this.showByVerify = function () {
            var j = this.dataNode._verify;
            if (br) {
                br.style.display = j == "手机" ? "" : "none";
            }
            var i = j == "数字" || j == "小数" || j == "汉字" || j == "英文" || j == "学号" || j == "" || j == "0";
            aW.style.display = i ? "" : "none";
            if (!i) {
                cx.dataNode._minword = "";
                cx.dataNode._maxword = "";
            }
        };
        this.initVerify = function () {
            var j = this.dataNode._verify || "0";
            var i = $$("select", cj)[0];
            i.value = j;
            this.showByVerify();
        };
        var aW = $ce("span", "&nbsp;", cY);
        var ag = "字数";
        if (n._verify == "数字" || n._verify == "小数") {
            ag = "值";
        }
        var aC = $ce("span", "最小" + ag + "：", aW);
        var au = control_text("4");
        au.title = "不填表示无限制";
        aW.appendChild(au);
        au.onchange = au.onblur = function () {
            var j = this.value;
            var i = d4.value;
            if (!isEmpty(j) && (!isInt(j) || (!isEmpty(i) && this.value - i > 0))) {
                show_status_tip("最小" + ag + "不合法", 4000);
                this.value = "";
            } else {
                if (!isEmpty(j) && cx.dataNode._verify != "数字" && cx.dataNode._verify != "小数") {
                    if (j - 3000 > 0) {
                        show_status_tip("最小字数不能超过3000", 4000);
                        this.value = "";
                    }
                }
            }
            cx.dataNode._minword = this.value;
            cx.showMinMaxWord(i, this.value);
            cx.checkDefault();
        };
        var aj = $ce("span", "最大" + ag + "：", aW);
        aj.style.marginLeft = "10px";
        var d4 = control_text("4");
        d4.title = "不填表示无限制";
        d4.onchange = d4.onblur = function () {
            var j = this.value;
            var i = au.value;
            if (!isEmpty(j) && (!isInt(j) || (!isEmpty(i) && this.value - i < 0))) {
                show_status_tip("最大字数不合法", 4000);
                this.value = "";
            } else {
                if (!isEmpty(j) && cx.dataNode._verify != "数字" && cx.dataNode._verify != "小数") {
                    if (j - 3000 > 0) {
                        show_status_tip("最大字数不能超过3000", 4000);
                        this.value = "";
                    }
                }
            }
            cx.dataNode._maxword = this.value;
            cx.showMinMaxWord(this.value, i);
            cx.checkDefault();
        };
        aW.appendChild(d4);
        var cq = control_check();
        var cZ = $ce("span", "&nbsp;&nbsp;", cY);
        cZ.appendChild(cq);
        var f = "不允许重复";
        if (n._verify == "地图") {
            f = "不允许填写者修改";
        }
        $ce("span", f + "&nbsp;", cZ);
        cq.onclick = function () {
            if (!vipUser) {
                this.checked = false;
                alert("此功能只对企业版用户开放，请升级！");
                return;
            }
            cx.dataNode._needOnly = this.checked;
            if (this.checked && !cx.dataNode._requir && cx.dataNode._verify != "地图") {
                show_status_tip("由于设置了唯一性，推荐将该题设为必答题", 4000);
                m.click();
            }
        };
        cq.title = "要求每个人填写的答案是唯一的";
        var bS = control_check();
        var br = $ce("span", "&nbsp;&nbsp;", cY);
        br.appendChild(bS);
        $ce("span", "使用短信验证&nbsp;&nbsp短信余额：<span style='color:red;'>" + smsBalance + "</span>，<a href='/corphome/account/prepaysms.aspx?amount=500' target='_blank' class='titlelnk'>购买</a>", br);
        bS.onclick = function () {
            cx.dataNode._needsms = this.checked;
            if (this.checked && !cx.dataNode._requir) {
                show_status_tip("由于设置了短信验证，推荐将该题设为必答题", 4000);
                m.click();
            }
            cx.showSmsVerify();
        };
        c5.appendChild(cY);
        this.changeDefaultAttr();
        if (bL) {
            cY.style.display = "none";
        }
    } else {
        if (cD && cx.dataNode._verify == "多级下拉") {
            var cF = "/wjx/design/setmenulist.aspx?ct=" + cx.dataNode._topic;
            var dr = $ce("span", "<a class='sumitbutton cancle' href='javascript:' onclick='PDF_launch(\"" + cF + "\",500,500);return false;'>点击设置多级下拉选项</a>", dM);
        }
    } if (dR) {
        var H = "填空属性";
        if (bL) {
            H = "答案设置";
        }
        var dz = $ce("div", "<a onclick='cur.setMRowAttr();return false;' href='javascript:' class='sumitbutton cancle'>" + H + "</a>", aB);
        this.setMRowAttr = function () {
            PDF_launch("/wjx/design/setrowattr.aspx?ct=" + this.dataNode._topic, 700, 370, function () {
                cur.checkTitle();
            });
        };
        dz.style.margin = "15px 0 15px 10px";
    }
    if (dP) {
        var cm = document.createElement("div");
        cm.style.clear = "both";
    }
    var dQ = false;
    for (var dC = 0; dC < questionHolder.length; dC++) {
        var I = questionHolder[dC].dataNode;
        if (I._type == "cut" || I._type == "page") {
            continue;
        }
        var dX = I._topic;
        if (dX - this.dataNode._topic < 0 && I._type == "check") {
            dQ = true;
            break;
        } else {
            if (dX - this.dataNode._topic >= 0) {
                break;
            }
        }
    }
    if (ar || t) {
        var bq = document.createElement("div");
        bq.style.padding = "5px 0 0";
        if (ar) {
            cm.appendChild(bq);
            bq.style.width = "315px";
            if (bU) {
                bq.style.width = "385px";
            }
            if (newQType == 5) {
                if (cR != 202 && cR < 300) {
                    bq.style.display = "none";
                } else {
                    if (cR > 300) {
                        bq.style.width = "199px";
                    }
                }
            }
        } else {
            c5.appendChild(bq);
        }
        var db = document.createElement("div");
        bq.appendChild(db);
        db.className = "matrixtitle";
        db.style.width = "315px";
        if (bU) {
            db.style.width = "186px";
            if (newQType == 5) {
                db.style.display = "none";
            }
        } else {
            if (cR == 202 && newQType == 5) {
                db.style.display = "none";
            }
        } if (t) {
            bq.style.width = "400px";
            var cl = $ce("div", "可分配的总比重值：", db);
            cl.style.marginBottom = "10px";
            var cL = control_text("3");
            cL.style.height = "20px";
            cL.maxLength = 3;
            cL.style.overflow = "auto";
            cL.value = this.dataNode._total || "100";
            cl.appendChild(cL);
            cL.onchange = cL.onblur = function () {
                if (isInt(this.value) && parseInt(this.value) > 0) {
                    cx.dataNode._total = parseInt(this.value);
                } else {
                    cx.dataNode._total = 100;
                    show_status_tip("可分配总比重值要大于0", 4000);
                }
                this.value = cx.dataNode._total;
            };
        }
        var bd = ar ? "左行标题" : "比重评估项目";
        if (bU) {
            bd = "行标题";
        }
        var b3 = bU ? "16" : "30";
        var ec = "7";
        if (isMergeAnswer && !this.isMergeNewAdded) {
            a4 = "";
        }
        if (!dQ) {
            a4 = "";
        }
        var b8 = $ce("div", "<span style='float:left;'><b>" + bd + "</b></span>", db);
        b8.className = "matrixhead";
        b8.style.paddingLeft = "4px";
        if (ar && !bU) {
            var bl = $ce("span", "", b8);
            bl.className = "spanRight";
            bl.style.paddingRight = "20px";
            var dc = control_check();
            bl.appendChild(dc);
            var bw = $ce("span", "右行标题", bl);
            dc.checked = n._rowtitle2 ? true : false;
        }
        $ce("div", "", b8).className = "divclear";
        var eb = control_textarea(ec, b3);
        eb.style.overflow = "auto";
        eb.tabIndex = 1;
        eb.value = this.dataNode._rowtitle;
        eb.style.padding = "2px";
        eb.style.height = "142px";
        if (cR == "301" || cR == "302" || cR == "201" || cR == "202") {
            eb.style.height = "154px";
            if (cR == "201" || cR == "202") {
                eb.style.width = "308px";
            }
        }
        if (!t) {
            eb.style.marginTop = "7px";
            if (cR == "102") {
                eb.style.height = "112px";
            }
        } else {
            eb.style.width = "308px";
            eb.style.height = "154px";
        } if (!isMergeAnswer || this.isMergeNewAdded) {
            eb.title = "相当于每个小题的标题";
        } else {
            eb.oldLen = eb.value.split("\n").length;
            eb.oldValue = eb.value;
            eb.title = "特别提示：有答卷的情况下只能修改文字，不能增加或删除行标题，也不能移动行标题顺序";
            eb.onclick = function () {
                if (!eb.alert) {
                    alert(eb.title);
                    eb.alert = true;
                }
            };
            eb.onkeypress = function (i) {
                var i = i || window.event;
                if (i.keyCode == 13) {
                    alert("有答卷的情况下不能添加新行，只能修改文字内容！");
                    if (i.preventDefault) {
                        i.preventDefault();
                    }
                    if (i.returnValue !== undefined) {
                        i.returnValue = false;
                    }
                    event.keyCode = 0;
                    return false;
                }
            };
        }
        db.appendChild(eb);
        this.checkRowTitle = function () {
            this.popHint("");
            var dw = "";
            eb.value = replace_specialChar(eb.value);
            if (trim(eb.value) == "") {
                eb.value = "外观\n功能";
            }
            var ei = eb.value.split("\n");
            var eh = 0;
            for (var eg = 0; eg < ei.length; eg++) {
                if (trim(ei[eg]) != "") {
                    if (eh > 0) {
                        dw += "\n";
                    }
                    dw += ei[eg];
                    eh++;
                }
                for (var ef = eg + 1; ef < ei.length; ef++) {
                    if (trim(ei[eg]) != "" && trim(ei[eg]) == trim(ei[ef])) {
                        this.popHint(bd + "的第" + (eg + 1) + "行与第" + (ef + 1) + "行重复，请修改！");
                        this.isRowTitleValid = false;
                        return false;
                    }
                }
            }
            var ej = dw.split("\n").length;
            if (eb.oldLen && ej != eb.oldLen) {
                if (!confirm("有答卷的情况下不能增加或删除行标题，只能修改文字内容！\r\n是否还原为初始状态的值？")) {
                    this.isRowTitleValid = false;
                    return false;
                }
                dw = eb.oldValue;
            }
            this.isRowTitleValid = true;
            eb.value = dw;
            this.dataNode._rowtitle = dw;
            return true;
        };
        eb.onfocus = function () {
            if (this.value == "外观\n功能") {
                this.value = "";
            }
        };
        eb.onblur = function () {
            if (!this.value) {
                this.value = "外观\n功能";
            }
            var i = cx.checkRowTitle();
            if (t) {
                cx.createSum();
            } else {
                if (ar && i) {
                    cx.updateItem();
                    if (cx.refreshSelRow) {
                        cx.refreshSelRow();
                    }
                }
            }
        };
        if (ar && !bU) {
            var bH = document.createElement("div");
            bH.style.display = dc.checked ? "" : "none";
            bH.style.width = "159px";
            bH.className = "spanLeft matrixhead";
            bq.appendChild(bH);
            var cy = control_check();
            var R = $ce("div", "", bH);
            R.appendChild(cy);
            $ce("span", "右行标题(可选)", R);
            cy.checked = dc.checked;
            dc.onclick = cy.onclick = function () {
                bH.style.display = this.checked ? "" : "none";
                eb.style.width = this.checked ? "150px" : "290px";
                if (!this.checked && (cR == "201" || cR == "202")) {
                    eb.style.width = "308px";
                }
                db.style.width = this.checked ? "156px" : "315px";
                aJ.style.display = this.checked ? "" : "none";
                dc.style.display = this.checked ? "none" : "";
                bw.style.display = this.checked ? "none" : "";
                dc.checked = cy.checked = this.checked;
                if (!this.checked) {
                    ds.prevValue = ds.value;
                    ds.value = "";
                } else {
                    if (!ds.value) {
                        ds.value = ds.prevValue || "";
                    }
                }
                ds.onblur();
            };
            var ds = control_textarea("7", "14");
            bH.appendChild(ds);
            ds.style.overflow = "auto";
            ds.value = this.dataNode._rowtitle2 || "";
            ds.title = "适用于“语义差异法”等场景";
            ds.style.padding = "2px";
            ds.style.margin = "7px 0 0 4px";
            if (cR != "201" && cR != "202") {
                ds.style.height = "142px";
                if (cR == "102") {
                    ds.style.height = "112px";
                }
            } else {
                ds.style.marginLeft = "10px";
            }
            this.checkRowTitle2 = function () {
                if (ar) {
                    ds.value = replace_specialChar(ds.value);
                    this.dataNode._rowtitle2 = ds.value;
                }
                return true;
            };
            ds.onblur = function () {
                cx.checkRowTitle2();
                cx.updateItem();
            };
        }
        if (bU) {
            var b = document.createElement("div");
            setFloat(b);
            if (cR == "303") {
                b.style.width = "199px";
            } else {
                b.style.width = "186px";
            }
            bq.appendChild(b);
            $ce("div", "<b>列标题</b>&nbsp;", b).className = "matrixhead";
            var aP = control_textarea("7", "17");
            aP.style.overflow = "auto";
            aP.value = this.dataNode._columntitle;
            aP.style.margin = "0px";
            aP.style.height = "142px";
            if (bU && cR != "303") {
                aP.style.height = "154px";
            }
            aP.style.padding = "2px";
            aP.style.margin = "7px 0 0 4px";
            if (!isMergeAnswer || this.isMergeNewAdded) {
                aP.title = "列标题";
            } else {
                aP.disabled = true;
                aP.title = "提示：部分修改问卷模式下不能更改列标题！";
            }
            b.appendChild(aP);
            aP.onblur = function () {
                var i = cx.checkColumnTitle();
                if (i) {
                    cx.updateItem();
                    if (cx.refreshSelRow) {
                        cx.refreshSelRow();
                    }
                }
            };
            this.checkColumnTitle = function () {
                this.popHint("");
                if (trim(aP.value) == "") {
                    this.popHint("列标题不能为空！");
                    aP.focus();
                    this.isColumnTitleValid = false;
                    return false;
                } else {
                    var eg = aP.value.split("\n");
                    for (var ef = 0; ef < eg.length; ef++) {
                        for (var dw = ef + 1; dw < eg.length; dw++) {
                            if (trim(eg[ef]) != "" && trim(eg[ef]) == trim(eg[dw])) {
                                this.popHint("列标题的第" + (ef + 1) + "行与第" + (dw + 1) + "行重复，请修改！");
                                this.isColumnTitleValid = false;
                                return false;
                            }
                        }
                    }
                }
                this.isColumnTitleValid = true;
                aP.value = replace_specialChar(aP.value);
                this.dataNode._columntitle = aP.value;
                return true;
            };
        }
        $ce("div", "", bq).className = "divclear";
        this.addLabel = function () {
            var i = "\n【标签】标签名";
            var j = eb.value.length;
            eb.focus();
            if (typeof document.selection != "undefined") {
                document.selection.createRange().text = i;
            } else {
                eb.value = eb.value.substr(0, eb.selectionStart) + i + eb.value.substring(eb.selectionEnd, j);
            }
            eb.onblur();
        };
        var G = $ce("div", "<a href='javascript:void(0);' onclick='cur.addLabel();return false;' class='link-U666'>插入标签</a>&nbsp;&nbsp;" + a4, bq);
        G.style.margin = "12px 0 8px";
        if (newQType == 5) {
            G.style.display = "none";
        }
        if (ar) {
            var df = control_check();
            df.onclick = function () {
                if (!vipUser) {
                    alert("只有企业版用户才能设置行标题随机，请升级！");
                    this.checked = false;
                    return;
                }
                cx.dataNode._randomRow = this.checked;
            };
            df.checked = cx.dataNode._randomRow;
            var X = document.createElement("span");
            X.innerHTML = "行标题随机&nbsp;&nbsp;";
            X.title = "标题随机显示";
            G.appendChild(df);
            G.appendChild(X);
        }
        if (bU) {
            var da = "&nbsp;&nbsp;<a href='javascript:void(0);' class='link-U666' onclick='cur.changeRowColumnTitle();return false;'>交换行列标题</a>";
            $ce("span", da, G);
            this.changeRowColumnTitle = function () {
                var i = this.dataNode._rowtitle;
                this.dataNode._rowtitle = this.dataNode._columntitle;
                this.dataNode._columntitle = i;
                eb.value = this.dataNode._rowtitle;
                aP.value = cur.dataNode._columntitle;
                this.updateItem();
            };
        }
        bq.appendChild(T);
        T.appendChild(d1);
        if (ar) {
            var dS = document.createElement("div");
            dS.style.margin = "8px 0 5px";
            $ce("span", "最小值：", dS);
            var cp = control_text("3");
            cp.title = "用户可以选择的最小值";
            cp.maxLength = 3;
            cp.value = this.dataNode._minvalue;
            dS.appendChild(cp);
            cp.onchange = cp.onblur = function () {
                var i = this.value;
                if (!isEmpty(this.value) || cx.dataNode._tag == "202") {
                    if (!isInt(this.value) || this.value - ao.value > 0) {
                        show_status_tip("最小值不合法", 4000);
                        i = (0 - ao.value < 0) ? 0 : toInt(ao.value) - 1;
                        if (parseInt(i) != i) {
                            i = 0;
                        }
                    } else {
                        i = toInt(this.value);
                    }
                }
                this.value = cx.dataNode._minvalue = i;
                cx.updateItem();
                if (cx.updateSpanCheck) {
                    cx.updateSpanCheck();
                }
            };
            var di = $ce("span", "最大值：", dS);
            di.style.marginLeft = "60px";
            var ao = control_text("3");
            ao.title = "用户可以选择的最大值";
            ao.maxLength = 3;
            if (this.dataNode._tag == "301") {
                cp.maxLength = ao.maxLength = 12;
                di.style.marginLeft = "10px";
                var ci = "40px";
                if (newQType == 5) {
                    ci = "25px";
                }
                cp.style.width = ao.style.width = ci;
            }
            ao.value = this.dataNode._maxvalue;
            dS.appendChild(ao);
            if (this.dataNode._tag == "301") {
                if (newQType != 5) {
                    $ce("span", "&nbsp;&nbsp;", dS);
                }
                var d6 = control_check();
                dS.appendChild(d6);
                if (newQType != 5) {
                    dS.appendChild(document.createTextNode("允许小数"));
                }
                d6.checked = this.dataNode._digitType == 1;
                d6.onclick = function () {
                    cx.dataNode._digitType = this.checked ? 1 : 0;
                };
                if (newQType == 5) {
                    d6.style.display = "none";
                }
            }
            dS.style.display = (this.dataNode._tag == "202" || this.dataNode._tag == "301") ? "" : "none";
            ao.onchange = ao.onblur = function () {
                var i = this.value;
                if (!isEmpty(this.value) || cx.dataNode._tag == "202") {
                    if (!isInt(this.value) || this.value - cp.value < 0) {
                        show_status_tip("最大值不合法", 4000);
                        i = (10 - cp.value > 0) ? 10 : toInt(cp.value) + 1;
                        if (parseInt(i) != i) {
                            i = 10;
                        }
                    } else {
                        i = toInt(this.value);
                    }
                }
                this.value = cx.dataNode._maxvalue = i;
                cx.updateItem();
                if (cx.updateSpanCheck) {
                    cx.updateSpanCheck();
                }
            };
            bq.appendChild(dS);
        }
    }
    if (dP) {
        $ce("div", "", c5).style.paddingTop = "10px";
        var dT = document.createElement("div");
        dT.style.margin = "12px 0 5px";
        if (M || cN) {
            dT.style.display = "none";
        }
        var c7 = $ce("div", "", dT);
        if (az || aV) {
            var bN = document.createElement("span");
            bN.className = "spanRight";
            c7.appendChild(bN);
            var bn = "<ul class='likertImageTypeList' style='display:inline;margin:0;' ><li>&nbsp;&nbsp;<b>样式：</b></li>";
            if (ar) {
                bn += "<li class='design-icon design-offr' onclick='cur.set_likertMode(101,this);' style='background:url(/images/radio.gif) no-repeat;height:16px;width:18px;'></li>";
            } else {
                bn += "<li style='font-size:16px;'><a style='height:24px;line-height:24px;' href='javascript:' onclick='cur.set_likertMode(1,this);return false;'><b>123</b></a></li> <li class='design-icon design-offr' style='background:url(/images/radio.gif) no-repeat;height:16px;width:18px;' onclick='cur.set_likertMode(101,this);'></li>";
            }
            bn += "<li class='off2' onclick='cur.set_likertMode(2,this);' style='margin-top:-3px;'></li>";
            bn += "<li  class='off3' onclick='cur.set_likertMode(3,this);' style='margin-top:-3px;'></li>";
            bn += "<li  class='off4' onclick='cur.set_likertMode(4,this);' style='margin-top:-3px;'></li>";
            bn += "<li class='design-icon design-off6' onclick='cur.set_likertMode(6,this);' style='margin-top:-3px;'></li>";
            bn += "<li style='clear:both;'></li>";
            bn += "</ul>";
            bN.innerHTML = bn;
            this.set_likertMode = function (i, dw) {
                var j = this.dataNode._tag < 102;
                this.dataNode._tag = i;
                this.createTableRadio(true);
                if (this.prevModeObj) {
                    if (this.prevMode == 6) {
                        this.prevModeObj.className = "design-icon design-off6";
                    } else {
                        if (this.prevMode == 101) {
                            this.prevModeObj.style.backgroundPosition = "0 0px";
                        } else {
                            this.prevModeObj.className = "off" + this.prevMode;
                        }
                    }
                    this.prevModeObj = null;
                }
                if (i == 2 || i == 3 || i == 4 || i == 6) {
                    if (i == 6) {
                        dw.className = "design-icon design-off6 design-on6";
                    } else {
                        dw.className = "on" + i;
                    }
                    this.prevModeObj = dw;
                    this.prevMode = i;
                } else {
                    if (i == 101) {
                        dw.style.backgroundPosition = "0 -16px";
                        this.prevModeObj = dw;
                        this.prevMode = i;
                    }
                } if (this.dataNode._type == "matrix") {
                    dT.style.display = i > 200 ? "none" : "";
                    bY.style.display = dT.style.display;
                    if (j && i > 101) {
                        P.disabled = false;
                        P.checked = false;
                        P.onclick();
                        this.dataNode._hasvalue = false;
                    } else {
                        if (!j && i < 102) {
                            P.checked = true;
                            P.onclick();
                            P.disabled = true;
                            this.dataNode._hasvalue = true;
                        }
                    }
                    P.disabled = i > 101 ? false : true;
                    if (!isMergeAnswer || this.isMergeNewAdded) {
                        cC.style.display = i > 101 ? "none" : "";
                    }
                    if (i == 202) {
                        dS.style.display = "";
                        this.dataNode._minvalue = this.dataNode._minvalue || 0;
                        this.dataNode._maxvalue = this.dataNode._maxvalue || 10;
                        this.dataNode._rowwidth = this.dataNode._rowwidth || 100;
                        rowwidth_text.value = rowwidth_text.value || 100;
                    } else {
                        dS.style.display = "none";
                    }
                }
            };
            if (isMergeAnswer && !this.isMergeNewAdded && this.dataNode._tag > 101) {
                bN.style.display = "none";
            }
        }
        if (((aV) || ar) && (!isMergeAnswer || this.isMergeNewAdded)) {
            var cC = $ce("span", "", c7);
            cC.className = "spanRight";
            var cA = document.createElement("span");
            var b2 = "<select onchange='cur.set_likert_num(this);'>";
            var q = n._select.length - 1;
            for (var dC = 2; dC <= 11; dC++) {
                var b1 = "";
                if (dC == q) {
                    b1 = " selected='selected' ";
                }
                var cE = dC + "级量表";
                if (dC == 11) {
                    cE = "NPS量表";
                }
                b2 += "<option" + b1 + " value='" + dC + "'>" + cE + "</option>";
            }
            b2 += "</select>";
            cA.innerHTML += b2;
            this.set_likert_num = function (eh) {
                var ei = eh.value;
                var ef = cU.length - 1;
                var dw = ei == "11";
                var j = 1;
                if (dw) {
                    j = 0;
                }
                for (var i = 0; i < ei; i++) {
                    cU[ef + i].get_item_add().onclick();
                    cU[ef + i + 1].get_item_title().value = i + j;
                    cU[ef + i + 1].get_item_value().value = i + j;
                }
                for (var i = 1; i < ef + 1; i++) {
                    cU[1].get_item_del().onclick();
                }
                if (!az) {
                    var eg = "非常不满意";
                    var ej = "非常满意";
                    if (dw) {
                        eg = "不可能";
                        ej = "极有可能";
                    }
                    cU[1].get_item_title().value = eg;
                    cU[cU.length - 1].get_item_title().value = ej;
                }
                cU[1].get_item_title().onchange();
                if (dw) {
                    this.dataNode._tag = "6";
                    this.createTableRadio(true);
                }
                this.popHint("");
                window.focus();
            };
            cC.appendChild(cA);
            if (ar && this.dataNode._tag > 101) {
                cC.style.display = "none";
            }
        }
        if (cu == "radio" || cu == "check") {
            if (dL) {
                cm.style.width = "98%";
            } else {
                if (cR) {
                    cm.style.width = "75%";
                } else {
                    if (bL) {
                        cm.style.width = "70%";
                    } else {
                        if (M) {
                            cm.style.width = "62%";
                        } else {
                            if (cN) {
                                cm.style.width = "70%";
                            } else {
                                if (d9) {
                                    if (cu == "radio") {
                                        cm.style.width = "100%";
                                    } else {
                                        cm.style.width = "86%";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (cu == "matrix") {
                if (cR == "201" || cR == "202" || cR == "301" || cR == "302") {
                    cm.style.width = "400px";
                }
                if (cR == "301" || cR == "302") {
                    cm.style.width = "500px";
                }
            } else {
                cm.style.width = "75%";
            }
        } if (!ar) {
            dT.appendChild(T);
            T.appendChild(d1);
        }
        this.setNotNewAdd = function () {
            if (!cx.newAddQ) {
                return;
            }
            cW.style.display = "";
            cx.newAddQ = false;
            bY.style.display = "";
        };
        this.addNewItem = function () {
            var i = cU.length;
            cU[i - 1].get_item_add().onclick();
        };
        if (bA) {
            var ax = $ce("div", "<span style='color:#333; font-weight:bold;'>投票设置：</span>", dT);
            ax.style.marginTop = "10px";
            var dx = $ce("span", "&nbsp;&nbsp;", ax);
            var bs = $ce("span", "", dx);
            var cc = control_check();
            bs.appendChild(cc);
            bs.appendChild(document.createTextNode("显示缩略图"));
            var h = control_check();
            dx.appendChild(h);
            dx.appendChild(document.createTextNode("显示投票数"));
            var dk = control_check();
            dx.appendChild(dk);
            dx.appendChild(document.createTextNode("显示百分比"));
            h.checked = h.defaultChecked = n._displayNum;
            dk.checked = dk.defaultChecked = n._displayPercent;
            cc.checked = cc.defaultChecked = n._displayThumb;
            cc.onclick = function () {
                cx.dataNode._displayThumb = this.checked;
                cx.createTableRadio(true);
            };
            dk.onclick = function () {
                cx.dataNode._displayPercent = this.checked;
                cx.createTableRadio(true);
            };
            h.onclick = function () {
                cx.dataNode._displayNum = this.checked;
                cx.createTableRadio(true);
            };
            var O = $ce("span", "选项宽度：", ax);
            cx.setchoiceWidth = function () {
                var eh = false;
                var ef = true;
                for (var eg = 1; eg < cx.dataNode._select.length; eg++) {
                    var dw = cx.dataNode._select[eg]._item_img;
                    if (dw) {
                        if (dw.indexOf(".sojump.com") == -1) {
                            ef = false;
                        }
                        eh = true;
                        break;
                    }
                }
                O.style.display = eh ? "none" : "";
                var j = eh && ef;
                if (!j) {
                    cx.dataNode._displayThumb = false;
                    cc.checked = false;
                    cc.onclick();
                }
                bs.style.display = j ? "" : "none";
            };
            cx.setchoiceWidth();
            O.style.marginLeft = "8px";
            var dE = "<select onchange='cur.setTWidth(this);'><option value='20'>20%</option><option value='30'>30%</option><option value='40'>40%</option><option value='50'>50%</option><option value='60'>60%</option><option value='70'>70%</option><option value='自定义'>自定义</option></select>&nbsp;";
            O.innerHTML += dE;
            var r = $ce("span", "", O);
            var bZ = control_text("3");
            bZ.maxLength = 2;
            bZ.onchange = bZ.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && !isInt(i)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cx.dataNode._touPiaoWidth = 50;
                } else {
                    cx.dataNode._touPiaoWidth = i ? parseInt(i) : "";
                }
                cx.createTableRadio(true);
            };
            this.setTWidth = function (i) {
                if (i.value != "自定义") {
                    bZ.value = i.value;
                    r.style.display = "none";
                    bZ.onchange();
                } else {
                    r.style.display = "";
                }
            };
            this.initWidth = function () {
                if (this.dataNode._touPiaoWidth) {
                    bZ.value = this.dataNode._touPiaoWidth;
                    var ef = $$("select", O)[0];
                    ef.value = this.dataNode._touPiaoWidth;
                    var j = true;
                    for (var dw = 0; dw < ef.options.length; dw++) {
                        if (ef.options[dw].value == this.dataNode._touPiaoWidth) {
                            j = false;
                            break;
                        }
                    }
                    if (j) {
                        ef.value = "自定义";
                        this.setTWidth(ef);
                    }
                }
            };
            r.appendChild(bZ);
            r.appendChild(document.createTextNode("%"));
            r.style.display = "none";
            ax.appendChild(O);
            $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;<a href='/help/help.aspx?helpid=344&h=1' target='_blank' class='link-U666'>如何添加视频或站外链接?</a>", ax);
            this.initWidth();
        } else {
            if (bL) {
                this.addCeShiSetting(dT);
            }
        }
        var bY = $ce("div", "", cm);
        var aU = document.createElement("table");
        aU.className = "tableoption";
        aU.cellSpacing = "0";
        aU.cellPadding = "0";
        aU.width = "98%";
        var co = aU.insertRow(-1);
        co.style.background = "#e1e0e0";
        cU[0] = co;
        var a9 = !n._tag && !d9 && (n._type == "check" || n._type == "radio" || n._type == "radio_down");
        var C = co.insertCell(-1);
        C.style.width = "150px";
        C.style.paddingRight = "20px";
        if (ar && cR && cR <= 101) {
            C.style.width = "80px";
        }
        if (dL) {
            C.style.width = "450px";
        }
        if (ar && cR == "303") {
            C.style.width = "120px";
        }
        var dA = $ce("span", "", C);
        if (cN) {
            dA.innerHTML = "商品名称";
        } else {
            var dK = $ce("a", "选项文字<i class='design-icon design-ctext'>", dA);
            dK.title = "交换选项文字";
            dK.style.color = "#222";
            dK.style.textDecoration = "none";
            dK.href = "javascript:void(0);";
            dK.onclick = function () {
                if (isMergeAnswer && !cur.isMergeNewAdded) {
                    show_status_tip("提示：在部分修改问卷模式下，不允许交换选项文字", 4000);
                    return false;
                }
                var eg = false;
                var j = false;
                if (aV || az || d9 || cR == 303) {
                    j = true;
                }
                if (j && confirm("是否同时交换选项分数？")) {
                    eg = true;
                }
                var ef = 1;
                var i = cU.length - 1;
                while (ef < i) {
                    var dw = cU[i].get_item_title().value;
                    cU[i].get_item_title().value = cU[ef].get_item_title().value;
                    cU[ef].get_item_title().value = dw;
                    if (eg) {
                        dw = cU[i].get_item_value().value;
                        cU[i].get_item_value().value = cU[ef].get_item_value().value;
                        cU[ef].get_item_value().value = dw;
                        if (cU[i].get_item_novalue()) {
                            dw = cU[i].get_item_novalue().checked;
                            cU[i].get_item_novalue().checked = cU[ef].get_item_novalue().checked;
                            cU[ef].get_item_novalue().checked = dw;
                        }
                    }
                    ef++;
                    i--;
                }
                cur.updateItem();
                return false;
            };
        }
        var d8 = bA || (a9 && !d9 && !M && !cN && !bL);
        if (d9 || (a9 && n._type != "radio_down" && !M)) {
            var an = co.insertCell(-1);
            var dW = "图片";
            imgwidth = "30px";
            if (cN) {
                dW = "商品图片";
                imgwidth = "60px";
            }
            $ce("span", dW, an);
            an.style.width = imgwidth;
        }
        if (d9 || (a9 && n._type != "radio_down" && !cN)) {
            var c1 = co.insertCell(-1);
            var bG = "说明";
            var dd = "30px";
            if (M) {
                bG = "情景说明";
                dd = "60px";
            }
            var ce = $ce("span", bG, c1);
            c1.style.width = dd;
            if (d8) {
                ce.onmouseover = function () {
                    toolTipLayer.style.width = "200px";
                    var j = "";
                    if (cx.dataNode._displayDesc) {
                        j = ' checked="checked"';
                    }
                    var i = cx.dataNode._displayDescTxt || "";
                    toolTipLayer.innerHTML = '<span><input type="checkbox"' + j + '" tabindex="-1" onclick="cur.setDisplayDesc(this);">选项说明点击后弹出</span><br/><input type="text" class="choicetxt" value="' + i + '" placeholder="自定义文字" onblur="cur.setDisplayDescTxt(this);"/>';
                    sb_setmenunav(toolTipLayer, true, this);
                };
                ce.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false, this);
                };
                cx.setDisplayDesc = function (eg) {
                    if (eg.checked) {
                        var ef = false;
                        var dw = this.dataNode._select;
                        for (var j = 1; j < dw.length; j++) {
                            if (dw[j]._item_desc) {
                                ef = true;
                            }
                        }
                        if (!ef) {
                            show_status_tip("您还未设置过选项说明，设置后才能查看到效果！", 3000);
                        }
                    }
                    this.dataNode._displayDesc = eg.checked;
                    this.updateItem();
                };
                cx.setDisplayDescTxt = function (i) {
                    this.dataNode._displayDescTxt = i.value;
                    this.updateItem();
                };
                cx.showDesc = function () {
                    ce.onmouseover();
                    setTimeout(function () {
                        ce.onmouseout();
                    }, 1000);
                };
            }
        }
        if ((a9 && n._type != "radio_down") || (ar && (cR == "102" || cR == "103" || cR == "101")) || d9 || dL) {
            var de = co.insertCell(-1);
            de.style.letterSpacing = "1px";
            var al = $ce("span", "允许填空", de);
            de.style.width = "80px";
            de.align = "center";
            if (bL || M || cN) {
                de.style.display = "none";
            }
        }
        var aw = co.insertCell(-1);
        if (!bL && !bU && !M) {
            aw.style.width = "92px";
        }
        if (cN) {
            aw.style.width = "60px";
        }
        var bp = $ce("span", "", aw);
        var P = control_check();
        P.title = "给选项设置分数，可用于Likert量表或者测试类型的问卷";
        bp.appendChild(P);
        var c6 = $ce("span", "", bp);
        c6.innerHTML = "&nbsp;分数<span class='bordCss bordBottomCss' style='border-color:#333 transparent transparent;'></span>";
        c6.style.cursor = "pointer";
        if (M) {
            c6.innerHTML = "数量限制";
        } else {
            if (cN) {
                c6.innerHTML = "商品价格";
            }
        } if (aV || az || d9 || cR == 303) {
            P.style.display = "none";
            bp.onmouseover = function () {
                openValWindow(cx, this);
            };
            bp.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false);
            };
        } else {
            if (!M && !cN) {
                aw.style.display = "none";
            } else {
                P.style.display = "none";
            }
        }
        P.onclick = function () {
            if (cx.dataNode._isCeShi) {
                return;
            }
            if (this.checked) {
                for (var i = 1; i < cU.length; i++) {
                    cU[i].get_item_value().parentNode.style.display = "";
                }
            } else {
                for (var i = 1; i < cU.length; i++) {
                    cU[i].get_item_value().parentNode.style.display = "none";
                }
            }
            cx.dataNode._hasvalue = this.checked;
        };
        var bD = co.insertCell(-1);
        if (cu == "radio" || cu == "radio_down") {
            if (!bL && !M) {
                bD.style.width = "80px";
            }
            var aX = $ce("span", "&nbsp;", bD);
            if (bL || M) {
                aX.style.display = "none";
            }
            var cV = control_check();
            var bc = $ce("span", "跳题", aX);
            bc.style.cursor = "pointer";
            bc.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "按选项跳题，允许用户填写此题时根据选中的选项跳到后面指定的题号。<a target='_blank' class='titlelnk' href='/help/help.aspx?helpid=218&h=1'>查看示例</a>";
                sb_setmenunav(toolTipLayer, true, this);
            };
            bc.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            aX.appendChild(cV);
            aX.appendChild(bc);
            cV.onclick = function () {
                if (this.checked) {
                    cx.dataNode._anytimejumpto = "";
                    by.value = "";
                    if (bO.checked) {
                        bO.click();
                    }
                    for (var i = 1; i < cU.length; i++) {
                        cU[i].get_item_jump().parentNode.style.display = "";
                    }
                } else {
                    for (var i = 1; i < cU.length; i++) {
                        cU[i].get_item_jump().parentNode.style.display = "none";
                    }
                } if (cx.defaultCheckSet) {
                    cx.defaultCheckSet();
                }
                cx.dataNode._hasjump = this.checked;
                cx.set_jump_ins();
                cx.updateItem();
            };
        } else {
            if (cN) {
                bD.innerHTML = "总库存";
                bD.style.width = "50px";
            }
        } if (cu == "check" && !bL && !dL && !d9 && !cN) {
            var bC = co.insertCell(-1);
            bC.style.width = "66px";
            var K = $ce("span", "&nbsp;", bC);
            var bJ = $ce("span", "选项互斥", K);
            bJ.title = "与其它选项互斥";
            K.appendChild(bJ);
        }
        if (cu == "matrix") {
            bD.style.display = "none";
        }
        var cf = co.insertCell(-1);
        if (a9 && !M && !cN) {
            var bf = $ce("span", "&nbsp;", cf);
            var bV = $ce("span", "", bf);
            bV.innerHTML = "默认";
            if (bL) {
                bV.innerHTML = "正确答案";
                cf.align = "center";
            }
            this.defaultCheckSet = function () {
                if (this.dataNode._isCeShi) {
                    return;
                }
                var j = bO.checked || (cV ? cV.checked : false);
                for (var i = 1; i < cU.length; i++) {
                    var dw = cU[i].get_item_check();
                    dw.parentNode.style.display = j ? "none" : "";
                    if (j) {
                        dw.checked = false;
                    }
                }
            };
        } else {
            cf.style.display = "none";
        } if (a9 && n._type != "radio_down") {
            var bX = co.insertCell(-1);
            var x = $ce("span", "分组", bX);
            x.style.cursor = "pointer";
            x.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "在选项较多的情况下，通过对选项进行分组，可以更方便用户选择。<a target='_blank' class='titlelnk' href='/help/help.aspx?helpid=149&h=1'>查看帮助</a>";
                sb_setmenunav(toolTipLayer, true, this);
            };
            x.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            if (bL || M || cN) {
                bX.style.display = "none";
            }
        }
        var aZ = co.insertCell(-1);
        aZ.align = "center";
        aZ.style.width = "94px";
        $ce("span", "操作", aZ);
        if (bh) {
            for (var dB = 1; dB < n._select.length; dB++) {
                cU[dB] = new creat_item(cx, dB, aU, "check", false, n._select[dB]);
            }
        } else {
            for (var dB = 1; dB < n._select.length; dB++) {
                cU[dB] = new creat_item(cx, dB, aU, "radio", false, n._select[dB]);
            }
        }
        this.checkItemTitle = function () {
            this.popHint("");
            var i = true;
            if (!this.checkEmptyItem()) {
                return false;
            }
            if (!this.checkRepeatItem()) {
                return false;
            }
            this.isItemTitleValid = true;
            return true;
        };
        this.checkEmptyItem = function () {
            var ef = true;
            for (var j = 1; j < cU.length; j++) {
                var dw = cU[j].get_item_title();
                if (trim(dw.value) == "") {
                    if (dw.initText) {
                        dw.value = dw.initText;
                    } else {
                        this.popHint("选项不能为空！");
                        ef = false;
                        this.isItemTitleValid = false;
                    }
                }
            }
            return ef;
        };
        this.checkRepeatItem = function () {
            var ei = true;
            for (var eg = 1; eg < cU.length; eg++) {
                var ef = cU[eg].get_item_title();
                if (ef._oldBorder || ef._oldBorder == "") {
                    ef.style.border = ef._oldBorder;
                    ef.title = ef._oldTitle;
                }
                for (var dw = eg + 1; dw < cU.length; dw++) {
                    if (trim(cU[eg].get_item_title().value) == trim(cU[dw].get_item_title().value)) {
                        var eh = cU[dw].get_item_title();
                        ef.rel = eh;
                        eh.rel = ef;
                        this.popHint("第" + eg + "个选项与第" + dw + "个选项重复，请修改！");
                        ei = false;
                        this.isItemTitleValid = false;
                        return false;
                    }
                }
            }
            return ei;
        };
        this.checkItemValue = function () {
            var ef = true;
            if (P.checked) {
                for (var dw = 1; dw < cU.length; dw++) {
                    var j = trim(cU[dw].get_item_value().value);
                    if (j == "") {
                        if (!cU[dw].get_item_novalue() || !cU[dw].get_item_novalue().checked) {
                            cU[dw].get_item_value().value = 0;
                        }
                    } else {
                        if (!isInt(j)) {
                            this.popHint("选项的分数不合法，请修改！");
                            ef = false;
                        }
                    }
                }
            }
            this.isItemValueValid = ef;
            return ef;
        };
        this.checkItemJump = function (dw) {
            var eh = true;
            if (cV && cV.checked) {
                var eg;
                for (var j = 1; j < cU.length; j++) {
                    eg = trim(cU[j].get_item_jump().value);
                    if (eg != "" && eg != 0 && eg != 1 && eg != -1) {
                        var ef = "";
                        if (!isPositive(eg)) {
                            ef = "选项的跳转题号必须是正整数";
                        } else {
                            if (toInt(eg) <= this.dataNode._topic) {
                                ef = "跳转题号必须大于本题题号(" + this.dataNode._topic + ")";
                            } else {
                                if (toInt(eg) > total_question) {
                                    ef = "跳转题号必须小于或等于最大题号(" + total_question + ")";
                                }
                            }
                        } if (ef) {
                            this.popHint(ef);
                            eh = false;
                        }
                    }
                }
            }
            if (!dw) {
                this.isItemJumpValid = eh;
            } else {
                this.isItemJumpValid = false;
            }
            return eh;
        };
        this.checkCeShiSet = function () {
            if (!this.dataNode._isCeShi) {
                return true;
            }
            var j = false;
            for (var i = 1; i < n._select.length; i++) {
                if (n._select[i]._item_radio) {
                    j = true;
                }
            }
            if (!j) {
                this.popHint("请设置此题的正确答案");
            }
            this.isCeShiValid = j;
            return j;
        };
        this.setItemJump = function () {
            for (var j = 1; j < cU.length; j++) {
                cU[j].get_item_jump().value = this.dataNode._select[j]._item_jump;
            }
        };
        bY.appendChild(aU);
        c5.appendChild(cm);
        $ce("div", "", c5).className = "divclear";
        var cv = $ce("span", "", c7);
        c7.style.width = "98%";
        if (bL) {
            c7.style.width = "68%";
        } else {
            if (aV) {
                c7.style.width = "74%";
            } else {
                if (dL) {
                    c7.style.width = "85%";
                } else {
                    if (cP) {
                        c7.style.width = "72%";
                    } else {
                        if (bh && d9) {
                            c7.style.width = "84%";
                        }
                    }
                }
            }
        }
        cv.className = "spanLeft";
        if (cP || bL || d9 || bA || (isMergeAnswer && !this.isMergeNewAdded) || ar || !dQ) {
            a4 = "";
        }
        var ah = "<a href='javascript:' onclick='cur.addNewItem();return false;' class='link-U00a6e6' style='text-decoration:none;'><span class='choiceimg design-icon design-singleadd' ></span><b>添加选项</b></a>&nbsp;&nbsp;";
        var dJ = "<a href='javascript:' onclick='PDF_launch(\"oftenoptions.aspx\",540,400);return false;' class='batchadd' title='批量添加选项'><span class='choiceimg design-icon design-badd'></span><b>批量增加</b></a>&nbsp;";
        var c9 = "/wjx/design/batchupload.aspx?activity=" + activityID;
        if (window.uploadQiuniu == 2) {
            c9 = "/wjx/design/batchuploadali.aspx?activity=" + activityID;
        }
        var bt = "<a href='javascript:' onclick='PDF_launch(\"" + c9 + "\",540,250,null,\"批量添加图片\");return false;' class='link-444' ><span class='choiceimg design-icon design-img' style='margin:0 5px 1px 0;'></span>批量添加图片</a>&nbsp;";
        var dp = ah + dJ + "&nbsp;" + a4;
        if (bA) {
            dp = dp + bt;
        }
        cv.innerHTML = dp;
        if (aV) {
            cv.innerHTML = ah + dJ;
        } else {
            if (ar && (this.dataNode._tag && this.dataNode._tag <= 101 || this.dataNode._tag == 102)) {
                cv.innerHTML = dJ;
            }
        } if (isMergeAnswer && !this.isMergeNewAdded) {
            cv.innerHTML = ah;
        }
        var cI = $ce("span", "", c7);
        if ((aI && cR == 0) || (bh && !dL)) {
            var d5 = null;
            var y = document.createElement("span");
            var av = "";
            var c0 = 1;
            if (aI && !d9 && !bL && !bA) {
                av = "<option value='0'>下拉菜单</option>";
                c0 = 2;
            }
            y.innerHTML = "<select onchange='cur.checkNumPer(this);' style='width:90px;'><option value='1'>竖向排列</option>" + av + "<optgroup label='横向排列'><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option><option value='15'>15</option><option value='20'>20</option><option value='30'>30</option></optgroup></select>&nbsp;";
            d5 = $$("select", y)[0];
            for (var dC = c0; dC < d5.options.length; dC++) {
                d5.options[dC].text = "每行" + d5.options[dC].value + "列";
            }
            cI.appendChild(y);
            if (dL && d5) {
                y.style.display = "none";
            }
            this.checkNumPer = function (dw) {
                var i = trim(dw.value);
                if (i == 0) {
                    this.selChangeType("radio_down");
                    return;
                }
                this.dataNode._numperrow = parseInt(i);
                this.createTableRadio(true);
                this.focus();
                if (!this.applyNumber) {
                    var j = $ce("span", "&nbsp;&nbsp;<a href='javascript:void(0);' class='link-U00a6e6' title='批量复制此属性到后面的题目' style='font-size:14px;'>复制</a>", cI);
                    j.onclick = function () {
                        var ef = "/wjx/design/applynumrow.aspx";
                        var eg = cx.dataNode._topic;
                        ef += "?ct=" + eg;
                        PDF_launch(ef, 500, 250);
                        return false;
                    };
                    this.applyNumber = true;
                }
            };
            y.style.display = "inline-block";
        }
        cI.className = "spanRight";
        var Q = $ce("span", "", c7);
        var b0 = control_check();
        Q.appendChild(b0);
        $ce("span", "选项随机&nbsp;", Q);
        Q.className = "spanRight";
        if (bL) {
            var a = $ce("span", "<a class='titlelnk' onclick='setAllRandom();return false;' href='javascript:' title='复制随机属性到其它的考试题'>复制到其它考试题</a>&nbsp;", Q);
            a.style.display = "none";
            this.get_random = function () {
                return b0;
            };
        }
        b0.onclick = function () {
            cx.dataNode._randomChoice = this.checked;
            if (bL) {
                a.style.display = "";
            }
        };
        if (aV || ar) {
            Q.style.display = "none";
        }
        if ((bh && !bL) || (ar && cR == "102")) {
            var bb = null;
            bb = $ce("span", "", c7);
            var at = "至少选 ";
            if (ar) {
                at = "&nbsp;&nbsp;" + at;
            }
            $ce("span", at, bb);
            bb.className = "spanRight";
            var c3 = document.createElement("span");
            var aK = "<select onchange='cur.limitChange(this);' onclick='cur.lowLimitClick(this);' style='width:45px;'>";
            aK += "<option value=''> </option>";
            for (var dC = 1; dC < n._select.length; dC++) {
                aK += "<option value='" + dC + "'>" + dC + "</option>";
            }
            aK += "</select>";
            c3.innerHTML = aK;
            var a2 = document.createElement("span");
            a2.innerHTML = " 项&nbsp;最多选 ";
            var aN = document.createElement("span");
            var Y = "<select onchange='cur.limitChange(this);' onclick='cur.upLimitClick(this);' style='width:45px;'>";
            Y += "<option value=''> </option>";
            for (var dC = 2; dC < n._select.length; dC++) {
                Y += "<option value='" + dC + "'>" + dC + "</option>";
            }
            Y += "</select>";
            aN.innerHTML = Y;
            var dv = document.createTextNode(" 项");
            bb.appendChild(c3);
            bb.appendChild(a2);
            bb.appendChild(aN);
            bb.appendChild(dv);
            this.limitChange = function () {
                cx.checkCheckLimit();
                window.focus();
            };
            this.lowLimitClick = function (ef) {
                if (n._select.length - 1 == ef.options.length - 1) {
                    return;
                }
                ef.options.length = 0;
                ef.options.add(new Option(" ", ""));
                for (var dw = 1; dw < n._select.length; dw++) {
                    var j = new Option(dw, dw);
                    ef.options.add(j);
                }
            };
            this.upLimitClick = function (ef) {
                if (n._select.length - 1 == ef.options.length) {
                    return;
                }
                ef.options.length = 0;
                ef.options.add(new Option(" ", ""));
                for (var dw = 2; dw < n._select.length; dw++) {
                    var j = new Option(dw, dw);
                    ef.options.add(j);
                }
            };
            var dH = n._lowLimit;
            var d0 = n._upLimit;
            if (dL) {
                if (!n._lowLimit) {
                    dH = n._lowLimit = n._select.length - 1;
                }
                if (!n._upLimit) {
                    d0 = n._upLimit = n._select.length - 1;
                }
                if (n._lowLimit == -1) {
                    dH = "";
                }
                if (n._upLimit == -1) {
                    d0 = "";
                }
            }
            $$("select", c3)[0].value = dH || "";
            $$("select", aN)[0].value = d0 || "";
            $ce("span", "&nbsp;&nbsp;", bb);
            this.checkCheckLimit = function () {
                if (bh || (ar && cR == "102")) {
                    var j = $$("select", c3)[0].value;
                    var dw = $$("select", aN)[0].value;
                    var i = cU.length - 1;
                    if (j != "") {
                        if (dw != "" && dw - j < 0) {
                            j = dw;
                            $$("select", c3)[0].value = dw;
                            show_status_tip("要求用户最多选中选项数量不合法！", 4000);
                        }
                        if (!m.checked) {
                            show_status_tip("由于设置了选项数量限制，建议将该题设为必答", 4000);
                        }
                    } else {
                        if (dL) {
                            j = -1;
                        }
                    } if (dw != "") {
                        if (j != "" && dw - j < 0) {
                            dw = j;
                            $$("select", aN)[0].value = j;
                            show_status_tip("要求用户最多选中选项数量不合法！", 4000);
                        }
                    } else {
                        if (dL) {
                            dw = -1;
                        }
                    }
                    this.dataNode._lowLimit = j;
                    this.dataNode._upLimit = dw;
                    this.updateSpanCheck();
                }
                return true;
            };
        }
        $ce("div", "", c7).className = "divclear";
        if (ar) {
            bY.appendChild(dT);
        } else {
            c5.appendChild(dT);
        }
        this.initFreOptions = function (eg) {
            var ef = "";
            var dw = /^选项\d+$/;
            var j = 0;
            for (var i = 1; i < cU.length; i++) {
                var eh = trim(cU[i].get_item_title().value);
                if (!eh) {
                    continue;
                }
                if (dw.test(eh)) {
                    continue;
                }
                if (j > 0) {
                    ef += "\n";
                }
                ef += eh;
                j++;
            }
            if (ef) {
                eg.value = ef + "\n";
            }
        };
        this.setFreOptions = function (eg) {
            var eh = eg.split("\n");
            if (eg == "每行一个选项，可以添加多个选项") {
                return;
            }
            var ei = new Array();
            for (var ef = 0; ef < eh.length; ef++) {
                if (eh[ef] && trim(eh[ef])) {
                    ei.push(eh[ef]);
                }
            }
            for (var ef = ei.length; ef < 2; ef++) {
                ei[ef] = "选项" + (ef + 1);
            }
            for (var j = 0; j < ei.length; j++) {
                if (cU[j + 1]) {
                    cU[j + 1].get_item_title().value = trim(ei[j]);
                    continue;
                }
                if (bh) {
                    cU[j + 1] = new creat_item(this, j + 1, aU, "check", false, null);
                } else {
                    cU[j + 1] = new creat_item(this, j + 1, aU, "radio", false, null);
                }
                cU[j + 1].get_item_title().value = trim(ei[j]);
                cU[j + 1].get_item_value().value = j + 1;
            }
            var dw = cU.length - 1;
            for (var j = dw; j > ei.length; j--) {
                aU.deleteRow(j);
                cU.length = cU.length - 1;
            }
            this.updateItem();
            this.setNotNewAdd();
            setQTopPos(this);
        };
        this.checkTextJump = function (dw) {
            if ((aI || cP) && !cV.checked && !hasInsPromoteJump) {
                var j = /[一二三四五六七八九\d]+题/;
                var i = j.exec(dw);
                if (i) {
                    hasInsPromoteJump = true;
                    if (window.confirm("您是否需要按选项设置此题的跳题逻辑？")) {
                        cV.click();
                    }
                }
            }
        };
        this.updateItem = function (ej) {
            var eg = true;
            if (this.dataNode._type != "matrix") {
                this.popHint("");
            }
            if (!this.checkItemTitle()) {
                eg = false;
            }
            if (!this.checkItemValue()) {
                eg = false;
            }
            if (!this.checkItemJump(true)) {
                eg = false;
            }
            if (!eg) {
                return;
            }
            var ei = this.dataNode;
            ei._select = new Array();
            var ef = !ei._tag && (ei._type == "check" || ei._type == "radio" || ei._type == "radio_down");
            for (var dw = 1; dw < cU.length; dw++) {
                ei._select[dw] = new Object();
                var eh = cU[dw].get_item_title();
                var i = replace_specialChar(trim(eh.value));
                if (i != eh.value) {
                    eh.value = i;
                }
                ei._select[dw]._item_title = eh.value.replace(/\</g, "&lt;");
                ei._select[dw]._item_radio = false;
                if (ef || ei._isCeShi) {
                    ei._select[dw]._item_radio = cU[dw].get_item_check().checked;
                }
                ei._select[dw]._item_value = trim(cU[dw].get_item_value().value);
                ei._select[dw]._item_jump = 0;
                if (aI || cP || cN) {
                    ei._select[dw]._item_jump = trim(cU[dw].get_item_jump().value);
                }
                if (cU[dw].get_item_huchi()) {
                    ei._select[dw]._item_huchi = cU[dw].get_item_huchi().checked;
                }
                ei._select[dw]._item_tb = false;
                ei._select[dw]._item_tbr = false;
                ei._select[dw]._item_img = "";
                ei._select[dw]._item_imgtext = false;
                ei._select[dw]._item_desc = "";
                ei._select[dw]._item_label = "";
                if (cU[dw].get_item_tb()) {
                    ei._select[dw]._item_tb = cU[dw].get_item_tb().checked;
                }
                if (cU[dw].get_item_tbr()) {
                    ei._select[dw]._item_tbr = cU[dw].get_item_tbr().checked;
                }
                if (cU[dw].get_item_img()) {
                    ei._select[dw]._item_img = cU[dw].get_item_img().value = replace_specialChar(trim(cU[dw].get_item_img().value));
                }
                if (cU[dw].get_item_imgtext()) {
                    ei._select[dw]._item_imgtext = cU[dw].get_item_imgtext().checked;
                }
                if (cU[dw].get_item_desc()) {
                    ei._select[dw]._item_desc = cU[dw].get_item_desc().value = replace_specialChar(trim(cU[dw].get_item_desc().value));
                }
                if (cU[dw].get_item_label()) {
                    ei._select[dw]._item_label = cU[dw].get_item_label().value = replace_specialChar(trim(cU[dw].get_item_label().value));
                }
            }
            if (!this.checkCeShiSet()) {
                return;
            }
            if (!ej) {
                this.createTableRadio(true);
            }
        };
    }
    if (ar || t) {
        var aE = $ce("div", "", c5);
        aE.style.marginTop = "8px";
        if (ar) {
            var B = $ce("span", "<b>题目总宽度：</b>", aE);
            var dE = "<select onchange='cur.setMainWidth(this);'><option value=''>默认</option><option value='50'>50%</option><option value='60'>60%</option><option value='70'>70%</option><option value='80'>80%</option><option value='90'>90%</option><option value='100'>100%</option><option value='自定义'>自定义</option></select>&nbsp;";
            B.innerHTML += dE;
            var aO = $ce("span", "", B);
            var a1 = control_text("3");
            a1.maxLength = 2;
            a1.onchange = a1.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && !isInt(i)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cx.dataNode._mainWidth = 50;
                } else {
                    cx.dataNode._mainWidth = i ? parseInt(i) : "";
                }
                cx.createTableRadio(true);
            };
            this.setMainWidth = function (i) {
                if (i.value != "自定义") {
                    a1.value = i.value;
                    aO.style.display = "none";
                    a1.onchange();
                } else {
                    aO.style.display = "";
                }
            };
            this.initMainWidth = function () {
                if (this.dataNode._mainWidth) {
                    a1.value = this.dataNode._mainWidth;
                    var ef = $$("select", B)[0];
                    ef.value = this.dataNode._mainWidth;
                    var j = true;
                    for (var dw = 0; dw < ef.options.length; dw++) {
                        if (ef.options[dw].value == this.dataNode._mainWidth) {
                            j = false;
                            break;
                        }
                    }
                    if (j) {
                        ef.value = "自定义";
                        this.setMainWidth(ef);
                    }
                }
            };
            aO.appendChild(a1);
            aO.appendChild(document.createTextNode("%"));
            aO.style.display = "none";
            if (cR == "102") {
                B.style.display = "none";
            }
        }
        var dq = "左行标题宽度：";
        if (t) {
            dq = "行标题宽度：";
        }
        var cs = $ce("span", "&nbsp;&nbsp;<b>" + dq + "</b>", aE);
        var cH = "<select onchange='cur.setTWidth(this);'><option value=''>默认</option><option value='10%'>10%</option><option value='15%'>15%</option><option value='20%'>20%</option><option value='30%'>30%</option><option value='40%'>40%</option><option value='50%'>50%</option><option value='自定义'>自定义</option></select>&nbsp;";
        cs.innerHTML += cH;
        var aR = control_text("3");
        aR.maxLength = 3;
        aR.onchange = aR.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && (!isInt(i) || i - 100 > 0)) {
                show_status_tip("您输入的宽度不合法！");
                this.value = "";
                cx.dataNode._rowwidth = "";
            } else {
                cx.dataNode._rowwidth = i + "%";
                if (cx.dataNode._rowwidth == "%") {
                    cx.dataNode._rowwidth = "";
                }
            } if (t) {
                cx.createSum();
            } else {
                if (ar) {
                    cx.updateItem();
                }
            }
            window.focus();
        };
        this.setTWidth = function (i) {
            if (i.value != "自定义") {
                aR.value = i.value.replace("%", "");
                aR.style.display = "none";
                aR.onchange();
            } else {
                aR.style.display = "";
            }
        };
        this.initWidth = function () {
            if (this.dataNode._rowwidth && this.dataNode._rowwidth.indexOf("%") > -1) {
                var i = $$("select", cs)[0];
                i.value = this.dataNode._rowwidth;
                aR.value = this.dataNode._rowwidth.replace("%", "");
                if (i.selectedIndex == -1) {
                    i.value = "自定义";
                    this.setTWidth(i);
                }
            }
        };
        aR.style.display = "none";
        cs.appendChild(aR);
        if (ar) {
            var aJ = $ce("span", "<b>右行标题宽度：</b>", aE);
            aJ.style.display = "none";
            var bR = "<select onchange='cur.setTWidth2(this);'><option value=''>默认</option><option value='10%'>10%</option><option value='15%'>15%</option><option value='20%'>20%</option><option value='30%'>30%</option><option value='40%'>40%</option><option value='50%'>50%</option><option value='自定义'>自定义</option></select>&nbsp;";
            aJ.innerHTML += bR;
            var dD = control_text("3");
            dD.maxLength = 3;
            dD.onchange = dD.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && (!isInt(i) || i - 100 > 0)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cx.dataNode._rowwidth2 = "";
                } else {
                    cx.dataNode._rowwidth2 = i + "%";
                    if (cx.dataNode._rowwidth2 == "%") {
                        cx.dataNode._rowwidth2 = "";
                    }
                }
                cx.updateItem();
                window.focus();
            };
            this.setTWidth2 = function (i) {
                if (i.value != "自定义") {
                    dD.value = i.value.replace("%", "");
                    dD.style.display = "none";
                    dD.onchange();
                } else {
                    dD.style.display = "";
                }
            };
            this.initWidth2 = function () {
                if (this.dataNode._rowwidth2 && this.dataNode._rowwidth2.indexOf("%") > -1) {
                    var i = $$("select", aJ)[0];
                    i.value = this.dataNode._rowwidth2;
                    dD.value = this.dataNode._rowwidth2.replace("%", "");
                    if (i.selectedIndex == -1) {
                        i.value = "自定义";
                        this.setTWidth2(i);
                    }
                }
            };
            dD.style.display = "none";
            aJ.appendChild(dD);
        }
        if (ar && (this.dataNode._tag == 102 || this.dataNode._tag == 103)) {
            var cB = control_check();
            aE.appendChild(cB);
            var k = $ce("span", "竖向选择", aE);
            var cO = $ce("i", "", k);
            cO.className = "design-icon design-qmark";
            cO.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "当选项太多时，通过竖向选择可以得到更好的显示效果，只支持电脑端。";
                sb_setmenunav(toolTipLayer, true, this);
            };
            cO.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            cB.onclick = function () {
                if (cx._referDivQ) {
                    show_status_tip("使用引用逻辑后，不能再使用竖向选择", 5000);
                    return;
                }
                cx.dataNode._daoZhi = this.checked;
                cx.updateSpanMatrix();
                cx.updateItem();
            };
            var u = $ce("a", "交换选项与行", aE);
            u.className = "link-666";
            u.style.display = "inline-block";
            u.style.marginLeft = "10px";
            var bM = $ce("i", "", aE);
            bM.className = "design-icon design-qmark";
            bM.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "如果您将行与选项正好相反，可以“交换选项与行”。";
                sb_setmenunav(toolTipLayer, true, this);
            };
            bM.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            u.href = "javascript:void(0);";
            u.onclick = function () {
                if (isMergeAnswer && !cx.isMergeNewAdded) {
                    show_status_tip("在部分修改问卷模式下，不能“交换选项与行”", 5000);
                    return false;
                }
                if (window.confirm("确定交换行与选项吗？")) {
                    var j = "";
                    var ef = cx.dataNode._select;
                    for (var i = 1; i < ef.length; i++) {
                        if (i > 1) {
                            j += "\n";
                        }
                        j += ef[i]._item_title;
                    }
                    var dw = eb.value;
                    if (dw) {
                        eb.value = j;
                        cx.checkRowTitle();
                        cx.setFreOptions(dw);
                    }
                }
                return false;
            };
        }
        if (ar && this.dataNode._tag && this.dataNode._tag - 103 <= 0) {
            $ce("span", "&nbsp;&nbsp;&nbsp;", aE);
            var ac = control_check();
            aE.appendChild(ac);
            var dh = $ce("span", "不隔行显示列标题", aE);
            var cr = $ce("i", "", dh);
            cr.className = "design-icon design-qmark";
            cr.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "提示：矩阵题小题过多时，系统会每隔10行显示列标题，勾选后将不显示。<a href='/help/help.aspx?helpid=351&h=1' class='link-U00a6e6' target='_blank'>查看详情</a>";
                sb_setmenunav(toolTipLayer, true, this);
            };
            cr.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            ac.onclick = function () {
                cx.dataNode._nocolumn = this.checked;
            };
            if (this.dataNode._nocolumn) {
                ac.checked = true;
            }
        }
    }
    if (ar) {
        bY.style.width = "310px";
        if (cR == "102" || cR == "103") {
            bY.style.width = "410px";
        }
        if (cR && cR <= 101) {
            bY.style.width = "410px";
        }
        if (cR == "303") {
            bY.style.width = "340px";
        }
        bY.style.paddingTop = "5px";
        aU.cellSpacing = "0";
        aU.cellPadding = "2";
        aU.width = "98%";
        setFloat(bY);
        setFloat(bq);
        $ce("div", "", cm).style.clear = "both";
        if (cR == "201" || cR == "302") {
            var bz = "设置行属性";
            if (cR == "302") {
                bz = "设置列属性";
            }
            var dz = $ce("div", "<a onclick='cur.setMRowAttr();return false;' href='javascript:' class='sumitbutton cancle'>" + bz + "</a>", aB);
            this.setMRowAttr = function () {
                PDF_launch("/wjx/design/setrowattr.aspx?ct=" + this.dataNode._topic, 700, 370, function () {
                    cur.updateItem();
                });
            };
            dz.style.margin = "15px 0 15px 10px";
            aB.appendChild(dz);
        }
    }
    var cz = $ce("div", "&nbsp;", aB);
    cz.style.clear = "both";
    cz.style.lineHeight = "1px";
    if (n._isShop) {
        var cQ = $ce("div", "<div style='margin:10px 0 10px 18px;font-size:14px'><b style='color:#ff9900;'>商品支付方式:</b>&nbsp;&nbsp;<a href='javascript:' onclick='PDF_launch(\"/wjx/design/setpayapp.aspx?activity=" + activityID + "\",440,160);return false;' class='titlelnk' target='_blank'>设置微信支付</a></div>", aB);
    }
    var cW = document.createElement("div");
    cW.style.margin = "15px 10px";
    var a7 = control_btn("完成编辑");
    a7.className = "submitbutton";
    a7.style.width = "100%";
    a7.onclick = function () {
        qonclick.call(cx);
    };
    if (this.newAddQ) {}
    cW.appendChild(a7);
    var p = $ce("div", "", cW);
    p.style.color = "red";
    p.style.fontSize = "14px";
    p.style.display = "inline-block";
    p.style.margin = "6px 0 0 10px";
    aB.appendChild(cW);
    A.appendChild(aF);
    this.hasCreatedAttr = true;
    this.createEditBox = function () {
        if (this.hasEditBox) {
            return;
        }
        this.hasEditBox = true;
        if (ab) {
            ab.style.display = "none";
        }
        F.style.height = "102px";
        if (dR) {
            F.style.height = "116px";
        }
        F.style.width = "395px";
        var i = EditToolBarItemsPageCut;
        if (ea) {
            i = EditToolBarItems;
        } else {
            F.style.height = "152px";
        }
        KE.init({
            id: v,
            items: i,
            filterMode: filter,
            afterChange: function (j) {
                KE.util.setData(j);
            }, DesignPage: 1
        });
        this.titleId = v;
        KE.create(v);
        KE.util.focus(v);
    };
    this.popHint = function (i) {
        if (p) {
            if (i) {
                p.innerHTML = "<b>提示：</b>" + i;
            } else {
                p.innerHTML = "";
            }
        }
    };
    if (c) {
        this.createEditBox();
    }
    this.checkTitle = function () {
        if (dR) {
            var i = getGapFillCount(F.value);
            if (i == 0) {
                show_status_tip("填空题的标题必须包含空“" + GapFillStr + "”!", 4000);
                this.isTitleValid = false;
                return false;
            } else {
                if (isMergeAnswer && !cx.isMergeNewAdded) {
                    if (i < this.dataNode._gapcount) {
                        show_status_tip("合并答卷时，不能删除填空题标题中的空!", 4000);
                        this.isTitleValid = false;
                        return false;
                    }
                }
            }
        }
        var dw = F.value;
        if (!this.hasEditBox && /\r\n|\n|\r/.test(dw)) {
            dw = F.value = dw.replace(/\r\n|\n|\r/g, "<br />");
            d2.onclick();
        }
        if (dR) {
            dw = replaceGapFill(dw, this.dataNode).replace(/\<br\s*\/\>/g, "<div style='margin-top:8px;'></div>");
        }
        aa.innerHTML = dw;
        this.dataNode._title = F.value;
        this.isTitleValid = true;
        if (this.dataNode._type == "cut") {
            aa.innerHTML = dw || "请在此输入说明文字";
            if (this.div_video_title) {
                this.div_video_title.innerHTML = "";
            }
            if (this.dataNode._video) {
                var j = "<iframe height=498 width=510 src='" + this.dataNode._video + "' frameborder=0 allowfullscreen></iframe>";
                if (this.div_video_title) {
                    this.div_video_title.innerHTML = j;
                } else {
                    this.div_video_title = $ce("div", j, aa);
                }
            }
        }
        if (!this.hasEditBox && this.dataNode._title.indexOf("<") > -1) {
            this.createEditBox();
        }
        return true;
    };
    this.checkDefault = function () {
        this.popHint("");
        var i = replace_specialChar(trim(bK.value));
        bK.value = i;
        if (au.value != "" && i != "" && i.length < au.value) {
            this.popHint("您输入的默认值少于您设置的最小字数，请修改！");
            this.isDefaultValid = false;
            return false;
        } else {
            if (d4.value != "" && i.length > d4.value) {
                this.popHint("您输入的默认值超过了您设置的最大字数，请修改！");
                this.isDefaultValid = false;
                return false;
            } else {
                if (this.dataNode._verify != "省市区" && this.dataNode._verify != "高校") {
                    bT.value = i;
                } else {
                    if (i) {
                        bT.value = "指定省份为：" + i;
                    } else {
                        bT.value = "";
                    }
                }
                this.dataNode._default = i;
                this.isDefaultValid = true;
            }
        }
        return true;
    };
    this.checkAnyJump = function (j) {
        if (bO && bO.checked) {
            var ef;
            var i = toInt(this.dataNode._topic);
            ef = trim(by.value);
            this.popHint("");
            if (ef != 1 && ef != "" && ef != "0") {
                var dw = "";
                if (!isPositive(ef)) {
                    dw = "跳转题号必须为正整数";
                } else {
                    if (toInt(ef) <= i) {
                        dw = "跳转题号必须大于本题题号(" + i + ")";
                    } else {
                        if (toInt(ef) > total_question) {
                            dw = "跳转题号必须小于或等于最大题号(" + total_question + ")";
                        }
                    }
                } if (dw) {
                    this.popHint(dw);
                    this.isAnyJumpValid = false;
                    return false;
                } else {
                    this.dataNode._hasjump = true;
                }
            } else {
                if (ef == 1) {
                    this.dataNode._hasjump = true;
                } else {
                    this.dataNode._hasjump = false;
                }
            }
            cx.set_jump_ins();
        }
        if (this.isAnyJumpValid == true || this.isAnyJumpValid == undefined) {
            if (by._oldBorder || by._oldBorder == "") {
                by.style.border = by._oldBorder;
                by.title = by._oldTitle;
            }
        }
        if (!j) {
            this.isAnyJumpValid = true;
        } else {
            this.isAnyJumpValid = false;
        }
        this.dataNode._anytimejumpto = trim(by.value);
        return true;
    };
    this.setAnyTimeJumpTo = function () {
        by.value = this.dataNode._anytimejumpto;
    };
    this.checkValid = function () {
        var eg = this.isAnyJumpValid == undefined || this.isAnyJumpValid;
        var eh = this.isTitleValid == undefined || this.isTitleValid;
        if (cD) {
            var j = this.isDefaultValid == undefined || this.isDefaultValid;
            return eh && j && eg;
        } else {
            var ek = this.isItemTitleValid == undefined || this.isItemTitleValid;
            var i = this.isItemJumpValid == undefined || this.isItemJumpValid;
            var dw = this.isItemValueValid == undefined || this.isItemValueValid;
            var ef = this.isRowTitleValid == undefined || this.isRowTitleValid;
            var ei = this.isColumnTitleValid == undefined || this.isColumnTitleValid;
            var ej = this.isCeShiValid == undefined || this.isCeShiValid;
            return ek && i && dw && eg && eh && ef && ei && ej;
        }
    };
    this.validate = function () {
        p.innerHTML = "";
        this.checkTitle();
        if (cD) {
            this.checkDefault();
        } else {
            if (t) {
                this.checkRowTitle();
            } else {
                if (dP) {
                    var i = true;
                    var j = true;
                    if (ar) {
                        i = this.checkRowTitle();
                    }
                    if (bU) {
                        j = this.checkColumnTitle();
                    }
                    if (i && j) {
                        this.checkItemTitle();
                    }
                    this.checkItemValue();
                    this.checkItemJump();
                    if (this.checkCheckLimit) {
                        this.checkCheckLimit();
                    }
                    if (this.checkCeShiSet) {
                        this.checkCeShiSet();
                    }
                }
            }
        } if (ea) {
            this.checkAnyJump();
        }
        this.setErrorStyle();
    };
    this.setErrorStyle = function () {
        if (!this.checkValid()) {
            this.className += " div_question_error";
        } else {
            this.className = this.className.replace(/div_question_error/, "");
        }
    };
    this.setDataNodeToDesign = function () {
        var eh = this.dataNode;
        switch (eh._type) {
        case "question":
            if (eh._verify == "多级下拉") {
                break;
            }
            F.value = eh._title;
            F.onblur();
            d4.value = eh._maxword;
            m.checked = eh._requir;
            bK.value = eh._default;
            if (eh._default) {
                eh._olddefault = eh._default;
                z.click();
            }
            dU.value = eh._ins;
            if (eh._hasjump) {
                bO.click();
            }
            by.value = eh._anytimejumpto;
            cq.checked = eh._needOnly;
            bS.checked = eh._needsms;
            aR.value = eh._width;
            if (eh._underline) {
                ck.checked = true;
            }
            au.value = eh._minword;
            this.initVerify();
            this.initWidth();
            this.initHeight();
            break;
        case "sum":
            F.value = eh._title;
            F.onblur();
            m.checked = eh._requir;
            eb.value = eh._rowtitle;
            cL.value = eh._total;
            dU.value = eh._ins;
            if (eh._hasjump) {
                bO.click();
            }
            by.value = eh._anytimejumpto;
            if (this._referDivQ) {
                this.show_divAddFromCheck();
                bj.value = this._referDivQ.dataNode._topic;
                this.addFromCheck(bj);
            }
            break;
        case "cut":
        case "page":
            F.value = eh._title;
            F.onblur();
            if (eh._type == "page") {
                s.checked = eh._iszhenbie;
                bg.value = eh._mintime;
                du.value = eh._maxtime;
                du.onblur();
            }
            break;
        case "fileupload":
            F.value = eh._title;
            F.onblur();
            var el = $$("input", dN);
            var en = eh._ext || defaultFileExt;
            J.value = eh._maxsize;
            var eg = en.split("|");
            for (var eo = 0; eo < el.length; eo++) {
                el[eo].onclick = function () {
                    if (!this.value) {
                        var eu = this.parentNode;
                        var et = $$("input", eu);
                        for (var es = 0; es < et.length; es++) {
                            if (et[es] != this) {
                                et[es].checked = this.checked;
                            }
                        }
                    }
                    if (cur.updateExt) {
                        cur.updateExt(this);
                    }
                };
                if (eg.indexOf(el[eo].value) > -1) {
                    el[eo].checked = true;
                }
            }
            for (var eo = 0; eo < el.length; eo++) {
                if (el[eo].value) {
                    continue;
                }
                var er = true;
                var ek = el[eo].parentNode;
                var ei = $$("input", ek);
                for (var j = 0; j < ei.length; j++) {
                    if (ei[j] != el[eo] && !ei[j].checked) {
                        er = false;
                        break;
                    }
                }
                if (er) {
                    el[eo].checked = true;
                }
            }
            m.checked = eh._requir;
            dU.value = eh._ins;
            if (eh._hasjump) {
                bO.click();
            }
            by.value = eh._anytimejumpto;
            break;
        case "gapfill":
            F.value = eh._title;
            F.onblur();
            m.checked = eh._requir;
            dU.value = eh._ins;
            if (eh._hasjump) {
                bO.click();
            }
            by.value = eh._anytimejumpto;
            dg.checked = eh._useTextBox;
            break;
        case "slider":
            F.value = eh._title;
            F.onblur();
            m.checked = eh._requir;
            aG.value = eh._minvalue || 0;
            d.value = eh._maxvalue || 100;
            b7.value = eh._minvaluetext || "";
            aq.value = eh._maxvaluetext || "";
            dU.value = eh._ins;
            if (eh._hasjump) {
                bO.click();
            }
            by.value = eh._anytimejumpto;
            break;
        case "radio":
        case "radio_down":
        case "check":
        case "matrix":
            F.value = eh._title;
            F.onblur();
            if (dU) {
                dU.value = eh._ins;
            }
            if (d5) {
                d5.value = eh._numperrow;
            }
            b0.checked = eh._randomChoice;
            if (eh._hasvalue) {
                P.checked = true;
                P.onclick();
            }
            if (eh._tag) {
                P.disabled = true;
            }
            if (eh._type == "matrix") {
                this.initMainWidth();
                eb.value = eh._rowtitle;
                this.initWidth();
                if (eh._rowtitle2 && cy) {
                    cy.checked = true;
                    cy.onclick();
                    cy.checked = true;
                }
                if (eh._rowwidth2) {
                    this.initWidth2();
                }
                if (eh._daoZhi) {
                    if (cB) {
                        cB.checked = true;
                    }
                }
                dT.style.display = (eh._tag > 200 && eh._tag != "303") ? "none" : "";
                bY.style.display = dT.style.display;
                P.disabled = (eh._tag <= 101 || eh._tag == 303) ? true : false;
            }
            var ej = false;
            var ef = !eh._tag && (eh._type == "check" || eh._type == "radio" || eh._type == "radio_down");
            for (var dw = 1; dw < eh._select.length; dw++) {
                cU[dw].get_item_title().value = eh._select[dw]._item_title.replace(/&lt;/, "<");
                if (ef || eh._isCeShi) {
                    var i = eh._select[dw]._item_radio;
                    cU[dw].get_item_check().checked = i;
                    if (i) {
                        ej = true;
                    }
                    if (eh._select[dw]._item_huchi) {
                        cU[dw].get_item_huchi().checked = true;
                    }
                }
                if (ej && this.defaultCheckSet) {
                    this.defaultCheckSet();
                }
                var ep = eh._select[dw]._item_value;
                if (eh._isShop && (ep == "0" || !ep)) {
                    ep = "10";
                }
                cU[dw].get_item_value().value = ep;
                if (ep == NoValueData) {
                    cU[dw].get_item_value().value = "";
                    if (cU[dw].get_item_novalue()) {
                        cU[dw].get_item_novalue().checked = true;
                    }
                }
                var eq = eh._select[dw]._item_jump;
                cU[dw].get_item_jump().value = eq;
                if (cU[dw].get_item_tb()) {
                    cU[dw].get_item_tb().checked = eh._select[dw]._item_tb;
                }
                if (cU[dw].get_item_tbr()) {
                    cU[dw].get_item_tbr().checked = eh._select[dw]._item_tbr;
                }
                if (cU[dw].get_item_img()) {
                    cU[dw].get_item_img().value = eh._select[dw]._item_img;
                }
                if (cU[dw].get_item_imgtext()) {
                    cU[dw].get_item_imgtext().checked = eh._select[dw]._item_imgtext;
                }
                if (cU[dw].get_item_desc()) {
                    cU[dw].get_item_desc().value = eh._select[dw]._item_desc;
                }
                if (cU[dw].get_item_label()) {
                    cU[dw].get_item_label().value = eh._select[dw]._item_label;
                }
            }
            if (m) {
                m.checked = eh._requir;
            }
            if (eh._hasjump) {
                if (eh._type == "radio" || eh._type == "radio_down") {
                    if (eh._anytimejumpto < 1) {
                        cV.click();
                    } else {
                        bO.click();
                    }
                } else {
                    bO.click();
                }
            }
            if (by) {
                by.value = eh._anytimejumpto;
            }
            if (this._referDivQ) {
                this.show_divAddFromCheck();
                bj.value = this._referDivQ.dataNode._topic;
                this.addFromCheck(bj);
            }
            break;
        }
        if (eh._ins) {
            eh._oldins = eh._ins;
            aA.click();
            aA.checked = true;
        }
        try {
            F.focus();
        } catch (em) {}
    };
}

function setImage(b, a) {
    PDF_close(b);
}

function creat_item(H, L, A, ai, F, I) {
    var S = L;
    var Y = A;
    var k = A.insertRow(S);
    var s = k.insertCell(-1);
    var a = control_text("15");
    a.tabIndex = 1;
    a.title = "回车添加新选项，上下键编辑前后选项";
    if (F) {
        select_item_num++;
    }
    a.value = I ? I._item_title : "选项" + select_item_num;
    if (A.rows.length - 1 == S && cur && (cur.dataNode._isQingJing || cur.dataNode._isShop)) {
        var B = "情景" + S;
        if (cur.dataNode._isShop) {
            B = "商品" + S;
        }
        var P = false;
        for (var ab = 1; ab < cur.dataNode._select.length; ab++) {
            if (cur.dataNode._select[ab]._item_title == B) {
                P = true;
                break;
            }
        }
        if (!P) {
            a.value = B;
        }
    }
    a.className += " choicetxt";
    a.onchange = a.onblur = function () {
        if (!this.value) {
            this.value = this.initText || "";
        }
        if (cur && cur.updateItem) {
            cur.updateItem();
            cur.checkTextJump(this.value);
        }
    };
    a.onfocus = function () {
        if (!this.initText) {
            this.initText = this.value;
        }
        var j = /^选项\d+$/;
        if (j.test(this.value)) {
            this.value = "";
        }
    };
    a.onkeydown = function (aj) {
        var j = aj || window.event;
        if (j.keyCode == 13) {
            Z.onclick();
        } else {
            if (j.keyCode == 40) {
                if (S < cur.option_radio.length - 1) {
                    cur.option_radio[S + 1].get_item_title().focus();
                    cur.option_radio[S + 1].get_item_title().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (S > 1) {
                        cur.option_radio[S - 1].get_item_title().focus();
                        cur.option_radio[S - 1].get_item_title().select();
                    }
                }
            }
        }
        return true;
    };
    s.appendChild(a);
    s.style.width = "150px";
    var u = cur || H;
    var i = u.dataNode._isCePing;
    if (u.dataNode._type == "matrix" && u.dataNode._tag && u.dataNode._tag <= 101) {
        s.style.width = "80px";
        a.style.width = "80px";
    } else {
        if (u.dataNode._type == "matrix" && u.dataNode._tag == "303") {
            s.style.width = "120px";
            a.style.width = "120px";
        } else {
            if (u.dataNode._type == "check" && u.dataNode._tag) {
                s.style.width = "450px";
                a.style.width = "450px";
            }
        }
    }
    var M = u.dataNode._type == "check" && (u.dataNode._tag || 0);
    var R = !u.dataNode._tag && (u.dataNode._type == "check" || u.dataNode._type == "radio") && !i;
    var b = u.dataNode._isCeShi;
    var o = u.dataNode._isQingJing;
    var v = u.dataNode._isShop;
    if ((R || i) && !o) {
        var y = k.insertCell(-1);
        if (v) {
            y.align = "center";
        }
        var ag = document.createElement("input");
        ag.type = "hidden";
        ag.value = I ? I._item_img : "";
        y.appendChild(ag);
        var Q = document.createElement("span");
        Q.title = "添加图片";
        Q.className = "choiceimg design-icon design-img";
        y.appendChild(Q);
        if (ag.value) {
            Q.title = "编辑图片";
            Q.className = "choiceimg design-icon design-imgedit";
        }
        if (ag.value) {
            A.rows[0].cells[1].style.width = "52px";
        }

        function p(am) {
            if (am == undefined) {
                return;
            }
            var ak = cur.option_radio[S].get_item_img();
            if (v && am.indexOf(".sojump.com") > -1) {
                if (am.indexOf("pubali") > -1) {
                    var al = "?x-oss-process";
                    var j = am.indexOf(al);
                    if (j > -1) {
                        am = am.substring(0, j);
                    }
                    am = am + al + "=image/quality,q_90/resize,m_fill,h_126,w_190";
                } else {
                    var al = "?imageMogr2";
                    var j = am.indexOf(al);
                    if (j > -1) {
                        am = am.substring(0, j);
                    }
                    am = am + al + "/thumbnail/190x126!";
                }
            }
            ak.value = am;
            if (!v) {
                var aj = cur.option_radio[S].get_item_imgtext();
                aj.parentNode.style.display = (am) ? "" : "none";
                aj.checked = true;
            }
            Q.className = am ? "choiceimg design-icon design-imgedit" : "choiceimg design-icon design-img";
            A.rows[0].cells[1].style.width = "52px";
            cur.updateItem();
            if (cur.setchoiceWidth) {
                cur.setchoiceWidth();
            }
        }
        Q.onclick = function () {
            itemImage = cur.option_radio[S].get_item_img().value;
            PDF_launch("uploadimg.aspx?design=1&activity=" + activityID, 650, 460, p, cur.option_radio[S].get_item_title().value);
        };
        var T = $ce("span", "", y);
        var af = control_check();
        T.style.verticalAlign = "bottom";
        af.title = "是否显示选项文字";
        af.className = "checkbox";
        T.appendChild(af);
        T.style.display = ag.value ? "" : "none";
        if (v) {
            T.style.display = "none";
        }
        af.onclick = function () {
            cur.updateItem();
        };
    }
    if ((R || i) && !v) {
        var V = k.insertCell(-1);
        V.align = "center";
        var E = document.createElement("span");
        E.title = "选项说明，支持HTML，图片，视频等";
        E.className = "choiceimg design-icon design-desc";
        V.appendChild(E);
        var g = document.createElement("input");
        g.type = "hidden";
        g.value = I ? (I._item_desc || "") : "";
        V.appendChild(g);
        if (g.value) {
            E.className = "choiceimg design-icon design-descedit";
        }
        E.onclick = function () {
            openTitleEditor(g, function (aj) {
                if (aj == "-1nc" || aj == undefined) {
                    return;
                }
                g.value = trim(aj);
                var j = "";
                E.className = g.value ? "choiceimg design-icon design-descedit" : "choiceimg design-icon design-desc";
                if (!o) {
                    j = cur.option_radio[S].get_item_img().value;
                    cur.option_radio[S].get_item_imgtext().parentNode.style.display = (j) ? "" : "none";
                }
                if (cur.showDesc && !cur.displayTip && !cur.dataNode._displayDesc) {
                    cur.showDesc();
                    cur.displayTip = true;
                }
                cur.updateItem();
                if (j) {
                    setTimeout(function () {
                        cur.updateItem();
                    }, 20);
                }
            }, cur.option_radio[S].get_item_title().value);
        };
    }
    if (M || R || (u.dataNode._type == "matrix" && (u.dataNode._tag == "102" || u.dataNode._tag == "103" || u.dataNode._tag == "101")) || i) {
        var x = k.insertCell(-1);
        x.align = "center";
        var W = $ce("span", "", x);
        W.style.verticalAlign = "bottom";
        W.style.fontSize = "12px";
        var t = control_check();
        t.style.verticalAlign = "bottom";
        t.title = "允许填空";
        t.className = "checkbox";
        W.appendChild(t);
        t.checked = I ? I._item_tb : false;
        var ae = $ce("span", "&nbsp;", W);
        var m = control_check();
        m.title = "文本框必填";
        m.className = "checkbox";
        ae.appendChild(document.createTextNode("必填"));
        ae.appendChild(m);
        m.checked = I ? I._item_tbr : false;
        ae.style.display = t.checked ? "" : "none";
        t.onclick = function () {
            if (!this.checked) {
                cur.option_radio[S].get_item_tbr().checked = false;
            }
            cur.option_radio[S].get_item_tbr().parentNode.style.display = this.checked ? "" : "none";
            cur.updateItem();
        };
        m.onclick = function () {
            cur.updateItem();
        };
        if (b || o || v) {
            x.style.display = "none";
        }
    }
    var z = k.insertCell(-1);
    z.align = "left";
    var d = $ce("span", "&nbsp;", z);
    var n = control_text("4");
    n.maxLength = 5;
    n.title = "在此可以设置每个选项的分数（请输入整数）";
    if (o) {
        n.title = "请设置每个情景需要的数量,0表示不限制";
    } else {
        if (v) {
            n.title = "设置商品价格";
        }
    }
    n.value = I ? I._item_value : S;
    d.appendChild(n);
    if (u.dataNode._hasvalue && (i || u.dataNode._tag)) {
        z.style.display = "";
        if (u.dataNode._type != "check" && u.dataNode._tag != "303") {
            var ah = control_check();
            ah.title = "不记分";
            ah.className = "checkbox";
            ah.onclick = function () {
                n.value = "";
                cur.updateItem();
            };
            n.style.width = "16px";
            n.style.height = "16px";
            z.appendChild(ah);
            $ce("span", "不记分", z).style.fontSize = "11px";
        }
    } else {
        if (!o && !v) {
            z.style.display = "none";
        }
    }
    n.onchange = n.onblur = function () {
        if (v) {
            if (!this.value || parseFloat(this.value) != this.value) {
                this.value = 10;
            }
        } else {
            if (o) {
                if (!isInt(this.value) || parseInt(this.value) < 1) {
                    this.value = 10;
                    if (o) {
                        this.value = 50;
                    }
                }
            }
        } if (i || v || (cur.dataNode._type == "radio" && cur.dataNode._tag)) {
            cur.updateItem();
        } else {
            cur.updateItem(true);
        }
    };
    n.onkeydown = function (aj) {
        var j = aj || window.event;
        if (j.keyCode == 13) {
            Z.onclick();
        } else {
            if (j.keyCode == 40) {
                if (S < cur.option_radio.length - 1) {
                    cur.option_radio[S + 1].get_item_value().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (S > 1) {
                        cur.option_radio[S - 1].get_item_value().select();
                    }
                }
            }
        }
    };
    var l = k.insertCell(-1);
    if (H.dataNode._type == "matrix") {
        l.style.display = "none";
    }
    var U = "&nbsp;&nbsp;";
    if (v) {
        U = "";
    }
    var K = $ce("span", U, l);
    l.align = "left";
    var G = control_text(4);
    G.maxLength = 4;
    G.style.height = "20px";
    if (v) {
        G.title = "为空表示不限制库存，0表示已售完";
    }
    G.value = I ? I._item_jump : "";
    if (u.dataNode._hasjump && u.dataNode._anytimejumpto == "0") {
        K.style.display = "";
    } else {
        if (v) {
            K.style.display = "";
        } else {
            K.style.display = "none";
        }
    }
    K.appendChild(G);
    G.onclick = function () {
        if (!v) {
            openJumpWindow(u, this);
        }
    };
    G.onmouseout = function () {
        if (!v) {
            sb_setmenunav(toolTipLayer, false);
        }
    };
    G.onmouseover = function () {
        if (!v) {
            if (!this.error) {
                if (!this.title || this.hasChanged) {
                    this.title = getJumpTitle(this.value);
                }
            }
        }
    };
    G.onblur = function () {
        if (v && !vipUser) {
            alert("提示：库存功能仅对企业版开放！");
            this.value = "";
            return;
        }
        if (v) {
            if (!isInt(this.value) || parseInt(this.value) < 1) {
                this.value = "";
            }
        }
        if (this.value == this.prevValue) {
            this.hasChanged = false;
            return;
        }
        this.hasChanged = true;
        this.prevValue = this.value;
        cur.updateItem(true);
    };
    G.onkeydown = function (aj) {
        var j = aj || window.event;
        if (j.keyCode == 13) {
            Z.onclick();
        } else {
            if (j.keyCode == 40) {
                if (S < cur.option_radio.length - 1) {
                    cur.option_radio[S + 1].get_item_jump().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (S > 1) {
                        cur.option_radio[S - 1].get_item_jump().select();
                    }
                }
            }
        }
    };
    var C = null;
    if (R && ai == "check" && !b && !v) {
        var O = k.insertCell(-1);
        var w = $ce("span", "&nbsp;", O);
        O.align = "center";
        C = control_check();
        C.title = "与其它选项互斥";
        C.className = "checkbox";
        w.appendChild(C);
        C.onclick = function () {
            cur.updateItem();
        };
    }
    var f = k.insertCell(-1);
    var N = $ce("span", "&nbsp;", f);
    var ac = null;
    ac = control_check();
    ac.className = "checkbox";
    if (!b) {
        ac.title = "若选中，用户在填问卷时此选项会默认被选中";
    } else {
        f.align = "center";
    } if ((R || u.dataNode._type == "radio_down") && !o && !v) {
        f.style.display = "";
    } else {
        f.style.display = "none";
    }
    N.appendChild(ac);
    if ((R || u.dataNode._type == "radio_down") && ai == "radio") {
        ac.onclick = function () {
            if (this.checked) {
                for (var j = 1; j < cur.option_radio.length; j++) {
                    if (cur.option_radio[j].get_item_check() == this) {
                        this.checked = true;
                    } else {
                        cur.option_radio[j].get_item_check().checked = false;
                    }
                }
            }
            cur.updateItem();
        };
    }
    if (R && ai == "check") {
        ac.onclick = function () {
            cur.updateItem();
        };
    }
    if (R) {
        var h = k.insertCell(-1);
        h.align = "left";
        h.style.width = "80px";
        var aa = $ce("a", "分组", h);
        aa.tabIndex = "-1";
        aa.className = "link-666";
        if (cur && cur.dataNode._select[S] && cur.dataNode._select[S]._item_label) {
            aa.innerHTML = "编辑";
        }
        aa.href = "javascript:void(0);";
        var r = document.createElement("input");
        r.type = "hidden";
        r.value = I ? (I._item_label || "") : "";
        h.appendChild(r);
        aa.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能插入分组，请升级！");
                return false;
            }
            openTitleEditor(r, function (j) {
                if (j == "-1nc" || j == undefined) {
                    return false;
                }
                r.value = trim(j);
                aa.innerHTML = r.value ? "编辑" : "分组";
                cur.updateItem();
            });
            return false;
        };
        if (b || o || v) {
            h.style.display = "none";
        }
    }
    var J = k.insertCell(-1);
    J.align = "center";
    var Z = document.createElement("span");
    Z.title = "在此选项下面插入一个新的选项";
    Z.className = "choiceimg design-icon design-add";
    var e = document.createElement("span");
    e.title = "删除当前选项（最少保留2个选项）";
    e.className = "choiceimg design-icon design-minus";
    var X = document.createElement("span");
    X.title = "将当前选项上移一个位置";
    X.className = "choiceimg design-icon design-cup";
    var D = document.createElement("span");
    D.title = "将当前选项下移一个位置";
    D.className = "choiceimg design-icon design-cdown";
    J.appendChild(Z);
    J.appendChild(e);
    J.appendChild(X);
    J.appendChild(D);
    Z.style.cursor = "pointer";
    e.style.cursor = "pointer";
    X.style.cursor = "pointer";
    D.style.cursor = "pointer";
    Z.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded && S < cur.option_radio.length - 1) {
            alert("很抱歉，部分修改问卷模式下，不能在中间插入选项，只能在最后面添加选项！");
            return;
        }
        if (isMergeAnswer && !cur.isMergeNewAdded && !confirm("此题不能删除选项，是否确认增加选项？")) {
            return;
        }
        for (var j = cur.option_radio.length - 1; j > S; j--) {
            cur.option_radio[j].set_item_num(j + 1);
            cur.option_radio[j + 1] = cur.option_radio[j];
        }
        if (ai == "radio") {
            cur.option_radio[S + 1] = new creat_item(cur, S + 1, A, "radio", true);
        }
        if (ai == "check") {
            cur.option_radio[S + 1] = new creat_item(cur, S + 1, A, "check", true);
        }
        cur.updateItem();
        cur.option_radio[S + 1].get_item_title().select();
    };
    e.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许删除题目选项！");
            return;
        }
        if (cur.option_radio.length > 2) {
            A.deleteRow(S);
            for (var aj = S + 1; aj < cur.option_radio.length; aj++) {
                cur.option_radio[aj].set_item_num(aj - 1);
                cur.option_radio[aj - 1] = cur.option_radio[aj];
            }
            cur.option_radio.length--;
            cur.updateItem();
        } else {
            show_status_tip("请至少保留1个选项", 4000);
        }
    };
    X.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许移动题目选项！");
            return;
        }
        if ((S - 1) > 0) {
            c(cur.option_radio[S], cur.option_radio[S - 1]);
            if (ai == "check" || ai == "radio") {
                ad(cur.option_radio[S], cur.option_radio[S - 1]);
            }
            q(cur.option_radio[S], cur.option_radio[S - 1]);
            cur.updateItem();
        }
    };
    D.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许移动题目选项！");
            return;
        }
        if ((S + 1) < cur.option_radio.length) {
            c(cur.option_radio[S], cur.option_radio[S + 1]);
            if (ai == "check" || ai == "radio") {
                ad(cur.option_radio[S], cur.option_radio[S + 1]);
            }
            q(cur.option_radio[S], cur.option_radio[S + 1]);
            cur.updateItem();
        }
    };

    function c(ak, j) {
        var aj = ak.get_item_title().value;
        ak.get_item_title().value = j.get_item_title().value;
        j.get_item_title().value = aj;
    }

    function ad(ak, j) {
        var aj = ak.get_item_check().checked;
        ak.get_item_check().checked = j.get_item_check().checked;
        j.get_item_check().checked = aj;
    }

    function q(ak, j) {
        var aj = ak.get_item_value().value;
        ak.get_item_value().value = j.get_item_value().value;
        j.get_item_value().value = aj;
        aj = ak.get_item_jump().value;
        ak.get_item_jump().value = j.get_item_jump().value;
        j.get_item_jump().value = aj;
        if (ak.get_item_novalue()) {
            aj = ak.get_item_novalue().checked;
            ak.get_item_novalue().checked = j.get_item_novalue().checked;
            j.get_item_novalue().checked = aj;
        }
        if (ak.get_item_tb()) {
            aj = ak.get_item_tb().checked;
            ak.get_item_tb().checked = j.get_item_tb().checked;
            j.get_item_tb().checked = aj;
        }
        if (ak.get_item_tbr()) {
            aj = ak.get_item_tbr().checked;
            ak.get_item_tbr().checked = j.get_item_tbr().checked;
            j.get_item_tbr().checked = aj;
        }
        if (ak.get_item_img()) {
            aj = ak.get_item_img().value;
            ak.get_item_img().value = j.get_item_img().value;
            j.get_item_img().value = aj;
        }
        if (ak.get_item_imgtext()) {
            aj = ak.get_item_imgtext().checked;
            ak.get_item_imgtext().checked = j.get_item_imgtext().checked;
            j.get_item_imgtext().checked = aj;
        }
        if (ak.get_item_desc()) {
            aj = ak.get_item_desc().value;
            ak.get_item_desc().value = j.get_item_desc().value;
            j.get_item_desc().value = aj;
        }
        if (ak.get_item_label()) {
            aj = ak.get_item_label().value;
            ak.get_item_label().value = j.get_item_label().value;
            j.get_item_label().value = aj;
        }
    }
    this.get_item_add = function () {
        return Z;
    };
    this.get_item_del = function () {
        return e;
    };
    this.get_item_table = function () {
        return Y;
    };
    this.get_item_tr = function () {
        return k;
    };
    this.set_item_num = function (j) {
        S = j;
    };
    this.get_item_addimg = function () {
        return Q;
    };
    this.get_item_num = function () {
        return S;
    };
    this.get_item_title = function () {
        return a;
    };
    this.get_item_check = function () {
        return ac;
    };
    this.get_item_huchi = function () {
        return C;
    };
    this.get_item_tb = function () {
        return t;
    };
    this.get_item_tbr = function () {
        return m;
    };
    this.get_item_img = function () {
        return ag;
    };
    this.get_item_desc = function () {
        return g;
    };
    this.get_item_label = function () {
        return r;
    };
    this.get_item_imgtext = function () {
        return af;
    };
    this.get_item_value = function () {
        return n;
    };
    this.get_item_novalue = function () {
        return ah;
    };
    this.get_item_jump = function () {
        return G;
    };
    return true;
}

function setAllRequired(c) {
    for (var a = 0; a < questionHolder.length; a++) {
        var b = questionHolder[a].dataNode._type;
        if (b != "cut" && b != "page" && questionHolder[a].dataNode._requir != c) {
            if (questionHolder[a].get_requir) {
                questionHolder[a].get_requir().checked = c;
            }
            questionHolder[a].dataNode._requir = c;
            questionHolder[a].setreqstatus();
        }
    }
    show_status_tip("设置成功！", 4000);
}

function setAllRandom() {
    var a = cur.dataNode._randomChoice;
    for (var b = 0; b < questionHolder.length; b++) {
        if (!questionHolder[b].dataNode._isCeShi) {
            continue;
        }
        if (questionHolder[b].dataNode._type == "question") {
            continue;
        }
        if (questionHolder[b].get_random) {
            questionHolder[b].get_random().checked = a;
        }
        questionHolder[b].dataNode._randomChoice = a;
    }
    show_status_tip("设置成功！", 4000);
}
initAttrHandler();

function initAttrHandler() {
    firstPage.createAttr = createAttr;
    for (var b = 0; b < questionHolder.length; b++) {
        var a = questionHolder[b];
        setAttrHander(a);
    }
}

function setAttrHander(a) {
    a.createAttr = createAttr;
}