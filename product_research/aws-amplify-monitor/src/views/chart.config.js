export const visitorOptions = {
    backgroundColor:'rgba(13, 12, 79, 1)',
    xAxis: {
        boundaryGap: true,
        data: [
          
        ],
        axisLabel: {
            show: true,
            color: 'rgba(214, 228, 255, 1)',
            fontFamily: 'PingFang SC',
            fontSize: 12,
            rotate: 0,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: 'rgba(214, 228, 255, 0.1)',
                width: 1,
                type: 'solid',
            },
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: '#D9D9D9',
                width: 1,
                type: 'dashed',
            },
        },
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            color: 'rgba(214, 228, 255, 1)',
            fontFamily: 'PingFang SC',
            fontSize: 12,
        },
        axisLine: {
            show: false,
          
        },
        axisTick: {
            show: false,
          
        },
        name: '',
        nameLocation: 'middle',
        nameGap: 40,
        nameRotate: 90,
        nameTextStyle: {
            color: '#666',
            fontFamily: 'PingFang SC',
            fontSize: 12,
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: 'rgba(214, 228, 255, 0.1)',
                width: 1,
                type: 'solid',
            },
        },
    },
    series: [{
        name: 'value',
        type: 'line',
        sampling: 'average',
        "data": [],
        itemStyle: {
            normal: {
                color: 'rgba(145,176,240,1)',
                opacity: 1,
            },
        },
        smooth: true,
        step: false,
        label: {
            normal: {
                show: true,
                position: 'top',
                distance: 15,
                color: 'rgba(214, 228, 255, 1)',
                fontFamily: 'PingFang SC',
                fontSize: '12',
            },
        },
    },],
    tooltip: {},
    legend: {
        show: false,
        data: ['value'],
        itemGap: 10,
        itemWidth: 25,
        itemHeight: 14,
        textStyle: {
            fontFamily: 'PingFang SC',
            fontSize: '12',
            color: '#666',
        },
        orient: 'horizontal',
        top: 8,
        left: 8,
        right: 8,
        height: 32,
        selected: {
            value: true,
        },
    },
    grid: {
        top:34,
        right: 34,
        left: 74,
        bottom:30,
    },
}