/**
 * Created by kk on 15-8-20.
 */

function add_csrf_token(data) {
    var csrf = getCookie('csrftoken');
    data['csrfmiddlewaretoken'] = csrf;
    return data
}

function modify_managed_ns_name(id){
    var managed_ns_name_id = id;
    var csrf = getCookie('csrftoken');
    $("#id").val(id);
    $.ajax({
        type: "POST",
        url: "/admin/save_modify_managed_ns_name",
        dataType: "json",
        data: {
            "id": managed_ns_name_id,
            "csrfmiddlewaretoken": csrf
        },
        success: function (msg) {
            if (msg.success == "true") {
                $("#name_server_ip1").val(msg.ip1);
                $("#name_server_id1").val(msg.id1);
                $("#name_server_host_name1").val(msg.host1);
                $("#name_server_ip2").val(msg.ip2);
                $("#name_server_id2").val(msg.id2);
                $("#name_server_host_name2").val(msg.host2);
                $("#name_server_ip3").val(msg.ip3);
                $("#name_server_id3").val(msg.id3);
                $("#name_server_host_name3").val(msg.host3);
                $("#name_server_ip4").val(msg.ip4);
                $("#name_server_id4").val(msg.id4);
                $("#name_server_host_name4").val(msg.host4);
            }
        }
    })
}

function area_find(host,line){
    var url = '?name='+host+'&'+'line_type=' + line;
    $("#area_find_a").attr("href",url);
    $("#host_record").val(host);
    $("#area").val(line).attr("select", "true");
}

function a_find(service_target){
        var url = '?service_target='+service_target;
        $("#a_find").attr("href",url);
        //$("#a_record").val(service_target).attr("select", "true");
}

function query_name(e){
    var url;
    var monitor_level = $('#monitor_level').val();
    var zone_id = $('#zone_id').val();
    var monitor_domain_zone = $("#monitor_domain_zone").val();
    if (zone_id){
        url = "/admin/monitor/query_domain_zone/"+ zone_id;
    }else{
        url = "/admin/monitor/query_domain_zone/"+ monitor_domain_zone;
    }
    if(!zone_id.length && !monitor_domain_zone.length){
        return;
    }
    $("#domain_name_ip").empty();
    $.ajax({
        url: url,
        dataType:'json',
        data: add_csrf_token({"monitor_level": monitor_level}),
        success: function(e){
            if (monitor_level == 'dname'){
                $("#domain_names").empty();
                for (var i in e){
                    var option = $('<option value='+ e[i]+ '>' + e[i] +'</option>');
                    $('#domain_names').append(option);
                }
            }else{
                $("#domain_names").empty();
                for (var k in e){
                    var opt = $('<option value='+ k + '>' + k + '-' + e[k] +'</option>');
                    $('#domain_names').append(opt);
                }
            }
            query_a(null);
        }
    })
}

function query_a(e){
    var url;
    var monitor_level = $('#monitor_level').val();
    var zone_id = $('#zone_id').val();
    var domain_name = $('#domain_names').val();
    if (zone_id && domain_name){
        url = "/admin/monitor/query_domain_zone/"+ zone_id + "/" + domain_name;
    }
    if(!zone_id.length && !domain_name.length){
        //alert('请选择监控域名!');
        return;
    }
    $("#domain_name_ip").empty();
    $.ajax({
        url: url,
        dataType:'json',
        data: add_csrf_token({"monitor_level": monitor_level, "domain_name": domain_name}),
        success: function(e){
            if(monitor_level == 'dname'){
                $("#domain_name_ip").empty();
                for(var i in e){
                    $("#domain_name_ip").append('<option value=' + e[i] +'>' + e[i] + '</option>');
                }
                $("#domain_name_ip").multiselect("rebuild");
            }else{
                $("#domain_name_ip").empty();
                $("#domain_name_ip").append('<option value=' + e + '>' + e + '</option>');
                $("#domain_name_ip").multiselect("rebuild");
            }
        }
    })
}

function validate_domain_name_exist(e){
    var value = $(e).val();
    if (value == 0){
        return false
    }
    return value != "";
}

function validate_domain_name_host_record(e){
    var reg = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}$/;
    var value = $(e).val();
    if(value.length == 0){
        return true
    }
    if (value.length >252){
        return false
    }

    var parts = value.split(".");
    var li = value.split('');
    if (li.indexOf('*') != -1){
        if (parts[0] != '*'){
            return false
        }else{
            for (var w = 1; w < parts.length; w++){
                if (1 > parts[w].length || parts[w].length > 62){
                        return false
                }else if(!reg.test(parts[w])){
                    return false
                }
            }
            return true
        }
    }else if (value != '@'){
        for ( var i = 0;i<parts.length;i++){
            if (1 > parts[i].length || parts[i].length >62){
                return false
            }else{
                if (!validate_regexp_host_record(parts[i], reg)){
                    return false
                }
            }
        }
        return true
    }
    return true

}

function validate_regexp_host_record(e,regex){
    //var value = $(e).val();
    return regex.test(e);

}
function validate_ratio(e){
    //return validate_regexp(e,/^[0-9]+$/)
    return validate_regexp(e,/^([1-9]|[1-9]\d|100)$/)
}

function validate_regexp(e,regex){
    var value = $(e).val();
    return regex.test(value)
}

function validate_domain_name_r(e, r){
    if ($(e).val() == "A"){
        var value = $(r).val();
        var parts = value.split(".");
        if (parts.length !=4){
            return false
        }
    try {
        for (var part = 0; part < parts.length; part++) {
            var ipart = parseInt(parts[part]);
            if (ipart < 0 || ipart > 255)
            {
                return false;
            }

        }
        return true;
        }

    catch(error)
        {
        return false;
        }
    }
    else if($(e).val() == "CNAME"){
        var value = $(r).val();
        if (value.length >191){
            return false
        }
        var parts = value.split(".");
        if (parts.length >127){
            return false
        }
        for ( var i = 0;i<parts.length;i++){
            if (parts[i].length >62){
                return false
            }
            var ipart = parseInt(parts[i]);
                if (ipart < 0 || ipart > 255)
                {
                    return false;
                }
            if (!validate_regexp_host_record(parts[i],/^[A-Za-z0-9_]+[A-Za-z0-9_-]*$/)){
                return false
            }
            return true
        }
        }
    else if($(e).val() == "TXT"){
        var value = $(r).val();
        if(value.length >200){
            return false
        }
        if(!validate_regexp_host_record(value, /^[^\^"]+$/)){
            return false
        }
        return true
        }
    else if($(e).val() == "MX"){
        var value = $(r).val();
        var parts = value.split(" ");
        for(var i =0;i<parts.length;i++){
            if(parts[i].length>0 && !isNaN(parts[i])){
                if (parts[i] > 65535 || parts[i] <0){
                    return false
                }
                return true
            }
        }
    }
    else{
        return true
    }

}

function validate_domain_name(host, type, r, ttl, ratio){
    var validate_results = [
        [validate_domain_name_host_record(host),"请输入正确的主机名！"],
        [validate_domain_name_exist(type),"请输入记录类型！"],
        [validate_domain_name_r(type,r),"请输入正确的记录值！!"],
        [validate_domain_name_exist(ttl),"请输入ttl值,ttl值不能为０！"],
        [validate_ratio(ratio),"请输入ratio值,ratio值为1-100之间的整数！！"]
    ];
    for (var i in validate_results){
        if(!validate_results[i][0]){
            alert(validate_results[i][1]);
            return false;
        }
    }
    return true;
}

function ma_name_server(id){
    var checkbox = $(".checkbox");
    var name_server_id = $(".name_server_id");
    var name_server_ip = $(".name_server_ip");
    var csrf = getCookie('csrftoken');
    $.ajax({
        type: "POST",
        url: "/admin/save_modify_managed_ns_name",
        dataType: "json",
        data: {
            "id": id,
            "csrfmiddlewaretoken": csrf
        },
        success: function (msg) {
            if (msg.success == "true") {
                var ip_address = [];
                ip_address[0] = msg.ip_address1;
                ip_address[1] = msg.ip_address2;
                ip_address[2] = msg.ip_address3;
                ip_address[3] = msg.ip_address4;
                for(var i =0;i<checkbox.length;i++){
                if(checkbox[i].checked){
                    name_server_ip[i].value=ip_address[i];
                    }
                }
            }
        }
    })
}

/* Disable all buttons */
function disable_buttons() {
    start_loading();
    $(".btn").each(function() {
        $(this).addClass("disabled");
        $(this)[0].disabled = true;
    });
}

function enable_buttons() {
    end_loading();
    $(".btn").each(function() {
        $(this).removeClass("disabled");
        $(this)[0].disabled = false;
    });
}

function start_loading() {
    $(".loading").show();
}

function end_loading() {
    $(".loading").hide();
}
