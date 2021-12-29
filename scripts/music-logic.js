function hyphenated(c){
    return c.replaceAll(" ","-")
}

function unhyphenated(c){
    return c.replaceAll("-"," ")
}

function fmt2 (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const odd_secs = seconds % 60
    if (hours <= 0){ hh = ''}     
    else if (hours < 10) {hh='0'+hours+':'} 
    else {hh = hours+':'}

    if (minutes <= 0){ mm = ''}
    else if (minutes < 10) {mm='0'+minutes+':'} 
    else {mm = minutes+':'}
    
    if (odd_secs < 10) {ss='0'+odd_secs} 
    else {ss = odd_secs}
    return hh+mm+ss
}


// Courtesy of https://github.com/coolaj86/knuth-shuffle
function shuffle(array) {
    var array_ = [...array]
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array_[currentIndex], array_[randomIndex]] = [
        array_[randomIndex], array_[currentIndex]];
    }
  
    return array_;
  }

GENRES = Array.from(
    [
        {genre_name: "Indie", src:"assets/music/filters/filter_indie.png"},
        {genre_name: "Classical", src:"assets/music/filters/filter_classical.png"},
        {genre_name: "Rap", src:"assets/music/filters/filter_rap.png"},
        {genre_name: "RnB", src:"assets/music/filters/filter_rnb.png"},
        {genre_name: "Pop", src:"assets/music/filters/filter_pop.png"},
        {genre_name: "LoFi", src:"assets/music/filters/filter_lofi.png"},
        {genre_name: "Rainy Day", src:"assets/music/filters/filter_rainyday.png"},
        {genre_name: "Short", src:"assets/music/filters/filter_30mins.png"},
    ]);


ALBUMS = Array.from(
[
    {album_name: 'Blonde', artist:"Frank Ocean", year:2016, num_tracks: 17, length: '60:08', topic:"Today's Pick", src:"assets/music/albums/album_blonde.jpeg"},
    {album_name: 'Flower Boy', artist:"Tyler, The Creator", year:2017, num_tracks: 14, length: '46:39', topic:"Today's Pick", src:"assets/music/albums/album_flowerboy.png"},
    {album_name: 'Ctrl', artist:"SZA", year:2017, num_tracks: 14, length: '49:06', topic:"Today's Pick", src:"assets/music/albums/album_ctrl.png"},
    {album_name: 'Kids See Ghosts', artist:"KIDS SEE GHOSTS, Kanye West, Kid Cudi", year:2017, num_tracks: 7, length: '23:52', topic:"Today's Pick", src:"assets/music/albums/album_ksg.png"},
    {album_name: 'Coloring Book', artist:"Chance the Rapper", year:2016, num_tracks: 14, length: '57:21', topic:"Today's Pick", src:"assets/music/albums/album_coloringbook.png"},
    {album_name: 'Freudian', artist:"Daniel Ceasar", year:2017, num_tracks: 10, length: '44:51', topic:"Today's Pick", src:"assets/music/albums/album_freudian.jpg"},
    {album_name: 'American Teen', artist:"Khalid", year:2017, num_tracks: 15, length: '54:45', topic:"Today's Pick", src:"assets/music/albums/album_americanteen.png"},
    {album_name: 'Happier Than Ever', artist:"Billie Eilish", year:2017, num_tracks: 16, length: '56:15', topic:"Today's Pick", src:"assets/music/albums/album_happierthanever.png"},

    {album_name: 'Certified Lover Boy', artist:"Drake", year:2021, num_tracks: 21, length: '01:26:08', topic:"What's Popular", src:"assets/music/albums/album_clb.png"},
    {album_name: 'evermore', artist:"Taylor Swift", year:2020, num_tracks: 15, length: '60:39', topic:"What's Popular", src:"assets/music/albums/album_evermore.png"},
    {album_name: 'SOUR', artist:"Olivia Rodrigo", year:2021, num_tracks: 11, length: '34:46', topic:"What's Popular", src:"assets/music/albums/album_sour.png"},
    {album_name: 'After Hours', artist:"The Weeknd", year:2020, num_tracks: 14, length: '56:17', topic:"What's Popular", src:"assets/music/albums/album_afterhours.png"},

    {album_name: 'An Evening With Silk Sonic', artist:"Bruno Mars, Anderson .Paak, Silk Sonic", year:2021, num_tracks: 9, length: '31:19', topic:"Release Radar", src:"assets/music/albums/album_silksonic.png"},
    {album_name: 'Punk', artist:"Young Thug", year:2021, num_tracks: 20, length: '01:03:51', topic:"Release Radar", src:"assets/music/albums/album_punk.jpeg"},
    {album_name: 'Faces', artist:"Mac Miller", year:2021, num_tracks: 25, length: '01:31:45', topic:"Release Radar", src:"assets/music/albums/album_faces.jpg"},
    {album_name: 'The Melodic Blue', artist:"Baby Keem", year:2021, num_tracks: 16, length: '53:41', topic:"Release Radar", src:"assets/music/albums/album_melodicblue.jpeg"},

    {album_name: 'Indie Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"Indie", src:"assets/music/albums/album_fatherofbride.png"},
    {album_name: 'Indie Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"Indie", src:"assets/music/albums/album_currents.jpg"},
    {album_name: 'Indie Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"Indie", src:"assets/music/albums/album_zeros.png"},
    {album_name: 'Indie Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"Indie", src:"assets/music/albums/album_fuzzybrain.jpg"},

    {album_name: 'Classical Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"Classical", src:"assets/music/albums/album_bach.jpg"},
    {album_name: 'Classical Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"Classical", src:"assets/music/albums/album_drukqs.png"},
    {album_name: 'Classical Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"Classical", src:"assets/music/albums/album_pianobook.jpg"},
    {album_name: 'Classical Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"Classical", src:"assets/music/albums/album_mendelssohn.jpg"},

    {album_name: 'Rap Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"Rap", src:"assets/music/albums/album_4yeo.png"},
    {album_name: 'Rap Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"Rap", src:"assets/music/albums/album_lostboy.png"},
    {album_name: 'Rap Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"Rap", src:"assets/music/albums/album_gkmc.jpg"},
    {album_name: 'Rap Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"Rap", src:"assets/music/albums/album_graduation.png"},

    {album_name: 'RnB Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"RnB", src:"assets/music/albums/album_latenights.png"},
    {album_name: 'RnB Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"RnB", src:"assets/music/albums/album_sonder.jpg"},
    {album_name: 'RnB Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"RnB", src:"assets/music/albums/album_channelorange.png"},
    {album_name: 'RnB Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"RnB", src:"assets/music/albums/album_oxnard.png"},

    {album_name: 'Pop Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"Pop", src:"assets/music/albums/album_justice.jpg"},
    {album_name: 'Pop Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"Pop", src:"assets/music/albums/album_dirtycomputer.jpg"},
    {album_name: 'Pop Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"Pop", src:"assets/music/albums/album_melodrama.jpg"},
    {album_name: 'Pop Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"Pop", src:"assets/music/albums/album_lemonade.png"},

    {album_name: 'LoFi Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"LoFi", src:"assets/music/albums/album_lofifruits.jpg"},
    {album_name: 'LoFi Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"LoFi", src:"assets/music/albums/album_pokechill.jpg"},
    {album_name: 'LoFi Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"LoFi", src:"assets/music/albums/album_buffet.jpg"},
    {album_name: 'LoFi Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"LoFi", src:"assets/music/albums/album_lofilia.jpg"},

    {album_name: 'Rainy Day Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '60:08', topic:"Rainy Day", src:"assets/music/albums/album_ginger.png"},
    {album_name: 'Rainy Day Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '51:12', topic:"Rainy Day", src:"assets/music/albums/album_loveisntdying.jpg"},
    {album_name: 'Rainy Day Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '01:12:08', topic:"Rainy Day", src:"assets/music/albums/album_nectar.png"},
    {album_name: 'Rainy Day Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '01:25:18', topic:"Rainy Day", src:"assets/music/albums/album_x.png"},
    {album_name: 'Rainy Day Album 5', artist:"Various Artists", year:2018, num_tracks: 16, length: '01:09:56', topic:"Rainy Day", src:"assets/music/albums/album_strangerinalps.jpg"},
    {album_name: 'Rainy Day Album 6', artist:"Various Artists", year:2020, num_tracks: 13, length: '45:18', topic:"Rainy Day", src:"assets/music/albums/album_circles.jpg"},
    {album_name: 'Rainy Day Album 7', artist:"Various Artists", year:2019, num_tracks: 20, length: '56:18', topic:"Rainy Day", src:"assets/music/albums/album_doris.png"},
    {album_name: 'Rainy Day Album 8', artist:"Various Artists", year:2020, num_tracks: 15, length: '45:20', topic:"Rainy Day", src:"assets/music/albums/album_deadroses.png"},

    {album_name: 'Short Album 1', artist:"Various Artists", year:2019, num_tracks: 11, length: '30:08', topic:"Short", src:"assets/music/albums/album_analogue.jpg"},
    {album_name: 'Short Album 2', artist:"Various Artists", year:2015, num_tracks: 10, length: '31:12', topic:"Short", src:"assets/music/albums/album_taketime.png"},
    {album_name: 'Short Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '30:48', topic:"Short", src:"assets/music/albums/album_ktse.jpg"},
    {album_name: 'Short Album 4', artist:"Various Artists", year:2017, num_tracks: 12, length: '32:10', topic:"Short", src:"assets/music/albums/album_luvtheworld.png"},
    {album_name: 'Short Album 5', artist:"Various Artists", year:2016, num_tracks: 9, length: '35:08', topic:"Short", src:"assets/music/albums/album_mononomoto.jpg"},
    {album_name: 'Short Album 6', artist:"Various Artists", year:2017, num_tracks: 15, length: '31:42', topic:"Short", src:"assets/music/albums/album_apoliono.png"},
    {album_name: 'Short Album 7', artist:"Various Artists", year:2018, num_tracks: 10, length: '30:41', topic:"Short", src:"assets/music/albums/album_mustard.png"},
    {album_name: 'Short Album 8', artist:"Various Artists", year:2020, num_tracks: 11, length: '33:12', topic:"Short", src:"assets/music/albums/album_arizonababy.png"},
])   

AUDIOS = [
    "audio/be_yourself.mp3",
    "audio/close_to_you.mp3",
    "audio/facebook_story.mp3",
    "audio/futura_free.mp3",
    "audio/godspeed.mp3",
    "audio/good_guy.mp3",
    "audio/ivy.mp3",
    "audio/nights.mp3",
    "audio/nikes.mp3",
    "audio/pink+white.mp3",
    "audio/pretty_sweet.mp3",
    "audio/seigfried.mp3",
    "audio/self_control.mp3",
    "audio/skyline_to.mp3",
    "audio/solo_reprise.mp3",
    "audio/solo.mp3",
    "audio/white_ferrari.mp3",
]

SONG_TITLES = [
    "Willow"	,
    "Champagne Problems"	,
    "Gold Rush"	,
    "'Tis the Damn Season"	,
    "Tolerate It"	,
    "No Body, No Crime" ,
    "Happiness"	,
    "Dorothea"	,
    "Coney Island" ,
    "Ivy"	,
    "Cowboy like Me"	,
    "Long Story Short"	,
    "Marjorie"	,
    "Closure"	,
    "Evermore (featuring Bon Iver)",
    "Right Where You Left Me",	
    "It's Time to Go"	
]

TOPICS = ["Today's Pick","What's Popular", "Release Radar"]
LISTS = ['list-todays-pick',"list-whats-popular","list-release-radar"]

function get_album(album_name){
    let album;
    for (j in ALBUMS){
        d=ALBUMS[j]
        if (unhyphenated(d.album_name) == unhyphenated(album_name)){
            album = d
            break;
        }
    }
    return album;
}

function change_active_status(button_id,parent,button_class,flag){
    parent = parent == null ? "html" : parent;
    button_class = button_class == null ? ".button" : button_class;
    flag = flag == null ? " active" : flag;

    parent_item = document.querySelector(parent);
    var all_buttons = parent_item.querySelectorAll(button_class);
    Array.from(all_buttons).forEach(button=>{
        button.className = button.className.replace(flag,"")
    })
    if (button_id){
        button_active = parent_item.querySelector(button_id)
        button_active.className += flag
    }
}

function writeHTML(element,html){
    document.querySelector(element).innerHTML = html;
}

function hideHTMLElement(element){
    document.querySelector(element).style.display = "none";
}

function showHTMLElement(element,display){
    display = display ? display : "grid"
    document.querySelector(element).style.display = display;
}


    // const album_item = JSON.parse(sessionStorage.current_album_obj)



// LOADING FUNCTIONS

function load_albums(){
    TOPICS.forEach(topic => {
        var html_i = '';
        ALBUMS.forEach(d => {
            if (d.topic == topic){
                span = `<div class="album-item" id="album-item-${hyphenated(d.album_name)}" onclick="album_item_onclick(\`${d.album_name}\`)">
                <img class="album-item-img" id="album-item-img-${hyphenated(d.album_name)}" src="${d.src}">
                <div class="album-item-descr" id="album-item-descr-${hyphenated(d.album_name)}">
                    <div class="album-item-descr-album-name">${d.album_name}</div>
                    <div class="album-item-descr-album-artist">${d.artist}</div>
                    <div class="album-item-descr-album-num_tracks">${d.num_tracks} Songs</div>
                    <div class="album-item-descr-album-playlist-length">${d.length}</div>
                </div>
            </div>`
            html_i += span;
            }
        })
        var list_container = document.querySelector(`#${LISTS[TOPICS.indexOf(topic)]}`)
        list_container.innerHTML = html_i
    })
}

function load_genres(){
    var html = '';
    GENRES.forEach(d => {
        span = `<div class="genre-item" id="genre-${hyphenated(d.genre_name)}" onclick="show_albums_by_topic(\`${d.genre_name}\`)">
        <img class="genre-item-img" id="genre-item-img-${hyphenated(d.genre_name)}" src="${d.src}">
        <div class="genre-item-descr" id="genre-item-descr-${hyphenated(d.genre_name)}"></div>
        </div>
        `
        html += span;
    })
    writeHTML(`#list-genres`,html);
}

function load_summary(album_name){
    var d = get_album(album_name);
    var html=
            `<div id="album-name">${d.album_name}</div>
            <div id="album-artist">${d.artist}</div>
            <div id="album-num_tracks">${d.num_tracks} Songs</div>
            <div id="album-playlist-length">${d.length}</div>`

    document.querySelector("#album-cover-img").src = d.src;
    writeHTML(`#album-details`,html)
}

function load_playlist(album_name){
    function load_duration(container_song_item){
        let duration = container_song_item.querySelector(`.song-item-duration`)
        let audio = container_song_item.querySelector(`.audio-item`)
        audio.onloadedmetadata = function(event){
            duration.innerHTML = fmt2(parseInt(this.duration))
        }
    }

    var album = get_album(album_name);
    var song_titles = shuffle(SONG_TITLES)
    var audios = shuffle(AUDIOS)
    var html='';
    for (i =0; i < album.num_tracks & i < song_titles.length; i++){
        song_title = song_titles[i]
        src = audios[i]
        span = `
            <li>
                <div class="container-song-item" id="container-song-item-${hyphenated(song_title)}">
                    <audio class="audio-item" id="audio-item-${i}" preload="metadata" src="${src}" style="display:none"></audio>
                    <img class="song-item-img" id="song-item-img-${hyphenated(song_title)}" src="${album.src}">
                    <div class="song-item-title" id="song-item-title-${hyphenated(song_title)}">${song_title}</div>
                    <div class="song-item-artist">${album.artist}</div>
                    <div class="song-item-duration" id ="song-item-duration">3:10</div>
                </div>
            </li>
        `
        html += span
    }
    writeHTML("#container-album-playlist",html);

    var container_song_items = document.getElementsByClassName("container-song-item");
    Array.from(container_song_items).forEach(container_song_item => {
        load_duration(container_song_item)
    })
}

function load_scroll_listener_details(){
    app_a4 = document.querySelector("#app-a4")
    container_album_summary = document.querySelector("#container-album-summary");
    app_a4.addEventListener("scroll",function(event){
        if (this.scrollTop >= container_album_summary.offsetHeight - 5){
            change_active_status(button_id=`#button-playlist`,parent=`#app-a3b`)
        } else change_active_status(button_id=`#button-summary`,parent=`#app-a3b`)
    })
}

function load_scroll_listener_explore(){
    app_a2 = document.querySelector("#app-a2")
    // container_album_summary = document.querySelector("#container-album-summary");
    app_a2.addEventListener("scroll",function(event){
        sessionStorage.app_a2_scrollY = this.scrollTop;
    })
}

function show_albums_by_topic(topic){
    app_a2 = document.querySelector("#app-a2")
    sessionStorage.a2_prev_scrollY = app_a2.scrollTop;

    var html = '';
    ALBUMS.forEach(d => {
        if (d.topic == topic){
            span = `<div class="album-item-2" id="album-item-2-${hyphenated(d.album_name)}" onclick="album_item_onclick_2(\`${d.album_name}\`)">
                        <img class="album-item-img-2" id="album-item-img-2-${hyphenated(d.album_name)}" src="${d.src}">
                        <div class="album-item-descr-2" id="album-item-descr-2-${hyphenated(d.album_name)}">
                            <div class="album-item-descr-2-album-name">${d.album_name}</div>
                            <div class="album-item-descr-2-album-artist">${d.artist}</div>
                            <div class="album-item-descr-2-album-num_tracks">${d.num_tracks} Songs</div>
                            <div class="album-item-descr-2-album-playlist-length">${d.length}</div>
                        </div>
                    </div>
                    `
            html += span;
        }
    })
    writeHTML(`#header-topic`,topic);
    writeHTML(`#list-topic`,html);
    hideHTMLElement("#container-explore-main")
    showHTMLElement("#container-explore-topic","grid")
    dismiss_details();
}

function display_details(album_name){
    load_summary(album_name)
    load_playlist(album_name)
    showHTMLElement("#container-a3b","grid");
    showHTMLElement("#container-a4","grid");
    showHTMLElement("#container-a5","grid");
    showHTMLElement("#button-dismiss","grid");
    document.querySelector("#app-a4").scrollTo(0,0)
}

function dismiss_details(){
    html = 
        `<div id="album-name"></div>
        <div id="album-artist"></div>
        <div id="album-num_tracks"></div>
        <div id="album-playlist-length"></div>`
    
    writeHTML(`#album-details`,html)
    document.querySelector("#album-cover-img").src = ""

    hideHTMLElement("#container-a3b");
    hideHTMLElement("#container-a4");
    hideHTMLElement("#container-a5");
    hideHTMLElement("#button-dismiss");
    change_active_status(null,"html",`.album-item-descr,.album-item-descr-2`,flag=" selected")
}

// BUTTON ONCLICK

function album_item_onclick(album_name){
    display_details(album_name)
    change_active_status(`#album-item-descr-${hyphenated(album_name)}`,null,`.album-item-descr`," selected")
    sessionStorage.latest_album_viewed = JSON.stringify(get_album(album_name)) // Need to parse it to use it
}

function album_item_onclick_2(album_name){
    display_details(album_name)
    change_active_status(`#album-item-descr-2-${hyphenated(album_name)}`,null,`.album-item-descr-2`," selected")
    sessionStorage.latest_album_viewed = JSON.stringify(get_album(album_name)) // Need to parse it to use it

}

function on_playlist_button_clicked(){   // Scroll To Playlist section  
    app_a4 = document.querySelector("#app-a4");
    container_album_summary = document.querySelector("#container-album-summary");
    app_a4.scrollTo(0,container_album_summary.offsetHeight + 15)
}

function on_summary_button_clicked(){     // Scroll To Summary section
    app_a4 = document.querySelector("#app-a4");
    container_album_summary = document.querySelector("#container-album-summary");
    app_a4.scrollTo(0,0)
}

const NO_ALBUM_CHOSEN = 0;
const ALBUM_CHOSEN_NO_TIMER = 1;
const ALBUM_CHOSEN_WITH_TIMER = 2;

function on_button_add_to_queue_clicked(){
    sessionStorage.album_chosen = sessionStorage.latest_album_viewed
    sessionStorage.flag_set_timer = ALBUM_CHOSEN_NO_TIMER;
    //notify users of chosen album
    toast_elem.className = "show";
    toast_elem.textContent = "'" + JSON.parse(sessionStorage.album_chosen).album_name + "' added to song queue.";
    setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 6000);
}

function on_button_set_playlist_timer_clicked(){
    sessionStorage.album_chosen = sessionStorage.latest_album_viewed
    sessionStorage.flag_set_timer = ALBUM_CHOSEN_WITH_TIMER;
}

function show_main_music_page(){
    showHTMLElement("#container-explore-main","grid")
    hideHTMLElement("#container-explore-topic")
    load_scroll_listener_details()
    // load_scroll_listener_explore()
    dismiss_details()
    load_genres()
    load_albums()
    app_a2 = document.querySelector("#app-a2")
    app_a2.scrollTop = sessionStorage.a2_prev_scrollY;
}

window.addEventListener("load",function(event){
    sessionStorage.a2_prev_scrollY = 0;
    //sessionStorage.album_chosen = null;
    sessionStorage.flag_set_timer = NO_ALBUM_CHOSEN;
})

const toast_elem = document.getElementById("toast");



show_main_music_page()

/****** DRAFT */