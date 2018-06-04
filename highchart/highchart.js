var chart = Highcharts.chart('container', {
    chart: {
        type: 'line'
    },
    title: {
        text: '��ƽ������'
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
        // ʱ���ʽ���ַ�
        // Ĭ�ϻ���ݵ�ǰ�����ݵ���ȡ��Ӧ��ֵ
        // ��ǰͼ�������ݵ���Ϊ 1�죬�������� day ֵ����
    },
    plotOptions: {
        series: {
            cursor: 'pointer',
            point: {
                events: {
                    // ���ݵ����¼�
                    // ���� e ����Ϊ�¼�����this Ϊ��ǰ���ݵ����
                    click: function (e) {
                        $('.message').html( Highcharts.dateFormat( this.x) + ':<br/>  �׶أ�' +this.y );
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
