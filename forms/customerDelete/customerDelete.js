var query = ""
var req = ""
var allCustData = ""
var custNameDel = ""
var results = ""

customerDelete.onshow=function(){
    // set height of textarea control
    txtCustomer1_contents.style.height = "200px"
    query = "SELECT DISTINCT name FROM customer;"
    //alert(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

    if (req.status == 200) { //transit worked
        allCustData = JSON.parse(req.responseText)
        console.log(allCustData)
    if (allCustData.length == 0)
        NSB.MsgBox("There are no customers.")
    else {        
        drpCustomer1.clear()
            for (i = 0; i <= allCustData.length - 1; i++) {
                drpCustomer1.addItem(allCustData[i][0]) }
    } // end else
  } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

btnSubmit1.onclick=function(){
    let custNameDel = drpCustomer1.selection
    
    let found = false
    for (i = 0; i <= allCustData.length - 1; i++) {
        
        if (custNameDel == allCustData[i]) {
            found = true
            break
        }
     }   
    if (found == false) 
       NSB.MsgBox("That customer name is not in the database.")
    else if (found == true) {
        query = 'DELETE FROM customer WHERE name LIKE ' + '"' + custNameDel + '"'
        //alert(query)
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

        if (req.status == 200) { //transit worked
        
            if (req.responseText == 500) {   // means the update succeeded
                NSB.MsgBox(`You have successfully deleted the customer name!`)
            } else 
                NSB.MsgBox(`There was a problem deleting the customer name.`)
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
        let message = `The customers remaining in the database are: ${results}`
        txtCustomer1.value = message
      }
    }
  } else
      NSB.MsgBox("There was an error.")
}
}