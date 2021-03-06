const datastore = [
    {id: 0, artist: "Mike", song: "loving", time: "5", rating:"5", genre:"Pop", album:"Mend",},
    {id: 1, artist: "John", song: "like", time: "2", rating:"4", genre:"Rock", album:"Great"},
    {id: 2, artist: "DOE", song: "ride", time: "9", rating:"3", genre:"Rock", album:"Zend"},
    {id: 3, artist: "Tim", song: "side", time: "15", rating:"1", genre:"Blues", album:"Mend"},
    {id: 4, artist: "Tupac", song: "live", time: "5", rating:"5", genre:"Pop", album:"Tupac 4 real",},
    {id: 5, artist: "James", song: "liquid", time: "2", rating:"4", genre:"Rock", album:"Big boys"},
    {id: 6, artist: "Duke", song: "Ties", time: "9", rating:"3", genre:"Jazz", album:"Pend"},
    {id: 7, artist: "mike", song: "side", time: "15", rating:"1", genre:"Blues", album:"Mend"},
    {id: 8, artist: "mike", song: "loving", time: "5", rating:"5", genre:"Pop", album:"Tupac",},
    {id: 9, artist: "John", song: "like", time: "2", rating:"4", genre:"Rock", album:"Biggy"},
    {id: 10, artist: "mike", song: "ride", time: "9", rating:"3", genre:"Rock", album:"zend"},
    {id: 11, artist: "mike", song: "side", time: "15", rating:"1", genre:"Blues", album:"Mend"}
]

const albumImage = [{albumName : "Tupac", imgLocation: "images/2pac.jpg"},
    {albumName : "Zend", imgLocation: "images/bob-marley.jpg"},
    {albumName : "Great", imgLocation: "images/whitney.jpg"}]

let currentData = [];

// Pops an alert window to show the page has loaded.
function checkWindow() {
    alert("Page has loaded successfully.");
}

// access to the form Inputs
const artistInputBox = document.getElementById("artist");
const songInputBox = document.getElementById("song");
const albumInputBox = document.getElementById("album");
const selection = document.getElementById("genre");
const inputElementsArray = [...document.querySelectorAll("input")];
let dataTable = document.querySelector("#table");


// access to the form buttons.
const searchButton = document.getElementsByClassName("btn-group")[0].children[0];
const resetButton = document.getElementsByClassName("btn-group")[0].children[1];

// access to favourites div
const favouritesDiv = document.getElementById("favourites")

let downloadButton = document.getElementById("download");

// Helper function 1- Get Selection from Select.
function getSelectedGenre(){
        let selectedGenre;
        selectedGenre = selection.options[selection.selectedIndex].value;
        return selectedGenre;
}

// Helper function 2- Detect enter key.
function detectEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        searchButton.click();
    }
}

function addFavouriteImage() {
    let parent = this.parentNode;
    alert(parent.nextSibling);
}

// Main function 1
// Handle Search Button
function search() {
    let genre = getSelectedGenre().toLowerCase();
    let artist = artistInputBox.value.toLowerCase();
    let song = songInputBox.value.toLowerCase();
    let album = albumInputBox.value.toLowerCase();


    if ((artist === "") && (song === "") && (album === "") && (genre === "default")) {
        alert("Please enter search criteria.");
    } else if (artist !== "" || song !== "" || album !== "" || genre !== "default") {

        if (artist !== "" && genre !== "default"){
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.artist.toLowerCase() === artist && data.genre.toLowerCase() === genre):
                currentData.filter(data => data.artist.toLowerCase() === artist && data.genre.toLowerCase() === genre);
        } else if (artist !== "" && genre === "default"){
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.artist.toLowerCase() === artist):
                currentData.filter(data => data.artist.toLowerCase() === artist);
        }
        if (song !== "" && genre !== "default") {
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.song.toLowerCase() === song && data.genre.toLowerCase() === genre):
                currentData.filter(data => data.song.toLowerCase() === song && data.genre.toLowerCase() === genre);

        } else if (song !== "" && genre === "default") {
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.song.toLowerCase() === song):
                currentData.filter(data => data.song.toLowerCase() === song);
        }
        if (album !== "" && genre !== "default"){
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.album.toLowerCase() === album && data.genre.toLowerCase() === genre):
                currentData.filter(data => data.album.toLowerCase() === album && data.genre.toLowerCase() === genre);

        } else if (album !== "" && genre === "default"){
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.album.toLowerCase() === album):
                currentData.filter(data => data.album.toLowerCase() === album);

        }
        if (genre !== "default") {
            currentData = (currentData.length <= 0) ?
                datastore.filter(data => data.genre.toLowerCase() === genre):
                currentData.filter(data => data.genre.toLowerCase() === genre);
        }

        let table = document.createElement('table');
        let headers = ["Sn.", "Artist", "Song", "Time", "Rating", "Genre", "Album", "", ""];
        let headerRow = document.createElement('tr');


        headers.forEach(column => {
            let header = document.createElement('th');
            let textNode = document.createTextNode(column);
            header.appendChild(textNode);
            headerRow.appendChild(header);
        })

        table.appendChild(headerRow);

        if (currentData.length === 0){
            let paragraph = document.createElement('p');
            let msg = document.createTextNode("No results are available for this search criteria.")
            paragraph.appendChild(msg);
            dataTable.removeChild(dataTable.firstChild)
            dataTable.appendChild(paragraph);
        } else{
            let sn = 0;
            currentData.forEach(songDetails => {
                let row = document.createElement('tr');
                for(let key in songDetails){
                    let value = songDetails[key];
                    if(key === "id"){
                        value = sn + 1;
                    }
                    let cell = document.createElement('td');
                    let textNode = document.createTextNode(value);
                    cell.appendChild(textNode);
                    row.appendChild(cell);
                }
                sn = sn + 1;


                // Object.keys(songDetails).forEach(key => {
                //     let value = songDetails[key];
                //     let cell = document.createElement('td');
                //     let textNode = document.createTextNode(value);
                //     cell.appendChild(textNode);
                //     row.appendChild(cell);
                // })


                // Object.values(songDetails).forEach(value => {
                //     let cell = document.createElement('td');
                //     let textNode = document.createTextNode(value.toString());
                //     cell.appendChild(textNode);
                //     row.appendChild(cell);
                // })

                const favouriteButtonCell = document.createElement('td');
                const favouriteButton = document.createElement('button');
                favouriteButton.setAttribute("type", "button");
                favouriteButton.setAttribute("class", "btn btn-secondary");
                favouriteButton.setAttribute("id", "favourite");
                const favouriteBtnText = document.createTextNode("favourite");
                favouriteButton.appendChild(favouriteBtnText);
                favouriteButtonCell.appendChild(favouriteButton);
                row.appendChild(favouriteButtonCell);

                let downloadButtonCell = document.createElement('td');
                let downloadButton = document.createElement('button');
                downloadButton.setAttribute("type", "button");
                downloadButton.setAttribute("class", "btn btn-secondary");
                downloadButton.setAttribute("id", "download");
                let downloadBtnText = document.createTextNode("download");
                downloadButton.appendChild(downloadBtnText);
                downloadButtonCell.appendChild(downloadButton);
                row.appendChild(downloadButtonCell);

                table.appendChild(row);
            })
            if (dataTable.hasChildNodes()){
                dataTable.removeChild(dataTable.firstChild);
                dataTable.appendChild(table);
            }else{
                dataTable.appendChild(table)
            }
            currentData.length = 0;

        }

    }

    }


// Main function 2
// Handle Reset Button.
function reset(){
    if (dataTable.hasChildNodes()) {
        dataTable.removeChild(dataTable.firstChild);
    }
}

// Setup events.
resetButton.addEventListener("click", reset);
searchButton.addEventListener("click", search);
inputElementsArray.forEach(input => input.addEventListener("keyup", detectEnter));


// Event Delegations
document.addEventListener('click',function(event){
        if(event.target && event.target.id === 'favourite'){
            let favouriteButton = document.getElementById("favourite");
            let albumName = favouriteButton.parentNode.previousSibling.textContent;
            albumImage.forEach(album => {
                if(album.albumName === albumName){
                    let albumImageSrc = album.imgLocation;
                    let imgDiv = document.createElement("div");
                    imgDiv.setAttribute("class", "col-xs-6 col-sm-4 col-md-2 col-lg-2");
                    let img = document.createElement("img");
                    img.setAttribute("class", "img-fluid img-thumbnail");
                    img.setAttribute("src", albumImageSrc);
                    img.setAttribute("height", "400");
                    imgDiv.appendChild(img);
                    favouritesDiv.appendChild(imgDiv);
                }
            } )
        }
});

window.addEventListener("load", checkWindow);