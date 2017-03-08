function clicker_server () {

    var server = {};
    server.question_data = [];

    // Empty the question array for a new question
    server.new_question = function () {
        server.question_data = [];
        server.update_totals();
        server.update_responses();
    }

    // Put a table into the given jQuery selector, filled with the given data
    function makeTable(selector, data) {
        var table = $(selector).empty();
        for (var ind in data) {
            var row = $("<tr/>");
            
            row.append($("<td/>").text(ind));
            row.append($("<td/>").text(data[ind]));

            table.append(row);
        };
    }

    // Makes a set of progress bars from labeled data fields
    function makeGraph(selector, data){
        var div = $(selector).empty();
        var sum = 0;
        
        for (var ind in data){
            // Compute sum of elements
            sum += data[ind];
        }

        for (var ind in data){
            var percent = 0;
            if(sum != 0) // Don't divide by zero - it's silly
                var percent = data[ind]/sum * 100;
            var bar = '<div class="progress">'+
                '<div class="progress-bar" role="progressbar" aria-valuenow="'+
                percent+'" aria-valuemin="0" aria-valuemax="100" style="min-width: 5em; width: '+
                percent+'%">'+ind+': '+percent.toFixed(1)+'%</div></div>';
            div.append(bar);
        };

    }


    // Update the response list table
    server.update_responses = function (){
        makeTable("#response-list", server.question_data);
    }

    // Update the total response table
    server.update_totals = function (){
        var totals = [];
        totals['A'] = 0;
        totals['B'] = 0;
        totals['C'] = 0;
        totals['D'] = 0;
        totals['E'] = 0;
        totals['F'] = 0;
        // Tally up the results
        for (var ind in server.question_data)
        {
            var resp = server.question_data[ind];
            
            if(!totals[resp]) totals[resp] = 0;
            
            totals[resp] ++ ;
        }


        // Make progress bars
        makeGraph("#summary_graph", totals);
        
    }

    
    // make new connection as server (i.e. init)
    server.peer = new Peer(
        clicker.servername,
        {
            key: clicker.api_key,
            config: {'iceServers': clicker.iceServers}
        }
    );

    // Log when connected
    server.peer.on('open', function(id){
        console.log("Peer.js connected as " + id);
    });
    
    // set up connection handler
    server.peer.on('connection', function(conn){
        
        console.log("Got connection");

        // Set up data handler
        conn.on('data', function(data) {
            console.log('Received: type: ', data.type, ", data", data.data);

            // If the connection submits an answer, update the array, and tables
            if(data.type == "answer-submit")
            {
                server.question_data[conn.peer] = data.data;
            }
            server.update_responses();
            server.update_totals();
        });

    });

    server.toggle_visible = function (selector){
        $(selector).toggle();
    }
    
    return server;
};


var server;

window.onload = function(){
    server = clicker_server();
    server.new_question();
}
