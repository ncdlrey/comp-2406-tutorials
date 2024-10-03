// LECTURE 5 - SAMPLE CODE
// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2024 Anil Somayaji
//
// simpleserver.js
// for COMP 2406 (Fall 2024), Carleton University
//
// Initial version: Sept 18, 2024
//
// Originally inspired by Rod Waldhoff's tiny node.js webserver
//   https://github.com/rodw/tiny-node.js-webserver
//

import { contentType } from "jsr:@std/media-types";

function MIMEtype(filename) {
  // Replaced by contentType
  // const MIME_TYPES = {
  //  'css': 'text/css',
  //  'gif': 'image/gif',
  //  'htm': 'text/html',
  //  'html': 'text/html',
  //  'ico': 'image/x-icon',
  //  'jpeg': 'image/jpeg',
  //  'jpg': 'image/jpeg',
  //  'js': 'text/javascript',
  //  'json': 'application/json',
  //  'png': 'image/png',
  //  'txt': 'text/text'
  // };

  var extension = "";

  if (filename) { 
    extension = filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();
  }
  return contentType(extension) || "application/octet-stream"; 
}

async function handler(req) {
  var metadata = { 
    status: 200,
    contentType: "text/plain",
    // The metadata associated with the response we are going to return
  }
  
  // ORIGINAL:  
  var pathname = "." + new URL(req.url).pathname; 
  // OTHER DIRECTORY
  // var pathname = "/home/student/public_html" + new URL(req.url).pathname; 
  console.log(pathname);
  
  if (pathname === "./" || pathname === "/home/student/public_html/") { // keep the slashes here
    console.log("Top-level directory requested, instead returning index.html.");
    pathname = "./index.html"; 
    // This is what every webserver does 
    // A CONVENTION: returns the same thing --> if you have a directory, and you ask for the contents of that directory, it returns the file index.html 
  }

  var contents;  
  metadata.contentType = MIMEtype(pathname);

  if(pathname.includes("number") && !pathname.includes("txt")){
    var check_number = pathname.slice(pathname.lastIndexOf("r") + 1);
    const file = await Deno.open("number.txt");
    Deno.writeTextFileSync("number.txt", "The number is " + check_number + "!");  
    pathname = "./number.html";
  }
  

  try {
    contents = await Deno.readFile(pathname);
  } catch (e) {
    contents = null;
  }
    if (!contents) {
    //contents = "File not found: " + pathname;
    metadata.contentType = "text/plain";
    metadata.status = 404;
    contents = await Deno.readFile("./error.html");
    //return new Response(contents, metadata);
    console.log("error on request for " + pathname);

  } 
  
  else {
    console.log("returning " + pathname + " of type " + metadata.contentType);
  }
  


  return new Response(contents, metadata);
  
}

Deno.serve(handler);