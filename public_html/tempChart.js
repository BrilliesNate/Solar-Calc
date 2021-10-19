am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv3", am4charts.RadarChart);
    chart.innerRadius = am4core.percent(30);
    chart.fontSize = 11;

    var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.renderer.minGridDistance = 5;

    xAxis.renderer.labels.template.location = 0.5;
    xAxis.renderer.labels.template.bent = true;
    xAxis.renderer.labels.template.radius = 5;

    xAxis.dataFields.category = "hour";
    yAxis.dataFields.category = "weekday";

    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 10;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;

    // this makes the y axis labels to be bent. By default y Axis labels are regular AxisLabels, so we replace them with AxisLabelCircular
    // and call fixPosition for them to be bent
    var yAxisLabel = new am4charts.AxisLabelCircular();
    yAxisLabel.bent = true;
    yAxisLabel.events.on("validated", function (event) {
        event.target.fixPosition(-90, am4core.math.getDistance({ x: event.target.pixelX, y: event.target.pixelY }) - 5);
        event.target.dx = -event.target.pixelX;
        event.target.dy = -event.target.pixelY;
    })
    yAxis.renderer.labels.template = yAxisLabel;

    var series = chart.series.push(new am4charts.RadarColumnSeries());
    series.dataFields.categoryX = "hour";
    series.dataFields.categoryY = "weekday";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#ffffff");
    columnTemplate.tooltipText = "{weekday}, {hour}: {value.workingValue.formatNumber('#.')}°C";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);

    chart.seriesContainer.zIndex = -5;

    columnTemplate.hiddenState.properties.opacity = 0;

    // heat rule, this makes columns to change color depending on value
    series.heatRules.push({ target: columnTemplate, property: "fill", min: am4core.color("#00CBFE"), max: am4core.color("#fe131a") });

    // heat legend

    var heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
    heatLegend.width = am4core.percent(100);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // heat legend behavior
    series.columns.template.events.on("over", function (event) {
        handleHover(event.target);
    })

    series.columns.template.events.on("hit", function (event) {
        handleHover(event.target);
    })

    function handleHover(column) {
        if (!isNaN(column.dataItem.value)) {
            heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
        }
        else {
            heatLegend.valueAxis.hideTooltip();
        }
    }

    series.columns.template.events.on("out", function (event) {
        heatLegend.valueAxis.hideTooltip();
    })

    chart.data = [
        {
            "hour": "12pm",
            "weekday": "Sunday",
            "value": 28 
        },
        {
            "hour": "1am",
            "weekday": "Sunday",
            "value": 25
        },
        {
            "hour": "2am",
            "weekday": "Sunday",
            "value": 23
        },
        {
            "hour": "3am",
            "weekday": "Sunday",
            "value": 22
        },
        {
            "hour": "4am",
            "weekday": "Sunday",
            "value": 23
        },
        {
            "hour": "5am",
            "weekday": "Sunday",
            "value": 20
        },
        {
            "hour": "6am",
            "weekday": "Sunday",
            "value": 21
        },
        {
            "hour": "7am",
            "weekday": "Sunday",
            "value": 22
        },
        {
            "hour": "8am",
            "weekday": "Sunday",
            "value": 24
        },
        {
            "hour": "9am",
            "weekday": "Sunday",
            "value": 27
        },
        {
            "hour": "10am",
            "weekday": "Sunday",
            "value": 29
        },
        {
            "hour": "11am",
            "weekday": "Sunday",
            "value": 30
        },
        {
            "hour": "12am",
            "weekday": "Sunday",
            "value": 31
        },
        {
            "hour": "1pm",
            "weekday": "Sunday",
            "value": 31
        },
        {
            "hour": "2pm",
            "weekday": "Sunday",
            "value": 33
        },
        {
            "hour": "3pm",
            "weekday": "Sunday",
            "value": 34
        },
        {
            "hour": "4pm",
            "weekday": "Sunday",
            "value": 37
        },
        {
            "hour": "5pm",
            "weekday": "Sunday",
            "value": 36
        },
        {
            "hour": "6pm",
            "weekday": "Sunday",
            "value": 33
        },
        {
            "hour": "7pm",
            "weekday": "Sunday",
            "value": 32
        },
        {
            "hour": "8pm",
            "weekday": "Sunday",
            "value": 32
        },
        {
            "hour": "9pm",
            "weekday": "Sunday",
            "value": 33
        },
        {
            "hour": "10pm",
            "weekday": "Sunday",
            "value": 34
        },
        {
            "hour": "11pm",
            "weekday": "Sunday",
            "value": 33
        },
        {
            "hour": "12pm",
            "weekday": "Monday",
            "value": 33
        },
        {
            "hour": "1am",
            "weekday": "Monday",
            "value": 27
        },
        {
            "hour": "2am",
            "weekday": "Monday",
            "value": 30
        },
        {
            "hour": "3am",
            "weekday": "Monday",
            "value": 38
        },
        {
            "hour": "4am",
            "weekday": "Monday",
            "value": 44
        },
        {
            "hour": "5am",
            "weekday": "Monday",
            "value": 39
        },
        {
            "hour": "6am",
            "weekday": "Monday",
            "value": 46 
        },
        {
            "hour": "7am",
            "weekday": "Monday",
            "value": 47
        },
        {
            "hour": "8am",
            "weekday": "Monday",
            "value": 37
        },
        {
            "hour": "9am",
            "weekday": "Monday",
            "value": 38
        },
        {
            "hour": "10am",
            "weekday": "Monday",
            "value": 42
        },
        {
            "hour": "11am",
            "weekday": "Monday",
            "value": 31
        },
        {
            "hour": "12am",
            "weekday": "Monday",
            "value": 31
        },
        {
            "hour": "1pm",
            "weekday": "Monday",
            "value": 49
        },
        {
            "hour": "2pm",
            "weekday": "Monday",
            "value": 40
        },
        {
            "hour": "3pm",
            "weekday": "Monday",
            "value": 39
        },
        {
            "hour": "4pm",
            "weekday": "Monday",
            "value": 49
        },
        {
            "hour": "5pm",
            "weekday": "Monday",
            "value": 32
        },
        {
            "hour": "6pm",
            "weekday": "Monday",
            "value": 33
        },
        {
            "hour": "7pm",
            "weekday": "Monday",
            "value": 20
        },
        {
            "hour": "8pm",
            "weekday": "Monday",
            "value": 25
        },
        {
            "hour": "9pm",
            "weekday": "Monday",
            "value": 23
        },
        {
            "hour": "10pm",
            "weekday": "Monday",
            "value": 24
        },
        {
            "hour": "11pm",
            "weekday": "Monday",
            "value": 25
        },
        {
            "hour": "12pm",
            "weekday": "Tuesday",
            "value": 26
        },
        {
            "hour": "1am",
            "weekday": "Tuesday",
            "value": 27
        },
        {
            "hour": "2am",
            "weekday": "Tuesday",
            "value": 28
        },
        {
            "hour": "3am",
            "weekday": "Tuesday",
            "value": 25
        },
        {
            "hour": "4am",
            "weekday": "Tuesday",
            "value": 24
        },
        {
            "hour": "5am",
            "weekday": "Tuesday",
            "value": 20
        },
        {
            "hour": "6am",
            "weekday": "Tuesday",
            "value": 19
        },
        {
            "hour": "7am",
            "weekday": "Tuesday",
            "value": 17
        },
        {
            "hour": "8am",
            "weekday": "Tuesday",
            "value": 16
        },
        {
            "hour": "9am",
            "weekday": "Tuesday",
            "value": 13
        },
        {
            "hour": "10am",
            "weekday": "Tuesday",
            "value": 12
        },
        {
            "hour": "11am",
            "weekday": "Tuesday",
            "value": 10
        },
        {
            "hour": "12am",
            "weekday": "Tuesday",
            "value": 9
        },
        {
            "hour": "1pm",
            "weekday": "Tuesday",
            "value": 9
        },
        {
            "hour": "2pm",
            "weekday": "Tuesday",
            "value": 9
        },
        {
            "hour": "3pm",
            "weekday": "Tuesday",
            "value": 9
        },
        {
            "hour": "4pm",
            "weekday": "Tuesday",
            "value": 7
        },
        {
            "hour": "5pm",
            "weekday": "Tuesday",
            "value": 7
        },
        {
            "hour": "6pm",
            "weekday": "Tuesday",
            "value": 7
        },
        {
            "hour": "7pm",
            "weekday": "Tuesday",
            "value": 8
        },
        {
            "hour": "8pm",
            "weekday": "Tuesday",
            "value": 9
        },
        {
            "hour": "9pm",
            "weekday": "Tuesday",
            "value": 10
        },
        {
            "hour": "10pm",
            "weekday": "Tuesday",
            "value": 16
        },
        {
            "hour": "11pm",
            "weekday": "Tuesday",
            "value": 21
        },
        {
            "hour": "12pm",
            "weekday": "Wednesday",
            "value": 28
        },
        {
            "hour": "1am",
            "weekday": "Wednesday",
            "value": 30
        },
        {
            "hour": "2am",
            "weekday": "Wednesday",
            "value": 35
        },
        {
            "hour": "3am",
            "weekday": "Wednesday",
            "value": 30
        },
        {
            "hour": "4am",
            "weekday": "Wednesday",
            "value": 26
        },
        {
            "hour": "5am",
            "weekday": "Wednesday",
            "value": 23
        },
        {
            "hour": "6am",
            "weekday": "Wednesday",
            "value": 20
        },
        {
            "hour": "7am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "8am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "9am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "10am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "11am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "12am",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "1pm",
            "weekday": "Wednesday",
            "value": 14
        },
        {
            "hour": "2pm",
            "weekday": "Wednesday",
            "value": 13
        },
        {
            "hour": "3pm",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "4pm",
            "weekday": "Wednesday",
            "value": 15
        },
        {
            "hour": "5pm",
            "weekday": "Wednesday",
            "value": 16
        },
        {
            "hour": "6pm",
            "weekday": "Wednesday",
            "value": 18
        },
        {
            "hour": "7pm",
            "weekday": "Wednesday",
            "value": 20
        },
        {
            "hour": "8pm",
            "weekday": "Wednesday",
            "value": 25
        },
        {
            "hour": "9pm",
            "weekday": "Wednesday",
            "value": 27
        },
        {
            "hour": "10pm",
            "weekday": "Wednesday",
            "value": 30
        },
        {
            "hour": "11pm",
            "weekday": "Wednesday",
            "value": 35
        },
        {
            "hour": "12pm",
            "weekday": "Thursday",
            "value": 39
        },
        {
            "hour": "1am",
            "weekday": "Thursday",
            "value": 40
        },
        {
            "hour": "2am",
            "weekday": "Thursday",
            "value": 41
        },
        {
            "hour": "3am",
            "weekday": "Thursday",
            "value": 40
        },
        {
            "hour": "4am",
            "weekday": "Thursday",
            "value": 38
        },
        {
            "hour": "5am",
            "weekday": "Thursday",
            "value": 36
        },
        {
            "hour": "6am",
            "weekday": "Thursday",
            "value": 30
        },
        {
            "hour": "7am",
            "weekday": "Thursday",
            "value": 28
        },
        {
            "hour": "8am",
            "weekday": "Thursday",
            "value": 20
        },
        {
            "hour": "9am",
            "weekday": "Thursday",
            "value": 19
        },
        {
            "hour": "10am",
            "weekday": "Thursday",
            "value": 19
        },
        {
            "hour": "11am",
            "weekday": "Thursday",
            "value": 19
        },
        {
            "hour": "12am",
            "weekday": "Thursday",
            "value": 18
        },
        {
            "hour": "1pm",
            "weekday": "Thursday",
            "value": 18
        },
        {
            "hour": "2pm",
            "weekday": "Thursday",
            "value": 18
        },
        {
            "hour": "3pm",
            "weekday": "Thursday",
            "value": 17
        },
        {
            "hour": "4pm",
            "weekday": "Thursday",
            "value": 17
        },
        {
            "hour": "5pm",
            "weekday": "Thursday",
            "value": 17
        },
        {
            "hour": "6pm",
            "weekday": "Thursday",
            "value": 18
        },
        {
            "hour": "7pm",
            "weekday": "Thursday",
            "value": 18
        },
        {
            "hour": "8pm",
            "weekday": "Thursday",
            "value": 22
        },
        {
            "hour": "9pm",
            "weekday": "Thursday",
            "value": 25
        },
        {
            "hour": "10pm",
            "weekday": "Thursday",
            "value": 28
        },
        {
            "hour": "11pm",
            "weekday": "Thursday",
            "value": 32
        },
        {
            "hour": "12pm",
            "weekday": "Friday",
            "value": 37
        },
        {
            "hour": "1am",
            "weekday": "Friday",
            "value": 38
        },
        {
            "hour": "2am",
            "weekday": "Friday",
            "value": 42
        },
        {
            "hour": "3am",
            "weekday": "Friday",
            "value": 40
        },
        {
            "hour": "4am",
            "weekday": "Friday",
            "value": 40
        },
        {
            "hour": "5am",
            "weekday": "Friday",
            "value": 37
        },
        {
            "hour": "6am",
            "weekday": "Friday",
            "value": 35
        },
        {
            "hour": "7am",
            "weekday": "Friday",
            "value": 28
        },
        {
            "hour": "8am",
            "weekday": "Friday",
            "value": 27
        },
        {
            "hour": "9am",
            "weekday": "Friday",
            "value": 25
        },
        {
            "hour": "10am",
            "weekday": "Friday",
            "value": 25
        },
        {
            "hour": "11am",
            "weekday": "Friday",
            "value": 23
        },
        {
            "hour": "12am",
            "weekday": "Friday",
            "value": 20
        },
        {
            "hour": "1pm",
            "weekday": "Friday",
            "value": 19
        },
        {
            "hour": "2pm",
            "weekday": "Friday",
            "value": 19
        },
        {
            "hour": "3pm",
            "weekday": "Friday",
            "value": 19
        },
        {
            "hour": "4pm",
            "weekday": "Friday",
            "value": 19
        },
        {
            "hour": "5pm",
            "weekday": "Friday",
            "value": 20
        },
        {
            "hour": "6pm",
            "weekday": "Friday",
            "value": 23
        },
        {
            "hour": "7pm",
            "weekday": "Friday",
            "value": 26
        },
        {
            "hour": "8pm",
            "weekday": "Friday",
            "value": 28
        },
        {
            "hour": "9pm",
            "weekday": "Friday",
            "value": 30
        },
        {
            "hour": "10pm",
            "weekday": "Friday",
            "value": 35
        },
        {
            "hour": "11pm",
            "weekday": "Friday",
            "value": 40
        },
        {
            "hour": "12pm",
            "weekday": "Saturday",
            "value": 43
        },
        {
            "hour": "1am",
            "weekday": "Saturday",
            "value": 47
        },
        {
            "hour": "2am",
            "weekday": "Saturday",
            "value": 49
        },
        {
            "hour": "3am",
            "weekday": "Saturday",
            "value": 47
        },
        {
            "hour": "4am",
            "weekday": "Saturday",
            "value": 44
        },
        {
            "hour": "5am",
            "weekday": "Saturday",
            "value": 42
        },
        {
            "hour": "6am",
            "weekday": "Saturday",
            "value": 37
        },
        {
            "hour": "7am",
            "weekday": "Saturday",
            "value": 35
        },
        {
            "hour": "8am",
            "weekday": "Saturday",
            "value": 30
        },
        {
            "hour": "9am",
            "weekday": "Saturday",
            "value": 29
        },
        {
            "hour": "10am",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "11am",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "12am",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "1pm",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "2pm",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "3pm",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "4pm",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "5pm",
            "weekday": "Saturday",
            "value": 25
        },
        {
            "hour": "6pm",
            "weekday": "Saturday",
            "value": 26
        },
        {
            "hour": "7pm",
            "weekday": "Saturday",
            "value": 28
        },
        {
            "hour": "8pm",
            "weekday": "Saturday",
            "value": 29
        },
        {
            "hour": "9pm",
            "weekday": "Saturday",
            "value": 30
        },
        {
            "hour": "10pm",
            "weekday": "Saturday",
            "value": 32
        },
        {
            "hour": "11pm",
            "weekday": "Saturday",
            "value": 33
        }

    ];

});