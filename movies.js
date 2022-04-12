fetch("movies-small.json")
    .then(response => response.json())
    .then(data => {
        listMovies(data); //Utilise functions within .then scope
        sDropdown();
        eDropdown();
        let trigger = document.getElementById("search");
        trigger.onclick = function() {
            searchButton(data);
        }
        let refresh = document.getElementById("refresh");   //Additional function 1 - Display all films in the database
        refresh.onclick = function() {
            listMovies(data);
            document.getElementById('selectGenre').value = 'All';
            document.getElementById("selectYearStart").value = 1900;
            document.getElementById("selectYearEnd").value = 2021;
            document.getElementById('searchBar').value = '';
            //Alternative: window.location.reload(); reloads the webpage
        }
        let searching = document.getElementById("searchBar");
        searching.onkeyup = function() {
           castSearch(data);
        }
        //console.log(data[1].cast.length); //Addtional Function 2 testing
        //console.log(data[1].cast);  //Addtional Function 2 testing
    })
    .catch(error => console.log(error)); //alert error when error occurs
//List all movies
function listMovies (x) {
    let allMovies = '';
    for (let i = 0; i < x.length; i++) {
        allMovies += `
        <tr>
          <td>${x[i].year}</td>
          <td>${x[i].title}</td>
          <td>${x[i].cast}</td>
          <td>${x[i].genres}</td>
        </tr>
        `
        //${} to omit + (Ex: let abc = 'a' + x[i].year + 'c'; = let abc = `a${x[i].year}c`;)
        //`` to create multi-line strings
    }
    document.querySelector('#movieTable').innerHTML = allMovies;
    //innerHTML transfers the text to DOM while innerText is text only
    //document.querySelector works the same as JQuery $('#... ...')
    //('#movieTable tbody') means to find tbody within element id:movieTable
}
//Create start year dropdown list
var sDropdown = function() {
    let sYear = '';
    for (i=1900; i<=2021; i++){
        sYear += '<option>' + i + '</option>';
    }
    document.getElementById('selectYearStart').innerHTML = sYear;
}
//Create end year dropdown list
var eDropdown = function() {
    let eYear = '';
    for(i=2021; i>=1900; i--) {
        eYear += '<option>' + i + '</option>';
    }
    document.getElementById('selectYearEnd').innerHTML = eYear;
}
//Start year function    
function startYear(){
    let start = document.getElementById('selectYearStart').value;
    return start;
}
//End year function
function endYear(){
    let end = document.getElementById('selectYearEnd').value;
    return end;
}
//Genre function
function selectGenre(){
    let genre = document.getElementById('selectGenre').value;
    return genre;
}
//Create search button
function searchButton(x) {
    let temp = x.filter(element => {
        if (selectGenre() == 'All') {
            return element.year >= startYear() && element.year <= endYear();
        } else if (selectGenre() == 'None') {
            return element.year >= startYear() && element.year <= endYear() && element.genres.length == 0
            // "element.genres.length == 0" to represent empty genres objects
        } else {
            return element.year >= startYear() && element.year <= endYear() && element.genres.indexOf(selectGenre())>=0;
        }
    }); //Simple .filter example: data.filter(d => d.year >= 2010);
    if (endYear() < startYear()) {
        alert('Error! End year should be greater than start year!');    //Additonal function 3
    }
    let result = '';
    for (i=0; i<temp.length; i++){
        result += `
        <tr>
            <td>${temp[i].year}</td>
            <td>${temp[i].title}</td>
            <td>${temp[i].cast}</td>
            <td>${temp[i].genres}</td>
        </tr>
        ` 
    }
    document.querySelector('#movieTable').innerHTML = result;
}
//Onload function (Since dropdown list does not support onload) & Why did selectYear do?
window.onload = function () {
    document.getElementById('selectGenre').value = 'All';
    document.getElementById("selectYearStart").value = 1900;
    document.getElementById("selectYearEnd").value = 2021;
    document.getElementById('searchBar').value = '';
}
// Additional function 2 - Search bar for casts (Kind of works) //Line 24 & 25 are only for testing
function castSearch(x) {
    let name = document.getElementById('searchBar').value;      //Why does .value only work in function?
    let temp = x.filter(element => {
        for (i=0; i<element.cast.length; i++) {
            return element.cast[i].indexOf(name) >-1;
        }
    })
    let html = '';
    for (i=0; i<temp.length; i++) {
        html += `
        <tr>
            <td>${temp[i].year}</td>
            <td>${temp[i].title}</td>
            <td>${temp[i].cast}</td>
            <td>${temp[i].genres}</td>
        </tr>
        `
        document.querySelector('#movieTable').innerHTML = html;
    }
}