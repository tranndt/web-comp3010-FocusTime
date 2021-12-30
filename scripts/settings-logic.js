

// ============== LOAD ITEMS ==============
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

// ============== BUTTONS HANDLING ==============

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

// ============== INITIALIZING PAGE ==============

function init_page(){
    var settings = has_visited() ? load_settings() : default_settings();
    load_img_backgrounds()
    load_color_backgrounds()
    load_home_tab_items()

    on_img_bg_item_clicked(settings.background_img_name)
    on_color_bg_item_clicked(settings.background_color_name)
    on_home_tab_item_clicked(settings.home_tab);
}

init_page();
