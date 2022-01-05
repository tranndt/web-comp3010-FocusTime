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
    // Today's Picks
    {album_name: 'Blonde', artist:"Frank Ocean", year:2016, num_tracks: 17, length: '60:08', topic:"Today's Pick", src:"assets/music/albums/album_blonde.jpeg"},
    {album_name: 'Flower Boy', artist:"Tyler, The Creator", year:2017, num_tracks: 14, length: '46:39', topic:"Today's Pick", src:"assets/music/albums/album_flowerboy.png"},
    {album_name: 'Ctrl', artist:"SZA", year:2017, num_tracks: 14, length: '49:06', topic:"Today's Pick", src:"assets/music/albums/album_ctrl.png"},
    {album_name: 'Kids See Ghosts', artist:"Kids See Ghosts", year:2017, num_tracks: 7, length: '23:52', topic:"Today's Pick", src:"assets/music/albums/album_ksg.png"},
    {album_name: 'Coloring Book', artist:"Chance the Rapper", year:2016, num_tracks: 14, length: '57:21', topic:"Today's Pick", src:"assets/music/albums/album_coloringbook.png"},
    {album_name: 'Freudian', artist:"Daniel Ceasar", year:2017, num_tracks: 10, length: '44:51', topic:"Today's Pick", src:"assets/music/albums/album_freudian.jpg"},
    {album_name: 'American Teen', artist:"Khalid", year:2017, num_tracks: 15, length: '54:45', topic:"Today's Pick", src:"assets/music/albums/album_americanteen.png"},
    {album_name: 'Happier Than Ever', artist:"Billie Eilish", year:2017, num_tracks: 16, length: '56:15', topic:"Today's Pick", src:"assets/music/albums/album_happierthanever.png"},

    // What's Popular
    {album_name: 'Certified Lover Boy', artist:"Drake", year:2021, num_tracks: 21, length: '01:26:08', topic:"What's Popular", src:"assets/music/albums/album_clb.png"},
    {album_name: 'evermore', artist:"Taylor Swift", year:2020, num_tracks: 15, length: '60:39', topic:"What's Popular", src:"assets/music/albums/album_evermore.png"},
    {album_name: 'SOUR', artist:"Olivia Rodrigo", year:2021, num_tracks: 11, length: '34:46', topic:"What's Popular", src:"assets/music/albums/album_sour.png"},
    {album_name: 'After Hours', artist:"The Weeknd", year:2020, num_tracks: 14, length: '56:17', topic:"What's Popular", src:"assets/music/albums/album_afterhours.png"},

    // Release Radar
    {album_name: 'An Evening With Silk Sonic', artist:"Silk Sonic", year:2021, num_tracks: 9, length: '31:19', topic:"Release Radar", src:"assets/music/albums/album_silksonic.png"},
    {album_name: 'Punk', artist:"Young Thug", year:2021, num_tracks: 20, length: '01:03:51', topic:"Release Radar", src:"assets/music/albums/album_punk.jpeg"},
    {album_name: 'Faces', artist:"Mac Miller", year:2021, num_tracks: 25, length: '01:31:45', topic:"Release Radar", src:"assets/music/albums/album_faces.jpg"},
    {album_name: 'The Melodic Blue', artist:"Baby Keem", year:2021, num_tracks: 16, length: '53:41', topic:"Release Radar", src:"assets/music/albums/album_melodicblue.jpeg"},

    // Indie
    {album_name: 'Father of the Bride', artist:"Vampire Weekend", year:2019, num_tracks: 17, length: '58 min', topic:"Indie", src:"assets/music/albums/album_fatherofbride.png"},
    {album_name: 'Currents', artist:"Tame Impala", year:2015, num_tracks: 15, length: '51 min', topic:"Indie", src:"assets/music/albums/album_currents.jpg"},
    {album_name: 'Zeros', artist:"Declan McKenna", year:2017, num_tracks: 10, length: '41 min', topic:"Indie", src:"assets/music/albums/album_zeros.png"},
    {album_name: 'Fuzzybrain', artist:"Dayglow", year:2017, num_tracks: 21, length: '37 min', topic:"Indie", src:"assets/music/albums/album_fuzzybrain.jpg"},

    // Classical
    {album_name: 'Piano Pieces', artist:"Johann Bach", year:2019, num_tracks: 17, length: '60:08', topic:"Classical", src:"assets/music/albums/album_bach.jpg"},
    {album_name: 'Drukqs', artist:"Aphex Twin", year:2015, num_tracks: 15, length: '51:12', topic:"Classical", src:"assets/music/albums/album_drukqs.png"},
    {album_name: 'Piano Book', artist:"Lang Lang", year:2017, num_tracks: 10, length: '01:12:08', topic:"Classical", src:"assets/music/albums/album_pianobook.jpg"},
    {album_name: '100% Mendelssohn', artist:"Felix Mendelssohn", year:2017, num_tracks: 21, length: '01:25:18', topic:"Classical", src:"assets/music/albums/album_mendelssohn.jpg"},

    // Rap
    {album_name: '4 Your Eyez Only', artist:"J. Cole", year:2019, num_tracks: 17, length: '60:08', topic:"Rap", src:"assets/music/albums/album_4yeo.png"},
    {album_name: 'The Lost Boy', artist:"Cordae", year:2015, num_tracks: 15, length: '51:12', topic:"Rap", src:"assets/music/albums/album_lostboy.png"},
    {album_name: 'good kid, m.A.A.d city', artist:"Kendrick Lamar", year:2017, num_tracks: 10, length: '01:12:08', topic:"Rap", src:"assets/music/albums/album_gkmc.jpg"},
    {album_name: 'Graduation', artist:"Kanye West", year:2017, num_tracks: 21, length: '01:25:18', topic:"Rap", src:"assets/music/albums/album_graduation.png"},

    // RnB
    {album_name: 'Late Nights', artist:"Jeremih", year:2019, num_tracks: 17, length: '60:08', topic:"RnB", src:"assets/music/albums/album_latenights.png"},
    {album_name: 'Sonder Son', artist:"Brent Faiyaz", year:2015, num_tracks: 15, length: '51:12', topic:"RnB", src:"assets/music/albums/album_sonder.jpg"},
    {album_name: 'Channel Orange', artist:"Frank Ocean", year:2017, num_tracks: 10, length: '01:12:08', topic:"RnB", src:"assets/music/albums/album_channelorange.png"},
    {album_name: 'Oxnard', artist:"Anderson .Paak", year:2017, num_tracks: 21, length: '01:25:18', topic:"RnB", src:"assets/music/albums/album_oxnard.png"},

    // Pop
    {album_name: 'Justice', artist:"Justin Bieber", year:2019, num_tracks: 17, length: '60:08', topic:"Pop", src:"assets/music/albums/album_justice.jpg"},
    {album_name: 'Dirty Computer', artist:"Janelle Monae", year:2015, num_tracks: 15, length: '51:12', topic:"Pop", src:"assets/music/albums/album_dirtycomputer.jpg"},
    {album_name: 'Melodrama', artist:"Lorde", year:2017, num_tracks: 10, length: '01:12:08', topic:"Pop", src:"assets/music/albums/album_melodrama.jpg"},
    {album_name: 'Lemonade', artist:"Beyonce", year:2017, num_tracks: 21, length: '01:25:18', topic:"Pop", src:"assets/music/albums/album_lemonade.png"},

    // Lofi
    {album_name: 'Lofi Fruits', artist:"Lofi Fruits", year:2019, num_tracks: 17, length: '60:08', topic:"LoFi", src:"assets/music/albums/album_lofifruits.jpg"},
    {album_name: 'Poke & Chill', artist:"Mikel", year:2015, num_tracks: 15, length: '51:12', topic:"LoFi", src:"assets/music/albums/album_pokechill.jpg"},
    {album_name: 'Buffet', artist:"LLusion", year:2017, num_tracks: 10, length: '01:12:08', topic:"LoFi", src:"assets/music/albums/album_buffet.jpg"},
    {album_name: 'Season Two', artist:"Lofi Lia", year:2017, num_tracks: 21, length: '01:25:18', topic:"LoFi", src:"assets/music/albums/album_lofilia.jpg"},

    // Rainy Day
    {album_name: 'Ginger', artist:"BROCKHAMPTON", year:2019, num_tracks: 17, length: '60:08', topic:"Rainy Day", src:"assets/music/albums/album_ginger.png"},
    {album_name: 'love is not dying', artist:"Jeremy Zucker", year:2015, num_tracks: 15, length: '51:12', topic:"Rainy Day", src:"assets/music/albums/album_loveisntdying.jpg"},
    {album_name: 'Nectar', artist:"Joji", year:2017, num_tracks: 10, length: '01:12:08', topic:"Rainy Day", src:"assets/music/albums/album_nectar.png"},
    {album_name: '?', artist:"XXXTENTACION", year:2017, num_tracks: 21, length: '01:25:18', topic:"Rainy Day", src:"assets/music/albums/album_x.png"},
    {album_name: 'Stranger in the Alps', artist:"Phoebe Bridgers", year:2018, num_tracks: 16, length: '01:09:56', topic:"Rainy Day", src:"assets/music/albums/album_strangerinalps.jpg"},
    {album_name: 'Circles', artist:"Mac Miller", year:2020, num_tracks: 13, length: '45:18', topic:"Rainy Day", src:"assets/music/albums/album_circles.jpg"},
    {album_name: 'Doris', artist:"Earl Sweatshirt", year:2019, num_tracks: 20, length: '56:18', topic:"Rainy Day", src:"assets/music/albums/album_doris.png"},
    {album_name: 'deadroses', artist:"blackbear", year:2020, num_tracks: 15, length: '45:20', topic:"Rainy Day", src:"assets/music/albums/album_deadroses.png"},

    // Short Albums
    {album_name: 'Analogue', artist:"ODIE", year:2019, num_tracks: 11, length: '30:08', topic:"Short", src:"assets/music/albums/album_analogue.jpg"},
    {album_name: 'Take Time', artist:"Giveon", year:2015, num_tracks: 10, length: '31:12', topic:"Short", src:"assets/music/albums/album_taketime.png"},
    {album_name: 'K.T.S.E.', artist:"Teyana Taylor", year:2017, num_tracks: 10, length: '30:48', topic:"Short", src:"assets/music/albums/album_ktse.jpg"},
    {album_name: 'LUV vs the World', artist:"Lil Uzi Vert", year:2017, num_tracks: 12, length: '32:10', topic:"Short", src:"assets/music/albums/album_luvtheworld.png"},
    {album_name: 'Mono no Moto', artist:"Choker", year:2016, num_tracks: 9, length: '35:08', topic:"Short", src:"assets/music/albums/album_mononomoto.jpg"},
    {album_name: 'Apoliono', artist:"Omar Apollo", year:2017, num_tracks: 15, length: '31:42', topic:"Short", src:"assets/music/albums/album_apoliono.png"},
    {album_name: 'Perfect Ten', artist:"Mustard", year:2018, num_tracks: 10, length: '30:41', topic:"Short", src:"assets/music/albums/album_mustard.png"},
    {album_name: 'Arizona Baby', artist:"Kevin Abstract", year:2020, num_tracks: 11, length: '33:12', topic:"Short", src:"assets/music/albums/album_arizonababy.png"},
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

TRACKLISTS = [
    ["Nikes", "Ivy", "Pink + White", "Be Yourself", "Solo", "Skyline To", "Self Control", "Good Guy", "Nights", "Solo (Reprise)", "Pretty Sweet", "Facebook Story", "Close To You", "White Ferrari", "Siegfried", "Godspeed", "Futura Free"],
    ['Foreword (feat. Rex Orange County)','Where This Flower Blooms (feat. Frank Ocean)','Sometimes...','See You Again (feat. Kali Uchis)','Who Dat Boy (feat. A$AP Rocky)','Pothole (feat. Jaden Smith)','Garden Shed (feat. Estelle)','Boredom (feat. Rex Orange County & Anna of the North)',"I Ain't Got Time!",'911 / Mr. Lonely (feat. Frank Ocean & Steve Lacy)',"Droppin' Seeds (feat. Lil Wayne)",'November','Glitter','Enjoy Right Now, Today'],
    ['Supermodel','Love Galore (feat. Travis Scott)','Doves In The Wind (feat. Kendrick Lamar)','Drew Barrymore','Prom','The Weekend','Go Gina','Garden (Say It Like Dat)','Broken Clocks','Anything','Wav (Interlude) (feat. James Fauntleroy)','Normal Girl','Pretty Little Birds (feat. Isaiah Rashad)','20 Something'],
    ['Feel The Love','Fire','4th Dimension','Freeee (Ghost Town Pt. 2)','Reborn','Kids See Ghosts','Cudi Montage'],
    ["All We Got (feat. Kanye West & Chicago Children's Choir)", 'No Problem (feat. Lil Wayne & 2 Chainz)','Summer Friends (Ft. Francis and the Lights & Jeremih)','DRAM Sings Special (Ft. Shelley FKA DRAM)','Blessings (Ft. Jamila Woods)','Same Drugs','Mixtape (Ft. Lil Yachty & Young Thug)','Angels (Ft. Saba)','Juke Jam (Ft. Justin Bieber & Towkio)','All Night (Ft. Knox Fortune)','How Great (Ft. Jay Electronica & Nicole Steen)','Smoke Break (Ft. Future)','Finish Line / Drown (Ft. Eryn Allen Kane, Kirk Franklin, Noname & T-Pain)','Blessings (Reprise) (Ft. Anderson .Paak, BJ the Chicago Kid, Raury & Ty Dolla $ign)'],
    ['Get You (Ft. Kali Uchis)','Best Part (Ft. H.E.R.)','Hold Me Down',"Neu Roses (Transgressor's Song)",'Loose','We Find Love','Blessed','Take Me Away (Ft. Syd)','Transform (Ft. Charlotte Day Wilson)','Freudian'],
    ['American Teen','Young Dumb & Broke','Location','Another Sad Love Song','Saved','Coaster','8TEEN',"Let's Go",'Hopeless','Cold Blooded','Winter','Therapy','Keep Me','Shot Down','Angels'],
    ["Getting Older","I Didn't Change My Number","Billie Bossa Nova","my future","Oxytocin","GOLDWING","Lost Cause","Halley's Comet","Not My Responsibility","OverHeated","Everybody Dies","Your Power","NDA","Therefore I Am","Happier Than Ever","Male Fantasy"],
    ["Champagne Poetry","Papi's Home","Girls Want Girls (Ft. Lil Baby)","In The Bible (Ft. Giveon & Lil Durk)","Love All (Ft. JAY-Z)","Fair Trade (Ft. Travis Scott)","Way 2 Sexy (Ft. Future & Young Thug)","TSU","N 2 Deep (Ft. Future)","Pipe Down","Yebba's Heartbreak (Ft. YEBBA)","No Friends In The Industry","Knife Talk (Ft. 21 Savage & Project Pat)","7am on Bridle Path","Race My Mind","Fountains (Ft. Tems)","Get Along Better (Ft. Ty Dolla $ign)","You Only Live Twice (Ft. Lil Wayne & Rick Ross)","IMY2 (Ft. Kid Cudi)","Fucking Fans","The Remorse"],
    ["willow","champagne problems","gold rush","'tis the damn season","tolerate it","no body, no crime (Ft. HAIM)","happiness","dorothea","coney island (Ft. The National)","ivy","cowboy like me","long story short","marjorie","closure","evermore (Ft. Bon Iver)","right where you left me","it's time to go"],
    ["brutal","traitor","drivers license","1 step forward, 3 steps back","deja vu","good 4 u","enough for you","happier","jealousy, jealousy","favorite crime","hope ur ok"],
    ["Alone Again","Too Late","Hardest to Love","Scared To Live","Snowchild","Escape From LA","Heartless","Faith","Blinding Lights","In Your Eyes","Save Your Tears","Repeat After Me (Interlude)","After Hours","Until I Bleed Out"],
    ["Silk Sonic Intro","Leave The Door Open","Fly As Me","After Last Night (Ft. Bootsy Collins & Thundercat)","Smokin Out The Window","Put on a Smile","777","Skate","Blast Off"],
    ["Die Slow (Ft. Strick)","Stressed (Ft. J. Cole & T-Shyne)","Stupid/Asking","Recognize Real (Ft. Gunna)","Contagious","Peepin Out The Window (Ft. BSlime & Future)","Rich Nigga Shit (Ft. Juice WRLD)","Livin It Up (Ft. A$AP Rocky & Post Malone)","Yea Yea Yea","Insure My Wrist (Ft. Gunna)","Scoliosis (Ft. Lil Double 0)","Bubbly (Ft. Drake & Travis Scott)","Road Rage","Faces","Droppin Jewels","Fifth Day Dead","Icy Hot (Ft. Doja Cat)","Love You More (Ft. Gunna, Jeff Bhasker & Nate Ruess)","Hate The Game","Day Before (Ft. Mac Miller)"],
    ["Inside Outside","Here We Go","Friends (Ft. ScHoolboy Q)","Angel Dust","Malibu","What Do You Do (Ft. Sir Michael Rocks)","It Just Doesn't Matter","Therapy","Polo Jeans (Ft. Earl Sweatshirt)","Happy Birthday","Wedding","Funeral","Diablo","Ave Maria","55","San Francisco","Colors and Shapes","Insomniak (Ft. Rick Ross)","Uber (Ft. Mike Jones)","Rain (Ft. Vince Staples)","Apparition","Thumbalina","New Faces v2 (Ft. Da$H & Earl Sweatshirt)","Grand Finale"],
    ["trademark usa","pink panties","scapegoats","range brothers (with Kendrick Lamar)","issues","gorgeous","south africa","lost souls","cocoa (with Don Toliver)","family ties (with Kendrick Lamar)","scars","durag activity (with Travis Scott)","booman","first order of business","vent","16"]
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

function get_tracklist(album_name){
    let tracklist;
    if (album_name == 'Blonde'){
        tracklist = TRACKLISTS[0];
    }
    else if (album_name == 'Flower Boy'){
        tracklist = TRACKLISTS[1];
    }    
    else if (album_name == 'Ctrl'){
        tracklist = TRACKLISTS[2];
    }     
    else if (album_name == 'Kids See Ghosts'){
        tracklist = TRACKLISTS[3];
    }     
     else if (album_name == 'Coloring Book'){
        tracklist = TRACKLISTS[4];
    }     
     else if (album_name == 'Freudian'){
        tracklist = TRACKLISTS[5];
    }     
    else if (album_name == 'American Teen'){
        tracklist = TRACKLISTS[6];
    }    
    else if (album_name == 'Happier Than Ever'){
        tracklist = TRACKLISTS[7];
    }     
    else if (album_name == 'Certified Lover Boy'){
        tracklist = TRACKLISTS[8];
    }     
     else if (album_name == 'evermore'){
        tracklist = TRACKLISTS[9];
    }     
     else if (album_name == 'SOUR'){
        tracklist = TRACKLISTS[10];
    }     
    else if (album_name == 'After Hours'){
        tracklist = TRACKLISTS[11];
    }    
    else if (album_name == 'An Evening With Silk Sonic'){
        tracklist = TRACKLISTS[12];
    }     
    else if (album_name == 'Punk'){
        tracklist = TRACKLISTS[13];
    }     
     else if (album_name == 'Faces'){
        tracklist = TRACKLISTS[14];
    }     
     else if (album_name == 'The Melodic Blue'){
        tracklist = TRACKLISTS[15];
    }     
    else{
        tracklist = shuffle(SONG_TITLES);
    }
                        
    return tracklist;
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
    if (button_id != null){
        button_active = parent_item.querySelector(button_id)
        if (button_active) button_active.className += flag
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
                span = `
                <div class="album-item" id="album-item-${hyphenated(d.album_name)}" onclick="album_item_onclick(\`${d.album_name}\`)">
                    <img class="album-item-img" id="album-item-img-${hyphenated(d.album_name)}" src="${d.src}">
                    <div class="album-item-descr" id="album-item-descr-${hyphenated(d.album_name)}">
                        <div class="album-item-details-title">
                            <div class="album-item-name">${d.album_name}</div>
                            <div class="album-item-artist">${d.artist}</div>
                        </div>
                        <div class="album-item-details-info">
                            <div class="album-item-num_tracks">${d.num_tracks} Songs</div>
                            <div class="album-item-playlist-length">${d.length}</div>
                        </div>
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
            `
            <div class="album-details-title">
                <div id="album-name">${d.album_name}</div>
                <div id="album-artist">${d.artist}</div>
            </div>
            <div class="album-details-info">
                <div id="album-num_tracks">${d.num_tracks} Songs</div>
                <div id="album-playlist-length">${d.length}</div>
            </div>`

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
    var song_titles = get_tracklist(album_name);
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
        console.log(this.scrollTop,container_album_summary.offsetHeight)
        if (this.scrollTop <= container_album_summary.offsetHeight){
            change_active_status(button_id=`#button-summary`,parent=`#app-a3b`)
        } else  change_active_status(button_id=`#button-playlist`,parent=`#app-a3b`)
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
            span = 
            `<div class="album-item" id="album-item-${hyphenated(d.album_name)}" onclick="album_item_onclick(\`${d.album_name}\`)">
                <img class="album-item-img" id="album-item-img-${hyphenated(d.album_name)}" src="${d.src}">
                <div class="album-item-descr" id="album-item-descr-${hyphenated(d.album_name)}">
                    <div class="album-item-details-title">
                        <div class="album-item-name">${d.album_name}</div>
                        <div class="album-item-artist">${d.artist}</div>
                    </div>
                    <div class="album-item-details-info">
                        <div class="album-item-num_tracks">${d.num_tracks} Songs</div>
                        <div class="album-item-playlist-length">${d.length}</div>
                    </div>
                </div>
            </div>`
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
    showHTMLElement("#app-a3","grid");
    showHTMLElement("#app-a3b","grid");
    showHTMLElement("#app-a4","grid");
    showHTMLElement("#app-a5","grid")
    showHTMLElement("#container-a3b","grid");
    showHTMLElement("#container-a4","grid");
    showHTMLElement("#container-a5","grid");
    showHTMLElement("#button-dismiss","grid");
    document.querySelector("#app-a4").scrollTo(0,0)
}

function dismiss_details(){
    writeHTML(`#album-details`,"")
    document.querySelector("#album-cover-img").src = ""
    hideHTMLElement("#app-a3");
    hideHTMLElement("#app-a3b");
    hideHTMLElement("#app-a4");
    hideHTMLElement("#app-a5");
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
    change_active_status(`#album-item-descr-${hyphenated(album_name)}`,`#container-explore-topic`,`.album-item-descr`," selected")
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
    //notify users of chosen album
    // toast_elem.className = "show";
    // toast_elem.textContent = "'" + JSON.parse(sessionStorage.album_chosen).album_name + "' added to song queue. Timer set to '" + JSON.parse(sessionStorage.album_chosen).length + "'. Click 'Set' on Timer Page to Edit.";
    // setTimeout(function(){ toast_elem.className = toast_elem.className.replace("show", ""); }, 6000);
    window.location.href = "index.html";
}

function show_main_music_page(){
    dismiss_details()
    load_genres()
    load_albums()
    showHTMLElement("#container-explore-main","grid")
    hideHTMLElement("#container-explore-topic")
    document.querySelector("#app-a2").scrollTop = sessionStorage.a2_prev_scrollY;
}

function init_page(){
    showHTMLElement("#container-explore-main","grid")
    hideHTMLElement("#container-explore-topic")
    load_scroll_listener_details()
    load_scroll_listener_explore()
    dismiss_details()
    load_genres()
    load_albums()
    document.querySelector("#app-a2").scrollTop = 0;
}

window.addEventListener("load",function(event){
    sessionStorage.a2_prev_scrollY = 0;
    //sessionStorage.album_chosen = null;
    sessionStorage.flag_set_timer = NO_ALBUM_CHOSEN;
})

const toast_elem = document.getElementById("toast");

init_page()
