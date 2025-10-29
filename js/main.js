        
        //recuperation des élements utiles
        const fileInput = document.getElementById("fileInput");
        const image_maquette = document.getElementById("image_maquette");
        const text_load_image = document.getElementById("text_load_image")
        const work_content = document.getElementById("work_content");

        //declaration des variables utiles
        let startX = 0, startY = 0;
        let drawing = false;
        let drawTemp = null;
        let drawItems = [];
        let nextId = 0;
        let activeBalise = {color: 'red',text:'html'};

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
                    drawTempFragment = template.content.cloneNode(true);
                

                    drawTemp = drawTempFragment.querySelector(".box");
                    const vignette = drawTempFragment.querySelector(".vignette");

                    vignette.textContent = activeBalise.text;
                    
                    drawTemp.classList.add('box-' + select.value)
                    drawTemp.style.top = startY + "px";
                    drawTemp.style.left = startX + "px";
                    work_content.appendChild(drawTemp)
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

            if (!drawing || !drawTemp) return;

            const rect = work_content.getBoundingClientRect();

            currentX = e.clientX - rect.left;
            currentY = e.clientY - rect.top;

            const top = Math.min(startY, currentY);
            const left = Math.min(startX, currentX);
            const width = Math.abs(startX - currentX)
            const height = Math.abs(startY - currentY);

            drawTemp.style.top = top + "px";
            drawTemp.style.left = left + "px";
            drawTemp.style.width = width + "px";
            drawTemp.style.height = height + "px";

        })        

        work_content.addEventListener("mouseleave", (e) => {

            if (!drawing) return;
            addDrawElement(drawTemp);
            drawing = false;
            drawtemp = null;
        });

        work_content.addEventListener("mouseup", (e) => {

            if (!drawing) return;
            
            addDrawElement(drawTemp);
            drawing = false;
            drawtemp = null;
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



        function addDrawElement(element){
            const id = ++nextId;
            drawItems.push({
                id: id,
                left: parseFloat(element.style.left),
                top: parseFloat(element.style.top),
                width: parseFloat(element.style.width),
                height: parseFloat(element.style.height),
                element: drawTemp
            })            
        }


        function clearImage(){
            image_maquette.src = "";
            text_load_image.style.display = "block";
        }

        function loadImage(){fileInput.click()}

        function deleteAllDrawElement(){
            
            drawItems.forEach(e=>{
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