#-*-coding:utf-8-*-

import datetime

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Student(models.Model):
    '''学生'''
    user=models.OneToOneField(User,on_delete=models.CASCADE,verbose_name='基本信息')
    ssex=models.CharField('性别',max_length=2,null=True,blank=True)    
    clz=models.ForeignKey('Clazz',null=True,on_delete=models.CASCADE,verbose_name='班级')
 
    def __unicode__(self):                   #针对Python2.7
        return self.user.username
    def __str__(self):                       #针对Python3.0以上版本
        return self.user.username
    
    class Meta:                               #描述类，相当于标题
        verbose_name = '学生'
        verbose_name_plural='学生表'
        
class Clazz(models.Model):
    '''班级'''
    scname=models.CharField('班级名称',max_length=20,unique=True)
    description=models.CharField('班级描述',max_length=100,default='还没有相关描述')
    def __unicode__(self):
        return self.scname
    def __str__(self):
        return self.scname
    class Meta:
        verbose_name = '班级'
        verbose_name_plural='班级表'
        
class Teacher(models.Model):
    '''教师'''
    user=models.OneToOneField(User,on_delete=models.CASCADE,verbose_name='基本信息')
    ct=models.ManyToManyField('Clazz',through='C_T')               
    
    def __unicode__(self):
        return self.user.username
    def __str__(self):
        return self.user.username
    
    class Meta:
        verbose_name = '教师'
        verbose_name_plural='教师表'

class C_T(models.Model):
    #班级教师关系表
    teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE,verbose_name='教师')
    clzz=models.ForeignKey(Clazz,on_delete=models.CASCADE,verbose_name='班级')
    course=models.ForeignKey('Course',null=True,on_delete=models.CASCADE,verbose_name='所带课程')
    class Meta:
        verbose_name = '教师_课程'
        verbose_name_plural='教师_课程表'

class Course(models.Model):
    '''课程'''
    cname=models.CharField('课程名称',max_length=20,unique=True)
    description=models.CharField('课程描述',max_length=50,default='暂时没有描述')
    
    def __unicode__(self):
        return self.cname
    def __str__(self):
        return self.cname
    
    class Meta:
        verbose_name = '课程'
        verbose_name_plural='课程表'
        
class ClsPractice(models.Model):
    '''课堂练习'''
    choice_id=models.CharField('选择题集',max_length=50,null=True)
    fill_id=models.CharField('填空题集合',max_length=50,null=True)
    judgment_id=models.CharField('判断题集合',max_length=50,null=True)
    publish_date=models.DateTimeField('上传日期',auto_now_add=True)
    course=models.ForeignKey('Course',on_delete=models.CASCADE,verbose_name='所属课程')
    chapter=models.CharField('章节',max_length=20,null=True,blank=True)
    teacher=models.ForeignKey('Teacher',on_delete=models.CASCADE,verbose_name='教师')
    
    class Meta:
        verbose_name = '课堂练习'
        verbose_name_plural='课堂练习表'

class PubPractice(models.Model):
    '''发布练习'''
    clspractice=models.ForeignKey('ClsPractice',on_delete=models.CASCADE,verbose_name='课堂练习')
    forclass=models.CharField('针对班级',max_length=20,default='')#可针对多个班级
    publish_date=models.DateTimeField('发布日期',auto_now_add=True)
    practice_time=models.IntegerField('练习时间')
    teacher=models.ForeignKey('Teacher',on_delete=models.CASCADE,verbose_name='教师')
    sata=models.SmallIntegerField('状态')
    publish_loc=models.CharField('发布地点经纬度',max_length=100)
    
    def validpratice(self):
        now = timezone.now()
        end= self.publish_date+datetime.timedelta(minutes=self.practice_time)
        if (end-now)>datetime.timedelta(minutes=0):
            return self.id
        else:
            return None
   
    class Meta:
        verbose_name = '发布练习'
        verbose_name_plural='发布练习表'
    
class PracticeRecord(models.Model):
    '''联系记录'''
    sno=models.ForeignKey('Student',on_delete=models.CASCADE,verbose_name='学生编号')
    clspratice=models.ForeignKey('ClsPractice',on_delete=models.CASCADE,verbose_name='课堂练习',null=True,blank=True)
    costtime=models.IntegerField('练习时间')
    hesitateinfo=models.CharField('犹豫信息',max_length=100)
    errorinfo=models.CharField('错误信息',max_length=5128)
    position=models.CharField('答题人经纬度',max_length=100)
    def __unicode__(self):
        return super(self)
    def __str__(self):
        return super(self)
    class Meta:
        verbose_name = '答题记录'
        verbose_name_plural='答题记录表'
class Choice(models.Model):
    '''选择题'''
    topic=models.CharField('题目',max_length=100,null=False,unique=True)
    optiona=models.CharField('选项a',max_length=50)
    optionb=models.CharField('选项b',max_length=50)
    optionc=models.CharField('选项c',max_length=50,null=True,blank=True)
    optiond=models.CharField('选项d',max_length=50,null=True,blank=True)
    optione=models.CharField('选项e',max_length=50,null=True,blank=True)
    correctanswer=models.CharField('正确选项',max_length=1)
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期',auto_now_add=True)
    course=models.CharField('所属课程',max_length=50,null=True,blank=True)
    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '选择题'
        verbose_name_plural='选择题表'
        
class Fill(models.Model):
    '''填空题'''
    topic=models.CharField('题目',max_length=100,null=False,unique=True)
    correctanswer=models.CharField('正确答案',max_length=20)
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期',auto_now_add=True)
    course=models.CharField('所属课程',max_length=50,null=True,blank=True)    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '填空题'
        verbose_name_plural='填空题表'
    
class Judge(models.Model):
    '''判断题'''
    topic=models.CharField('题目',max_length=100,null=False,unique=True)
    correctanswer=models.BooleanField('正确答案')
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期',auto_now_add=True)
    course=models.CharField('所属课程',max_length=50,null=True,blank=True)    
    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '判断题'
        verbose_name_plural='判断题表'
    
    