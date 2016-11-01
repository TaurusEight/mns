
package main

import (
	"fmt"
	"encoding/json"
	"io/ioutil"
	"strings"
	"net/http"
	"net/http/cgi"
)


//
type Form struct {
	Mail string
	CID string
}  // end Form


//
type Result struct {
	Success bool  `json:"success"`
	Payload string `json:"payload"`
}  // end Result


//
func dump( content string ) {
	fmt.Println( "Content-type: application/json\n\n" )
	fmt.Println( content )
}  // end dump



// Parse the values from the HTTP request
func Parse( ) string {

	var req *http.Request
	var err error

	if req, err = cgi.Request(); err != nil {
		return err.Error()
	}  // end if err

	req.ParseForm()  // Parse all data in the form
	if req.Form[ "mail" ] == nil { return "no mail" }
	if req.Form[ "cid" ] == nil { return "no cid" }
	return req.Form[ "cid" ][ 0 ]

}  // end Parse


// Open and return the content for the requested resource
func ReadResource( cid string ) string {

	if cid != "tiger" && cid != "penguin" { return cid }
	name := "/var/www/html/mns/content/" + cid + ".html"
	html, _ := ioutil.ReadFile( name )
	return strings.Trim( string( html ), "\n " )

}  // end ReadResouce


// Entry into application
//-----------------------------------------------------------------------------
func main() {

	result := Result{ true, "Empty" }
	cid := Parse()

	result.Payload = ReadResource( cid )
	// Do something with form.Mail !!
	output, _ := json.Marshal( result )
	dump( string( output ) )

}  // end main
