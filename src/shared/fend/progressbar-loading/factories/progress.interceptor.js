define(
// require.js dependency injection
[
  '../module'
],

// require.js module scope
function(module) {
  'use strict';

  module.factory(
    // service name
    'ProgressInterceptor',

    // dependencies injection
    ['$q', '$cacheFactory', 'ProgressStatus',

  // factory definition
  function ($q, $cacheFactory, status) {

    // @begin: inject header defaults
    var httpDefaults;
    var setHttpProviderDefaults = function(httpProvider) {
      httpDefaults = httpProvider.defaults;
    };
    // @end: inject header defaults

    /**
      * The total number of requests made
      */
    var reqsTotal = 0;

    /**
      * The number of requests completed (either successfully or not)
      */
    var reqsCompleted = 0;


    function setStart() {
      status.start();
    }

    function setProgress() {
      status.progress(reqsCompleted / reqsTotal);
    }

    function setComplete() {
      status.complete();

      reqsCompleted = 0;
      reqsTotal = 0;
    }

    /**
      * Determine if the response has already been cached
      * @param  {Object}  config the config option from the request
      * @return {Boolean} retrns true if cached, otherwise false
      */
    function isCached(config) {
      var cache;
      var defaults = httpDefaults;

      if (config.method !== 'GET' || config.cache === false) {
        config.cached = false;
        return false;
      }

      if (config.cache === true && defaults.cache === undefined) {
        cache = $cacheFactory.get('$http');
      } else if (defaults.cache !== undefined) {
        cache = defaults.cache;
      } else {
        cache = config.cache;
      }

      var cached = cache !== undefined ?
        cache.get(config.url) !== undefined : false;

      if (config.cached !== undefined && cached !== config.cached) {
        return config.cached;
      }
      config.cached = cached;
      return cached;
    }

    return {
      'setHttpProviderDefaults': setHttpProviderDefaults,

      'request': function(config) {
        if (!isCached(config)) {
          if (reqsTotal === 0) {
            setStart();
          }
          reqsTotal++;
        }
        return config;
      },

      'response': function(response) {
        if (!angular.isDefined(response)) {
          console.error('No response defined. Aborting operation.');
          setComplete();
          return $q.reject(response);
        }

        if (!isCached(response.config)) {
          reqsCompleted++;
          if (reqsCompleted >= reqsTotal) {
            setComplete();
          } else {
            setProgress();
          }
        }
        return response;
      },

      'responseError': function(rejection) {
        if (!isCached(rejection.config)) {
          reqsCompleted++;
          if (reqsCompleted >= reqsTotal) {
            setComplete();
          } else {
            setProgress();
          }
        }
        return $q.reject(rejection);
      }
    };

  }]);

});
