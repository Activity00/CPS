#!/usr/bin/python 
#-*- coding: utf-8 -*-
'''
Created on 2016年12月18日

@author: 武明辉
'''
from django.conf.urls import url

from cpis import views

app_name='cpis'

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^login/$',views.login,name='login'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^mainpage/$',views.mainPage,name='mainpage'),
    url(r'^teacheradd/$',views.teacheradd,name='teacheradd'),
    url(r'^teacherview/$',views.teacherview,name='teacherview'),
    url(r'^submitquestion$',views.submitquestion,name="submitquestion"),
    url(r'^teacherviewdetail/$',views.teacherviewdetail,name='teacherviewdetail'),
    url(r'^publishpratice/$',views.publishpratice,name="publishpratice"),
    url(r'^studentanswer/$',views.studentanswer,name="studentanswer"),
    url(r'^getdjs/$',views.getdjs,name='getdjs'),
    url(r'^studentsubmit/$',views.studentsubmit,name='studentsubmit'),
    url(r'^studentresult/$',views.studentresult,name='studentresult'),
]

