var query = ""
var req = ""
var results = ""

customerUpdate.onshow=function(){
    // set height of textarea control
    txtCustomer11_contents.style.height = "200px"
    query = "SELECT DISTINCT name FROM customer;"
    //alert(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

    if (req.status == 200) { //transit worked
        results = JSON.parse(req.responseText)
    
    if (results.length == 0)
        NSB.MsgBox("There are no customers.")
    else {        
        drpCustomer11.clear()
            for (i = 0; i <= results.length - 1; i++) {
                drpCustomer11.addItem(results[i][0]) }
    } // end else
  } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

btnSubmit11.onclick=function(){
    let newName = inptUpdate.value
    let oldName = drpCustomer11.selection
    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        
        if (oldName == results[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
        query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + oldName + '"'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

        if (req.status == 200) { //transit worked
        
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully changed the customer name!`)
                // reset controls to original state
                inptUpdate.value = ""
                drpCustomer11.value = ""
            } else 
                NSB.MsgBox(`There was a problem changing the customer name.`)
        } else 
            // transit error
            NSB.MsgBox(`Error: ${req.status}`);

query = "SELECT DISTINCT name FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)
  
  if (req.status == 200) {
    results = JSON.parse(req.responseText)
    console.log(results)
    
    if (results.length == 0)
      NSB.MsgBox("There are no customers in the database.")
    else {
      for (i = 0; i <= results.length - 1; i++) {
        let message = `The customers in the database are: ${results}`
        txtCustomer11.value = message
      }
    }
  } else
      NSB.MsgBox("There was an error.")
}
}