module.exports = function(){
    return `
        <html>
            <head>
                <title>web-test-title</title>
                <style>
                    h1{
                        color:red;
                    }
                    div{
                        height:100px;
                        border:1px solid blue;
                    }
                    p{
                        border:1px solid orange;
                    }
                </style>
            </head>
            <body>
                <h1>Hello World!</h1>
                <p>Programming is fun!!</p>
                <button id="btn">btn</button>
                <div id="box"></div>
            </body>
            <script>
                var btn = document.getElementById("btn");
                btn.addEventListener("click",function(){
                    console.log("click!");
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET","http://192.168.1.223:3000/injection");  // Ajax connect
                    oReq.send();
                    oReq.onreadystatechange = function(){           // Ajax result from Server
                        if(oReq.readyState === 4 && oReq.status === 200){
                            console.log("received!!");
                            console.log(oReq.responseText);
                            document.querySelector('div').innerHTML = oReq.responseText;
                        }
                    }
                })

                function _AJAX_FUNC(){
                    var oReq = new XMLHttpRequest();
                    oReq.open("GET","http://192.168.1.223:3000/injection");  // Ajax connect
                    oReq.send();
                }
            </script>
        </html>
    `
}