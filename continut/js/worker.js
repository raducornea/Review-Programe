onmessage = function(event){
    var from = event.data.from;
    var to = event.data.to;

    // ceva functii mai ciudate precum prime de calculat in paralel
    console.log(`Worker face treaba - de la ${from} to ${to}`);

    this.postMessage("Asta e rezultatul");
};