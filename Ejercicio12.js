class lectorArchivos {
    constructor(){
        this.nFiles = 0;
        this.fileArray;
        this.totalBytes = 0;

    }

    checkAPILine(){

           
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) 
        {  
            alert("Este navegador NO soporta la subida de archivos");
            return;
        
        }

    }
    
    getInfo() {
            this.totalBytes = 0;
            this.fileArray  = document.querySelector("input").files;
            this.nFiles = this.fileArray.length;

            var tit2 = "<h2>Info total de los archivos</h2>"
        for (var i = 0; i <  this.nFiles; i++) {
            this.totalBytes += this.fileArray[i].size;
        }
        var infoBasica="";
        for (var i = 0; i <  this.nFiles; i++) {
            infoBasica += "<p>Archivo[" + i +"] = "+ this.fileArray[i].name  + " Tamaño: " + this.fileArray[i].size +" bytes " + " Tipo: " + this.fileArray[i].type+"</p>" ;
        }
        

        $('input').before("" + tit2 +" <p>Total de bytes: " + this.totalBytes + "<p>" + infoBasica);
       
        this.mostrarDoc();
    }

    mostrarDoc(){
        var file;
     
        $('input').before("<h2>Contenido de los archivos</h2>");
        for (var i = 0; i <  this.nFiles; i++) {
            
            
            file = this.fileArray[i];
            
            this.read(file);


        }


    }


    read(file){

       var string = "<h3>"+file.name + "</h3>"
       var lector ;
       var regexJson = "application/json";
       var regexTxt = "text/plain";
       var regexxml = "text/xml";
      
            $('input').before("<section>"+string);


           
            if(file.type ===  regexJson || file.type === regexTxt || file.type === regexxml){
                $("h3:last").after("<p name=\"" +  file.name + "\"></p></section>");

                lector = new FileReader();

                lector.onload = function(evento){

                   
                    document.querySelector("p[name=\"" + file.name + "\"").innerText = lector.result;
                    
                }

                lector.readAsText(file);

            }else{
                string = "<p>Imposible leer archivo, formato no permitido.</p></section>";
                $('h3:last').before(string);
            }


    }


}
var lector = new lectorArchivos();