/*function FnConstructor(data){
      this.data = data || "No data";
      this.init();
  };
  
  FnConstructor.prototype.init = function(){
      console.log(this.data);
  };*/

;
(function(global, $) {
    
   
    var solyc = function(latitude, longitude, timezone, date,  panelAzimuth , panelElevation, installationSize) {
        return new solyc.init(latitude, longitude, timezone, date, panelAzimuth, panelElevation, installationSize);
    }

 
    //creation of every new object, which is the input data for now.
    solyc.init = function(latitude = '0.000000', longitude = '0.000000', timezone = '0', date = '01/01/2020', panelAzimuth = '0', panelElevation, installationSize = '10') {
        var self = this;
        self.latitude = latitude;
        self.longitude = longitude;
        self.timezone = timezone;
        self.date = date;
        self.panelAzimuth = panelAzimuth;
        self.panelElevation = panelElevation;
        self.installationSize = installationSize;
    }
    
    
    //prototype that holds functions. Add solar calculations here.
    solyc.prototype = {


        //Setters
        setLatitude: function(lat) {

            this.latitude = lat;
            return this;
        },

        setLongitude: function(long) {

            this.longitude = long;
            return this;
        },

        setTimezone: function(tz) {

            this.timezone = tz;
            return this;
        },

        setDate: function(dt) {

            this.date = dt;
            return this;
        },

        getDate: function() {
            return this.date;
        },

        setPanelAzimuth: function(panelAz) {
            let newValue = elem.value;
            panelAz = newValue;
            
            this.panelAzimuth = panelAz;
            console.log(newValue+ "this is the rotation");
            console.log(panelAz + "this is the rotation old");
            return this;
        },

        setPanelElevation: function(panelEl) {

            let newValue1 = elem1.value;
            // newValue1 = panelEl;
            panelEl = newValue1;
            this.panelElevation = panelEl;
            console.log( "trying to console this" + panelEl);
            console.log(newValue1+"***************");
            return this;
        },

        setInstallationSize: function(installSize) {

            this.installationSize = installSize;
            return this;
        },

        //Place the output into HTML with jquery
        spitOutput: function(azSelector, elSelector) {
            var outAzimuth = 'Azimuth: ' + this.solarAzimuthAngle + ' (Degrees CW From North)';
            var outElevation = 'Elevation: ' + this.solarElevationAngle + ' (Degrees)';

            $(azSelector).html(outAzimuth);
            $(elSelector).html(outElevation);

            return this;
        },

        //the following two functions convert between radians and degrees when called with 'this' keyword.
        toRads: function(angle) {

            angle = (angle * Math.PI / 180);
            //console.log(angle + ' rads');
            return angle;
        },

        toDegrees: function(angle) {

            angle = (angle * 180 / Math.PI);
            //console.log(angle + ' degrees');
            return angle;
        },


        calcJulianDay: function(timeMesh) {

            //timeMesh is in hours. So 0.1 = every 6mins of day. This will be the intervals at which the calculations will be done throughout the day. From start of day to end.
            this.timeMesh = timeMesh;
            var time = timeMesh / 24;
            var unix = moment([1970, 01, 01]);
            var thisDay = moment(this.date);
            //2415015.5 is an Julian Date Reference or something like that. Values are in days.
            var julDay = ((thisDay.diff(unix, 'milliseconds')) / 86400000 + 2440587.5 + time - this.timezone / 24 + 31);

            this.julDay = julDay;
            this.time = time;
            //console.log('Julian Day: ' + julDay + '  ' + time);
            return this;
        },

        calcJulianCentury: function() {

            var julCent = (this.julDay - 2451545) / 36525;

            this.julCent = julCent;
            //console.log('Julian Century: ' + julCent);
            return this;
        },


        calcGeomMeanLongSun: function() { //output in degrees

            var geoMeanLongSun = (280.46646 + this.julCent * (36000.76983 + this.julCent * 0.0003032)) % 360;

            this.geoMeanLongSun = geoMeanLongSun;
            //console.log('Geo Mean Long Sun: ' + geoMeanLongSun);
            return this;
        },

        calcGeoMeanAnomSun: function() { //output in degrees

            var geoMeanAnomSun = 357.52911 + this.julCent * (35999.05029 - 0.0001537 * this.julCent);

            this.geoMeanAnomSun = geoMeanAnomSun;
            //console.log('Geo Mean Anom Sun: ' + geoMeanAnomSun);
            return this;
        },

        calcEccentricEarthOrbit: function() {
            var eccentricEarthOrbit = 0.016708634 - this.julCent * (0.000042037 + 0.0000001267 * this.julCent);

            this.eccentricEarthOrbit = eccentricEarthOrbit;
            //console.log('Eccentric Earth Orbit: ' + eccentricEarthOrbit);
            return this;
        },

        calcSunEqCtr: function() {

            var sunEqCtr = (Math.sin(this.toRads(this.geoMeanAnomSun)) * (1.914602 - this.julCent * (0.004817 + 0.000014 * this.julCent)) + Math.sin(this.toRads(2 * this.geoMeanAnomSun)) * (0.019993 - 0.000101 * this.julCent) + Math.sin(this.toRads(3 * this.geoMeanAnomSun)) * 0.000289);

            this.sunEqCtr = sunEqCtr;
            //console.log('Sun Eq Ctr:' + sunEqCtr);
            return this;
        },

        calcSunTrueLong: function() { // output in degrees

            var sunTrueLong = this.sunEqCtr + this.geoMeanLongSun;

            this.sunTrueLong = sunTrueLong;
            //console.log('Sun True Long: ' + sunTrueLong);
            return this;
        },

        calcSunTrueAnom: function() { //output in degrees

            var sunTrueAnom = this.geoMeanAnomSun + this.sunEqCtr;

            this.sunTrueAnom = sunTrueAnom;
            //console.log('Sun True Anom: ' + sunTrueAnom);
            return this;
        },

        calcSunRadVector: function() {

            var sunRadVector = (1.000001018 * (1 - this.eccentricEarthOrbit * this.eccentricEarthOrbit)) / (1 + this.eccentricEarthOrbit * Math.cos(this.toRads(this.sunTrueAnom)));

            this.sunRadVector = sunRadVector;
            //console.log('Sun Rad Vector: ' + sunRadVector);
            return this;
        },

        calcSunAppLong: function() {

            var sunAppLong = this.sunTrueLong - 0.00569 - 0.00478 * Math.sin(this.toRads(125.04 - 1934.136 * this.julCent));

            this.sunAppLong = sunAppLong;
            //console.log('Sun App Long: ' + sunAppLong);
            return this;
        },

        calcMeanObliqueEcliptic: function() {

            var meanObliqueEcliptic = 23 + (26 + ((21.488 - this.julCent * (46.815 + this.julCent * (0.00059 - this.julCent * 0.001813)))) / 60) / 60;

            this.meanObliqueEcliptic = meanObliqueEcliptic;
            //console.log('Mean Oblique Ecliptic: ' + meanObliqueEcliptic);
            return this;
        },

        calcObliqueCorrection: function() {

            var obliqueCorr = this.meanObliqueEcliptic + 0.00256 * Math.cos(this.toRads(125.04 - (1934.136 * this.julCent)));

            this.obliqueCorr = obliqueCorr;
            //console.log('Oblique Correction: ' + obliqueCorr);
            return this;

        },

        calcSunDeclinationAngle: function() { //output in degrees

            var sunDeclinationAngle = this.toDegrees(Math.asin(Math.sin(this.toRads(this.obliqueCorr)) * Math.sin(this.toRads(this.sunAppLong))));

            this.sunDeclinationAngle = sunDeclinationAngle;
            //console.log('Sun Declination Angle: ' + sunDeclinationAngle);
            return this;
        },

        calcVarY: function() {

            var varY = varY = Math.tan(this.toRads(this.obliqueCorr / 2)) * Math.tan(this.toRads(this.obliqueCorr / 2));

            this.varY = varY;
            //console.log('Var Y: ' + varY);
            return this;

        },

        calcEqOfTime: function() { //output in degrees

            var eqOfTime = 4 * this.toDegrees(this.varY * Math.sin(2 * this.toRads(this.geoMeanLongSun)) - 2 * this.eccentricEarthOrbit * Math.sin(this.toRads(this.geoMeanAnomSun)) + 4 * this.eccentricEarthOrbit * this.varY * Math.sin(this.toRads(this.geoMeanAnomSun)) * Math.cos(2 * this.toRads(this.geoMeanLongSun)) - 0.5 * this.varY * this.varY * Math.sin(4 * this.toRads(this.geoMeanLongSun)) - 1.25 * this.eccentricEarthOrbit * this.eccentricEarthOrbit * Math.sin(2 * this.toRads(this.geoMeanAnomSun)));

            this.eqOfTime = eqOfTime;
            //console.log('Equation of Time: ' + eqOfTime);
            return this;
        },

        calcHASunrise: function() {

            var hASunrise = this.toDegrees(Math.acos(Math.cos(this.toRads(90.833)) / (Math.cos(this.toRads(this.latitude)) * Math.cos(this.toRads(this.sunDeclinationAngle))) - Math.tan(this.toRads(this.latitude)) * Math.tan(this.toRads(this.sunDeclinationAngle))));

            this.hASunrise = hASunrise;
            //console.log('HA Sunrise: ' + hASunrise);
            return this;
        },

        calcTrueSolarTime: function() { //output in minutes

            var trueSolarTime = (this.time * 1440 + this.eqOfTime + 4 * this.longitude - 60 * this.timezone) % 1440;

            this.trueSolarTime = trueSolarTime;
            //console.log('True Solar Time: ' + trueSolarTime + '   ' + this.timezone + '  ' + this.longitude );
            return this;
        },

        calcHourAngle: function() {

            var hourAngle;
            if (this.trueSolarTime / 4 < 0) {
                hourAngle = this.trueSolarTime / 4 + 180;
            } else {
                hourAngle = this.trueSolarTime / 4 - 180;
            }

            this.hourAngle = hourAngle;
            //console.log('Hour Angle: ' + hourAngle);
            return this;
        },

        calcSolarZenithAngle: function() { //atmospheric refraction not taken into account. output is in degrees.

            var solarZenithAngle = this.toDegrees(Math.acos(Math.sin(this.toRads(this.latitude)) * Math.sin(this.toRads(this.sunDeclinationAngle)) + Math.cos(this.toRads(this.latitude)) * Math.cos(this.toRads(this.sunDeclinationAngle)) * Math.cos(this.toRads(this.hourAngle))));

            this.solarZenithAngle = solarZenithAngle;
            //console.log('Solar Zenith Angle: ' + solarZenithAngle);
            return this;
        },

        calcSolarElevationAngle: function() {

            var solarElevationAngle = 90 - this.solarZenithAngle;

            this.solarElevationAngle = solarElevationAngle;
            //console.log('Solar Elevation Angle: ' + solarElevationAngle);
            return this;
        },

        calcSolarAzimuthAngle: function() { //output in degrees, clockwise from north. Like a compass.

            var solarAzimuthAngle;
            if (this.hourAngle > 0) {
                solarAzimuthAngle = (this.toDegrees(Math.acos(((Math.sin(this.toRads(this.latitude)) * Math.cos(this.toRads(this.solarZenithAngle))) - Math.sin(this.toRads(this.sunDeclinationAngle))) / (Math.cos(this.toRads(this.latitude)) * Math.sin(this.toRads(this.solarZenithAngle))))) + 180) % 360;
            } else {
                solarAzimuthAngle = (540 - this.toDegrees(Math.acos(((Math.sin(this.toRads(this.latitude)) * Math.cos(this.toRads(this.solarZenithAngle))) - Math.sin(this.toRads(this.sunDeclinationAngle))) / (Math.cos(this.toRads(this.latitude)) * Math.sin(this.toRads(this.solarZenithAngle))))) % 360) - 360;
            }

            this.solarAzimuthAngle = solarAzimuthAngle;
            //console.log('Solar Azimuth Angle: ' + solarAzimuthAngle);
            return this;
        },

        //Solar Power Calculations start here

        calcPanelIncidenceAngle: function() { //s_ represents solar radiation. These three variables are the three components of the incident ray.

            //console.log('s_module ' + s_module);



            var mass_optical;

            if (this.solarElevationAngle > 30) {
                mass_optical = 1 / Math.sin(this.toRads(this.solarElevationAngle));
            } else {
                mass_optical = Math.pow((1229 + Math.pow((614 * Math.sin(this.toRads(this.solarElevationAngle))), 2)), (0.5)) - 614 * Math.sin(this.toRads((this.solarElevationAngle)));
            }

            //var s_incident = 1/mass_optical;

            //var atmosphericTransmittance_beamRadiation = 0.56 * (Math.exp(-0.65 * mass_optical) + Math.exp(-0.095 * mass_optical));
            var directSolarRadiation = 1.353 * Math.pow(0.7, Math.pow(mass_optical, 0.678));
            //var s_mod_am = directSolarRadiation * s_module; 
            var s_module = directSolarRadiation * (Math.cos(this.toRads(this.solarElevationAngle)) * Math.sin(this.toRads(this.panelElevation)) * Math.cos(this.toRads(this.panelAzimuth - this.solarAzimuthAngle)) + Math.sin(this.toRads(this.solarElevationAngle)) * Math.cos(this.toRads(this.panelElevation)));
            if (s_module < 0 || this.solarElevationAngle < 0) {
                s_module = 0;
            }
            // console.log('-----------------------');
            // console.log('s_incident: ' + directSolarRadiation);
            //console.log('airmass: ' + mass_optical);
            //console.log('s_module: ' + s_module);
            this.directSolarRadiation = directSolarRadiation;
            this.s_module = s_module;
            return this;

        },



        solIterate: function(mesh) {
            this.calcJulianDay(mesh).calcJulianCentury().calcMeanObliqueEcliptic().calcObliqueCorrection().calcGeomMeanLongSun().calcGeoMeanAnomSun().calcEccentricEarthOrbit().calcSunEqCtr().calcSunTrueLong().calcSunTrueAnom().calcSunRadVector().calcSunAppLong().calcSunDeclinationAngle().calcVarY().calcEqOfTime().calcHASunrise().calcTrueSolarTime().calcHourAngle().calcSolarZenithAngle().calcSolarElevationAngle().calcSolarAzimuthAngle().calcPanelIncidenceAngle();

            return this;
        }



    }

    // so that we don't have to use 'new' keyword every time
    solyc.init.prototype = solyc.prototype;
    // attach solyc to global object and assign short name of sol when using library
    global.solyc = global.sol = solyc;

}(window, jQuery));