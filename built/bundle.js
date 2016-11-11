var SharepearGallery =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== "undefined") {
	    factory(exports, require('linear-partitioning'));
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, global.linearPartitioning);
	    global.index = mod.exports;
	  }
	})(this, function (exports, _linearPartitioning) {
	  'use strict';

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.getPicturesSize = getPicturesSize;

	  var _linearPartitioning2 = _interopRequireDefault(_linearPartitioning);

	  function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : {
	      default: obj
	    };
	  }

	  /**
	   * Get Ideal Picture Height
	   */
	  function getIdealPictureHeight(width) {
	    return Math.round(width / 2 * 100) / 100;
	  }

	  /**
	   * Set for each picture the ratio
	   */
	  function setPicturesRatio(pictures) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = pictures[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var picture = _step.value;

	        picture.ratio = picture.width / picture.height;
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

	    return pictures;
	  }

	  /**
	   * Get summed width
	   */
	  function getSummedWidth(pictures, idealPictureHeight) {
	    var summedWidth = 0;

	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = pictures[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var picture = _step2.value;

	        summedWidth += picture.ratio * idealPictureHeight;
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    return summedWidth;
	  }

	  /**
	   * Get partitions
	   */
	  function getPartitions(pictures, summedWidth, galleryWidth) {
	    var rows = Math.round(summedWidth / galleryWidth);

	    var weights = pictures.map(function (picture) {
	      return parseInt(picture.ratio * 100);
	    });

	    return (0, _linearPartitioning2.default)(weights, rows);
	  }

	  /**
	   * Get pictures size
	   */
	  function getPicturesSize(pictures, galleryWidth, windowHeight) {
	    var picturesWithSize = JSON.parse(JSON.stringify(pictures)); // clone pictures
	    picturesWithSize = setPicturesRatio(picturesWithSize);

	    var idealPictureHeight = getIdealPictureHeight(windowHeight);
	    var summedWidth = getSummedWidth(picturesWithSize, idealPictureHeight);
	    var partitions = getPartitions(picturesWithSize, summedWidth, galleryWidth);

	    var indexStart = 0;
	    partitions.forEach(function (row) {
	      var indexEnd = indexStart + row.length;
	      var summedRatios = picturesWithSize.filter(function (picture, index) {
	        return index >= indexStart && index < indexEnd;
	      }).reduce(function (sum, picture) {
	        sum += picture.ratio;
	        return sum;
	      }, 0);

	      for (var i = indexStart; i < indexEnd; i++) {
	        var picture = picturesWithSize[i];
	        picture.idealWidth = Math.round(galleryWidth / summedRatios * picture.ratio * 100) / 100;
	        picture.idealHeight = Math.round(galleryWidth / summedRatios * 100) / 100;
	      }

	      indexStart = indexEnd;
	    });

	    return {
	      pictures: picturesWithSize,
	      galleryWidth: galleryWidth,
	      idealPictureHeight: idealPictureHeight,
	      partitions: partitions
	    };
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports !== "undefined") {
			factory(module);
		} else {
			var mod = {
				exports: {}
			};
			factory(mod);
			global.linearPartitioning = mod.exports;
		}
	})(this, function (module) {
		"use strict";

		// Explanation: http://www8.cs.umu.se/kurser/TDBAfl/VT06/algorithms/BOOK/BOOK2/NODE45.HTM

		// Partition seq into k buckets


		var partition = function partition(seq, k) {

			if (k === 0) return [];
			if (k === 1) return [seq];

			if (k >= seq.length) {
				// return the lists of each single element in sequence, plus empty lists for any extra buckets.
				var repeated = [];
				for (var q = 0; q < k - seq.length; ++q) {
					repeated.push([]);
				}return seq.map(function (x) {
					return [x];
				}).concat(repeated);
			}

			var sequence = seq.slice(0);
			var dividers = [];
			var sums = prefix_sums(sequence, k);
			var conds = boundary_conditions(sequence, k, sums);

			// evaluate main recurrence
			for (var i = 2; i <= sequence.length; ++i) {
				for (var j = 2; j <= k; ++j) {

					conds[i][j] = undefined;

					for (var x = 1; x < i; ++x) {

						var s = Math.max(conds[x][j - 1], sums[i] - sums[x]);
						dividers[i] = dividers[i] || []; // Initialize a new row in the dividers matrix (unless it's already initialized).

						// Continue to find the cost of the largest range in the optimal partition.
						if (conds[i][j] === undefined || conds[i][j] > s) {
							conds[i][j] = s;
							dividers[i][j] = x;
						}
					}
				}
			}

			return reconstruct_partition(sequence, dividers, k);
		};

		/* Work our way back up through the dividers, referencing each divider that we
	  * saved given a value for k and a length of seq, using each divider to make
	  * the partitions. */
		var reconstruct_partition = function reconstruct_partition(seq, dividers, k) {
			var partitions = [];

			while (k > 1) {
				if (dividers[seq.length]) {
					var divider = dividers[seq.length][k];
					var part = seq.splice(divider);
					partitions.unshift(part);
				}
				--k;
			}

			partitions.unshift(seq);

			return partitions;
		};

		/*
	 Given a list of numbers of length n, loop through it with index 'i'
	 Make each element the sum of all the numbers from 0...i
	 For example, given [1,2,3,4,5]
	 The prefix sums are [1,3,6,10,15]
	 */
		var prefix_sums = function prefix_sums(seq) {

			var sums = [0];

			for (var i = 1; i <= seq.length; ++i) {
				sums[i] = sums[i - 1] + seq[i - 1];
			}

			return sums;
		};

		/* This matrix holds the maximum sums over all the ranges given the length of
	  * seq and the number of buckets (k) */
		var boundary_conditions = function boundary_conditions(seq, k, sums) {
			var conds = [];

			for (var i = 1; i <= seq.length; ++i) {
				conds[i] = [];
				conds[i][1] = sums[i];
			}

			for (var j = 1; j <= k; ++j) {
				conds[1][j] = seq[0];
			}

			return conds;
		};

		module.exports = partition;
	});

/***/ }
/******/ ]);