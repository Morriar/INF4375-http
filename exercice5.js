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

// Initialize web server
http.createServer(function(req, res) {
	// Read request
	var params = url.parse(req.url, true);
	var facid = params.query.facid;
	// Check request
	if(req.method != "GET" || !facid) {
		res.writeHead(400, {"Content-Type": "text/plain"});
		res.write("This server only allows GET requests with `facid` parameter set.");
		res.end();
		return;
	}
	// Read invoices
	fs.readFile("factures.json", function(err, data) {
		if(err) {
			res.writeHead(500, {"Content-Type": "text/plain"});
			res.write("Internal error...");
			res.end();
			throw "Error reading json document"
		}
		// Looking for facid in invoice list
		var json = JSON.parse(data.toString());
		for(var i in json) {
			var facobj = json[i];
			if(facobj.numero_facture == facid) {
				// Prepare response header (set http status code and response MIME type)
				res.writeHead(200, {"Content-Type": "text/json"});
				// Prepare response content as JSON
				res.write(JSON.stringify(facobj));
				// Return response to client
				res.end();
				return;
			}
		}
		// No invoice found for facid, make response
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("No invoice found for facid " + facid);
		res.end();
	});
}).listen(8080); // listen on port 8080
