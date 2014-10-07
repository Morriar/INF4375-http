/*
 * Copyright 2014 Alexandre Terrasa <alexandre@moz-code.org>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and 
 * limitations under the License.
 */

// Get http module
var http = require("http");
var url = require("url")
var fs = require("fs");
var xmldom = require("xmldom");

// Initialize web server
http.createServer(function(req, res) {
	// Read request
	var params = url.parse(req.url, true);
	var aid = params.query.aid;
	// Check request
	if(req.method != "GET" || !aid) {
		res.writeHead(400, {"Content-Type": "text/plain"});
		res.write("This server only allows GET requests with `aid` parameter set.");
		res.end();
		return;
	}
	// Read catalog
	fs.readFile("catalog.xml", function(err, data) {
		if(err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write("Internal error...");
			res.end();
			throw "Error reading xml document"
		}
		// Looking for aid in invoice catalog
		var domRoot = new xmldom.DOMParser().parseFromString(data.toString());
		var albums = domRoot.getElementsByTagName("cd")
		for(var i = 0; i < albums.length; i++) {
			var album = albums[i];
			// console.log(album);
			var id = album.getAttribute("id");
			if(id == aid) {
				// Prepare response header (set http status code and response MIME type)
				res.writeHead(200, {"Content-Type": "text/xml"});
				// Prepare response content as XML
				res.write(album.toString());
				// Return response to client
				res.end();
				return;
			}
		}
		// No album found for aid, make response
		res.writeHead(400, {"Content-Type": "text/plain"});
		res.write("No album for aid " + aid);
		res.end();
	});
}).listen(8080); // listen on port 8080
