        
        //recuperation des élements utiles
        const fileInput = document.getElementById("fileInput");
        const image_maquette = document.getElementById("image_maquette");
        const text_load_image = document.getElementById("text_load_image")
        const work_content = document.getElementById("work_content");

        //declaration des variables utiles
        let startX = 0, startY = 0;
        let drawing = false;
        let templateClone= null;
        let drawBox = null;
        let drawBoxs = [];
        let nextId = 0;
        let activeBalise = {color: 'red',text: 'html'};

        document.addEventListener("dblclick", (e) => {
            console.log(document.elementFromPoint(e.clientX,e.clientY));
        })

        work_content.addEventListener("mousedown", (e) => {
  
            switch(e.button) {
                case 0:
                    
                    //récupère la zone de dessin
                    const rect = work_content.getBoundingClientRect();

                    //récupère la radio checked
                    const select = document.querySelector('input[name="color"]:checked');

                    //active le dessin d'une box 
                    drawing = true;

                    startX = e.clientX - rect.left;
                    startY = e.clientY - rect.top;
                    
                    //récupère le template pour crée un enfant
                    const template = document.getElementById("drawbox");
                    templateClone = template.content.cloneNode(true);
                

                    drawBox = templateClone.querySelector(".box");
                    
                    //const vignette = templateClone.querySelector(".vignette");
                    //vignette.textContent = activeBalise.text;
                    
                    drawBox.classList.add('box-' + select.value)
                    drawBox.style.top = startY + "px";
                    drawBox.style.left = startX + "px";
                    work_content.appendChild(drawBox)
                    break;
                case 1:

                    const element = document.elementFromPoint(e.clientX,e.clientY);

                    if (element.classList.contains("box")){
                        element.remove();
                    };
                    break;
            
                }

            
        });

        work_content.addEventListener("mousemove", (e) =>{
            createBox(e);
        })        

        work_content.addEventListener("mouseleave", (e) => {
            leaveBox();
        });

        work_content.addEventListener("mouseup", (e) => {
            leaveBox();
        });

        fileInput.addEventListener('change',(event)=>{

            const file = event.target.files[0];

            if (!file) return;

            const url = URL.createObjectURL(file);
            image_maquette.src=url;
            text_load_image.style.display = "none";

            //recharger la même image ne déclanche pas d'event "change" il faut donc reste l'input
            fileInput.value = '';


        });


        function createBox(e){
            if (!drawing || !drawBox) return;

            const rect = work_content.getBoundingClientRect();

            currentX = e.clientX - rect.left;
            currentY = e.clientY - rect.top;

            const top = Math.min(startY, currentY);
            const left = Math.min(startX, currentX);
            const width = Math.abs(startX - currentX)
            const height = Math.abs(startY - currentY);

            drawBox.style.top = top + "px";
            drawBox.style.left = left + "px";
            drawBox.style.width = width + "px";
            drawBox.style.height = height + "px";

        }

        function updateBox(){

        }

        function leaveBox(){
          if (!drawing) return;

            //active et focus sur input
            const input = drawBox.querySelector('input[name="vignette"]');
            const vignette = drawBox.querySelector(".vignette");
            
            console.log(input)

            input.classList.add('active');
            input.focus();

            //évent aprés perte du focus
            input.addEventListener('blur',(e) => {
               const text = input.value;
               input.classList.remove('active');
               vignette.textContent = text;
               vignette.classList.add('active');
            })

            input.addEventListener('keydown', (e)=>{
                if(e.key === 'Enter' || e.key === 'Escape'){
                    input.blur();
                }
            })

            addDrawElement(drawBox);
            drawing = false;
            drawBox = null;
            templateClone = null;
        }

        function addDrawElement(element){
            const id = ++nextId;
            drawBoxs.push({
                id: id,
                left: parseFloat(element.style.left),
                top: parseFloat(element.style.top),
                width: parseFloat(element.style.width),
                height: parseFloat(element.style.height),
                element: drawBox
            })            
        }


        function clearImage(){
            image_maquette.src = "";
            text_load_image.style.display = "block";
        }

        function loadImage(){fileInput.click()}

        function deleteAllDrawElement(){
            
            drawBoxs.forEach(e=>{
                e.element.remove();
            })
          
        }

        function selectBtn(btn){

            const buttons = document.querySelectorAll('.btn-group-1');

            buttons.forEach(b => {
                b.classList.remove('active');
            })

            btn.classList.add('active');
            
            const colorclass = btn.classList[1];
            activeBalise.color = colorclass.replace('btn-','')
            activeBalise.text = btn.textContent;

        }

        function scaleImage(scale){

            const image = document.getElementById("image_maquette")

            switch(scale.textContent){
                case "25%":
                    image.style.width = "25%";
                break;
                case "50%":
                    image.style.width = "50%";
                break;
                case "75%":
                    image.style.width = "75%";
                break;
                case "100%":
                    image.style.width = "100%";
                break;
            }
        }