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
}

function get_item(array,attr,val){
    for (i in array){
        d = array[i]
        console.log(d[attr],val,d[attr]===val)
        if (d[attr] == val) 
            return d;
    }
    return null;
}

function set_background_img(src,root="../"){
    document.querySelector('body').style.backgroundImage = `url(${root}${src})`;
}

function set_background_color(value){
    document.querySelector('body').style.backgroundImage = "none";
    document.querySelector('body').style.backgroundColor = `#${value}`;
}

function set_home_tab(tab_name){
    
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
        // change_active_status(`#home-tab-item-overlay-${hyphenated(d.tab_name)}`,'body','.home-tab-item-overlay'," selected")
        change_active_status(`#home-tab-item-activebar-${hyphenated(d.tab_name)}`,'body','.home-tab-item-activebar'," selected")
        set_home_tab(d.tab_name)
    }
}

function init_page(){
    load_img_backgrounds()
    load_color_backgrounds()
    load_home_tab_items()
}
    
init_page();