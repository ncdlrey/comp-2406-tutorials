# Tutorial 2

## Tasks
1. Change simpleserver to use the standard Deno contentType. What code should this replace? 
   * Imported contentType with the following code: `import { contentType } from "jsr:@std/media-types"; `
   * Replaces the block of code from lines 16-30, mapping file extensions to their MIMEtype autmatically.

2. Change simplserver to serve files from /home/student/public_html rather than the current directory.
   Be sure to put some files in it! (Hint: you can grab HTML files from any webserver using wget or curl.)
   * Created a `public_html` file containing 2 files:
       * hello.html - a simple page designed on the spot
       * Club_Penguin.html - the wikipedia page for Club Penguin
       * Both html files were attained using the command `wget URL` in the terminal, while in the `public_html` directory
   * Declared a separate pathname: `var pathname = "/home/student/public_html" + new URL(req.url).pathname;` being sure to exclude the last '/' from the path
   
3. Change simpleserver to retrieve the file index.html when a directory is accessed. 
   * Determine if the pathname leads to a directory, and replace its pathname with `./index.html`
     
4, Change simpleserver so it returns a simple HTML error page in response to 404 errors (page not found). 
   (Hint: Make sure you keep all your JavaScript and HTML files in the same folder!)
   * Created an html file and used simple headings to create an Error 404 message
   * If the contents of a requested file called is zero (doesn't exist), replace it with the 404 html page. 
   
5. Change simpleserver so that when there is a request for the file "number5", 
   it returns a simple page or text file that says "The number is 5!".
   It should work when any positive integer is used instead of 5.
   * Create an additional text file to out put the message to (number.txt)
   * Create an additional html file to embed the .txt file into (numbers.html)
   * Extract the number from the request usng String manipulation
   * Write this number into the text file
   * Set the new pathname to the html file that is going to display the text file
   * In the html file, embed the textfil using the <embed> tab

   
