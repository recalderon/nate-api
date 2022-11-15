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
    
        let response = await fetch('./api/posts/', {
          method: 'POST',
          body: JSON.stringify(new FormData(form))
        });
    
        let result = await response.json();
    
        alert(result.message);
    };
})