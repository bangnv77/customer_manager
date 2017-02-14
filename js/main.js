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
