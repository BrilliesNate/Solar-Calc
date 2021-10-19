(function(root) {

    let Main = function() {
        this.message1 = "Message1......."
        this.message2 = "Message2"
    }

    let prot = Main.prototype;

    prot.logMessage1 = function() {
        console.log(this);
        let ipt = document.getElementById('date');
        Main.testval = "";
        // let self = this;
    }

    prot.logMessage2 = function() {
        console.log(this.message1);
    }

    let self = this;
    let logMessage2 = function() {
        console.log('look here');
    };

    function calcJulianDate() {

    }

    let a = new Main()
    root.a = a;
    a.logMessage1()
}(this))