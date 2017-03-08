
function make_clicker () {
 
    var clicker_client = {};

    // Set up Peer.js
    clicker_client.peer = new Peer(
        {
            key: clicker.api_key,
            config: {'iceServers': clicker.iceServers}
        }
    );
    
    // Find out our ID
    clicker_client.peer.on('open', function(id){
        clicker_client.id = id;
        console.log("Peer.js connected as " + id);
    });

    // Connect to clicker server
    clicker_client.conn = clicker_client.peer.connect(clicker.servername);

    // Enable everything when connected
    clicker_client.conn.on('open', function(){
        // We are now connected
        clicker_client.connected = true;
        $(".response-field").removeClass("disabled");
        clicker_client.conn.send({
            type: "notify",
            data: clicker_client.id
        });
        console.log("Connected to clicker server");
    });

    // Submit an answer
    clicker_client.submit = function(response){
        if(clicker_client.connected){
            clicker_client.conn.send({
                type: "answer-submit",
                data: response
            });
        }
    }
    

    return clicker_client;
}


var clicker_client;
window.onload = function () {
    clicker_client = make_clicker();
}
