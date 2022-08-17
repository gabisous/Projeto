function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        
    } else {
        menuMobile.classList.add('open');
    }  
  }

  // Chamado após a entrada do formulário ser processada
// Atualiza #messages div para rolagem automática
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}


function startConnect() {
    // Gerar um ID de cliente aleatório
    clientID = "clientID-" + parseInt(Math.random() * 100);

    // Busque o nome do host/endereço IP e o número da porta do formulário
    host = "mqtt.eclipseprojects.io/mqtt";    
    port = "80";

    // Saída de impressão para o usuário no div de mensagens
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';
    
    //Inicialize a nova conexão do cliente Paho
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Definir manipuladores de retorno de chamada
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Conecte o cliente, se for bem-sucedido, chame a função onConnect
    client.connect({ 
        onSuccess: onConnect,
    });
}

// Chamado quando o cliente se conecta
function onConnect() {
    // Buscar o tópico MQTT do formulário
    topic = "/testtopic/10";

    // Saída de impressão para o usuário no div de mensagens
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic + '</span><br/>';

    // Inscreva-se no tópico solicitado
    client.subscribe(topic);
}
// Chamado quando o cliente perde sua conexão
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}


// Chamado quando uma mensagem chega
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    document.getElementById("messages").innerHTML +=  message.payloadString + '</span><br/>';
    updateScroll();
}


// Chamado quando o botão de desconexão é pressionado
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    
}
  // This is the function which handles button clicks
  function myButtonWasClicked1() {
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("Ligar");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "/testtopic/10";
  
    // Publish the message
    client.send(mqttMessage);
  }
  // This is the function which handles button clicks
  function myButtonWasClicked2() {
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("Desligar");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "/testtopic/10";
    
    // Publish the message
    client.send(mqttMessage);
  }