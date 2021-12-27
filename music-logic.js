
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
    {album_name: 'KIDS SEE GHOSTS', artist:"KIDS SEE GHOSTS, Kanye West, Kid Cudi", year:2017, num_tracks: 7, length: '23:52', topic:"Today's Pick", src:"assets/music/albums/album_ksg.png"},
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

    {album_name: 'Short Album 1', artist:"Various Artists", year:2019, num_tracks: 17, length: '30:08', topic:"Short", src:"assets/music/albums/album_analogue.jpg"},
    {album_name: 'Short Album 2', artist:"Various Artists", year:2015, num_tracks: 15, length: '31:12', topic:"Short", src:"assets/music/albums/album_taketime.png"},
    {album_name: 'Short Album 3', artist:"Various Artists", year:2017, num_tracks: 10, length: '30:48', topic:"Short", src:"assets/music/albums/album_ktse.jpg"},
    {album_name: 'Short Album 4', artist:"Various Artists", year:2017, num_tracks: 21, length: '55:10', topic:"Short", src:"assets/music/albums/album_luvtheworld.png"},
    {album_name: 'Short Album 5', artist:"Various Artists", year:2016, num_tracks: 17, length: '35:08', topic:"Short", src:"assets/music/albums/album_analogue.jpg"},
    {album_name: 'Short Album 6', artist:"Various Artists", year:2017, num_tracks: 15, length: '31:42', topic:"Short", src:"assets/music/albums/album_taketime.png"},
    {album_name: 'Short Album 7', artist:"Various Artists", year:2018, num_tracks: 10, length: '30:41', topic:"Short", src:"assets/music/albums/album_ktse.jpg"},
    {album_name: 'Short Album 8', artist:"Various Artists", year:2020, num_tracks: 21, length: '43:12', topic:"Short", src:"assets/music/albums/album_luvtheworld.png"},
])    

TOPICS = ["Today's Pick","What's Popular", "Release Radar"]
LISTS = ['list-todays-pick',"list-whats-popular","list-release-radar"]

function load_albums(){
    TOPICS.forEach(topic => {
        var html_i = '';
        ALBUMS.forEach(d => {
            if (d.topic == topic){
                span = `<img class="album-item" id="album-${d.album_name}" src="${d.src}" onclick="display_album_details('${d.album_name}')">`
                html_i += span;
            }
        })
        var list_container = document.querySelector(`#${LISTS[TOPICS.indexOf(topic)]}`)
        list_container.innerHTML = html_i
    })
}

function load_genres(){
    var html_i = '';
    GENRES.forEach(d => {
        span = `<img class="genre-item" id="genre-${d.genre_name}" src="${d.src}" onclick="show_albums_by_topic('${d.genre_name}')">`
        html_i += span;
    })
    var list_container = document.querySelector(`#list-genres`)
    list_container.innerHTML = html_i
}

function show_albums_by_topic(topic){
    var html_i = '';
    ALBUMS.forEach(d => {
        if (d.topic == topic){
            span = `<img class="album-item" id="album-${d.album_name}" src="${d.src}" onclick="display_album_details(\`${d.album_name}\`)">`
            html_i += span;
        }
    })
    var album_header = document.querySelector(`#header-topic`)
    album_header.innerHTML = topic
    var list_container = document.querySelector(`#list-topic`)
    list_container.innerHTML = html_i

    var container_explore_topic = document.querySelector("#container-explore-main");
    container_explore_topic.style.display = "none";
    var container_explore_topic = document.querySelector("#container-explore-topic");
    container_explore_topic.style.display = "grid";

    dismiss_album_details();
    // var container_a2 = document.getElementById("container-a2");
    // sessionStorage.scroll_pos = container_a2.scrollHeight
}

function display_album_details(album_name){
    var html='';
    for (j in ALBUMS){
        d=ALBUMS[j]
        if (d.album_name == album_name){
            html = 
                `<div id="album-name">${d.album_name}</div>
                <div id="album-artist">${d.artist}</div>
                <div id="album-num_tracks">${d.num_tracks} Songs</div>
                <div id="album-playlist-length">${d.length}</div>`
            src = d.src;
            break;
        }
    }
    album_details = document.querySelector("#album-details");
    album_details.innerHTML = html;
    album_cover = document.querySelector("#album-cover");
    album_cover.style.opacity = 1;
    album_cover.src = src
    containera3b = document.querySelector("#container-a3b");
    containera3b.style.display = "grid";
    containera5 = document.querySelector("#container-a5");
    containera5.style.display = "grid";
    button_clear = document.querySelector("#button-clear");
    button_clear.style.display = "grid";
}

function dismiss_album_details(){
    html = 
    `<div id="album-name"></div>
    <div id="album-artist"></div>
    <div id="album-num_tracks"></div>
    <div id="album-playlist-length"></div>`
    src = "";
    album_details = document.querySelector("#album-details");
    album_details.innerHTML = html;
    album_cover = document.querySelector("#album-cover");
    album_cover.style.opacity = 0;
    album_cover.src = src
    containera3b = document.querySelector("#container-a3b");
    containera3b.style.display = "none";
    containera5 = document.querySelector("#container-a5");
    containera5.style.display = "none";
    button_clear = document.querySelector("#button-clear");
    button_clear.style.display = "none";
}

function show_main_music_page(){
    var container_explore_topic = document.querySelector("#container-explore-main");
    container_explore_topic.style.display = "grid";
    var container_explore_topic = document.querySelector("#container-explore-topic");
    container_explore_topic.style.display = "none";

    load_genres()
    load_albums()
    dismiss_album_details()

    // var container_a2 = document.getElementById("app-a2");
    // container_a2.scrollTo(0,sessionStorage.scroll_pos)
}


show_main_music_page()