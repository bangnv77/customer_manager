$(document).ready(function(){
  // Open database - https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
  var db;
  var request = indexedDB.open('customermanager', 1);

  request.onupgradeneeded = function(e){
    var db = e.target.result;

    if(!db.objectStoreNames.contains('customers')){
      var os = db.createObjectStore('customers', { keyPath: "id", autoIncrement: true });
    }
  };

  // Success
  request.onsuccess = function(e){
    console.log('Success: Opened Database...');
    db = e.target.result;
    // Show Customers
    // showCustomers();
  };

  // Error
  request.onerror = function(e){
    console.log('Error: Could Not Open Database...');
  };
});

// Add Customer
function addCustomer(){
  var name = $('#name').val();
  var email = $('#email').val();

  var transaction = db.transaction(["customers"], "readwrite");
  // Ask for ObjectStore
  var store = transaction.objectStore("customers");

  // Define Customer
  var customer = {
    name: name,
    email: email
  }

  // Perform the Add
  var request = store.add(customer);

  // Success
  request.onsuccess = function(e){
    window.location.href = "index.html";
  };

  // Error
  request.onerror = function(e){
    alert("Sorry, the customer was not added");
    console.log('Error', e.target.error.name);
  };
};
