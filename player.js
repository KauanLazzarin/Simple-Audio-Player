//Elements imports

import audios from './data.js'
import { path, fixTime } from "./utils.js";
import  elements  from "./playerElements.js";

// Elements exports
export default {
    audioData: audios,
    currentAudio: {},
    isPlaying: false,
    currentPlaying: 0,

    // Start the songs
    start () {  
        elements.get.call(this)
        this.update()     
    },

    // Set the next song to be played
    next () {
        this.currentPlaying++
        if (this.currentPlaying == this.audioData.length) this.restart()
        this.update()
        this.play()
    },

    // Play the song
    play () {
        this.isPlaying = true
        this.audio.play()
        this.playPause.innerText = "pause"
    },

    // Pause the song
    pause () {
        this.isPlaying = false
        this.audio.pause()
        this.playPause.innerText = "play_arrow"
    },

    // Previous song
    returnAll () {
        this.currentPlaying--
        this.audio.pause()
        this.start()
        this.play()
    },

    // Skip to the next song
    skipMusic () {
        this.audio.pause()
        this.next()
    },

    // Set the action of play-pause button
    togglePlayPause () {
        if (this.isPlaying) {
            this.pause()
        } else {
            this.play()
        }
    },

    // Set the action of mute-unmuted button
    toggleMuted () {
        this.audio.muted = !this.audio.muted
        if (this.audio.muted == true) {
            this.volButton.innerText = "volume_off"
        } else {
            this.volButton.innerText = "volume_up"
        }
    },

    // Set the volume and time bar
    setVolume (value) {
        this.audio.volume = value / 100
    },

    setTimeBar (value) {
        this.audio.currentTime = value
    },

    timeUpdate ()  {
        this.currentDuration.innerText = fixTime(this.audio.currentTime)
        this.seekBar.value = this.audio.currentTime
    },

    // Update the song's data
    update () {
        this.currentAudio = this.audioData[this.currentPlaying]
        this.cover.style.background = `url("${path(this.currentAudio.cover)}") no-repeat center center / cover`
        this.title.innerText = this.currentAudio.title
        this.artist.innerText = this.currentAudio.artist
        elements.createAudioElement.call(this, path(this.currentAudio.file))
        this.audio.onloadeddata = () => {
            elements.actions.call(this)
        }
    },   

    // restarts the song player
    restart () {
        this.currentPlaying = 0
        this.update()
    }
}
