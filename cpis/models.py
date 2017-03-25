#-*-coding:utf-8-*-

from django.contrib.auth.models import User
from django.db import models


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
    tm_ids=models.CharField('题目编号集合',max_length=500)
    upload_date=models.DateTimeField('上传日期',auto_now_add=True)
    course=models.ForeignKey('Course',on_delete=models.CASCADE,verbose_name='所属课程')
    chapter=models.CharField('章节',max_length=20,null=True,blank=True)
    teacher=models.ForeignKey('Teacher',on_delete=models.CASCADE,verbose_name='教师')
    #状态信息：是否发布、针对班级、经纬度
    stat_info=models.CharField('状态信息',max_length=500)
    class Meta:
        verbose_name = '课堂练习'
        verbose_name_plural='课堂练习表'

  
class PracticeRecord(models.Model):
    '''练习记录'''
    sno=models.ForeignKey('Student',on_delete=models.CASCADE,verbose_name='学生编号')
    clspratice=models.ForeignKey('ClsPractice',on_delete=models.CASCADE,verbose_name='课堂练习',null=True,blank=True)
    #包括时间地理位置、犹豫信息、经纬度等等。
    info=models.CharField('记录信息',max_length=512)
    def __unicode__(self):
        return super(self)
    def __str__(self):
        return super(self)
    class Meta:
        verbose_name = '答题记录'
        verbose_name_plural='答题记录表'

class Choice(models.Model):
    '''选择题'''
    topic=models.CharField('题目',max_length=100)   
    option=models.CharField('选项集合',max_length=1024)
    correctanswer=models.CharField('正确选项集合',max_length=20)
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期时间',auto_now_add=True)
    course=models.ForeignKey('Course',verbose_name='所属课程')
    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '选择题'
        verbose_name_plural='选择题表'
        
class Fill(models.Model):
    '''填空题'''
    topic=models.CharField('题目',max_length=100)
    correctanswer=models.CharField('正确答案',max_length=50)
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期',auto_now_add=True)
    course=models.ForeignKey('Course',verbose_name='所属课程')    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '填空题'
        verbose_name_plural='填空题表'
    
class Judge(models.Model):
    '''判断题'''
    topic=models.CharField('题目',max_length=100)
    correctanswer=models.BooleanField('正确答案')
    correctrate=models.IntegerField('正确率',null=True,blank=True)
    difficulty=models.IntegerField('难易系数',null=True,blank=True)
    analysis=models.CharField('解析',max_length=100,null=True,blank=True)
    knowledgepoint=models.CharField('知识点',max_length=30,null=True,blank=True)
    date=models.DateTimeField('发布日期',auto_now_add=True)
    course=models.ForeignKey('Course',verbose_name='所属课程')
    
    def __unicode__(self):
        return self.topic
    def __str__(self):
        return self.topic
    class Meta:
        verbose_name = '判断题'
        verbose_name_plural='判断题表'
    
    