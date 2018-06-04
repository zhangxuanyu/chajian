var chart = Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: '月平均气温'
    },
    xAxis: {
        type: 'datetime',
        maxZoom:24 * 3600 * 1000,
        dateTimeLabelFormats: {
            hour: '%H:%M',
        },
        minTickInterval: 1800*1000,
    },
    yAxis: {
        labels: {
            align: 'left',
            x: 3,
            y: -2,
            format: 'B{value:.,0f}'
        },
        title: {
            text: null
        },
        showFirstLabel: false
    },
    tooltip: {
        shared: true,
        crosshairs: true,
        // 时间格式化字符
        // 默认会根据当前的数据点间隔取对应的值
        // 当前图表中数据点间隔为 1天，所以配置 day 值即可
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    // 数据点点击事件
                    // 其中 e 变量为事件对象，this 为当前数据点对象
                    click: function (e) {
                        $('.message').html( Highcharts.dateFormat( this.x) + ':<br/>  伦敦：' +this.y );
                    }
                }
            },
            marker: {
                lineWidth: 1
            }
        }
    },
    series: [{
        name: 'aa',
        data: [35454, 654165, 98494, 946884],
    }]
});
