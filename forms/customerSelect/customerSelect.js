var query = ""
var req = ""
var results = ""

customerSelect.onshow=function(){
    // set height of textarea control
    txtCustomer_contents.style.height = "200px"
    query = "SELECT DISTINCT name FROM customer;"
    //alert(query)
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

    if (req.status == 200) { //transit worked
        results = JSON.parse(req.responseText)
    
    if (results.length == 0)
        NSB.MsgBox("There are no customers.")
    else {        
        drpCustomer.clear()
            for (i = 0; i <= results.length - 1; i++) {
                drpCustomer.addItem(results[i][0]) }
    } // end else
  } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

drpCustomer.onclick=function(select){
if (typeof(select) == "object"){  
    return                     
  } else {
let customerNameSelected=drpCustomer.selection
  query='SELECT state FROM customer WHERE name LIKE ' + '"' + customerNameSelected + '"'
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)
 
     if (req.status == 200) { //transit worked
        results = JSON.parse(req.responseText)
        console.log(results)
        
    } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
  }
}


btnSubmit.onclick=function(){
let customerStateSelected=results
  query = 'SELECT DISTINCT name FROM customer WHERE state LIKE ' + '"' + customerStateSelected + '"'
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=alt49968&pass=Bballsoccer24!&database=alt49968&query=" + query)

if (req.status == 200) { //transit worked
        results = JSON.parse(req.responseText)
        console.log(results)
        
    if (results.length == 0)
        NSB.MsgBox("There are no customers with that same state.")
    else {        
        let message = `The customer you selected has the state: ${customerStateSelected}. Other customers with this same state are: ${results}`
        txtCustomer.value = message
    } // end else
  } else
        //transit error - Handle that with an error message.
        NSB.MsgBox("Error code: " + req.status)
}

/*Question: What is the name of the php script that we are running on the database server? 
SQL
Question: What type of variable is 'req1'? For example, in this code: let name = "Bob" the type of variable 'name' is 'string'.
Object
Question: How many arguments does our Ajax function require? Explain each one briefly in your own words.
Hint: there are less than 5
The function gets passed three arguments: The data returned from the server; a string describing the status; and the jqXHR object.
Question: In 'req.status', is 'status' a method or a property? What does a status value of 200 indicate? What about 500, in the case of our server? 
Property; 200 indicates the transit was successful and without error; 500 indicates that a query that doesn't return data worked correctly
Question: Explain in your own words (plain English) the structure of the query results that the Ajax function call returns to your app in the variable req.responseText. 
When receiving data from a web server, the data is always a long string. The results are in one big array (the entire results array), and thebig array contains various small arrays. Each of the small arrays is a row (record) from the database that matched the query. 
Question: Explain what the code below does and describe the structure of what is put into the 'results' variable.
       results = JSON.parse(req.responseText)
You parse the req.responseText data with JSON.parse(), and the data becomes a JavaScript object.*/