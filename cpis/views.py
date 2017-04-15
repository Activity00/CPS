#-*-coding:utf-8-*-
import datetime
import json

from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse, HttpResponseRedirect, \
    HttpResponseNotFound, Http404
from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from CPS import settings
from cpis.models import Course, Choice, ClsPractice, Fill, Judge, \
    Teacher, Clazz, PracticeRecord


#from django.contrib.auth.models import User
#import django.contrib.auth.backends.ModelBackend
# Create your views here.
def index(request):
    #记住密码
    context={'error':request.GET.get('message')}
    return render(request, 'cpis/index.html', context)

def login(request):
    #在这里写登录逻辑、即登陆成功怎么样不成功怎么样子
    nid=request.POST['nid']
    password=request.POST['password']
    user=auth.authenticate(username=nid,password=password)
    if user  is  None:#处理空用户名和密码有错误逻辑
        return HttpResponseRedirect('/cpis?message=verify_error')
    else:
        if user.is_active:#登陆
            auth.login(request,user)        
            response=HttpResponseRedirect('/cpis/mainpage')
            return response
        else:
            return HttpResponseRedirect('/cpis?message=verify_exception')

def logout(request):
    user=request.user
    if user.is_authenticated():
        auth.logout(request)
    return HttpResponseRedirect('/cpis')

@login_required(login_url=settings.LOGIN_URL)
def ajax_deal(request):
    req=request.GET.get('req')
    req_m='_'+req
    context={}
    try:
        context=eval(req_m)(request)   
    except:
        pass
    return render(request,'cpis/%s.html'%req,context)

@login_required(login_url=settings.LOGIN_URL)
def mainPage(request):
    '''根据用户的身份，显示不同的模板
                 如果是教师就显示mangpage_t如果是学生就显示mainpage_t
    '''
    user=request.user
    context={'user':user}
    try:
        if user.student:
            return render(request, 'cpis/mainpage_s.html', context)
    except:
        return render(request, 'cpis/mainpage_t.html', context)

@login_required(login_url=settings.LOGIN_URL)
def createexercise(request):
    exercise_id=request.POST.get('lxfl')
    exercise_name=request.POST.get('lxmc')
    if not exercise_id  or not exercise_name:
        #提交表单出错、转到错误页面(前端校验合理的情况下不会出像这样情况)
        raise Http404()
    #练习填写页面
    return render(request, 'cpis/lxlr_detail.html', context=None)
 

def addexercise(request):
    print request.POST
    return HttpResponse('aaa')
    
@csrf_exempt
@login_required(login_url=settings.LOGIN_URL)
def submitquestion(request):
    '''教师提交信息
                 接收现老师提交过来的试题，收到json解析json存储各个试题和该练习
    '''
    if request.method != 'POST':
        return HttpResponseNotFound()
    user=request.user#当前用户
    received_json_data = json.loads(request.body)
    json_data=received_json_data['data']#需要解析的试题数据
    
    choice_id=[]

    for data in json_data['choice']:
        choice=Choice()
        choice.topic=data['tg']
        choice.correctanswer=data['answer']
        choice.analysis=data['jx']
        choice.knowledgepoint=data['zsd']
        print data['xx']
        choice.optiona,choice.optionb,choice.optionc,choice.optiond,choice.optione=data['xx']
        choice.save()
        choice_id.append(str(choice.id))
    
    fill_id=[]
    for data in json_data['fill']:
        fill=Fill()
        fill.topic=data['tg']
        fill.correctanswer=['answer']
        fill.analysis=data['jx']
        fill.knowledgepoint=data['zsd']
        fill.save()
        fill_id.append(str(fill.id))
    
    judge_id=[]
    for data in json_data['judge']:
        judge=Judge()
        judge.topic=data['tg']
        judge.correctanswer=data['answer']
        judge.analysis=data['jx']
        judge.knowledgepoint=data['zsd']
        judge.save()
        judge_id.append(str(judge.id))
    
    clsPractice=ClsPractice()
    clsPractice.choice_id =','.join(choice_id)
    clsPractice.fill_id=','.join(fill_id)
    clsPractice.judgment_id=','.join(judge_id)
    clsPractice.course=Course.objects.get(id=json_data['course'])
    clsPractice.chapter=json_data['chapter']
    clsPractice.teacher=user.teacher
    clsPractice.save()
    return HttpResponse(json.dumps('200'),content_type="application/json")

@csrf_exempt
@login_required(login_url=settings.LOGIN_URL)
def publishpratice(request):
    '''教师发布信息
    '''
    if request.method != 'POST':
        return HttpResponseNotFound()
    received_json_data = json.loads(request.body)
    id=received_json_data['id']#课堂练习的id
    tim=received_json_data['time']#课堂练习的时间
    clzz=received_json_data['clzz']#需要添加的班级名称
    #如果该练习是同一个班级的同一个课程已经发布
    try:
        if PubPractice.objects.get(clspractice=ClsPractice.objects.get(id=id)):
            class_id=Clazz.objects.get(scname=clzz).id
            object_temp=PubPractice.objects.get(clspractice=ClsPractice.objects.get(id=id))
            class_str=object_temp.forclass
            if str(class_id) not in class_str:
                object_temp.forclass=object_temp.forclass+str(class_id)+','
                object_temp.publish_loc=received_json_data['jwd']
                object_temp.save()
                return HttpResponse(json.dumps('200'),content_type="application/json")
            else:
                return HttpResponse(json.dumps('400'),content_type="application/json")
    except:
        pass
    #一下是没有发布就新建一个对象
    pubPractice=PubPractice()
    pubPractice.clspractice=ClsPractice.objects.get(id=id)
    pubPractice.sata=1#发布状态
    class_id=Clazz.objects.get(scname=clzz).id
    if str(class_id) not in pubPractice.forclass:
        pubPractice.forclass=pubPractice.forclass+str(class_id)+','
    pubPractice.practice_time=tim
    pubPractice.teacher=request.user.teacher
    pubPractice.publish_loc=received_json_data['jwd']
    pubPractice.save()
    
    return HttpResponse(json.dumps('200'),content_type="application/json")

@login_required(login_url=settings.LOGIN_URL)
def studentanswer(request):
    '''学生课堂答题
                      如果已经存在的发布了的没有过期的练习的针对班级属性与学生所在的班级一致，而且练习时间没结束,
                    则进入答题界面，如果不一致则提示还未发布。
    '''
    user=request.user
    position=None
    isStudent=False
    try:
        if user.student:
            position='学生端'
            isStudent=True
    except:
        try:
            if user.teacher:
                position='教师端'
        except:
            position='管理员'
    clsPractice=None
    try:
        #待优化
        pubid=None
        for pratice in PubPractice.objects.all():
            pubid=pratice.validpratice()
            if pubid is not None:
                break;
        if pubid is not None:
            #判断该学生是否是已发布班级的学生
            pubPractice=PubPractice.objects.get(id=pubid)
            forclass=pubPractice.forclass
            if str(user.student.clz.id) in forclass:           
                clsPractice=pubPractice.clspractice        
            else:
                return render(request,'cpis/s_ktlx.html',context={'user':user,'position':position,
             'isStudent':isStudent,'content':True})
        else:
            return render(request,'cpis/s_ktlx.html',context={'user':user,'position':position,
             'isStudent':isStudent,'content':True})
    except:
        return render(request,'cpis/s_ktlx.html',context={'user':user,'position':position,
             'isStudent':isStudent,'content':True})
    
    if PracticeRecord.objects.filter(sno=user.student,clspratice=clsPractice):
        return HttpResponseRedirect('/cpis/studentresult?pub_id='+str(pubid))         
    
    choice_list=None
    fill_list=None
    judegement_list=None
    choices=None
    fills=None
    judgements=None
    if clsPractice.choice_id is not None:
        choice_list=clsPractice.choice_id.split(',')
        choices=Choice.objects.filter(id__in=choice_list)
    if clsPractice.fill_id is not None:
        fill_list=clsPractice.fill_id.split(',')
        fills=Fill.objects.filter(id__in=fill_list)
    if clsPractice.judgment_id is not None:
        judegement_list=clsPractice.judgment_id.split(',')
        judgements=Judge.objects.filter(id__in=judegement_list)

    context={'ptatices_choice':choices,
             'pratices_fill':fills,
             'pratices_judgement':judgements,
             'user':user,'position':position,
             'isStudent':isStudent,
             'pubid':pubid}
    return render(request,'cpis/s_ktlx.html',context=context)

@csrf_exempt
def getdjs(request):
    '''
                    获取倒计时
    '''
    if request.method != 'POST':
        raise Http404()
    received_json_data = json.loads(request.body)
    id=received_json_data['id']#课堂练习的id
    pubPractice=PubPractice.objects.get(id=id)
    if(pubPractice is None):
        #系统出错
        raise Http404()
    publish_date=pubPractice.publish_date
    practice_time=pubPractice.practice_time
    now = timezone.now()
    end=publish_date+datetime.timedelta(minutes=practice_time)
    det=end-now
    min=det.seconds/60
    sec=det.seconds%60
    returnjson={'mintues':min,'seconds':sec}
    return HttpResponse(json.dumps(returnjson),content_type="application/json")

@csrf_exempt
def studentsubmit(request):
    if request.method != 'POST':
        raise Http404()
    received_json_data = json.loads(request.body)
    json_data=received_json_data['data']
    #该往数据库写这些东西   
    pr=PracticeRecord()
    pr.sno=request.user.student
    pr.clspratice=PubPractice.objects.get(id=json_data['pubid']).clspractice
    pr.costtime=json_data['resttime']
    pr.hesitateinfo=json_data['hesitateinfo']
    pr.errorinfo=json.dumps(json_data)
    
    #pr.position=
    pr.save()
    returnjson=200
    return HttpResponse(json.dumps(returnjson),content_type="application/json")

def studentresult(request):
    pub_id=request.GET.get('pub_id')
    clsPractice=PubPractice.objects.get(id=pub_id).clspractice    
    record=PracticeRecord.objects.get(sno=request.user.student,clspratice=clsPractice)
    errorinfo=json.loads(record.errorinfo)
    
    xzanswer=[]
    for xz in errorinfo['xz']:
        xzanswer.append(xz['answer'])
    
    choice_list=None
    fill_list=None
    judegement_list=None
    choices=None
    fills=None
    judgements=None
    if clsPractice.choice_id is not None:
        choice_list=clsPractice.choice_id.split(',')
        choices=Choice.objects.filter(id__in=choice_list)
    if clsPractice.fill_id is not None:
        fill_list=clsPractice.fill_id.split(',')
        fills=Fill.objects.filter(id__in=fill_list)
    if clsPractice.judgment_id is not None:
        judegement_list=clsPractice.judgment_id.split(',')
        judgements=Judge.objects.filter(id__in=judegement_list)
    zchoices=[]
    for i in range(len(choices)):
        temp={}
        temp['xzanswer']=xzanswer[i]
        temp['totpic']=choices[i].topic
        temp['optiona']=choices[i].optiona
        temp['optionb']=choices[i].optionb
        temp['optionc']=choices[i].optionc
        temp['optiond']=choices[i].optiond
        temp['optione']=choices[i].optione
        temp['analysis']=choices[i].analysis
        temp['knowledgepoint']=choices[i].knowledgepoint
         
        temp['correctanswer']=choices[i].correctanswer
        zchoices.append(temp)
        
#     for ch in choice_list:
#         record= PracticeRecord.objects.get()
#     for fill in fill_list:
#         pass
#     for judge in judegement_list:
#         pass
    context={'ptatices_choice':zchoices,
             'pratices_fill':fills,
             'pratices_judgement':judgements,
             'xzanswer':xzanswer}
    
    return render(request, 'cpis/studentresult.html', context=context)

def count(request):
    return HttpResponse('aaaa')
    

def _lxlr(request):
    '''系统录入返回所有课程的列表方便前端下拉框使用'''
    course=Course.objects.all()
    return {'course':course}

def _lxgl(request):
    '''练习管理:返回教师录入的所有练习信息列表'''
    clsPractice = ClsPractice.objects.filter(teacher=request.user.teacher)
    practices=[]
    for item in clsPractice:
        pratice={}
        pratice['id']=item.id
        pratice['course']=item.course.cname
        pratice['chapter']=item.chapter
        if PubPractice.objects.filter(clspractice=item):
            pratice['stats']=True
        else:
            pratice['stats']=False
        try:
            pp=PubPractice.objects.get(clspractice=item)
            if pp is not None:
                forclasslist=pp.forclass[:-1].split(',')
                cnames=''
                for i in forclasslist:
                    cname=Clazz.objects.get(id=i).scname
                    cnames=cnames+cname+","
            pratice['forclass']=cnames[:-1]
        except Exception,e:
            print e
        
        practices.append(pratice)
    
    teacher=request.user.teacher
    clzzs=teacher.ct.all()
    context={'practices':practices,'clzzs':clzzs}
    return context

def _praticedetail(request):
    id=request.GET.get('id')
    clsPractice=get_object_or_404(ClsPractice,id=id)
    
    choice_list=None
    fill_list=None
    judegement_list=None
    choices=None
    fills=None
    judgements=None
    if clsPractice.choice_id is not None:
        choice_list=clsPractice.choice_id.split(',')
        choices=Choice.objects.filter(id__in=choice_list)
    if clsPractice.fill_id is not None:
        fill_list=clsPractice.fill_id.split(',')
        fills=Fill.objects.filter(id__in=fill_list)
    if clsPractice.judgment_id is not None:
        judegement_list=clsPractice.judgment_id.split(',')
        judgements=Judge.objects.filter(id__in=judegement_list)

    context={'ptatices_choice':choices,
             'pratices_fill':fills,
             'pratices_judgement':judgements}
    return context

def _sjtj(request):
    return {}
def _grzl(request):
    return {}
def _xgmm(request):
    return {}

