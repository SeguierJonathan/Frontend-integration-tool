        const load_button = document.getElementById("load_button");
        const fileInput = document.getElementById("fileInput");
        const image_maquette = document.getElementById("image_maquette");
        const text_load_image = document.getElementById("text_load_image")
        const clear_button = document.getElementById("clear_button");
        const work_content = document.getElementById("work_content");

        let lastFile = "";

        load_button.addEventListener('click',() => {fileInput.click()});
        clear_button.addEventListener('click',()=> {
            image_maquette.src = "";
            text_load_image.style.display = "block";
        })

        work_content.addEventListener("mousedown", () => {
            console.log("Bouton appuyé");
            console.log("downX =", event.clientX);
            console.log("downY =", event.clientY);
            const p = document.createElement('p');
            p.textContent="test";
            document.body.appendChild(p)
        });

        work_content.addEventListener("mouseup", () => {
            console.log("Bouton relâché");
            console.log("upX =", event.clientX);
            console.log("upY =", event.clientY);
        });

        fileInput.addEventListener('change',(event)=>{

            const file = event.target.files[0];

            if (!file) return;

            const url = URL.createObjectURL(file);
            lastFile = file;
            image_maquette.src=url;
            text_load_image.style.display = "none";

            //recharger la même image ne déclanche pas d'event "change" il faut donc reste l'input
            fileInput.value = '';


        });



        function loadImage(){
            
        }