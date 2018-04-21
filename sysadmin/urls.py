from django.conf.urls import include, url
from controllers import home
from sysadmin.controllers import classify

urlpatterns = [
    url(r'^login/', home.login),
    url(r'^do_login/', home.do_login, name='do_login'),
    url(r'^regist/', home.regist),
    url(r'^do_regist/', home.do_regist),
    url(r'^a/', home.a),

    url(r'get_result/',home.get_result)
]