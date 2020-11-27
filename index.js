let jsonradio = document.getElementById('jsonradio');
let paramsradio = document.getElementById('paramsradio');
let addparam = document.getElementById('addparam');

let addedparamcount = 0;
function stringtodom(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
document.getElementById('parameterbox').style.display = 'none';
jsonradio.addEventListener('click',()=>{
    document.getElementById('jsonbox').style.display = 'block';
    document.getElementById('parameterbox').style.display = 'none';
    document.getElementById('params').style.display = 'none';
})
paramsradio.addEventListener('click',()=>{
    document.getElementById('jsonbox').style.display = 'none';
    document.getElementById('parameterbox').style.display = 'block';
    document.getElementById('params').style.display = 'block';
});
addparam.addEventListener('click',()=>{
    let params = document.getElementById('params');
    let string = `<div class="form-row my-2">
                    <label for="params" class="col-sm-2 col-form-label">Parameter ${addedparamcount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedparamcount + 2}" placeholder="Enter Parameter ${addedparamcount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedparamcount + 2}"
                            placeholder="Enter Parameter ${addedparamcount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteparam">-</button>
                </div>`;
    let paramselem = stringtodom(string);
    params.appendChild(paramselem);
    let deleteparam = document.getElementsByClassName('deleteparam');
    for(item of deleteparam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedparamcount++;
});

let submit = document.getElementById('submit'); 
submit.addEventListener('click',()=>{
    document.getElementById('responseprism').innerHTML = 'Please Wait... fetching response';
    let url = document.getElementById('urlbox').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype = document.querySelector("input[name='contenttype']:checked").value;

    if(contenttype == 'params'){
        data = {};
        for(i=0;i<addedparamcount+1;++i){
            if(document.getElementById('parameterkey' + (i+1)) != undefined){
            let key =document.getElementById('parameterkey' + (i+1)).value;
            let value =document.getElementById('parametervalue' + (i+1)).value;
            data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestjsontext').value;
    }
    if(requesttype == 'GET'){
        fetch(url,{
            method:'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseprism').innerHTML = text;
            Prism.highlightAll()
        });
    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responseprism').innerHTML = text;
            Prism.highlightAll()
        });
    }
})