/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/transcript/route";
exports.ids = ["app/api/transcript/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftranscript%2Froute&page=%2Fapi%2Ftranscript%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftranscript%2Froute.js&appDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftranscript%2Froute&page=%2Fapi%2Ftranscript%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftranscript%2Froute.js&appDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Sayan_Chakraborty_Documents_GitHub_nextlevel_next_level_src_app_api_transcript_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/transcript/route.js */ \"(rsc)/./src/app/api/transcript/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/transcript/route\",\n        pathname: \"/api/transcript\",\n        filename: \"route\",\n        bundlePath: \"app/api/transcript/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Sayan Chakraborty\\\\Documents\\\\GitHub\\\\nextlevel\\\\next_level\\\\src\\\\app\\\\api\\\\transcript\\\\route.js\",\n    nextConfigOutput,\n    userland: C_Users_Sayan_Chakraborty_Documents_GitHub_nextlevel_next_level_src_app_api_transcript_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0cmFuc2NyaXB0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0cmFuc2NyaXB0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdHJhbnNjcmlwdCUyRnJvdXRlLmpzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNTYXlhbiUyMENoYWtyYWJvcnR5JTVDRG9jdW1lbnRzJTVDR2l0SHViJTVDbmV4dGxldmVsJTVDbmV4dF9sZXZlbCU1Q3NyYyU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDU2F5YW4lMjBDaGFrcmFib3J0eSU1Q0RvY3VtZW50cyU1Q0dpdEh1YiU1Q25leHRsZXZlbCU1Q25leHRfbGV2ZWwmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzJEO0FBQ3hJO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxTYXlhbiBDaGFrcmFib3J0eVxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXG5leHRsZXZlbFxcXFxuZXh0X2xldmVsXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXHRyYW5zY3JpcHRcXFxccm91dGUuanNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3RyYW5zY3JpcHQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90cmFuc2NyaXB0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS90cmFuc2NyaXB0L3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcU2F5YW4gQ2hha3JhYm9ydHlcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxuZXh0bGV2ZWxcXFxcbmV4dF9sZXZlbFxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFx0cmFuc2NyaXB0XFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftranscript%2Froute&page=%2Fapi%2Ftranscript%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftranscript%2Froute.js&appDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/transcript/route.js":
/*!*****************************************!*\
  !*** ./src/app/api/transcript/route.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var youtube_transcript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! youtube-transcript */ \"(rsc)/./node_modules/youtube-transcript/dist/youtube-transcript.esm.js\");\n\n\nasync function POST(request) {\n    try {\n        // Extracting the video ID from the request body\n        const body = await request.json();\n        const { videoId } = body;\n        if (!videoId) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Video ID is required'\n            }, {\n                status: 400\n            });\n        }\n        // Constructing the video URL from the videoId\n        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;\n        // Fetch transcript using the constructed URL\n        const transcript = await youtube_transcript__WEBPACK_IMPORTED_MODULE_1__.YoutubeTranscript.fetchTranscript(videoUrl);\n        // Extract only the 'text' field from each transcript item\n        const transcriptText = transcript.map((item)=>item.text).join(' ');\n        console.log(transcriptText);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            transcript: transcriptText\n        });\n    } catch (error) {\n        console.error('Error fetching transcript:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || 'Failed to fetch transcript'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS90cmFuc2NyaXB0L3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNZO0FBRWhELGVBQWVFLEtBQUtDLE9BQU87SUFDaEMsSUFBSTtRQUNGLGdEQUFnRDtRQUNoRCxNQUFNQyxPQUFPLE1BQU1ELFFBQVFFLElBQUk7UUFDL0IsTUFBTSxFQUFFQyxPQUFPLEVBQUUsR0FBR0Y7UUFFcEIsSUFBSSxDQUFDRSxTQUFTO1lBQ1osT0FBT04scURBQVlBLENBQUNLLElBQUksQ0FBQztnQkFBRUUsT0FBTztZQUF1QixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDNUU7UUFFQSw4Q0FBOEM7UUFDOUMsTUFBTUMsV0FBVyxDQUFDLGdDQUFnQyxFQUFFSCxTQUFTO1FBRTdELDZDQUE2QztRQUM3QyxNQUFNSSxhQUFhLE1BQU1ULGlFQUFpQkEsQ0FBQ1UsZUFBZSxDQUFDRjtRQUUzRCwwREFBMEQ7UUFDMUQsTUFBTUcsaUJBQWlCRixXQUFXRyxHQUFHLENBQUNDLENBQUFBLE9BQVFBLEtBQUtDLElBQUksRUFBRUMsSUFBSSxDQUFDO1FBQzlEQyxRQUFRQyxHQUFHLENBQUNOO1FBQ1osT0FBT1oscURBQVlBLENBQUNLLElBQUksQ0FBQztZQUFFSyxZQUFZRTtRQUFlO0lBQ3hELEVBQUUsT0FBT0wsT0FBTztRQUNkVSxRQUFRVixLQUFLLENBQUMsOEJBQThCQTtRQUM1QyxPQUFPUCxxREFBWUEsQ0FBQ0ssSUFBSSxDQUFDO1lBQUVFLE9BQU9BLE1BQU1ZLE9BQU8sSUFBSTtRQUE2QixHQUFHO1lBQUVYLFFBQVE7UUFBSTtJQUNuRztBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXFNheWFuIENoYWtyYWJvcnR5XFxEb2N1bWVudHNcXEdpdEh1YlxcbmV4dGxldmVsXFxuZXh0X2xldmVsXFxzcmNcXGFwcFxcYXBpXFx0cmFuc2NyaXB0XFxyb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IFlvdXR1YmVUcmFuc2NyaXB0IH0gZnJvbSAneW91dHViZS10cmFuc2NyaXB0JztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgLy8gRXh0cmFjdGluZyB0aGUgdmlkZW8gSUQgZnJvbSB0aGUgcmVxdWVzdCBib2R5XHJcbiAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcbiAgICBjb25zdCB7IHZpZGVvSWQgfSA9IGJvZHk7XHJcblxyXG4gICAgaWYgKCF2aWRlb0lkKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnVmlkZW8gSUQgaXMgcmVxdWlyZWQnIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29uc3RydWN0aW5nIHRoZSB2aWRlbyBVUkwgZnJvbSB0aGUgdmlkZW9JZFxyXG4gICAgY29uc3QgdmlkZW9VcmwgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0ke3ZpZGVvSWR9YDtcclxuXHJcbiAgICAvLyBGZXRjaCB0cmFuc2NyaXB0IHVzaW5nIHRoZSBjb25zdHJ1Y3RlZCBVUkxcclxuICAgIGNvbnN0IHRyYW5zY3JpcHQgPSBhd2FpdCBZb3V0dWJlVHJhbnNjcmlwdC5mZXRjaFRyYW5zY3JpcHQodmlkZW9VcmwpO1xyXG5cclxuICAgIC8vIEV4dHJhY3Qgb25seSB0aGUgJ3RleHQnIGZpZWxkIGZyb20gZWFjaCB0cmFuc2NyaXB0IGl0ZW1cclxuICAgIGNvbnN0IHRyYW5zY3JpcHRUZXh0ID0gdHJhbnNjcmlwdC5tYXAoaXRlbSA9PiBpdGVtLnRleHQpLmpvaW4oJyAnKTtcclxuICAgIGNvbnNvbGUubG9nKHRyYW5zY3JpcHRUZXh0KTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHRyYW5zY3JpcHQ6IHRyYW5zY3JpcHRUZXh0IH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0cmFuc2NyaXB0OicsIGVycm9yKTtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBlcnJvci5tZXNzYWdlIHx8ICdGYWlsZWQgdG8gZmV0Y2ggdHJhbnNjcmlwdCcgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiWW91dHViZVRyYW5zY3JpcHQiLCJQT1NUIiwicmVxdWVzdCIsImJvZHkiLCJqc29uIiwidmlkZW9JZCIsImVycm9yIiwic3RhdHVzIiwidmlkZW9VcmwiLCJ0cmFuc2NyaXB0IiwiZmV0Y2hUcmFuc2NyaXB0IiwidHJhbnNjcmlwdFRleHQiLCJtYXAiLCJpdGVtIiwidGV4dCIsImpvaW4iLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/transcript/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/youtube-transcript"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftranscript%2Froute&page=%2Fapi%2Ftranscript%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftranscript%2Froute.js&appDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CSayan%20Chakraborty%5CDocuments%5CGitHub%5Cnextlevel%5Cnext_level&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();