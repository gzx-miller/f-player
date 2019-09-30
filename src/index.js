window.addEventListener('DOMContentLoaded', init);

function init() {
    for(let i = 1; i <= 4; ++ i) {
        var video = document.querySelector('#videoContainer-' + i);
        video.addEventListener('play', (e) => { playing(e, i) });
        video.addEventListener('ended', (e) => { ended(e, i) });
        video.addEventListener('error', (e) => videoError('Video Error at -' + i));
        video.addEventListener('stalled', (e) => videoError('Video Stalled at -' + i));
    
        var dropArea = document.querySelector('#dropArea-' + i);
        dropArea.addEventListener('dragleave', makeUnDroppable);
        dropArea.addEventListener('dragenter', makeDroppable);
        dropArea.addEventListener('dragover', makeDroppable);
        dropArea.addEventListener('drop', (e) => { loadVideo(e, i) });
    
        document.querySelector('#chooseVideo-' + i).addEventListener('change', (e) => { loadVideo(e, i) });
        document.querySelector('#openFile-' + i).addEventListener('click', () => {
            document.querySelector('#chooseVideo-' + i).click();
        });
    }
}

function playing(e, i){
    showFileArea(false, i);
}

function ended(e, i){
    showFileArea(true, i);
}

function showFileArea(show, i){
    var dropArea = document.querySelector('#dropArea-' + i);
    show? dropArea.classList.remove('hide'): dropArea.classList.add('hide');
}

function videoError(message) {
    document.querySelector('#errMsg').innerHTML = message;      // show error message
}

function makeDroppable(e) {
    e.preventDefault();
    e.target.classList.add('droppableArea');
};

function makeUnDroppable(e) {
    e.preventDefault();
    e.target.classList.remove('droppableArea');
};

function loadVideo(e, index) {
    e.preventDefault();
    e.stopPropagation();
    var files = [];
    if (e.dataTransfer) {
        files = e.dataTransfer.files;
    } else if (e.target.files) {
        files = e.target.files;
    } else {
        files=[{
            type:'video',
            path: e.target.value
        }];
    }
    for (var i = 0; i < files.length; i++) {
        if(files[i].type.indexOf('video') > -1){
            var video = document.querySelector('#videoContainer-' + index);
            video.src = files[i].path;
            video.play();
        }
    };
};