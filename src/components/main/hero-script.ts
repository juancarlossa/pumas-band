<script>
    let currentVideo = 0;
const videos = document.querySelectorAll("[data-video-index]");

function switchVideo() {
    const prevVideo = videos[currentVideo] as HTMLVideoElement;
    prevVideo.classNameList.remove("opacity-100");
    prevVideo.classNameList.add("opacity-0");

    currentVideo = (currentVideo + 1) % videos.length;

    const nextVideo = videos[currentVideo] as HTMLVideoElement;
    nextVideo.classNameList.remove("opacity-0");
    nextVideo.classNameList.add("opacity-100");

    // Preload next video
    const nextIndex = (currentVideo + 1) % videos.length;
    (videos[nextIndex] as HTMLVideoElement).load();
}

// Cambiar video cada 8 segundos
setInterval(switchVideo, 8000);

// Optimización de reproducción de video
document.addEventListener("DOMContentLoaded", () => {
    videos.forEach((video: Element) => {
        const videoElement = video as HTMLVideoElement;
        videoElement.play().catch(function (error) {
            console.log("Video autoplay failed:", error);
        });
    });
});
</script>

    <style>
@keyframes fade - up {
            from {
        opacity: 0;
        transform: translateY(20px);
    }
            to {
        opacity: 1;
        transform: translateY(0);
    }
}
    
        .animate - fade - up {
    animation: fade - up 0.6s ease - out forwards;
}
    
        .animation - delay - 100 {
    animation - delay: 100ms;
}
    
        .animation - delay - 200 {
    animation - delay: 200ms;
}
    
        .animation - delay - 300 {
    animation - delay: 300ms;
}
</style>