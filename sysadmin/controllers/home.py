# coding:utf-8
from django.shortcuts import render, redirect
from django.contrib import messages

from sysadmin import models
from sysadmin.controllers.classify import classify
from sysadmin.models import User
from sysadmin.controllers import my_tree


def login(request):
    return render(request, 'psychology/home/login.html')


def do_login(request):
    if request.method == "GET":
        return render(request, 'psychology/home/login.html')
    if request.method == "POST":
        username = request.POST.get('user')
        password = request.POST.get('password')
        user = User.objects.filter(name=username).first()
        if user:
            print(user.password, password)
            if user.password == password:
                return redirect('/sys/a/')
            messages.warning(request, u'密码错误,请输入正确的密码')
            return redirect('/sys/login/')
        messages.warning(request, u'帐号不存在!')
        return redirect('/sys/login/')
    return redirect('/sys/login/')


def regist(request):
    return render(request, 'psychology/home/regist.html')


def do_regist(request):
    if request.method == "POST":
        username = request.POST['user']
        us = User.objects.filter(name=username).count()
        if us < 1 :
            password = request.POST['password']
            user = User(name=username, password=password)
            user.save()
            return redirect('/sys/a/')
        return redirect('/sys/a/')
    return render(request, 'psychology/home/regist.html')


def a(request):
    return render(request, 'psychology/a.html')


def b(request):
    return render(request, './psychology/result.html')


def get_result(request):
    labels = ['somatization', 'compulsive', 'IS', 'depressed', 'anxiety', 'hostility', 'terror', 'stubborn', 'PD',
              'other']
    labels_size = [12, 10, 9, 13, 10, 6, 7, 6, 6, 7]
    label_lenth = len(labels)
    labels_level = []
    for i in range(label_lenth):
        sum = 0
        for question_num in range(1, labels_size[i]+1):
            sum += int(str(request.POST['{label}_{num}'.format(label=labels[i], num=str(question_num))]))
        print(sum)
        print(labels_size[i])
        if labels_size[i]*3 < sum <= labels_size[i]*4:
            labels_level.append('severe')
        elif labels_size[i]*2 < sum <= labels_size[i]*3:
            labels_level.append('moderate')
        elif labels_size[i] < sum <= labels_size[i]*2:
            labels_level.append('mild')
        elif 0 <= sum <= labels_size[i]:
            labels_level.append('health')
    print(len(labels_level))
    print(len(labels))
    class_level = get_c_level(labels_level, labels)
    context = {'A': "心理状况非常健康，请保持良好心态！", 'B': "心里稍微有点不平衡呢～，调整下心态吧",
               'C': "同学，情况有点不太对啊，和老师沟通一下吧！", 'D': "emmmmm.....,让你老师过来一下"}
    return render(request, 'psychology/result.html', {'class_level': class_level, 'context': context[class_level]})


def get_c_level(level_list, labels):
    class_label = classify(my_tree, labels, level_list)
    return class_label
