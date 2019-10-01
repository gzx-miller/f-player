window.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        for(let i = 1; i <= 4; ++ i) {
            var video = document.querySelector('#videoContainer-' + i);
            video.addEventListener('play', (e) => { showFileArea(false, i) });
            video.addEventListener('pause', (e) => { showFileArea(true, i) });
            video.addEventListener('ended', (e) => { showFileArea(true, i) });
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
    } catch (error) {
    }
}

function showFileArea(show, i){
    try {
        var dropArea = document.querySelector('#dropArea-' + i);
        show? dropArea.classList.remove('hide'): dropArea.classList.add('hide');
    } catch (error) {
    }

}

function videoError(message) {
    try {
        document.querySelector('#errMsg').innerHTML = message;      // show error message
    } catch (error) {
    }
}

function makeDroppable(e) {
    try {
        e.preventDefault();
        e.target.classList.add('droppableArea');
    } catch (error) {
    }
};

function makeUnDroppable(e) {
    try {
        e.preventDefault();
        e.target.classList.remove('droppableArea');
    } catch (error) {
    }
};

function loadVideo(e, index) {
    try {
        e.target.classList.remove('droppableArea');
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
    } catch (error) {
    }
};