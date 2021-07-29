        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        document.addEventListener('keydown', pressedkeys)
        document.addEventListener('keyup', reset)
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //Game Over
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        function gameDone(){alert("Game Over")}
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        // Change key colour
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        function pressedkeys(e){
            switch (e.code) {
                case "ArrowUp":
                    try{GamePiece.up()}catch (error) {}
                    changeButtonColor("up")
                    break;
                case "ArrowLeft":
                    try{GamePiece.left()}catch (error) {}
                    changeButtonColor("left")
                    break;
                case "ArrowRight":
                    try{GamePiece.right()}catch (error) {}
                    changeButtonColor("right")
                    break;
                case "ArrowDown":
                    try{GamePiece.down()}catch (error) {}
                    changeButtonColor("down")
                    break;
                default:
                    break;
        }}
        function changeButtonColor(id){
            var active = document.getElementById(id)
            active.style.color = "salmon";
        }
        function reset(){
            var a = document.getElementById("up")
            a.style.color = 'rgba(0,250,250,1)';
            a = document.getElementById("down")
            a.style.color = 'rgba(0,250,250,1)';
            a = document.getElementById("right")
            a.style.color = 'rgba(0,250,250,1)';
            a = document.getElementById("left")
            a.style.color = 'rgba(0,250,250,1)';
        }    
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        const block = document.getElementById("gameFloor")
        const status = document.getElementById("alarmStat")
        const xAudio = document.getElementById("playerAudio")
        let GamePiece;
        let disabled = false;
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\

        var FloorMap = {
            canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 600;
            this.canvas.height = 600;
            this.context = this.canvas.getContext("2d");
            block.insertBefore(this.canvas, block.childNodes[0])
            this.interval = setInterval(updateMap, 20);
            },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }

        function updateMap() {
            checkAlarm();
            FloorMap.clear();
            GamePiece.newPos();    
            GamePiece.update();
        }

        function allmight(x,y){
            if (disabled){
                status.style.backgroundColor = "red"
                playAudio()
            }
            else if (x >= 76.28 || y >= 76.28 ||y <= 17.52||x <=17.52){
                status.style.backgroundColor = "orange";
            }else{
                status.style.backgroundColor = "beige";
            }
            
        }
        function resetall(){
            xAudio.pause()
            status.style.backgroundColor = "beige";
            disabled = false
        }
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        //\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\//\\
        function startGame(){
            resetall()
            GamePiece = new component(10,10,"aqua", 295, 295);
            FloorMap.start();
        }
        function checkAlarm(){
            var leftRight = GamePiece.x/(2*Math.PI)
            var Updown = GamePiece.y/(2*Math.PI)
            allmight(leftRight, Updown)
            if(leftRight >= 93.8){disabled = true}
            if(leftRight <= 0){disabled = true}
            if(Updown >= 93.8){disabled = true}
            if(Updown <= 0){disabled = true}
        }
        function givelox(){

        }

        function component (width, height, color, x, y) {
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;    
            this.update = function() {
                ctx = FloorMap.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            this.newPos = function() {
                this.x += this.speedX;
                this.y += this.speedY;        
            }
            this.up = function (){if (!disabled)    {this.y -= 5}}
            this.down = function (){if (!disabled)  {this.y += 5}}
            this.right = function (){if (!disabled) {this.x += 5}}
            this.left = function (){if (!disabled)  {this.x -= 5}}
        }
        function playAudio(){
            xAudio.play();
        }
        
       