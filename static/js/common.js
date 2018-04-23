$(function(){
    $('#header-navbar > .nav-profile').mouseover(function () {
        $(this).find('ul').show()
    })
    $('#header-navbar > .nav-profile').mouseout(function () {
        $(this).find('ul').hide()
    })
    // $('#page-loader').removeClass('hide').addClass('in');
    $('#statisul li').on('click',function(){
        // alert($(this).index())
        localStorage.removeItem('index_key');
        // $('#page-loader').removeClass('hide').addClass('in');
    })
    function headerWidth() {
        var clentWidth = document.body.clientWidth || document.documentElement.clientWidth;
        var headerWidth = '';
        var minWidth = '';
        if ($('#page-container').hasClass('page-sidebar-minified')) {
            headerWidth = Number(clentWidth - 60);
            minWidth = Number(clentWidth - 100);
        } else {
            headerWidth = Number(clentWidth - 220);
            minWidth = Number(clentWidth - 260);
        }
        // window.indexChart.draw_chart.setSize(minWidth, 400);
        // window.indexChart.reque(minWidth);
        // if("undefined" != typeof window.indexChart){
        //     window.indexChart.default();
        // }
        // if("undefined" != typeof window.flowsChart){
        //     window.flowsChart.default();
        // }
        // if("undefined" != typeof window.flowsMiddleChart){
        //     window.flowsMiddleChart.default();
        // }
        $('#header-navbar').css('width', headerWidth + 'px');

    }
    headerWidth()
    $(window).resize(function () {
        headerWidth()
    });
})