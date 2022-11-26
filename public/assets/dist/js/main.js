
var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
document.onreadystatechange = function () {
    myModal.show();
    let aceitamusica = document.querySelector('button#play');
    aceitamusica.addEventListener('click', (event) => {
        const player = new Plyr('audio', {
            resetOnEnd: true,
            controls: [
                'play',
                'progress',
            ]
        });
        player.play();
        myModal.hide();
    })
};

document.addEventListener('DOMContentLoaded', (event) => {

    let form = document.querySelector('form');
    let rsvps = form.querySelectorAll('input[name="rsvp"]');
    let continuar = form.querySelector('button.continuar');
    let submitzada = form.querySelector('button[type="submit"]');
    let inputnome = form.querySelector('input[name="nomecompleto"]');
    let inputqtd = form.querySelector('input[name="qtd"]');
    let inputgoodie = form.querySelector('input[name="goodies"]');
    let moregoodies = form.querySelector('button#more-goodies')

    let traduzir = document.querySelector('#traduzir')

    traduzir.addEventListener('click', (event) =>{
        document.querySelector('#conviteuwu').classList.toggle('d-none');
        document.querySelector('#convitenormie').classList.toggle('d-none');
    })


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
                        form.querySelector('button[type=submit]').classList.remove('d-none');
                        document.querySelector("#resposta").textContent = 'sim'
                        moregoodies.addEventListener('click', (event) => {
                            let menu = document.querySelector('.goodies');
                            let clonedMenu = menu.cloneNode(true);
                            clonedMenu.classList.add('mt-2')
                            clonedMenu.querySelectorAll('input').forEach((clonedinput) => {
                                clonedinput.id = '';
                                clonedinput.name = '';
                                clonedinput.required = false;
                                clonedinput.value = '';
                                clonedinput.classList.add('extra-goodies')
                            })
                            document.querySelector('#goodies-wrapper').appendChild(clonedMenu);
                        })

                    }
                })
                submitzada.addEventListener('click', (event) => {
                        form.querySelector('#goodies-wrapper').classList.add('d-none');
                })
            }else if(this.value == 'nao'){
                form.querySelector('button[type=submit]').classList.remove('d-none');
                let allinput = form.querySelectorAll('input[type="text"]')
                allinput.forEach(element => {
                    element.disabled = true;
                });
                document.querySelector("#resposta").textContent = 'nao'

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

        const arraygoodies = [...form.querySelectorAll('.goodies input')].map(option => option.value);
        const res = [];

        for(let i = 0; i < arraygoodies.length; i+=2){
            res.push({qtd:arraygoodies[i], goodies: arraygoodies[i + 1]});
        }

        dados.append('goodies', JSON.stringify(res))

        // Display the key/value pairs
        for (var pair of dados.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        // //send data
        let response = await fetch('/api/goodies', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(dados))
        });

        let result = await response.json();
        let message = document.querySelector('#ok')

        if (result.success == true) {
            form.classList.add('d-none')
            if (document.querySelector("#resposta").textContent == 'sim'){
                document.querySelector('#ok').classList.remove('d-none');
            }else{
                document.querySelector('#no').classList.remove('d-none');
            }
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