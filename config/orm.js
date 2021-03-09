//sql connection imported
var connection = require("./connection.js");

//this function helps with the sql syntax which allows us to pass 3 values
//into the sql query. To write query, we add 3 ?s. This function creates an 
//array of ?s
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


// this helper function converts object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  //pushes key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    //skips hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
     //if string w/ spaces = '' (Michael Jackson => 'Michael Jackson')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
  //ex: {name: 'Michael Jackson'} => ["name= 'Michael Jackson'"]
      arr.push(key + "=" + value);
    }
  }
  //makes array of strings = single comma-separated string
  return arr.toString();
}


// Object for SQL functions
  var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {burger_name:Veggie Burger , boolean: true/false}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
  

  delete: function(table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};




// Export orm object for the model 
module.exports = orm;