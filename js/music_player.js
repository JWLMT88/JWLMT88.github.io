console.log('JavaScript loaded successfully.');
        const audio = new Audio();
        const fileInput = document.getElementById('fileInput');
        const playPauseBtn = document.getElementById('playPauseBtn');
        const stopBtn = document.getElementById('stopBtn');
        const volumeSlider = document.getElementById('volumeSlider');
        const titleElement = document.getElementById('title');
        const artistElement = document.getElementById('artist');
        const albumCoverElement = document.getElementById('albumCover');
        const albumCoverContainerElement = document.getElementById('albumCoverContainer');
        const playlistElement = document.getElementById('playlist');

        let playlist = []; // Store the playlist array here
        let currentIndex = 0; // Keep track of the currently playing track

        function playAudio() {
            if (playlist.length === 0) return;
            
            playPauseBtn.classList.add('playing');
            albumCoverContainerElement.classList.add('playing');
            const currentTrack = playlist[currentIndex];
            const objectURL = URL.createObjectURL(currentTrack.file);
            audio.src = objectURL;
            audio.play();
            updateMetadata(currentTrack.name, currentTrack.artist, currentTrack.albumCover);
            audio.addEventListener('timeupdate', updateProgressBar);
        }

        function updateMetadata(title, artist, albumCover) {
            titleElement.innerText = title;
            artistElement.innerText = artist;
            albumCoverElement.src = albumCover;
        }

        function readFileData(file) {
            if (!(file instanceof Blob)) {
                console.error('Invalid file type. Expected Blob.');
                return;
            }
        
            const reader = new FileReader();
            const audioElement = new Audio();

            reader.onload = function (event) {
                const audioData = event.target.result;
                audioElement.src = audioData;
                
                const duration = audioElement.duration;
                const title = file.name;
                const artist = audioElement.artist || "Unknown Artist";
                const albumCover = audioElement.albumCover || "/images/favlogo.png"; // Replace with default image URL
    
                const track = {
                    name: title,
                    artist: artist,
                    albumCover: albumCover,
                    file: file
                };
    
                playlist.push(track);
    
                // Display the track in the playlist
                const trackElement = document.createElement('div');
                trackElement.className = "track";
                trackElement.innerHTML = `<span class="material-icons">music_note</span><span class="track-name">${title} - ${artist}</span>`;
                playlistElement.appendChild(trackElement);
                
                

                if (currentIndex === 0 && !audio.paused) {
                    // If it's the first track and audio is playing, pause it and play the new track
                    audio.pause();
                    audio = audioElement;
                    currentIndex = playlist.length - 1;
                    playAudio();
                }

                playAudio()
            };
        
            reader.readAsArrayBuffer(file);
        }
        fileInput.addEventListener('change', function (event) {
            console.log('File input change event triggered.');
            const files = event.target.files;
            console.log('Selected files:', files);
            for (const file of files) {
                console.log('Reading file:', file.name);
                readFileData(file);
            }
        });

        playPauseBtn.addEventListener('click', () => {
            console.log('Play/Pause button clicked.');

            if (audio.paused) {
                if (audio.src === '') {
                    currentIndex = 0;
                    playAudio();
                } else {
                    audio.play();
                    playPauseBtn.classList.add('playing');
                    albumCoverContainerElement.classList.add('playing');
                }
            } else {
                playPauseBtn.classList.remove('playing');
                albumCoverContainerElement.classList.remove('playing');
                audio.pause();
            }
        });

        stopBtn.addEventListener('click', () => {
            audio.pause();
            audio.currentTime = 0;
            playPauseBtn.classList.remove('playing');
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });

        audio.addEventListener('ended', () => {
            currentIndex++;
            if (currentIndex >= playlist.length) {
                currentIndex = 0;
            }
            playAudio();
        });
        // Update the progress bar with the current progress
        function updateProgressBar() {
            const progressBar = document.getElementById('progressBar');
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
