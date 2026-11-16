(self.flatsomeChunks = self.flatsomeChunks || []).push([
  [408],
  {
    5288: function (module, exports) {
      "use strict";
      function CountUp(target, endVal, options) {
        this.target = typeof target === "string" ? document.getElementById(target) : target;
        this.endVal = Number(endVal);
        this.options = Object.assign(
          {
            startVal: 0,
            decimalPlaces: 0,
            duration: 2.5,
            useGrouping: true,
            useEasing: true,
            separator: ".",
            decimal: ",",
            prefix: "",
            suffix: ""
          },
          options
        );
        this.startVal = Number(this.options.startVal);
        this.duration = Number(this.options.duration) * 1000;
        this.frameVal = this.startVal;
        this.rAF = null;
        this.startTime = null;

        var self = this;
        this.easeOutExpo = function (t, b, c, d) {
          return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
        };

        this.formatNumber = function (n) {
          var neg = n < 0 ? "-" : "";
          var result = Math.abs(Number(n)).toFixed(self.options.decimalPlaces);
          var parts = result.split(".");
          var x0 = parts[0];
          var x1 = parts.length > 1 ? self.options.decimal + parts[1] : "";
          if (self.options.useGrouping) {
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x0)) {
              x0 = x0.replace(rgx, "$1" + self.options.separator + "$2");
            }
          }
          return self.options.prefix + neg + x0 + x1 + self.options.suffix;
        };

        this.count = function (timestamp) {
          if (!self.startTime) self.startTime = timestamp;
          var progress = timestamp - self.startTime;
          if (self.options.useEasing) {
            self.frameVal = self.easeOutExpo(
              progress,
              self.startVal,
              self.endVal - self.startVal,
              self.duration
            );
          } else {
            self.frameVal =
              self.startVal +
              (self.endVal - self.startVal) * (progress / self.duration);
          }
          if (self.frameVal > self.endVal) self.frameVal = self.endVal;
          if (self.target) {
            self.target.innerHTML = self.formatNumber(self.frameVal);
          }
          if (progress < self.duration) {
            self.rAF = requestAnimationFrame(self.count);
          } else {
            if (self.target) {
              self.target.innerHTML = self.formatNumber(self.endVal);
            }
            if (self.callback) self.callback();
          }
        };

        this.start = function (callback) {
          self.callback = callback;
          self.rAF = requestAnimationFrame(self.count);
        };
      }
      exports.CountUp = CountUp;
    }
  }
]);
