const firebaseConfig = {
    apiKey: "AIzaSyB_4v5kWCwRfPiOMHLFQG9TOumVFhHdIzk",
    authDomain: "web-5-fa8e2.firebaseapp.com",
    databaseURL: "https://web-5-fa8e2.firebaseio.com",
    projectId: "web-5-fa8e2",
    storageBucket: "web-5-fa8e2.appspot.com",
    messagingSenderId: "31378350966",
    appId: "1:31378350966:web:8d19cd7083b35e1da79057",
    measurementId: "G-4NMWEFYEPX"
};

firebase.initializeApp(firebaseConfig);
let database = firebase.database();
let storage = firebase.storage();

// * Get elements
let uploader = document.getElementById("uploader");
let fileButton = document.getElementById("fileButton");

// Listen for file selection
fileButton.addEventListener("change", function(e){
    // Get file
    let file = e.target.files[0];

    // Create a storage ref
    //storage.ref("folder_name/file_name")
    let storageRef = storage.ref(file.name);
    storageRef.put(file);


    // Upload file
    let task = storageRef.put(file);

    // Update progress bar
    task.on("state_changed",
        function progress(snapshot) {
            let percentage = (snapshot.bytesTransferred /
                snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },
        function error(err) {
            console.log("File error")
        },
        function complete() {
            console.log("File complete")
            const text_load_complete = document.getElementById("text_load_complete");
            text_load_complete.innerHTML = "File sent"
            //document.location.reload(true)
        }
        )

})