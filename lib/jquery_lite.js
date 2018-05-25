/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/dom_node_collection.js":
/*!************************************!*\
  !*** ./lib/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection{\n  constructor(HTMLElements){\n    this.HTMLElements = HTMLElements;\n  }\n  \n  toArray() {\n    return this.HTMLElements;\n  }\n  \n  html(innerHTML){\n    if(innerHTML === undefined){\n      return this.HTMLElements[0].innerHTML;\n    }else{\n      this.HTMLElements.forEach((element)=>{\n        element.innerHTML = innerHTML;\n      });\n    }\n  }\n  \n  empty(){\n    this.html(\"\");\n  }\n  \n  append(content, ...otherArgs){\n    if(content instanceof HTMLElement){\n      this.HTMLElements.forEach((element)=>{\n        element.innerHTML += content.outerHTML;\n      });\n    }\n    else if(content instanceof String){\n      this.HTMLElements.forEach((element)=>{\n        element.innerHTML += content;\n      });\n    }else{//jQuery-lite wrapped collection\n      this.HTMLElements.forEach((element)=>{\n        Array.from(content).forEach((new_content)=>{\n          element.innerHTML += new_content.outerHTML;\n        });\n      });\n    }\n  }\n  \n  attr(name, value){\n    if (value === undefined) {\n      for (let i = 0; i < this.HTMLElements.length; i++) {\n        let currentEl = this.HTMLElements[i];\n        if (currentEl.getAttribute(name)) return currentEl.getAttribute(name);\n        return null;\n      }\n    } else {\n      for (let i = 0; i < this.HTMLElements.length; i++) {\n        let currentEl = this.HTMLElements[i];\n        if(currentEl.getAttribute(name)) {\n          newvvalue = currentEl.getAttribute(name) + \" \" + value;\n        }\n        else{\n          newvvalue = value;\n        }\n        currentEl.setAttribute(name, newvalue);\n      }\n    }\n    // this.HTMLElements[0]\n  }\n  \n  addClass(classnames){\n    this.attr(\"class\", classnames);\n  }\n  \n  removeClass(classnames){\n    if ( classnames === undefined) {\n      for (let i = 0; i < this.HTMLElements.length; i++) {\n        let currentEl = this.HTMLElements[i];\n        currentEl.setAttribute(\"class\", \"\");\n      }\n    } else {\n      let unwantedClassnames = classnames.split(\" \");\n      for (let i = 0; i < this.HTMLElements.length; i++) {\n        let currentEl = this.HTMLElements[i];\n        let classes = [];\n        let currentClasses = currentEl.getAttribute(\"class\").split(\" \");\n        for (let j = 0; j < currentClasses.length; j++) {\n          if(!unwantedClassnames.includes(currentClasses[j] )) classes.push(currentClasses[j]);\n        }\n        currentEl.setAttribute(name, classes.join(\" \"));\n      }\n    }\n  }\n  \n  children() {\n    let children = [];\n    this.HTMLElements.forEach((element) => {\n      element.childNodes.forEach((node) => {\n        if (!(node instanceof Text)) children.push(node);\n      });\n    });\n    return children;\n  }\n  \n  parent() {\n    let parents = [];\n    this.HTMLElements.forEach((element) => {\n      \n      if (!(parents.includes(element.parentNode()))) parents.push(element.parentNode());\n    });\n    return parents;\n  }\n  \n  find(selector) {\n    let result = [];\n    this.HTMLElements.forEach((element)=>{\n      Array.from(element.querySelectorAll(selector)).forEach((found)=>{\n        if (!(result.includes(found))) result.push(found);\n      });\n    });\n    return result; \n  }\n  \n  remove(){\n    this.HTMLElements.forEach((el)=>{\n      el.outerHTML=\"\";\n      el.remove();\n    });\n    this.HTMLElements = null; \n    return 'a silly string';\n  }\n  \n}\n\n\nmodule.exports = DOMNodeCollection;\n\n//# sourceURL=webpack:///./lib/dom_node_collection.js?");

/***/ }),

/***/ "./lib/main.js":
/*!*********************!*\
  !*** ./lib/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection.js */ \"./lib/dom_node_collection.js\");\n\nwindow.$l = (arg) =>{\n  // console.log(typeof arg);\n  // console.log(this);\n  // \n  if(typeof arg === 'string'){\n    //css selector as string \n    // console.log('$(arg)', $(arg));\n    elementList = Array.from(document.querySelectorAll(arg));\n  }\n  if(arg instanceof HTMLElement) { elementList = [arg]; } \n  // console.log(Array.from(elementList) instanceof Array);\n  return new DOMNodeCollection(elementList);\n  \n};\n\n\n//# sourceURL=webpack:///./lib/main.js?");

/***/ })

/******/ });