var chatManager = new function(){
    var interval = 500;
    var oReq = new XMLHttpRequest();
    var finalNum=0;

    // Ajax result(new chat content) from server
    oReq.onreadystatechange = function()
    {   
        if(oReq.readyState === 4 && oReq.status === 200)
        {
            // JSON parsing
            var res = JSON.parse(oReq.responseText);
            // If data(res) exist, "show" function shows data and renew finalNum(to get lastest chat content)
            if(res.length !== 0){
                chatManager.show(res);
                finalNum = res[res.length-1].num;
            }
        }
    }

    // Periodic Ajax connection to server with num(to get lastest chat content)
    this.proc = function()
    {
        oReq.open("GET", "http://192.168.1.108:3000?num="+finalNum);
        oReq.send();
    }

    // Show chat content
    this.show = function(data)
    {
        var o = document.getElementById('list');
        var dt, dd;
        
        // Adding chat content
        for(var i=0; i<data.length; i++)
        {
            di = document.createElement('div');

            dt = document.createElement('dt');
			dt.appendChild(document.createTextNode(data[i].name));
			di.appendChild(dt);

			dd = document.createElement('dd');
			dd.appendChild(document.createTextNode(data[i].msg));
            di.appendChild(dd);
            
            o.appendChild(di);
        }

    }
    // Ajax connection to Server to put new chat content into Database;
    this.write = function(frm)
    {
        var xttp = new XMLHttpRequest();
        var name = frm.name.value;
        var msg  = frm.msg.value;
        var message = {
            name : frm.name.value,
            msg : frm.msg.value
        }
        // if you don't type name or massage, it doesn't work
        if(name.length == 0 || msg.length == 0)
		{
			return false;
        }
    
        xttp.open("POST", "http://192.168.1.108:3000/");
        xttp.setRequestHeader('Content-Type', 'application/json');
        xttp.send(JSON.stringify(message));
        
        frm.msg.value='';
    }

    setInterval(this.proc, interval);
}