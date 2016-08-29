
// src/http-json-patch.js
!function e(t,n,r){function o(u,c){if(!n[u]){if(!t[u]){var f="function"==typeof require&&require;if(!c&&f)return f(u,!0);if(i)return i(u,!0);var a=new Error("Cannot find module '"+u+"'");throw a.code="MODULE_NOT_FOUND",a}var s=n[u]={exports:{}};t[u][0].call(s.exports,function(e){var n=t[u][1][e];return o(n?n:e)},s,s.exports,e,t,n,r)}return n[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,t,n){var r=[].shift;t.exports=function(){for(var e,t=r.call(arguments),n=r.call(arguments);n;){for(e in n)t[e]=n[e];n=r.call(arguments)}return t}},{}],2:[function(e,t,n){function r(){for(var e,t=o.call(arguments),n=o.call(arguments);n;){if(typeof t!=typeof n&&(t=i.isArray(n)?[]:i.isObject(n)?{}:n),i.isObject(n))for(e in n)void 0===n[e]?t[e]=void 0:i.isArray(t[e])?[].push.apply(t[e],n[e]):i.isObject(t[e])?t[e]=r(t[e],n[e]):t[e]=n[e];n=o.call(arguments)}return t}var o=[].shift,i=e("./type");t.exports={extend:e("./_extend"),merge:r,copy:function(e){return r(void 0,e)}}},{"./_extend":1,"./type":3}],3:[function(e,t,n){"use strict";function r(e){return function(t){return typeof t===e}}function o(e){return function(t){return t instanceof e}}t.exports={isType:function(e,t){return void 0===t?r(e):r(e)(t)},instanceOf:function(e,t){return void 0===t?o(e):o(e)(t)},isObject:function(e){return"object"==typeof e&&null!==e},isFunction:r("function"),isString:r("string"),isNumber:r("number"),isArray:Array.isArray||o(Array),isDate:o(Date),isRegExp:o(RegExp),isElement:function(e){return e&&1===e.nodeType},isUndefined:function(e){return void 0===e}}},{}],4:[function(e,t,n){t.exports=function(e){return e.defer||(e.defer=function(){var t={};return t.promise=new e(function(e,n){t.resolve=e,t.reject=n}),t}),e.all||(e.all=function(t){return new e(function(n,r){var o=t.length,i=[];t.forEach(function(t,u){(t.then?t:e.resolve(t)).then(function(e){i[u]=e,0===--o&&n(i)},function(e){-1!==o&&r(e)})})})}),e.race||(e.race=function(t){return new e(function(n,r){var o=!1;t.forEach(function(t,i){o||(t.then?t:e.resolve(t)).then(function(e){o||(o=!0,n(e))},function(e){o||(o=!0,r(e))})})})}),e.resolve||(e.resolve=function(t){return new e(function(e,n){e(t)})}),e.reject||(e.reject=function(t){return new e(function(e,n){n(t)})}),e}},{}],5:[function(e,t,n){function r(e,t,n){t&&t.then?t.then(function(t){e.deferred.resolve(t)},function(t){e.deferred.reject(t)}):e.deferred[n](t)}function o(e){if(void 0!==e.$$succeeded){for(var t=(e.$$queue.length,e.$$queue.shift()),n=e.$$succeeded?"resolve":"reject",o=!e.$$succeeded&&e.$$uncought++;t;){if(t[n]){o=!1;try{r(t,t[n](e.$$value),"resolve")}catch(i){r(t,i,"reject")}}else r(t,e.$$value,n);t=e.$$queue.shift()}if(!e.$$succeeded&&o&&e.$$uncough===o)throw new Error("Uncaught (in promise)")}}function i(e){if(!(e instanceof Function))throw new TypeError("Promise resolver undefined is not a function");var t=this;this.$$queue=[],this.$$uncough=0;try{e(function(e){t.$$succeeded=!0,t.$$value=e,o(t)},function(e){t.$$succeeded=!1,t.$$value=e,o(t)})}catch(n){t.$$succeeded=!1,t.$$value=n,o(t)}}i.prototype.then=function(e,t){var n=this,r=new i(function(r,o){n.$$queue.push({resolve:e,reject:t,deferred:{resolve:r,reject:o}})});return o(this),r},i.prototype["catch"]=function(e){return this.then(void 0,e)},e("./promise-methods")(i),t.exports=i},{"./promise-methods":4}],6:[function(e,t,n){(function(n){t.exports=e("./qizer")(n.Promise?e("./promise-methods")(n.Promise):e("./promise-polyfill"))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./promise-methods":4,"./promise-polyfill":5,"./qizer":7}],7:[function(e,t,n){t.exports=function(t){function n(e){return new t(e)}return["defer","resolve","reject","all","race"].forEach(function(e){n[e]=t[e]}),n.when=function(e){return e&&e.then?e:t.resolve(e)},n.usePolyfill=function(){t=e("./promise-polyfill"),["defer","resolve","reject","all","race"].forEach(function(e){n[e]=t[e]})},n}},{"./promise-polyfill":5}],8:[function(e,t,n){(function(t){var n=e("./http");n.jsonPatch=function(e,t,r){if(e=_isArray(e)?joinPath.apply(null,e):e,"object"==typeof e)return e.method="patch",n(e);if("string"==typeof e){if(r=r?r:{},r.method="patch",t)return r.data=t,n(e,r);var o=[],i=function(e){return o.push(e),u},u={add:function(e,t){return i({op:"add",path:e,value:t})},test:function(e,t){return i({op:"test",path:e,value:t})},replace:function(e,t){return i({op:"replace",path:e,value:t})},move:function(e,t){return i({op:"move",from:e,path:t})},copy:function(e,t){return i({op:"copy",from:e,path:t})},remove:function(e){return i({op:"remove",path:e})},flush:function(){return o.splice(0,o.length),u},submit:function(t){return t=t||o,r.data=t,n(e,r)}};return u}},"function"==typeof define&&define.amd?define(["$http"],function(){return n}):t.$http=n}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./http":9}],9:[function(e,t,n){function r(e,t,n){for(var o in e)e[o]instanceof Function?e[o]=e[o].apply(n,t||[]):"object"==typeof e[o]&&null!==e[o]&&(e[o]=r(e[o],t,n));return e}function o(e){var t=e.replace(/([a-z])([A-Z])/g,function(e,t,n){return t+"-"+n});return t=t[0].toUpperCase()+t.substr(1)}function i(e){var t=e[0].toLowerCase()+e.substr(1);return t.replace(/([a-z])-([A-Z])/g,function(e,t,n){return t+n})}function u(e,t,n){var r=e&&e.match(y);return r&&("json"===r[3]?JSON.parse(t):"xml"===r[3]?n:t)}function c(e){var t={};return e.getAllResponseHeaders().replace(/\s*([^\:]+)\s*\:\s*([^\;\n]+)/g,function(e,n,r){t[i(n)]=r.trim()}),t}function f(e){var t;return function(){return t||(t=c(e)),t}}function a(e){var t="";for(var n in e)t+=(t?"&":"")+n+"="+encodeURIComponent(e[n]);return t}function s(e,t){for(var n in t)e.setRequestHeader(o(n),t[n])}function p(e,t){if(void 0===t&&"object"==typeof e&&null!==e?(t=e,e=t.url):(t=t||{},t.url=e),t=h.merge(h.copy(v),h.copy(t)),t=r(t,[t],null),t.method=(t.method||"GET").toUpperCase(),"string"!=typeof t.url)throw new Error("url should be a string");return d(function(n,r){var o=null;try{o=new XMLHttpRequest}catch(i){try{o=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){o=new ActiveXObject("Microsoft.XMLHTTP")}}if(null===o)throw"Browser does not support HTTP Request";t.params&&(e+=(/\?/.test(e)?"&":"?")+a(t.params)),o.open(t.method,e),t.withCredentials&&(o.withCredentials=!0),s(o,t.headers||{}),o.config=t,t.start=(new Date).getTime(),o.onreadystatechange=function(){if("complete"===o.readyState||4===o.readyState){var e={config:t,data:u(o.getResponseHeader("content-type"),o.responseText,o.responseXML),status:o.status,headers:f(o),xhr:o};o.status>=200&&o.status<400?n(e):r(e)}},t.contentType?t.data&&"application/json"===t.contentType&&"string"!=typeof t.data&&(t.data=JSON.stringify(t.data)):t.data instanceof FormData?t.contentType="multipart/form-data":"object"==typeof t.data&&null!==t.data&&(t.contentType="application/json",t.data&&(t.data=JSON.stringify(t.data))),t.contentType&&o.setRequestHeader("Content-Type",t.contentType),o.send(t.data)})}function l(e){return/\/$/.test(e)&&(e=e.replace(/\/$/,"")),function(t){return t?e+(/^\//.test(t)?"":"/")+t:e}}var d=e("q-promise"),h=e("nitro-tools/extend"),y=/([^\/]+)\/([^+]+\+)?(.*)/,v={};p.config=function(e){return h.merge(v,e),p},p.serialize=a,p.noCache=function(e,t){return e+=(/\?/.test(e)?"&":"?")+"t="+(new Date).getTime(),p(e,t)},p.plainResponse=function(e){return{config:e.config,data:e.data,status:e.status,headers:e.headers()}},["get","delete"].forEach(function(e){p[e]=function(t,n){return p(t,h.extend(h.copy(n||{}),{method:e}))}}),["post","put","patch"].forEach(function(e){p[e]=function(t,n,r){return p(t,h.extend(h.copy(r||{}),{method:e,data:n||{}}))}}),p.base=function(e,t){var n=l(e),r=function(){return r.get.apply(this,arguments)};return t=t||{},["get","delete"].forEach(function(e){r[e]=function(r,o){return p(n(r),h.merge(h.copy(t),o,{method:e}))}}),["post","put","patch"].forEach(function(e){r[e]=function(r,o,i){return p(n(r),h.merge(h.copy(t),i,{method:e,data:o}))}}),r},p.responseData=function(e){return e.data},t.exports=p},{"nitro-tools/extend":2,"q-promise":6}]},{},[8]);