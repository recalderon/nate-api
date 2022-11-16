document.addEventListener('DOMContentLoaded', (event) => {
    const player = new Plyr('audio', {
        resetOnEnd: true,
        controls: [ 
            'play',
            'progress',
        ]
    });
    const player2 = new Plyr('video', {
        resetOnEnd: true,
        controls: []
    });
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
        document.onreadystatechange = function () {
        myModal.show();
        let aceitamusica = document.querySelector('button#play');
        aceitamusica.addEventListener('click', (event) =>{
            player.play();
            player2.play();
            myModal.hide();
        })
    };
    
    let form = document.querySelector('form');
    let rsvp = form.querySelector('input[name="rsvp"]');
    let continuar = form.querySelector('button.continuar');

    rsvp.addEventListener('change', (event) =>{
        if (rsvp.value == 'sim'){
            document.querySelector('#rsvp').classList.add('d-none');
            document.querySelector('#nome').classList.remove('d-none');
            continuar.addEventListener('click', (event) =>{
                document.querySelector('#nome').classList.add('d-none');
                document.querySelector('#goodies-wrapper').classList.remove('d-none');
            })      
        }
    })

    form.onsubmit = async (e) => {
        e.preventDefault();
        let form = document.querySelector('form');
        let dados = new FormData(form)    
        let response = await fetch('./api/posts', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(dados))
        });
    
        let result = await response.json();
        
        if (result.success == true){
            form.classList.add('d-none')
        }
    };
})