window.addEventListener('DOMContentLoaded', init);

function init(){
    var video = document.querySelector('#videoContainer');
    video.addEventListener('play', playing);
    video.addEventListener('ended', ended);
    video.addEventListener('error', (e) => videoError('Video Error'));
    video.addEventListener('stalled', (e) => videoError('Video Stalled'));

    var dropArea = document.querySelector('#dropArea');
    dropArea.addEventListener('dragleave', makeUnDroppable);
    dropArea.addEventListener('dragenter', makeDroppable);
    dropArea.addEventListener('dragover', makeDroppable);
    dropArea.addEventListener('drop', loadVideo);

    document.querySelector('#chooseVideo').addEventListener('change', loadVideo);
    document.querySelector('#fileChooser').addEventListener('click', ()=>{
        document.querySelector('#chooseVideo').click();
    });
}

function playing(e){
    showFileArea(false);
}

function ended(e){
    showFileArea(true);
}

function showFileArea(show){
    var dropArea = document.querySelector('#dropArea');
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

function loadVideo(e) {
    e.preventDefault();
    var files = [];
    if(e.dataTransfer){
        files = e.dataTransfer.files;
    }else if(e.target.files){
        files = e.target.files;
    }else{
        files=[{
            type:'video',
            path: e.target.value
        }];
    }

    for (var i = 0; i < files.length; i++) {
        console.log(files[i]);
        if(files[i].type.indexOf('video')>-1){
            var video = document.querySelector('video');
            video.src=files[i].path;
            video.play();
        }
    };
};