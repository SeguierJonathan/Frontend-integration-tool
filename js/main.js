        
        //recuperation des élements utiles
        const load_button = document.getElementById("load_button");
        const fileInput = document.getElementById("fileInput");
        const image_maquette = document.getElementById("image_maquette");
        const text_load_image = document.getElementById("text_load_image")
        const clear_button = document.getElementById("clear_button");
        const work_content = document.getElementById("work_content");

        //declaration des variables utiles
        let startX = 0, startY = 0;
        let drawing = false;
        let drawTemp = null;
        let drawItems = [];
        let nextId = 0;
        let activeBalise = {color: 'red',text:'html'};


        load_button.addEventListener('click',() => {fileInput.click()});
        clear_button.addEventListener('click',()=> {
            image_maquette.src = "";
            text_load_image.style.display = "block";
        })

        work_content.addEventListener("mousedown", (e) => {
  
            const rect = work_content.getBoundingClientRect();

            drawing = true;
            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;
            
            const template = document.getElementById("drawbox");
            drawTempFragment = template.content.cloneNode(true);
        

            drawTemp = drawTempFragment.querySelector(".box");
            const vignette = drawTempFragment.querySelector(".vignette");

            vignette.textContent = activeBalise.text;
            
            drawTemp.classList.add('box-' + activeBalise.color)
            drawTemp.style.top = startY + "px";
            drawTemp.style.left = startX + "px";
            work_content.appendChild(drawTemp)
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

        function deleteAllDrawElement(){
            
            drawItems.forEach(e=>{
                e.element.remove();
            })
          
        }

        function selectBtn(btn){

            const buttons = document.querySelectorAll('.select1');

            buttons.forEach(b => {
                b.classList.remove('active');
            })

            btn.classList.add('active');
            
            const classes = btn.className.split(' ');
            const colorclass = classes.find(c => c.startsWith('btn-'));
            activeBalise.color = colorclass.replace('btn-','')
            activeBalise.text = btn.textContent;

        }