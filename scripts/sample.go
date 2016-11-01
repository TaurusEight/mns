

package main

import (
	"fmt"
	"encoding/json"
	"net/http"
	"net/http/cgi"
)



type Result_t struct {
	Success bool `json:"success"`
  Payload string `json:"payload"`
	Method string `json:"method"`
}  // end Result_t


func Parse() Result_t {

	result := Result_t{ true, "error reading values", "POST" }
	var r *http.Request
	var err error

	r, err = cgi.Request()  // get form values
	if err != nil {
		result.Payload = err.Error()
		return result
	}  // end if

	result.Method = r.Method
	r.ParseForm()
	if r.Form[ "one" ] != nil { result.Payload = r.Form[ "one" ][ 0 ] }

	return result

}  // end parse


//-----------------------------------------------------------------------------
func main() {

	fmt.Println( "Content-Type: application/json\n\n" )
	data, _ := json.Marshal( Parse() )
	fmt.Println( string( data ) )

}  // end main
