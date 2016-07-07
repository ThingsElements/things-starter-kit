

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = function (_Chart$Line) {
  _inherits(Control, _Chart$Line);

  function Control(context, config) {
    _classCallCheck(this, Control);

    config.type = 'controlChart';

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Control).call(this));
  }

  return Control;
}(Chart.Line);

exports.default = Control;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chart = undefined;

var _Chart = require('./charts/Chart.Control');

var _Chart2 = _interopRequireDefault(_Chart);

var _controller = require('./controllers/controller.control-chart');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Chart.ControlChart = _Chart2.default;
Chart.controllers.controlChart = _controller2.default;
Chart.defaults.global.maintainAspectRatio = false;

exports.Chart = Chart;

},{"./charts/Chart.Control":1,"./controllers/controller.control-chart":3}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Chart.defaults.controlChart = Chart.defaults.line;
// TODO: Chart.js에 label exclude 기능이 추가되면 아래의 기능을 제거한다.
Chart.defaults.controlChart.legend = {
  labels: {
    generateLabels: function generateLabels(chart) {
      var data = chart.data;

      var helpers = Chart.helpers;

      return helpers.isArray(data.datasets) ? data.datasets.map(function (dataset, i) {

        if (dataset.showInLegend === false) return null;

        return {
          text: dataset.label,
          fillStyle: !helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0],
          hidden: !chart.isDatasetVisible(i),
          lineCap: dataset.borderCapStyle,
          lineDash: dataset.borderDash,
          lineDashOffset: dataset.borderDashOffset,
          lineJoin: dataset.borderJoinStyle,
          lineWidth: dataset.borderWidth,
          strokeStyle: dataset.borderColor,

          // Below is extra data used for toggling the datasets
          datasetIndex: i
        };
      }, this) : [];
    }
  }
};

function initControlChart(chartInstance) {

  chartInstance.controlLimitSeries = {
    ucl: null,
    cl: null,
    lcl: null
  };
  chartInstance.specLines = {
    usl: null,
    lsl: null
  };

  // chartInstance.chart.width = chartInstance.width;
  // chartInstance.chart.height = chartInstance.width;
}

function excludeNullValueLabel(chartInstance) {
  // TODO: Chart.js에 label exclude 기능이 추가되면 아래의 기능을 제거한다.
  chartInstance.legend.buildLabels = function () {
    var me = this;
    var legendItemsArr = me.options.labels.generateLabels.call(me, me.chart);
    me.legendItems = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = legendItemsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var legendItem = _step.value;

        if (legendItem == null) continue;

        me.legendItems.push(legendItem);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (me.options.reverse) {
      me.legendItems.reverse();
    }
  };
}

function generateSpecLines(chartInstance) {

  generateUpperControlLine(chartInstance);
  generateLowerControlLine(chartInstance);
  generateCenterLine(chartInstance);
}

function generateUpperControlLine(chartInstance) {
  var data = [];
  var dataLength = chartInstance.data.labels.length;

  var spcData = chartInstance.data.rawData.spcData;
  if (spcData) {
    data = spcData.ucl;
  }

  chartInstance.controlLimitSeries.ucl = generateSPCLine(chartInstance, data, {
    isControlLine: true,
    label: 'ucl'
  });
}

function generateLowerControlLine(chartInstance) {
  var data = [];
  var dataLength = chartInstance.data.labels.length;

  var spcData = chartInstance.data.rawData.spcData;
  if (spcData) {
    data = spcData.lcl;
  }

  chartInstance.controlLimitSeries.lcl = generateSPCLine(chartInstance, data, {
    isControlLine: true,
    label: 'lcl'
  });
}

function generateCenterLine(chartInstance) {
  var data = [];
  var dataLength = chartInstance.data.labels.length;

  var spcData = chartInstance.data.rawData.spcData;
  if (spcData) {
    data = spcData.cl;
  }

  var borderColor = "rgba(238,114,72,1)";
  var borderDash = [5, 5];

  if (chartInstance.options.spc) {
    borderColor = chartInstance.options.spc.centerLineColor || borderColor;
    borderDash = chartInstance.options.spc.centerLineDash || borderDash;
  }

  chartInstance.controlLimitSeries.cl = generateSPCLine(chartInstance, data, {
    borderColor: borderColor,
    borderWidth: 1,
    borderDash: borderDash,
    backgroundColor: borderColor,
    pointHoverBackgroundColor: borderColor,
    label: 'cl'
  });
}

function generateSPCLine(chart, data, options) {

  var borderColor = "rgba(238,114,72,1)";
  var borderDash = [5, 5];

  if (chart.options.spc) {
    borderColor = chart.options.spc.limitBorderColor || borderColor;
    borderDash = chart.options.spc.borderDash || borderDash;
  }

  var obj = {
    showInLegend: false,
    fill: false,
    lineTension: 0,
    borderWidth: 2,
    borderDash: borderDash,
    // borderDashOffset: 5,
    backgroundColor: "rgba(220,92,92,0.4)",
    borderColor: borderColor,
    borderCapStyle: 'butt',
    borderJoinStyle: 'miter',
    pointBorderColor: borderColor,
    pointBackgroundColor: "#fff",
    pointBorderWidth: 0,
    pointHoverRadius: 0,
    pointHoverBackgroundColor: borderColor,
    pointHoverBorderColor: "rgba(220,220,220,1)",
    pointHoverBorderWidth: 0,
    pointRadius: 0,
    pointHitRadius: 0,
    spanGaps: true,
    data: data || []
  };

  if (options) Object.assign(obj, options);

  chart.data.datasets.push(obj);
  return obj;
}

function updateSPCDatas(chartInstance) {
  var spcData = chartInstance.data.rawData.spcData;
  var controlLimits = chartInstance.controlLimitSeries;

  for (var key in spcData) {

    if (spcData[key]) {
      if (spcData[key].length > 0 && controlLimits[key]._meta[chartInstance.id].data.length === spcData[key].length) {
        controlLimits[key]._meta[chartInstance.id].data.shift(1);
      }
    }

    controlLimits[key].data = spcData[key] || [];
  }
}

function updatePointColor(chartInstance) {
  for (var i in chartInstance.chartSeries) {
    checkOOC(chartInstance, i);
  }
  console.log(chartInstance.chartSeries[0]._meta[chartInstance.id].data[0]._model.borderColor);
  chartInstance.chartSeries[0]._meta[chartInstance.id].data[0]._model.borderColor = "rgba(255,0,0,1)";
}

function checkOOC(dataArr, spcDataObject, currIndex) {
  console.log(dataArr, spcDataObject, currIndex);
  // var spcData = chartInstance.data.spcData;
  //
  // for(let i in chartInstance.chartSeries._meta) {
  //
  //   if(chartInstance.chartSeries._meta[i].data[index] > spcData[i]){
  //
  //   }
  // }
}

function checkOOCs(chartInstance) {
  var spcData = chartInstance.config.data.spcData;
  var seriesData = chartInstance.config.data.seriesData;

  for (var i in seriesData[0].data) {
    checkOOC(seriesData[0].data, spcData, i);
  }

  // for(let i in seriesData) {
  //   let data = seriesData[i]
  //   console.log(chartInstance)
  //   console.log(chartInstance.chartSeries[i]._meta[chartInstance.id].data)
  //
  // }
  //
  // console.log(chartInstance)
  // for(let i in chartInstance.chartSeries) {
  //   let d = chartInstance.chartSeries[i]
  //
  // }
}

Chart.plugins.register({
  beforeInit: function beforeInit(chartInstance) {
    if (chartInstance.config.type === "controlChart") {
      initControlChart(chartInstance);
      excludeNullValueLabel(chartInstance);
      generateSpecLines(chartInstance);
    }
  },

  beforeUpdate: function beforeUpdate(chartInstance) {
    if (chartInstance.config.type === "controlChart") {
      var spcData = chartInstance.data.rawData.spcData;
      var seriesData = chartInstance.data.rawData.seriesData;
      var controlLimits = chartInstance.controlLimitSeries;

      if (!spcData || Object.keys(spcData).length === 0) {
        spcData = {
          ucl: null,
          cl: null,
          lcl: null
        };
      }

      updateSPCDatas(chartInstance);
    }
  },

  afterUpdate: function afterUpdate(chartInstance) {},

  // TODO: 아래의 로직을 beforeRender와 beforeDraw중 어디에서 수행하는 것이 더 적합할지 고려해야함.
  beforeRender: function beforeRender(chartInstance) {
    var data = chartInstance.data.rawData.seriesData[0];
    var spcData = chartInstance.data.rawData.spcData;

    for (var i in data) {
      var seriesData = data[i];
      seriesData = (typeof seriesData === 'undefined' ? 'undefined' : _typeof(seriesData)) == 'object' ? seriesData.y : seriesData;

      var ucl = spcData.ucl[i];
      var lcl = spcData.lcl[i];

      if (seriesData >= ucl || seriesData <= lcl) {

        var borderColor = 'rgba(238,114,72,1)';
        var backgroundColor = 'yellow';
        var pointRadius = 5;

        if (chartInstance.options.spc) {
          borderColor = chartInstance.options.spc.oocColor || borderColor;
          backgroundColor = chartInstance.options.spc.oocBackgroundColor || backgroundColor;
          pointRadius = chartInstance.options.spc.oocSize || pointRadius;
        }

        if (chartInstance.getDatasetMeta(0).data[i]) {
          chartInstance.getDatasetMeta(0).data[i]._model.borderColor = borderColor;
          chartInstance.getDatasetMeta(0).data[i]._model.backgroundColor = backgroundColor;
          chartInstance.getDatasetMeta(0).data[i]._model.radius = pointRadius;
        }
      }
    }
  }
});

if (!window.scene || !global.scene) {
  (function () {
    var updateSeriesDatas = function updateSeriesDatas(chartInstance) {
      if (!chartInstance.data.rawData) {
        return;
      }

      var seriesData = chartInstance.data.rawData.seriesData;
      var chartId = chartInstance.id;

      if (!seriesData || seriesData.length === 0) seriesData = [null];

      for (var key in seriesData) {
        if (chartInstance.data.datasets[key]) chartInstance.data.datasets[key].data = seriesData[key] || [];
      }
    };

    var updateLabelDatas = function updateLabelDatas(chartInstance) {
      var labelData = chartInstance.data.rawData.labelData;
      chartInstance.config.data.labels = labelData || [];
    };

    Chart.plugins.register({
      beforeInit: function beforeInit(chartInstance) {

        // chartInstance.chartSeries = [];
        //
        // for(let dataset of chartInstance.data.datasets) {
        //   chartInstance.chartSeries.push(dataset);
        // }
      },
      beforeUpdate: function beforeUpdate(chartInstance) {
        if (!chartInstance.data.rawData) {
          return;
        }

        var seriesData = chartInstance.data.rawData.seriesData;
        updateLabelDatas(chartInstance);
        updateSeriesDatas(chartInstance);
      },
      beforeRender: function beforeRender(chartInstance) {}
    });
  })();
}

var controlChart = function (_Chart$controllers$li) {
  _inherits(controlChart, _Chart$controllers$li);

  function controlChart(chart, datasetIndex) {
    _classCallCheck(this, controlChart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(controlChart).call(this, chart, datasetIndex));
  }

  _createClass(controlChart, [{
    key: 'initialize',
    value: function initialize(chart, datasetIndex) {
      _get(Object.getPrototypeOf(controlChart.prototype), 'initialize', this).call(this, chart, datasetIndex);
    }
  }], [{
    key: 'datasetElementType',
    get: function get() {
      return Chart.elements.Line;
    }
  }, {
    key: 'dataElementType',
    get: function get() {
      return Chart.elements.Point;
    }
  }]);

  return controlChart;
}(Chart.controllers.line);

exports.default = controlChart;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controlchart = require('./controlchart');

Object.defineProperty(exports, 'ControlChart', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_controlchart).default;
  }
});
Object.defineProperty(exports, 'Chart', {
  enumerable: true,
  get: function get() {
    return _controlchart.Chart;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./controlchart":2}]},{},[2,4]);