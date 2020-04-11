var query = ""
var req = ""
var results = ""

customerAdd.onshow=function(){
    // set height of textarea control
    txtCustomer2_contents.style.height = "200px"
    query = "SELECT DISTINCT name FROM customer;"
    //alert(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

    if (req.status == 200) { //transit worked
        results = JSON.parse(req.responseText)
    
    if (results.length == 0)
        NSB.MsgBox("There are no customers.")
    else {        
        drpCustomer2.clear()
            for (i = 0; i <= results.length - 1; i++) {
                drpCustomer2.addItem(results[i][0]) }
    } // end else
  } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

btnSubmit2.onclick=function(){
  query = `INSERT INTO customer (name, street, city, state, zipcode) VALUES ("Jesse Antiques", "1113 F St", "Omaha", "NE", "68178")`
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

if (req.status == 200) {
    console.log(results)
    if (req.responseText == 500) {
      NSB.MsgBox("The customer was successfully added!")
    } else {
        NSB.MsgBox("There was an error when adding the customer.")
      }
  } else
      NSB.MsgBox("There was an error.")
  
  query = "SELECT DISTINCT name FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)
  
  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    
    if (results.length == 0)
      NSB.MsgBox("There are no customers in the database.")
    else {
      for (i = 0; i <= results.length - 1; i++) {
        let message = `The remaining customers in the database are: ${results}`
        txtCustomer2.value = message
      }
    }
  } else
      NSB.MsgBox("There was an error.")
}