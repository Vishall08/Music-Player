console.log("Music");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let play = document.getElementById('play');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Deva Deva", filePath:"songs/1.mp3",coverPath: "covers/1.jpg"},
    { songName: "Kesariya", filePath:"songs/2.mp3",coverPath: "covers/2.jpg"},
    { songName: "Apna Bana le", filePath:"songs/3.mp3",coverPath: "covers/3.jpg"},
    { songName: "Rasiya", filePath:"songs/4.mp3",coverPath: "covers/4.jpg"},
    { songName: "Teri Meri Gallan Hogi", filePath:"songs/5.mp3",coverPath: "covers/5.jpg"},
    { songName: "Aankhe Meri Har Jagah", filePath:"songs/6.mp3",coverPath: "covers/6.jpg"},
]


songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

play.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
       play.classList.remove("fa-play-circle");
        play.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        play.classList.remove('fa-pause-circle');
        play.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})



audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
 audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = "songs/${songIndex+1}.mp3";
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        play.classList.remove('fa-play-circle');
        play.classList.add('fa-pause-circle');
    })
})

document.getElementById("next").addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }

    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    play.classList.remove('fa-play-circle');
    play.classList.add('fa-pause-circle');
})

