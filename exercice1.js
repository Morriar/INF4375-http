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

// Initialize web server
http.createServer(function(req, res) {
	// This is the callback function called for every request

	// Prepare response header (set http status code and response MIME type)
	res.writeHead(200, {"Content-Type": "text/plain"});
	// Prepare response content
	res.write("Hello World!");
	// Return response to client
	res.end();

}).listen(8080); // listen on port 8080
