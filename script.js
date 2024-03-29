document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('videoElement');
    const overlayText = document.querySelector('.overlay-text'); // テキスト要素を取得

    video.addEventListener('loadedmetadata', () => {
        const videoHeight = video.duration * 200; // 例えば、動画の1秒あたり200pxのスクロール量を割り当てる
        document.body.style.height = `${videoHeight + window.innerHeight}px`; // 動画の長さに応じてbodyの高さを設定

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY || window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollPosition / maxScroll;
            video.currentTime = scrollFraction * video.duration;

            // テキストの移動開始タイミングを調整するためにスクロール割合を変更
            const earlyStartFactor = 0.3; // この値を調整してテキストの出現タイミングを早める
            const textScrollFraction = scrollFraction / earlyStartFactor;

            // テキストが下から上へ流れるように位置を動的に調整
            const textScrollPosition = Math.min(window.innerHeight, (1 - textScrollFraction) * window.innerHeight);
            overlayText.style.transform = `translateY(${textScrollPosition}px)`;
        });
    });
});
