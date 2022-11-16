document.addEventListener('DOMContentLoaded', (event) => {
    var myModal = new bootstrap.Modal(document.getElementById("myModal"), {});
        document.onreadystatechange = function () {
        myModal.show();
        let aceitamusica = document.querySelector('button#play');
        let musicadeemo = document.querySelector('audio');
        aceitamusica.addEventListener('click', (event) =>{
            musicadeemo.play();
            myModal.hide();
        })
    };
    const player = new Plyr('audio', {
        resetOnEnd: true,
        controls: [
            'restart',
            'play',
            'progress',
            'current-time',
            'duration',
            'mute',
            'volume',
        ]
    });
    player.play();
    
    let form = document.querySelector('form');
    let rsvp = form.querySelector('input[name="rsvp"]');

    rsvp.addEventListener('change', (event) =>{
        if (rsvp.value == 'sim'){
            document.querySelector('#rsvp').classList.add('d-none');
            document.querySelector('#info').classList.remove('d-none');            
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