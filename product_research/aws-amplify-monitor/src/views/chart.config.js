export const visitorOptions = {
    backgroundColor:'rgba(13, 12, 79, 1)',
    "xAxis": {
        "boundaryGap": true,
        "data": [],
        "axisLabel": {
            "show": true,
            "color": "#ADC6FF",
            "fontFamily": "PingFang SC",
            "fontSize": 12,
            "rotate": 0
        },
        "axisLine": {
            "show": true,
            "lineStyle": {
                "color": "rgba(133, 165, 255, 0.2)",
                "width": 1,
                "type": "solid"
            }
        },
        "axisTick": {
            "show": false,

        },
        "splitLine": {
            "show": false,

        }
    },
    "yAxis": [
        {
            "type": "value",
            "axisLabel": {
                "show": true,
                "color": "#ADC6FF",
                "fontFamily": "PingFang SC",
                "fontSize": 12
            },
            "axisLine": {
                "show": false,

            },
            "axisTick": {
                "show": false,
            },
            "nameTextStyle": {
                "color": "#666",
                "fontFamily": "PingFang SC",
                "fontSize": 12
            },
            "splitLine": {
                "show": true,
                "lineStyle": {
                    "color": "rgba(133, 165, 255, 0.2)",
                    "width": 1,
                }
            }
        },
        {
            "type": "value",

            "axisLabel": {
                "show": true,
                "color": "#D9F7BE",
                "fontFamily": "PingFang SC",
                "fontSize": 12
            },
            "axisLine": {
                "show": false,

            },
            "axisTick": {
                "show": false,
            },
            "nameTextStyle": {
                "color": "#666",
                "fontFamily": "PingFang SC",
                "fontSize": 12
            },
            "splitLine": {
                "show": false,

            }
        }
    ],
    "series": [{
        "name": "electric",
        "type": "line",
        "sampling": "average",
        "data": [{
            "value": 491
        }, {
            "value": 345
        }, {
            "value": 455
        }, {
            "value": 208
        }, {
            "value": 314
        }, {
            "value": 172
        }, {
            "value": 225
        }, {
            "value": 105
        }, {
            "value": 312
        }, {
            "value": 389
        }, {
            "value": 114
        }, {
            "value": 422
        }],
        "itemStyle": {
            "normal": {
                "color": "#509af2",
                "opacity": 1
            }
        },
        "smooth": true,
        "step": false,
        "label": {
            "normal": {
                "show": false,
                "position": "top",
                "distance": 15,
                "color": " #D6E4FF",
                "fontFamily": "PingFang SC",
                "fontSize": "12"
            }
        }
    }, {
        "name": "water",
        "type": "line",
        "sampling": "average",
        yAxisIndex: 1,
        "data": [{
            "value": 152
        }, {
            "value": 147
        }, {
            "value": 138
        }, {
            "value": 233
        }, {
            "value": 181
        }, {
            "value": 256
        }, {
            "value": 198
        }, {
            "value": 188
        }, {
            "value": 103
        }, {
            "value": 296
        }, {
            "value": 144
        }, {
            "value": 293
        }],
        "itemStyle": {
            "normal": {
                "color": "#D9F7BE",
                "opacity": 1
            }
        },
        "smooth": true,
        "step": false,
        "label": {
            "normal": {
                "show": false,
                "position": "top",
                "distance": 15,
                "color": " #D6E4FF",
                "fontFamily": "PingFang SC",
                "fontSize": "12"
            }
        }
    }],
    "tooltip": {},
    "legend": {
        "show": false,
        "data": ["electric", "water"],
        "itemGap": 10,
        "itemWidth": 25,
        "itemHeight": 14,
        "textStyle": {
            "fontFamily": "PingFang SC",
            "fontSize": "12",
            "color": "#666"
        },
        "orient": "horizontal",
        "top": 8,
        "left": 8,
        "right": 8,
        "height": 32,
        "selected": {
            "electric": true,
            "water": true
        }
    },
    "grid": {
        top: 40,
        bottom: 30,
        "right": 64,
        "left": 64
    }
}