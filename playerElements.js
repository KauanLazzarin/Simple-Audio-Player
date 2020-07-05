import { fixTime } from "./utils.js";
export default {
    get () {
        this.cover =  document.querySelector('.card-image')
        this.title =  document.querySelector('.card-content h5')
        this.artist =  document.querySelector('.card-content p')
        this.playPause = document.querySelector('#play-pause')
        this.volButton = document.querySelector('#vol')
        this.volMixer = document.querySelector('#vol-control')
        this.seekBar = document.querySelector('#seekbar')
        this.currentDuration = document.querySelector('#current-duration')
        this.totalDuration = document.querySelector('#total-duration')
        this.skipButton = document.querySelector('#skip-next')
        this.returnButton = document.querySelector('#skip-previous')
    },

    createAudioElement (audio) {
        this.audio = new Audio(audio)
    },

    actions () {
        this.audio.onended = () => this.next() 
        
        this.audio.ontimeupdate = () => this.timeUpdate()
        // Play and pause
        this.playPause.onclick = () => this.togglePlayPause()
        this.volButton.onclick = () => this.toggleMuted()

        //Volume
        this.volMixer.oninput = () => this.setVolume(this.volMixer.value)
        this.volMixer.onchange = () => this.setVolume(this.volMixer.value)

        //Time Bar
        this.seekBar.oninput = () => this.setTimeBar(this.seekBar.value)
        this.seekBar.onchange = () => this.setTimeBar(this.seekBar.value)
        this.seekBar.max = this.audio.duration

        //currentDuration and totalDuration
        this.totalDuration.innerText = fixTime(this.audio.duration) 

        //Skip and previous
        this.skipButton.onclick = () => this.skipMusic()
        this.returnButton.onclick = () => this.returnAll()
    }
}