$(':submit').attr("disabled",false);
function edit_input_color(id, level){
    if(level == 'error'){
        $("#" + id).addclass("has-error");
    }
    if(level == 'success'){
        $("#" + id).addclass("has-success");
    }
    if(level == 'warning'){
        $("#" + id).addclass("has-warning");
    }
}

function get_csrf_token() {
    return $("input[name='csrfmiddlewaretoken']").val();
}

function add_csrf_token(data) {
    data["csrfmiddlewaretoken"] = get_csrf_token();
    return data;
}

function form_error_messages(data, input_id){
    var error_messages_json = $.parseJSON(data.responseText);
    var error_messages = error_messages_json.error;
    var error_input_id = error_messages_json.input_id;
    if(input_id != undefined && input_id != null && input_id != ''){
        input_id = input_id
    }else{
        input_id = error_input_id
    }
    $("#"+input_id).parsley().destroy();
    $("li[class^='parsley-'][class$='-custom']").html(" ");
    field_instance = $("#"+input_id).parsley();
    error_input_name = input_id + "-custom";
    $(':submit').attr("disabled",false);
    window.ParsleyUI.removeError(field_instance, error_input_name);
    window.ParsleyUI.addError(field_instance, error_input_name, I18N.t(error_messages));
}


function input_error_messages(error_messages, input_id){
    $("#"+input_id).parsley().destroy();
    field_instance = $("#"+input_id).parsley();
    error_input_name = input_id + "-custom";
    window.ParsleyUI.removeError(field_instance, error_input_name);
    window.ParsleyUI.addError(field_instance, error_input_name, error_messages);
}


function get_selected_value(){
    selected_value_list = [];
    $("tr.selected").each(function(){
        selected_value_list.push($(this).find("td a").data('id'))
    });
    return selected_value_list.join(",");
}


function dump(obj) {
    var msg = "";
    for(var key in obj) {
        msg += key + ":" + obj + "\n";
    }
    alert(msg);
}

function validateIP(ip) {
	if(ip == "") {
        input_error_messages(I18N.t("Please enter the IP address!"), 'ip-address');
		return false;
	}
	var nums = ip.split(".");
	if(nums.length != 4) {
        input_error_messages(I18N.t("Is not the IP address you entered!"), 'ip-address');
		return false;
	}
	for(var i = 0; i < 4; i++) {
		if((nums[i] - 0) > 255) {
			input_error_messages(I18N.t("Is not the IP address you entered!"), 'ip-address');
			return false;
		}
	}
	return true;
}

function assignIP(form, ipElem, onSuccess) {
	var form = $(form);
	var url = form.attr("action");
	var ip = $(ipElem).val();

	if(!validateIP(ip)) {
		return false;
	}
	var data = {
		"assign_ip": ip
	};
	$.post(url, add_csrf_token(data), function(response) {
		if($.trim(response) == "OK") {
			onSuccess();
            $(".parsley-ip-address-custom").html(" ")
		} else {
            input_error_messages(response, 'ip-address')
		}
	});
	return false;
}

function logout(elem) {
    var url = $(elem).data("url");
    window.location = url;
}

function releaseIP(elem, onSuccess) {
	url = $(elem).attr("href");
	$.get(url, function(response) {
		onSuccess();
	});
	return false;
}

function select_all(id){
  $("#" + id + " :checkbox").prop("checked", true);
}

function no_select_all(id){
  $("#" + id + " :checkbox").prop("checked", false);
}

function reverse_select(id){
  $("#" + id + " input:checkbox").each(function () {
    this.checked = !this.checked;
  })
}


function datatable_stop_propagation(table, table_id){
    table.on('draw.dt', function() {
        stop_propagation(table_id)
    })
}


function stop_propagation(table_id){
    $("#"+ table_id +" a").each(function() {
      $(this).on("click", function(event) {
          event.stopPropagation();
      });
    });
}


var ipv4 = '\\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])' +
    '\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\b';
var ipv6 = '^\\s*((([0-9A-Fa-f]{1,4}:){7}(([0-9A-Fa-f]{1,4})|:))|(([0-9A-Fa-f]{1,4}:){6}(:|((25[0-5]|2[0-4]\\d|[01]?' +
    '\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})|(:[0-9A-Fa-f]{1,4})))|(([0-9A-Fa-f]{1,4}:){5}((:((25[0-5]|2[0-4]' +
    '\\d|[01]?\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){4}' +
    '(:[0-9A-Fa-f]{1,4}){0,1}((:((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})?)|' +
    '((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){3}(:[0-9A-Fa-f]{1,4}){0,2}((:((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})' +
    '(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(([0-9A-Fa-f]{1,4}:){2}(:[0-9A-Fa-f]{1,4})' +
    '{0,3}((:((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|' +
    '(([0-9A-Fa-f]{1,4}:)(:[0-9A-Fa-f]{1,4}){0,4}((:((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})(\\.(25[0-5]|2[0-4]\\d|[01]?' +
    '\\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(:(:[0-9A-Fa-f]{1,4}){0,5}((:((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})' +
    '(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})?)|((:[0-9A-Fa-f]{1,4}){1,2})))|(((25[0-5]|2[0-4]\\d|[01]?\\d{1,2})' +
    '(\\.(25[0-5]|2[0-4]\\d|[01]?\\d{1,2})){3})))(%.+)?\\s*$';
var re_ipv4_ipv6 = ipv4 + '|' + ipv6;


function error_alert(data){
    // $('#error_message_alert').removeClass('in');
    $('#error_message_alert').css('z-index', 9999);
    // alert()
    // var error_messages = $.parseJSON(data.responseText);
    // var error_messages = error_messages.message;
    $("#error_message").html(data);
    $('#error_message_alert').addClass('in');
    setTimeout("$('#error_message_alert').removeClass('in'); $('#error_message_alert').css('z-index', '-1')",3000);
    return false
}


function click_button(url, param, message){
    // param  dict
    if(param == '' || param == null || param == undefined){
        param = {}
    }
    var confirm_is = true;
    if(message == '' || message == null || message == undefined){
        confirm_is = false;
        message = ''
    }
    var is_submit = true;
    if(confirm_is == true){
        if(confirm(I18N.t(I18N.t(message)))){
            is_submit = true
        }else{
            is_submit = false
        }
    }
    if(is_submit == true){
        $.ajax({
            url: url,
            data: add_csrf_token(param),
            type: 'POST',
            statusCode: {
                200: function (data) {
                    response = true;
                    window.location.href = data.url
                },
                400: function (data) {
                    error_alert(data)
                },
                403: function (data) {
                    error_alert(data)
                },
                404: function (data) {
                    error_alert(data)
                }
            }
        });
    }
}

function get_production_status(){
    $("tr.selected").each(function(){
        status = $(this).find("td a").data('status')
    });
    return status
}


function set_tags(html_product_id, set_tag_url){
    var product_id = get_selected_value();
    if(product_id == '' || product_id == null || product_id == undefined){
        product_id = $("#" + html_product_id).val()
    }

    if(product_id == '' || product_id == null || product_id == undefined){
        return false
    }

    $("#set_tags_product_id").val(product_id);
    $("#set_tags_title").html(I18N.t("Set Tag"));
    $('#set_tags_form')[0].reset();
    $("#set_tags_url").val(set_tag_url);
    $('#set_tags').modal('show');
    return false
}

$("#set_tags_form").submit(function(){
    var product = $("#set_tags_product_id").val();
    var tag_name = $('#tag_name').val();
    var response = false;
    var instance = $('#set_tags_form').parsley();
    var url = $("#set_tags_url").val();
    if(instance.isValid() == true) {
        $.ajax({
            url: url,
            data: add_csrf_token({'product': product, 'tag_name': tag_name}),
            dataType: 'json',
            type: 'POST',
            statusCode: {
                200: function (data) {
                    response = true;
                    window.location.href = data.url
                },
                400: function (data) {
                    error_alert(data)
                },
                403: function (data) {
                    error_alert(data)
                },
                404: function (data) {
                    error_alert(data)
                }
            }
        });
        return response
    }
    return false
});


$("#add_security_group_form").submit(function(){
    var response = false;
    var instance = $('#add_security_group_form').parsley();
    var url = $("#add_security_group_url").val();
    if(instance.isValid() == true) {
        $.ajax({
            url: url,
            data: add_csrf_token($('#add_security_group_form').serialize()),
            dataType: 'json',
            type: 'POST',
            statusCode: {
                200: function (data) {
                    response = true;
                    window.location.href = data.url
                },
                400: function (data) {
                    error_alert(data)
                },
                403: function (data) {
                    error_alert(data)
                },
                404: function (data) {
                    error_alert(data)
                }
            }
        });
        return response
    }
    return false
});


function join_network(html_product_id, set_tag_url){
    var product_id = get_selected_value();
    if(product_id == '' || product_id == null || product_id == undefined){
        product_id = $("#" + html_product_id).val()
    }
    $("#product_id").val(product_id);
    $('#join_network_form')[0].reset();
    $("#join_network_url").val(set_tag_url);
    $('#join_network').modal('show')
}

$("#join_network_form").submit(function(){
    var instance = $('#join_network_form').parsley();
    var url = $("#join_network_url").val();
    if(instance.isValid() == true) {
        $.ajax({
            url: url,
            data: add_csrf_token($('#join_network_form').serialize()),
            dataType: 'json',
            type: 'POST',
            statusCode: {
                200: function (data) {
                    window.location.href = data.url
                },
                400: function (data) {
                    error_alert(data)
                },
                403: function (data) {
                    error_alert(data)
                },
                404: function (data) {
                    error_alert(data)
                }
            }
        });
        return false
    }
    return false
});


function opertaion_snapshot(url, message){
    click_button(url, '', message);
    return false
}


function leave_private_network(url, id, network_id){
    var response = false;
    if(confirm(I18N.t("Are you sure you want to leave the private network?"))){
        $.ajax({
            url: url + '/' + id + '/' + network_id,
            data: add_csrf_token({}),
            type: 'POST',
            statusCode: {
                200: function(data){
                    response = true;
                    window.location.reload()
                },
                400: function (data) {
                    error_alert(data)
                },
                403: function (data) {
                    error_alert(data)
                },
                404: function (data) {
                    error_alert(data)
                }
            }
        });
    }
    return false
}

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