$("#portal_change_password_form").submit(function(){
    var instance = $('#portal_change_password_form').parsley();
    if(instance.isValid() == true){
        var new_password = $("#new_password").val();
        var old_password = $("#old_password").val();
        var input_id = "old_password";
        $.ajax({
            url: "/portal/user/change_password",
            data: add_csrf_token({'old_password': old_password, 'new_password': new_password}),
            dataType: 'json',
            type: 'POST',
            statusCode: {
                200: function(data){
                    window.location.href = data.url
                },
                400: function(data){
                    form_error_messages(data, input_id)
                },
                403: function(data){
                    form_error_messages(data, input_id)
                },
                404: function(data){
                    form_error_messages(data, input_id)
                }
            }
        });
    }
    return false
});