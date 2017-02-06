#-*-coding:utf-8-*-
from django.contrib import admin, auth

from cpis import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# Register your models here.
#class StudentProfilesAdmin(admin.ModelAdmin):
    #fields=[]
class ClazzAdmin(admin.ModelAdmin):
    list_display=('scname','description')

class CourseAdmin(admin.ModelAdmin):
    list_display=('cname','description')

class StudentInline(admin.StackedInline):
    model=models.Student
    can_delete=False
    verbose_name='学生'
    
class TeacherInline(admin.StackedInline):
    model=models.Student
    can_delete=False
    verbose_name='教师'
    
class UserAdmin(BaseUserAdmin):
    list_display=('username','first_name','is_staff')
    inlines=(StudentInline,TeacherInline,)


    
admin.site.register(models.Clazz,ClazzAdmin)
admin.site.register(models.Course,CourseAdmin)
admin.site.unregister(auth.models.User)
admin.site.register(auth.models.User, UserAdmin)
admin.site.register(models.Student)
admin.site.register(models.Teacher)
admin.site.register(models.C_T)
