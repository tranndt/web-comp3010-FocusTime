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

COLORS = Array.from(
    [
        {color_name: "Silver Pink", value:"D4BEBE"},
        {color_name: "Champagne Pink", value:"EDDCD2"},
        {color_name: "Mint Cream", value:"DBE7E4"},
        {color_name: "Lavender Gray", value:"CAC4CE"},
        {color_name: "Languid Lavender", value:"D5CFE1"},
        {color_name: "Lavender Web", value:"E1DEE9"},
        {color_name: "Pale Cerulean", value:"99C1DE"},
        {color_name: "Beau Blue", value:"BCD4E6"},
        {color_name: "Alice Blue", value:"D6E2E9"},
        {color_name: "Pale Pink", value:"FDE2E4"},
    ])

BACKGROUNDS = Array.from(
    [
        {background_name: "Night Sky", src:"assets/imgs/img1.jpg"},
        {background_name: "Trees", src:"assets/imgs/img2.jpg"},
        {background_name: "Sunset", src:"assets/imgs/img3.jpg"},
        {background_name: "Snow 1", src:"assets/imgs/img4.jpg"},
        {background_name: "Sea", src:"assets/imgs/img5.jpg"},
        {background_name: "Snow 2", src:"assets/imgs/img6.jpg"},
        {background_name: "Wood", src:"assets/imgs/img7.jpg"},
    ]);

TABS = Array.from(
    [
        {tab_name: "My Progress", src:"assets/tasks.png", href:"upcoming-tasks.html"},
        {tab_name: "My Statistics", src:"assets/stats.png", href:"statistics.html"},
        {tab_name: "My Timer", src:"assets/timer.png", href:"index.html"},
        {tab_name: "My Music", src:"assets/music.png", href:"music.html"},
        {tab_name: "My Settings", src:"assets/settings.png", href:"settings.html"},
    ]
);

function load_home_tab_items(){
    var html = '';
    TABS.forEach(d => {
        span = `
        <div class="settings-item home-tab-item" id="home-tab-item-${hyphenated(d.tab_name)}">
            <div class="settings-item-title home-tab-item-title" id="home-tab-item-title-${hyphenated(d.tab_name)}">${d.tab_name}</div>
            <img class="home-tab-item-img" id="home-tab-item-img-${hyphenated(d.tab_name)}" src="${d.src}" onclick="on_home_tab_item_clicked(\`${d.tab_name}\`)">    
            <div class="home-tab-item-activebar" id="home-tab-item-activebar-${hyphenated(d.tab_name)}"></div>
        </div>
        `
        html += span;
    })
    writeHTML(`#list-home-tab`,html);

    settings = JSON.parse(sessionStorage.settings)
    on_home_tab_item_clicked(settings.home_tab)
}

//  <div class="settings-item-overlay home-tab-item-overlay" id="home-tab-item-overlay-${hyphenated(d.tab_name)}"></div>
//             <div class="settings-item-overlay home-tab-item-overlay" id="home-tab-item-overlay-${hyphenated(d.tab_name)}"></div>


function load_color_backgrounds(){
    var html = '';
    COLORS.forEach(d => {
        span = `
        <div class="settings-item color-bg-item" id="color-bg-item-${hyphenated(d.color_name)}" style="background-color:#${d.value}" onclick="on_color_bg_item_clicked(\`${d.color_name}\`)">
            <div class="settings-item-overlay color-bg-item-overlay" id="color-bg-item-overlay-${hyphenated(d.color_name)}">
                <div class="settings-item-title">${d.color_name}</div>
            </div>
        </div>
        `
        html += span;
    })
    writeHTML(`#list-themes`,html);
    on_color_bg_item_clicked(get_settings().background_color_name)
}

function load_img_backgrounds(){
    var html = '';
    BACKGROUNDS.forEach(d => {
        span = `
        <div class="settings-item img-bg-item" id="img-bg-item-${hyphenated(d.background_name)}" onclick="on_img_bg_item_clicked(\`${d.background_name}\`)">
            <img class="img-bg-item-img" id="img-bg-item-img-${hyphenated(d.background_name)}" src="${d.src}">
            <div class="settings-item-overlay img-bg-item-overlay" id="img-bg-item-overlay-${hyphenated(d.background_name)}">
                <div class="settings-item-title">${d.background_name}</div>
            </div>
        </div>
        `
        html += span;
    })
    writeHTML(`#list-backgrounds`,html);
    on_img_bg_item_clicked(get_settings().background_img_name)
}

function get_settings(){
    return sessionStorage.settings ? JSON.parse(sessionStorage.settings) : null;
}

function get_item(array,attr,val){
    for (i in array){
        d = array[i]
        if (d[attr] == val) 
            return d;
    }
    return null;
}

function get_item_indirect(array,key1,key2,val2){
    for (i in array){
        d = array[i]
        // console.log(key1,key2,val2,d,d[key2]==val2)
        if (d[key2] == val2) 
            return d[key1];
    }
    return null;
}

function set_background_img(src,root="../"){
    src1 = src | (src != "none") ? `url(${root}${src})` : "none"
    document.querySelector('body').style.backgroundImage = src1;
    save_settings('background_img_src',src)
    save_settings('background_img_name',get_item_indirect(BACKGROUNDS,'background_name','src',src))
    save_settings('background_color',"none")
    save_settings('background_color_name',"none")
}

function set_background_color(value){
    document.querySelector('body').style.backgroundImage = "none";
    document.querySelector('body').style.backgroundColor = `#${value}`;
    save_settings('background_img_src',"none")
    save_settings('background_img_name',"none")
    save_settings('background_color',value)
    save_settings('background_color_name',get_item_indirect(COLORS,'color_name','value',value))
}

function set_home_tab(tab_name){
    save_settings('home_tab',tab_name)
    save_settings('home_tab_href',get_item_indirect(TABS,'href','tab_name',tab_name))
}

function save_settings(attr,value){
    var settings = JSON.parse(sessionStorage.settings);
    settings[attr] = value
    sessionStorage.settings = JSON.stringify(settings)
}

function init_settings(){
    settings = {
        home_tab: 'My Timer',
        background_img_src: "none",
        background_img_name: "none",
        background_color: "EDDCD2",
        background_color_name: "Champagne Pink"
    }
    sessionStorage.settings = JSON.stringify(settings)
}

function load_settings(){
    if (sessionStorage.settings){
        var settings = JSON.parse(sessionStorage.settings);
        set_home_tab(settings.home_tab)
        if (settings.background_img_src != "none")
            set_background_img(settings.background_img_src)
        else if (settings.background_color != "none")
            set_background_color(settings.background_color)
    }
}

function on_img_bg_item_clicked(background_name){
    var d = get_item(BACKGROUNDS,'background_name',background_name)
    if (d) {
        change_active_status(`#img-bg-item-overlay-${hyphenated(d.background_name)}`,'body','.settings-item-overlay'," selected")
        set_background_img(d.src)
    }
}

function on_color_bg_item_clicked(color_name){
    var d = get_item(COLORS,'color_name',color_name)
    if (d) {
        change_active_status(`#color-bg-item-overlay-${hyphenated(d.color_name)}`,'body','.settings-item-overlay'," selected")
        set_background_color(d.value)
    }
}

function on_home_tab_item_clicked(tab_name){
    var d = get_item(TABS,'tab_name',tab_name)
    if (d) {
        change_active_status(`#home-tab-item-title-${hyphenated(d.tab_name)}`,'body','.home-tab-item-title'," selected")
        change_active_status(`#home-tab-item-img-${hyphenated(d.tab_name)}`,'body','.home-tab-item-img'," selected")
        change_active_status(`#home-tab-item-activebar-${hyphenated(d.tab_name)}`,'body','.home-tab-item-activebar'," selected")
        set_home_tab(d.tab_name)
    }
}

function init_page(){
    var visited = check_visited('My Settings')
    if (!visited) init_settings()
    load_settings()
    load_img_backgrounds()
    load_color_backgrounds()
    load_home_tab_items()
}

function check_visited(tab_name){
    var has_visited = false
    if (sessionStorage.visited){
        var visited = JSON.parse(sessionStorage.visited)
        has_visited = visited[tab_name];
    }
    else {
        var visited = {"My Progress":false,"My Statistics":false,"My Timer":false,"My Music":false,"My Settings":false}
    }
    visited[tab_name] = true;
    sessionStorage.visited = JSON.stringify(visited);
    return has_visited
}


init_page();