function incarcaPrograme(){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var text = this.responseText;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(text, "text/xml");
            
            // building our table - getting started
            var programsTable =
            "<br><br><br><br>" +
            "<div class='programs_container'>" +
                "<table class='programs_table'>" +
                    "<tr class='bold_row'>" +
                        "<td></td>" +
                        "<td>Link</td>" +
                        "<td>Logo</td>" +
                        "<td>Text</td>" +
                        "<td>Review</td>" +
                    "</tr>";

            // gathering all programs intel
            var programs = xmlDoc.getElementsByTagName("program");
            for(const program of programs)
            {
                // extracting the value from <tag>Value</tag> tags
                var program_title = program.getElementsByTagName("titlu")[0].childNodes[0].nodeValue;
                var program_link = program.getElementsByTagName("program_link")[0].childNodes[0].nodeValue;
                var program_image = program.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                var program_text = program.getElementsByTagName("text")[0].childNodes[0].nodeValue;
                var program_review = program.getElementsByTagName("review")[0].childNodes[0].nodeValue;
                
                // building our table - not done yet
                programsTable +=
                "<tr>" +
                    `<td class="bold_column">${program_title}</td>` +
                    `<td><a onclick="schimbaContinut('${program_link}')">Pagina ${program_title}</a></td>` +
                    `<td><img src="Imagini/${program_image}" style="width: 50px; height: 50px"/></td>` +
                    `<td>${program_text}</td>` +
                    `<td>${program_review}</td>` +
                "</tr></div>"
            }
            
            // finishing table build
            programsTable += "</table></div>";
            
            // updating page section
            document.getElementById("programe_page").innerHTML = programsTable;
        }
    };

    xhttp.open("GET", "resurse/programe.xml", true);
    xhttp.send();
}