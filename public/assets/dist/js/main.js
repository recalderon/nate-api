document.addEventListener('DOMContentLoaded', (event) => {
    const player = new Plyr('audio', {
        resetOnEnd: true,
        controls: [
            'play',
            'progress',
        ]
    });
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
    document.onreadystatechange = function () {
        myModal.show();
        let aceitamusica = document.querySelector('button#play');
        aceitamusica.addEventListener('click', (event) => {
            player.play();
            myModal.hide();
        })
    };

    let form = document.querySelector('form');
    let rsvps = form.querySelectorAll('input[name="rsvp"]');
    let continuar = form.querySelector('button.continuar');
    let submitzada = form.querySelector('button[type="submit"]');
    let inputnome = form.querySelector('input[name="nomecompleto"]');
    let inputqtd = form.querySelector('input[name="goodies-qtd"]');
    let inputgoodie = form.querySelector('input[name="goodies"]');


    for(var i = 0; i < rsvps.length; i++) {
        rsvps[i].onclick = function () {
            if (this.value == 'sim'){
                form.querySelector('#rsvp').classList.add('d-none');
                form.querySelector('#nome').classList.remove('d-none');
                continuar.addEventListener('click', (event) => {
                    if (inputnome.value == ''){
                        inputnome.classList.add('is-invalid')
                    }else{
                        inputnome.classList.remove('is-invalid')
                        form.querySelector('#nome').classList.add('d-none');
                        form.querySelector('#goodies-wrapper').classList.remove('d-none');
                        form.querySelector('#last-wrapper').classList.remove('d-none');
                    }
                })
                submitzada.addEventListener('click', (event) => {
                    if (inputqtd.value == '' || inputgoodie.value == ''){
                        inputqtd.classList.add('is-invalid')
                        inputgoodie.classList.add('is-invalid')
                    }else{
                        inputqtd.classList.remove('is-invalid')
                        inputgoodie.classList.remove('is-invalid')
                        form.querySelector('#goodies-wrapper').classList.add('d-none');
                    }
                })
            }else if(this.value == 'nao'){
                form.querySelector('#last-wrapper').classList.remove('d-none');
            }
        };
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        let form = document.querySelector('form');
        let dados = new FormData(form);
        let param = new URLSearchParams(document.location.search);
        let arroba = param.get('convidado')
        dados.append('convidado', arroba);

        let response = await fetch('/api/goodies', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(dados))
        });

        let result = await response.json();
        let message = document.querySelector('.message')

        if (result.success == true) {
            form.classList.add('d-none')
            message.classList.remove('d-none')
        }
    };

    async function fetchGoodiesJSON() {
        const response = await fetch('/api/goodies');
        const goodies = await response.json();
        return goodies;
    }
    fetchGoodiesJSON().then(goodie => {    
        let retorno = JSON.stringify(goodie.message);
        let data = JSON.parse(retorno);
        const list = document.createElement("div");
        var title = document.createElement("h4");
        var itembase = document.createElement("input");
        var itembase2 = document.createElement("input");
        title.textContent = 'O que temos até agora...'
        list.appendChild(title);
        itembase.disabled = true;
        list.appendChild(itembase)
        itembase2.disabled = true;
        list.appendChild(itembase2)
        for (let i of data) {
            var itemqtdgoodies = document.createElement("input");
            console.debug(i)
            itemqtdgoodies.classList.add('chihuahua')
            itemqtdgoodies.value = i.qtd;
            list.appendChild(itemqtdgoodies);
            var item = document.createElement("input");
            item.value = i.goodies;
            list.appendChild(item);
            list.classList.add('grocery-list');
            document.querySelector('#goodiesmodal .modal-body .box-2').appendChild(list);
        }
    });

})