let solycChart = {

    dailyPerformanceArray: [],
    yearlyPerformanceArray: [],
    totalYield: {},


    calcButton: function (div) { //only creates button when called
        new uiObject(div, {
            title: 'calculate',
            type: 'button',
            label: 'Power',
            container: div,
            onChange: function () {
                console.log('Calc init');
                solycChart.onCalculate();
                solycChart.init();
                console.log('breeeeak');

            },
        })
    },

    addSeriesButton: function (div) { //only creates button when called
        new uiObject(div, {
            title: 'addSeries',
            type: 'button',
            label: 'Compare',
            onChange: function () {
                solycChart.onCalculate();
                ch.charts.dayChart.onAddSeries(solycChart.dailyPerformanceArray);
                ch.charts.yearChart.onAddSeries(solycChart.yearlyPerformanceArray);
            }
        })
    },

    latitudeTextInput: function (div) { //only creates button when called
        new uiObject(div, {
            title: 'latInputText',
            type: 'inputText',
            label: '',
            default: '-20.000000',
            id: 'latitude',
        })
    },

    longituteTextInput: function (div) {
        new uiObject(div, {
            title: 'longInputTExt',
            type: 'inputText',
            label: '',
            default: '20.000000',
            id: 'longitude',
        })
    },

    timeZone: function (div) {
        new uiObject(div, {
            title: 'tzInputText',
            type: 'inputText',
            label: '',
            default: '2',
            id: 'timeZone',
        })
    },

    solarArrSize: function (div) {
        new uiObject(div, {
            title: 'instSizeInputText',
            type: 'inputText',
            label: 'Installation Size: ',
            default: '1',
            id: 'installationSize',
        })
    },

    panelTilt: function (div) {
        new uiObject(div, {
            type: 'inputText',
            label: '',
            default: '0',
            id: 'panelElevation',
        })
    },

    rotation: function (div) {
        new uiObject(div, {
            type: 'inputText',
            label: '',
            default: '0',
            id: 'panelAzimuth',
        })
    },

    datePicker: function (div) {
        new uiObject(div, {
            title: 'date',
            type: 'date',
            label: 'Select Date:',
            default: '2020-01-17',
            id: 'date',
        })
    },


    onLoad: function () {
        let dailyDataPanel = document.createElement('div');
        dailyDataPanel.classList.add('top-ui-div');
        document.querySelector('body').appendChild(dailyDataPanel); //Choose parent div here

        let dailyData1 = document.createElement('div');
        dailyData1.classList.add('dailyData');
        document.querySelector('.top-ui-div').appendChild(dailyData1);
        let dailyData2 = document.createElement('div');
        dailyData2.classList.add('dailyData');
        document.querySelector('.top-ui-div').appendChild(dailyData2);
        let dailyData3 = document.createElement('div');
        dailyData3.classList.add('dailyData');
        document.querySelector('.top-ui-div').appendChild(dailyData3);

        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('dailyData');
        document.querySelector('.top-ui-div').appendChild(buttonsDiv);


        //place the UI components
        solycChart.datePicker(dailyData1);
        solycChart.latitudeTextInput(dailyData1);
        solycChart.longituteTextInput(dailyData1);
        solycChart.timeZone(dailyData1);
        solycChart.solarArrSize(dailyData1);
        solycChart.panelTilt(dailyData2);
        solycChart.rotation(dailyData2);
        solycChart.calcButton(buttonsDiv);
        solycChart.addSeriesButton(buttonsDiv);
    },

    init: function () {



        let yearlyDefConfig = {
            data: [],
            cursor: [{
                enabled: true
            }],

            hiddenState: {
                properties: {
                    opacity: 0
                }
            },

            xAxes: [{
                type: "DateAxis",
                dataFields: {
                    category: "day"
                },
                renderer: {
                    grid: {
                        disabled: true
                    }
                }
            }],

            yAxes: [{
                type: "ValueAxis",
                title: {
                    text: "Energy (kWh)",
                },
                min: 0,
                renderer: {
                    baseGrid: {
                        disabled: true
                    },
                    grid: {
                        strokeOpacity: 5
                    }
                }
            }],

            series: [{
                type: "LineSeries",
                dataFields: {
                    valueY: "energy",
                    dateX: "day"
                },
                tooltip: {
                    pointerOrientation: "vertical",
                },
                tooltipText: "{dateX}: [bold]{valueY.formatNumber('###.00')}[/] (kW)",
                strokeWidth: 4,
            }],

        };

        let dailyDefConfig = {
            data: [],
            cursor: [{
                enabled: true
            }],

            hiddenState: {
                properties: {
                    opacity: 0
                }
            },

            xAxes: [{
                type: "DateAxis",
                dataFields: {
                    date: "hour"
                },
                renderer: {
                    grid: {
                        disabled: true
                    }
                },
                baseInterval: {
                    timeUnit: "minute",
                    count: 6
                }
            }],

            yAxes: [{
                type: "ValueAxis",
                title: {
                    text: "Power (kW)",
                },
                min: 0,
                renderer: {
                    baseGrid: {
                        disabled: true
                    },
                    grid: {
                        strokeOpacity: 5
                    }
                }
            }],

            series: [{
                type: "LineSeries",
                dataFields: {
                    valueY: "irradiation",
                    dateX: "hour"
                },
                tooltipText: "{dateX.formatDate('HH:mm')}: [bold]{valueY.formatNumber('###.00')}[/] (kW)",
                strokeWidth: 4,
            }],

        };


        let initializeCb = function () {
            console.log('Callback received...');
        };

        let dayChart = function (div) {
            //solycChart.onCalculateDaily();
            ch.createChart(

                div,
                'dayChart',
                dailyDefConfig,
                initializeCb,
                solycChart.dailyPerformanceArray,
                'day'
            );
        }

        let dayChartdiv = document.createElement('div');
        dayChartdiv.classList.add('chart-div');
        document.querySelector('body').appendChild(dayChartdiv);
        dayChart(dayChartdiv);


        let yearChart = function (div) {
            // solycChart.onCalculateYearly();
            ch.createChart(

                div,
                'yearChart',
                yearlyDefConfig,
                initializeCb,
                solycChart.yearlyPerformanceArray,
                'year'
            );
        }

        let yearChartdiv = document.createElement('div');
        yearChartdiv.classList.add('chart-div');
        document.querySelector('body').appendChild(yearChartdiv);
        yearChart(yearChartdiv);


    },

    onCalculate: function () {
        var yearlyData = sol().setLatitude($('#latitude').val()).setLongitude($('#longitude').val()).setTimezone($('#timeZone').val()).setPanelAzimuth($('#panelAzimuth').val()).setPanelElevation($('#panelElevation').val()).setInstallationSize($('#installationSize').val());
        var dailyData = sol().setLatitude($('#latitude').val()).setLongitude($('#longitude').val()).setDate($('#date').val()).setTimezone($('#timeZone').val()).setPanelAzimuth($('#panelAzimuth').val()).setPanelElevation($('#panelElevation').val()).setInstallationSize($('#installationSize').val());
        //will rerun every time and action is triggered. Gets date from "dailyData"
        var year = moment($('#date').val()).year();
        //var yearStart = moment(year).dayOfYear(1).dayOfYear();
        var startDate = moment(year + "-01-01");
        var endDate = moment(year + "-12-31");


        var length = moment.duration(endDate.diff(startDate)).asDays();
        console.log(length);
        var yearlyPerformanceArray = [];
        var nextDay = moment(startDate).format("YYYY-MM-DD");
        var totalYield = 0;
        var dailyPerformanceArray = [];
        for (var j = 0; j < length; j++) {

            yearlyData.setDate(nextDay);

            var dailyEnergy = 0;
            var iterator = 0;

            for (var i = 0; i < 240; i++) {

                iterator += 0.1;
                yearlyData.solIterate(iterator); //iterator is used in Solyc to create a mesh and divide the days up into fractions of hours.
                dailyEnergy += (0.1 * yearlyData.installationSize * yearlyData.s_module);
                if (yearlyData.date === dailyData.date) {
                    dailyPerformanceArray.push({ hour: moment(yearlyData.date).add(iterator, "hours").format("MM-DD HH:mm").toString(), irradiation: yearlyData.installationSize * yearlyData.s_module });
                };

            };


            yearlyPerformanceArray.push({ day: nextDay.toString(), energy: dailyEnergy, s_module: yearlyData.s_module });
            totalYield += dailyEnergy;
            nextDay = moment(nextDay).add(1, 'days').format("YYYY-MM-DD");
        };
        solycChart.dailyPerformanceArray = dailyPerformanceArray;
        solycChart.yearlyPerformanceArray = yearlyPerformanceArray;
        solycChart.totalYield = totalYield;
    },

};

solycChart.onLoad();

// let elem1 = document.getElementById('sunC');
// let elem1 = document.getElementById('sunC');
// let newValue1 = elem1.value;
// console.log("new value" + newValue1);

// panelAzimuth.value = newValue1



// newValue1 = panelAzimuth;
// console.log(panelAzimuth.value);