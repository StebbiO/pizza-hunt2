let db;

const request = indexedDB.open('pizza_hunt', 1);

request.onupgradeneeded = function(event) {
    // save a reference to the database
    const db = event.target.result;
    // create an object store (table) called new_pizza, set it to have an auto incrementing primary key
    db.createObjectStore('new_pizza', { autoIncrement: true });
}

// upon success
request.onsuccess = function(event) {
    // when db is successfully created with its object store or established connection, save reference to db in global varialbe
    db = event.target.result;

    //check if app is online, if yes run uploadPizza() function to send all local db data to api
    if (navigator.online) {
        // uploadPizza()
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// function will execute if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access the object store for new_pizza
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    // add record to store with add method
    pizzaObjectStore.add(record);
}