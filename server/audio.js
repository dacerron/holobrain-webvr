var Audio = (function() {
    var BinaryServer = require('binaryjs').BinaryServer;
    
    function createBinaryServer(server, sessionKey) {
        var binaryServer = new BinaryServer({server: server});
        binaryServer.on('connection', function(client) {
            console.log('audio connection started');

            client.on('stream', function(stream, meta) {
                console.log(">>>Incoming audio stream");

                //broadcast to other clients
                for(var id in binaryServer.client) {
                    if(binaryServer.clients.hasOwnProperty(id)) {
                        var otherClient = binaryServer.clients[id];
                        if(otherClient != client) {
                            var send = otherClient.createStream(meta);
                            stream.pipe(send);
                        }
                    }
                }
                stream.on('end', function() {
                    console.log("|||Audio stream ended");
                })
            });
        });
        console.log("created binary server for " + sessionKey);
        return binaryServer;
    }

    return {
        createBinaryServer
    }
})()

module.exports = Audio;