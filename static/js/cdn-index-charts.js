(function(){
    var indexChart = function () {

    };
    $.extend(indexChart.prototype,{

        draw_chart: function(){

            Highcharts.setOptions({ global: { useUTC: false } });
            this.chart = new Highcharts.Chart({
                chart: {
                    type: 'line',
                    renderTo: 'index-traffic-map',
                    zoomType: "x"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: '带宽今日趋势图',
                    align: 'left',
                    margin: 50
                },
                subtitle: {
                    useHTML:true,
                    text: "<a href='/portal/flows' onclick='window.indexChart.defaultSubtitle()'>查看详情</a>",
                    align:'right',
                    verticalAlign:'top',
                    y:20,
                    x:-20
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        millisecond: '%H:%M:%S.%L',
                        second: '%H:%M:%S',
                        minute: '%H:%M',
                        hour: '%H:%M',
                        day: '%m月%e',
                        week: '%e. %b',
                        month: '%b \'%y',
                        year: '%Y'
                    },
                    labels: {
                        step: 0
                    }
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        formatter: function () {
                            return this.value + "Mbps";
                        }
                    },
                    title: {
                        text: '带宽 (Mbps)'
                    }
                },
                // { // Secondary yAxis
                //     linkedTo: 0,
                //     opposite: true,
                //     labels: {
                //         formatter: function () {
                //             return this.value + "MB";
                //         }
                //     },
                //     title: {
                //         text: '流量 (MB)'
                //     }
                // }
                ],
                tooltip: {
                    shared: true,
                    borderRadius: 15
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        threshold: null
                    },
                    spline: {
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 3
                            }
                        }
                    }
                },

                series: [{
                    type: 'area',
                    name: '<b>带宽</b>',
                    data: [],
                    tooltip: {
                        xDateFormat: '<b>'+'日期:'+'%Y-%m-%d %H:%M'+'</b>',
                        valueSuffix: "Mbps"
                    },
                    marker:{
                        enabled: false
                        //symbol: 'circle',
                        //radius: 0,
                    }
                }
                ],
                navigation: {
                    menuItemStyle: {
                        fontSize: '10px'
                    }
                },
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 1000
                        }
                    }]
                }
            })
        },
        default: function(){
            var $this = this;
            var indexDatas={};
            var arr = [];
            $.ajax({
                url: "/portal/analyze/home_data",
                data: add_csrf_token({}),
                dataType: 'json',
                type: 'GET',
                statusCode: {
                    200: function(data){
                        indexDatas = data.data.data;
                        // $('#page-loader').removeClass('in').addClass('hide');
                        // console.log(indexDatas['data'])
                        $('#header-content ul>li').find('p').empty();
                        $('#header-content ul>li').eq(0).find('p').append(indexDatas.channel_count+'<span>个</span>');
                        $('#header-content ul>li').eq(2).find('p').append(((indexDatas.today_max_response_bandwith)/1000000).toFixed(2)+'<span>Mbps</span>');
                        $('#header-content ul>li').eq(1).find('p').append(((indexDatas.today_total_flow)/1024/1024/1024).toFixed(2)+'<span>GB</span>');
                        $('#header-content ul>li').eq(3).find('p').append(((indexDatas.today_total_pv)/10000).toFixed(2)+'<span>万次</span>');
                        $('#header-content ul>li').eq(4).find('p').append(indexDatas.today_hit_rate+'<span>%</span>');
                        for(var i in indexDatas['data']){
                            arr.push([(indexDatas['data'][i]['datetime'])*1000,Number(((indexDatas['data'][i]['response_bandwith'])/1000000).toFixed(2))])
                        }
                        $this.draw_chart();
                        $this.chart.series[0].setData(arr);
                    },
                    400: function(data){
                        form_error_messages(data)
                    },
                    403: function(data){
                        form_error_messages(data)
                    },
                    404: function(data){
                        form_error_messages(data)
                    }
                }
            });
        },
        flowsLeft: function(){
            var $this = this;
            $('#header-content ul li').on('click',function(){
                if($(this).index()===1 || $(this).index() ===2){
                    localStorage.setItem('index_key', $(this).index());
                }
                if($(this).index() ===4){
                    localStorage.setItem('index_key', $(this).index() - 1 );
                }
            })
        },
        defaultSubtitle: function(){
            localStorage.setItem('index_key', 2);
        },
        reque: function(params){
            // console.log('2222')
            this.chart.setSize(params,400);
        }
    });

    window.indexChart = new indexChart();
    window.indexChart.flowsLeft();
    window.onload = window.indexChart.default();
})(jQuery)