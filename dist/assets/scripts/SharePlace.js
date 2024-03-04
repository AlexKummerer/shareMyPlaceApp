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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/SharePlace.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SharePlace.js":
/*!***************************!*\
  !*** ./src/SharePlace.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _UI_Modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI/Modal */ \"./src/UI/Modal.js\");\n/* harmony import */ var _UI_Modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_UI_Modal__WEBPACK_IMPORTED_MODULE_0__);\n\nclass PlaceFinder {\n  constructor() {\n    const addressForm = document.querySelector(\"form\");\n    const locateUserBtn = document.getElementById(\"locate-btn\");\n    this.shareBtn = document.getElementById(\"share-btn\");\n    locateUserBtn.addEventListener(\"click\", this.locateUserHandler);\n    this.shareBtn.addEventListener(\"click\", this.sharePlaceHandler);\n    addressForm.addEventListener(\"submit\", this.findAddressHandler);\n  }\n  sharePlaceHandler() {\n    console.log(\"Sharing place...\");\n    const sharedLinkInputElement = document.getElementById(\"share-link\");\n    if (!navigator.clipboard) {\n      sharedLinkInputElement.select();\n      return;\n    }\n    navigator.clipboard.writeText(sharedLinkInputElement.value).then(() => {\n      alert(\"Copied into clipboard!\");\n    }).catch(err => {\n      console.log(err);\n      sharedLinkInputElement.select();\n    });\n  }\n  locateUserHandler() {\n    if (!navigator.geolocation) {\n      alert(\"Location feature is not available in your browser - please use a more modern browser or manually enter the address.\");\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"](\"loading-modal-content\", \"Loading location - please wait!\");\n    modal.show();\n    navigator.geolocation.getCurrentPosition(async successResult => {\n      modal.hide();\n      const coordinates = {\n        lat: successResult.coords.latitude,\n        lng: successResult.coords.longitude\n      };\n      const address = await PlaceFinder.getAddressFromCoords(coordinates);\n      modal.hide();\n      const addressText = document.getElementById(\"address\");\n      addressText.value = address;\n    }, error => {\n      modal.hide();\n      alert(\"Could not locate you unfortunately. Please enter an address manually!\");\n    });\n  }\n  async findAddressHandler(event) {\n    event.preventDefault();\n    const address = event.target.querySelector(\"input\").value;\n    if (!address || address.trim().length === 0) {\n      alert(\"Invalid address entered - please try again!\");\n      return;\n    }\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"](\"loading-modal-content\", \"Loading location - please wait!\");\n    modal.show();\n    try {\n      const coordinates = await PlaceFinder.getCoordsFromAddress(address);\n      this.shareBtn.disabled = false;\n    } catch (err) {\n      alert(err.message);\n      this.shareBtn.disabled = true;\n    }\n    modal.hide();\n  }\n  static findPlace(coordinates) {\n    const modal = new _UI_Modal__WEBPACK_IMPORTED_MODULE_0__[\"Modal\"](\"loading-modal-content\", \"Loading location - please wait!\");\n    modal.show();\n    return new Promise((resolve, reject) => {\n      setTimeout(() => {\n        modal.hide();\n        resolve(coordinates);\n      }, 2000);\n    });\n  }\n}\nconst placeFinder = new PlaceFinder();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvU2hhcmVQbGFjZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9TaGFyZVBsYWNlLmpzP2Q1YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kYWwgfSBmcm9tIFwiLi9VSS9Nb2RhbFwiO1xyXG5cclxuXHJcbmNsYXNzIFBsYWNlRmluZGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnN0IGFkZHJlc3NGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XHJcbiAgICBjb25zdCBsb2NhdGVVc2VyQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2NhdGUtYnRuXCIpO1xyXG4gICAgdGhpcy5zaGFyZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hhcmUtYnRuXCIpO1xyXG4gICAgbG9jYXRlVXNlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5sb2NhdGVVc2VySGFuZGxlcik7XHJcbiAgICB0aGlzLnNoYXJlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnNoYXJlUGxhY2VIYW5kbGVyKTtcclxuICAgIGFkZHJlc3NGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5maW5kQWRkcmVzc0hhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgc2hhcmVQbGFjZUhhbmRsZXIoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlNoYXJpbmcgcGxhY2UuLi5cIik7XHJcbiAgICBjb25zdCBzaGFyZWRMaW5rSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGFyZS1saW5rXCIpO1xyXG4gICAgaWYgKCFuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XHJcbiAgICAgIHNoYXJlZExpbmtJbnB1dEVsZW1lbnQuc2VsZWN0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIG5hdmlnYXRvci5jbGlwYm9hcmRcclxuICAgICAgLndyaXRlVGV4dChzaGFyZWRMaW5rSW5wdXRFbGVtZW50LnZhbHVlKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgYWxlcnQoXCJDb3BpZWQgaW50byBjbGlwYm9hcmQhXCIpO1xyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgc2hhcmVkTGlua0lucHV0RWxlbWVudC5zZWxlY3QoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2NhdGVVc2VySGFuZGxlcigpIHtcclxuICAgIGlmICghbmF2aWdhdG9yLmdlb2xvY2F0aW9uKSB7XHJcbiAgICAgIGFsZXJ0KFxyXG4gICAgICAgIFwiTG9jYXRpb24gZmVhdHVyZSBpcyBub3QgYXZhaWxhYmxlIGluIHlvdXIgYnJvd3NlciAtIHBsZWFzZSB1c2UgYSBtb3JlIG1vZGVybiBicm93c2VyIG9yIG1hbnVhbGx5IGVudGVyIHRoZSBhZGRyZXNzLlwiXHJcbiAgICAgICk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKFxyXG4gICAgICBcImxvYWRpbmctbW9kYWwtY29udGVudFwiLFxyXG4gICAgICBcIkxvYWRpbmcgbG9jYXRpb24gLSBwbGVhc2Ugd2FpdCFcIlxyXG4gICAgKTtcclxuICAgIG1vZGFsLnNob3coKTtcclxuICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oXHJcbiAgICAgIGFzeW5jIChzdWNjZXNzUmVzdWx0KSA9PiB7XHJcbiAgICAgICAgbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgIGNvbnN0IGNvb3JkaW5hdGVzID0ge1xyXG4gICAgICAgICAgbGF0OiBzdWNjZXNzUmVzdWx0LmNvb3Jkcy5sYXRpdHVkZSxcclxuICAgICAgICAgIGxuZzogc3VjY2Vzc1Jlc3VsdC5jb29yZHMubG9uZ2l0dWRlLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IGF3YWl0IFBsYWNlRmluZGVyLmdldEFkZHJlc3NGcm9tQ29vcmRzKGNvb3JkaW5hdGVzKTtcclxuXHJcbiAgICAgICAgbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgIGNvbnN0IGFkZHJlc3NUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRyZXNzXCIpO1xyXG4gICAgICAgIGFkZHJlc3NUZXh0LnZhbHVlID0gYWRkcmVzcztcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgbW9kYWwuaGlkZSgpO1xyXG4gICAgICAgIGFsZXJ0KFxyXG4gICAgICAgICAgXCJDb3VsZCBub3QgbG9jYXRlIHlvdSB1bmZvcnR1bmF0ZWx5LiBQbGVhc2UgZW50ZXIgYW4gYWRkcmVzcyBtYW51YWxseSFcIlxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBmaW5kQWRkcmVzc0hhbmRsZXIoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBhZGRyZXNzID0gZXZlbnQudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZTtcclxuICAgIGlmICghYWRkcmVzcyB8fCBhZGRyZXNzLnRyaW0oKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgYWxlcnQoXCJJbnZhbGlkIGFkZHJlc3MgZW50ZXJlZCAtIHBsZWFzZSB0cnkgYWdhaW4hXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBNb2RhbChcclxuICAgICAgXCJsb2FkaW5nLW1vZGFsLWNvbnRlbnRcIixcclxuICAgICAgXCJMb2FkaW5nIGxvY2F0aW9uIC0gcGxlYXNlIHdhaXQhXCJcclxuICAgICk7XHJcbiAgICBtb2RhbC5zaG93KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb29yZGluYXRlcyA9IGF3YWl0IFBsYWNlRmluZGVyLmdldENvb3Jkc0Zyb21BZGRyZXNzKGFkZHJlc3MpO1xyXG4gICAgICB0aGlzLnNoYXJlQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYWxlcnQoZXJyLm1lc3NhZ2UpO1xyXG4gICAgICB0aGlzLnNoYXJlQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIG1vZGFsLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmaW5kUGxhY2UoY29vcmRpbmF0ZXMpIHtcclxuICAgIGNvbnN0IG1vZGFsID0gbmV3IE1vZGFsKFxyXG4gICAgICBcImxvYWRpbmctbW9kYWwtY29udGVudFwiLFxyXG4gICAgICBcIkxvYWRpbmcgbG9jYXRpb24gLSBwbGVhc2Ugd2FpdCFcIlxyXG4gICAgKTtcclxuICAgIG1vZGFsLnNob3coKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIG1vZGFsLmhpZGUoKTtcclxuICAgICAgICByZXNvbHZlKGNvb3JkaW5hdGVzKTtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IHBsYWNlRmluZGVyID0gbmV3IFBsYWNlRmluZGVyKCk7XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUdBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/SharePlace.js\n");

/***/ }),

/***/ "./src/UI/Modal.js":
/*!*************************!*\
  !*** ./src/UI/Modal.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Modal {\n  constructor(contentId, fallbackText) {\n    this.fallbackText = fallbackText;\n    this.contentTemplatEl = document.getElementById(contentId);\n    this.modalTemplateEl = document.getElementById(\"modal-template\");\n  }\n  show() {\n    if (\"content\" in document.createElement(\"template\")) {\n      const modalContent = document.importNode(this.modalTemplateEl.content, true);\n      const modalElement = modalContent.querySelector(\".modal\");\n      const backdropElement = modalContent.querySelector(\".backdrop\");\n      const contentElement = document.importNode(this.contentTemplatEl.content, true);\n    } else {\n      alert(this.fallbackText);\n    }\n    console.log(\"Showing modal...\");\n  }\n  hide() {\n    console.log(\"Hiding modal...\");\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvVUkvTW9kYWwuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvVUkvTW9kYWwuanM/MjcwMiJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBNb2RhbCB7XHJcbiAgY29uc3RydWN0b3IoY29udGVudElkLCBmYWxsYmFja1RleHQpIHtcclxuICAgIHRoaXMuZmFsbGJhY2tUZXh0ID0gZmFsbGJhY2tUZXh0O1xyXG4gICAgdGhpcy5jb250ZW50VGVtcGxhdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGVudElkKTtcclxuICAgIHRoaXMubW9kYWxUZW1wbGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC10ZW1wbGF0ZVwiKTtcclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAoXCJjb250ZW50XCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpKSB7XHJcbiAgICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUoXHJcbiAgICAgICAgdGhpcy5tb2RhbFRlbXBsYXRlRWwuY29udGVudCxcclxuICAgICAgICB0cnVlXHJcbiAgICAgICk7XHJcbiAgICAgICAgY29uc3QgbW9kYWxFbGVtZW50ID0gbW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIik7XHJcbiAgICAgICAgY29uc3QgYmFja2Ryb3BFbGVtZW50ID0gbW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFja2Ryb3BcIik7XHJcbiAgICAgICAgY29uc3QgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5pbXBvcnROb2RlKFxyXG4gICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdEVsLmNvbnRlbnQsXHJcbiAgICAgICAgICB0cnVlXHJcbiAgICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGFsZXJ0KHRoaXMuZmFsbGJhY2tUZXh0KTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiU2hvd2luZyBtb2RhbC4uLlwiKTtcclxuICB9XHJcblxyXG4gIGhpZGUoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhpZGluZyBtb2RhbC4uLlwiKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/UI/Modal.js\n");

/***/ })

/******/ });