# FocusTime

## Overview:
An app that helps user focus on tasks, save and track progress, as well as motivate user by making work fun by allowing them to work while they listen to their favourite music.

## Authors:
- [Alborz Khakbazan](https://github.com/alborzk) - khakbaza@myumanitoba.ca
- [Humayra Anjum Rafi](https://github.com/Humayra98) - rafiha@myumanitoba.ca
- [Jase Tran](https://github.com/tranndt) - tranndt@myumanitoba.ca 
- [Jules Basa](https://github.com/basaaj) - basaj@myumanitoba.ca
- [Reymel Eusebio](https://github.com/r3ym3l) - eusebior@myumanitoba.ca

## How to run:

Download or clone from GitHub: https://github.com/HumayraR/focustime

### Via _index.html_:
Double click on the index.html file located in the _focustime_ directory to run application.

### Via Live server:
Make sure that the extension _Live Server_ is installed in your Visual Studio Code. Open/import the _focustime_ folder in visual studio code. Navigate to the _Go Live_ buttone and click on it to run software. Or right click on the index.html file and select _Open with Live Server_ 

### Via GitHub Pages:
The application is also published with GitHub Pages. You can run it via this link - https://humayrar.github.io/focustime/ 

## App Description: 

### My Timer page:

![My Timer page screenshot](https://raw.githubusercontent.com/Humayra98/focustime/main/assets/readme_imgs/my_timer.png)
This page contains the main functionality of FocusTime, where the user can set a period of time for them to focus on a certain task while also having the option to play music. There is a _Project_ and _Task_ selector in which the user can choose an existing task or create a new one, and have the option of having it under a particular project or no project at all. When setting the timer, the user is prompted to set the values of the time in this page but also have the option to set the time according to the album length through the music page. When a time is set, a break time is automatically set to 25% of that set time; after a user uses up their break time, they can no longer pause their session. On initial load, there will be no album selected but there will be a message on the widget telling the user to navigate to the music page so that an album can be chosen. The users can also write down important notes during their focus period which can be saved for that session once the timer is done and the user logs the percentage of the work they completed.  

### My Music page:

![My Music page screenshot](https://raw.githubusercontent.com/Humayra98/focustime/main/assets/readme_imgs/my_music.png)
This page contains the main functionality of the music aspect for FocusTime. This page represents an eventual implentation of an API like _Spotify_, where the user can log in and select any albums that suit their tastes or mood for the session. Once an album is selected, the user can view the details of the album such as the total length as well as being able to scroll down and view the songs contained in that particular album. The user can choose to add an album to the song queue which will update the widget in the timer page and display the list of songs there which the user can play and listen to. The user can also base their workflow off an album by choosing to set the timer to the album length.

### My Statistics page:

![My Statistics page screenshot](https://raw.githubusercontent.com/Humayra98/focustime/main/assets/readme_imgs/my_statistics.png)  
This page shows statistics on the tasks and projects done in a week in the form of bubbles. Different colors represent different projects and the bubble's size of represents the amount of time spent on it. The more time spent on a task, the bigger the circle. The user also has the option of filtering by a specific project so that they can easily see all of its associating tasks.

### My Progress page (previously Upcoming Tasks):

![My Progress page screenshot](https://raw.githubusercontent.com/Humayra98/focustime/main/assets/readme_imgs/my_progress.png)
This page keeps track of the progress of user has made on their tasks, as the title suggests. The tasks are categorized by their respective projects and whether they are still in progress or have been completed. The user can also create new tasks and projects on this page. Task details such as its due date, progress, notes, and focus and break times are shown on the _Details_ panel once clicked. For quick access, users can find particular tasks or projects by using the search feature. 

### My Settings page:

![My Settings page screenshot](https://raw.githubusercontent.com/Humayra98/focustime/main/assets/readme_imgs/my_settings.png)  
This page allows the users to set a homepage/home tab so that the user can be direected to the selected page everytime they click on the FocusTime logo. They can also change the background of the app. In addition, it also has a brief intro to the app as well as the GitHub user links of the authors.
