window.addEventListener('DOMContentLoaded', init);

function init() {
    try {
        for(let i = 1; i <= 4; ++ i) {
            let video = document.querySelector('#videoContainer-' + i);
            video.addEventListener('play', (e) => { playStart(i) });
            video.addEventListener('dragover', (e) => { showFileArea(true, i) });
            video.addEventListener('ended', (e) => { showFileArea(true, i) });
            video.addEventListener('error', (e) => videoError('Video Error at -' + i));
            video.addEventListener('stalled', (e) => videoError('Video Stalled at -' + i));

            let dropArea = document.querySelector('#dropArea-' + i);
            dropArea.addEventListener('dragleave', makeUnDroppable);
            dropArea.addEventListener('dragenter', makeDroppable);
            dropArea.addEventListener('dragover', makeDroppable);
            dropArea.addEventListener('drop', (e) => { loadVideo(e, i) });

            document.querySelector('#chooseVideo-' + i).addEventListener('change', (e) => { loadVideo(e, i) });
            document.querySelector('#openFile-' + i).addEventListener('click', () => {
                document.querySelector('#chooseVideo-' + i).click();
            });

            let videoFile = localStorage.getItem('#f-player-' + i);
            if (videoFile) {
                video.src = videoFile;
                video.play();
            }
        }
    } catch (error) {
    }
}

function playStart(i) {
    showFileArea(false, i);
    let video = document.querySelector('#videoContainer-' + i);
    console.log("playStart: + " + video.src);
    localStorage.setItem('#f-player-' + i, video.src);
}

function showFileArea(show, i){
    try {
        let dropArea = document.querySelector('#dropArea-' + i);
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
        let files = [];
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
        for (let i = 0; i < files.length; i++) {
            if(files[i].type.indexOf('video') > -1){
                let video = document.querySelector('#videoContainer-' + index);
                video.src = files[i].path;
                video.play();
            }
        };
    } catch (error) {
    }
};