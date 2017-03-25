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
    url(r'^ajax_deal/$',views.ajax_deal,name='ajax_deal'),
    url(r'^mainpage/$',views.mainPage,name='mainpage'),
    url(r'^submitquestion/$',views.submitquestion,name="submitquestion"),#提交练习
    url(r'^publishpratice/$',views.publishpratice,name="publishpratice"),
    url(r'^studentanswer/$',views.studentanswer,name="studentanswer"),
    url(r'^getdjs/$',views.getdjs,name='getdjs'),
    url(r'^studentsubmit/$',views.studentsubmit,name='studentsubmit'),
    url(r'^studentresult/$',views.studentresult,name='studentresult'),
    url(r'^count/$',views.count,name='count'),
]

