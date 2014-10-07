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

// Initialize web server
http.createServer(function(req, res) {
	// Read request
	var params = url.parse(req.url, true);
	var prenom = params.query.prenom
	var nom = params.query.nom
	// Check request
	if(req.method != "GET" || !nom || !prenom) {
		res.writeHead(400, {"Content-Type": "text/plain"});
		res.write("This server only allows GET requests with `nom` and `prenom` parameters set.");
		res.end();
		return;
	}
	// Prepare response header (set http status code and response MIME type)
	res.writeHead(200, {"Content-Type": "text/html"});
	// Prepare response content as HTML
	res.write("<!DOCTYPE html>");
	res.write("<html>");
	res.write("<head>");
	res.write("<meta charset='utf-8'>");
	res.write("<title>Hello World</title>");
	res.write("</head>");
	res.write("<body>");

	res.write("<p>Hello World " + prenom + " " + nom + "!</p>");
									
	res.write("</body>");
	res.write("</html>");
	// Return response to client
	res.end();

}).listen(8080); // listen on port 8080
