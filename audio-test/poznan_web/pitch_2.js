function toneJSpitch() {


    const meter = new Tone.Meter();
    const mic = new Tone.UserMedia().connect(meter);

mic.open().then(() => {
    console.log("mic open");

    // Log mic levels
    setInterval(() => console.log(meter.getValue()), 100);

    // Create and style video
    const video = document.createElement('video');
    video.setAttribute('loop', '');
    video.setAttribute('muted', ''); // Required for autoplay
    video.setAttribute('playsinline', ''); // iOS fullscreen
    video.setAttribute('autoplay', '');
    video.setAttribute('style', `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999;
        object-fit: cover;
        background: black;
    `);

    // Add source function
    function addSourceToVideo(el, type, dataURI) {
        const source = document.createElement('source');
        source.src = dataURI;
        source.type = 'video/' + type;
        el.appendChild(source);
    }

    // Base64 helpers
    function base64(mimeType, b64) {
        return `data:${mimeType};base64,${b64}`;
    }

    // Add your base64-encoded videos
    addSourceToVideo(video, 'webm', base64('video/webm', 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA='));

    addSourceToVideo(video, 'mp4', base64('video/mp4', 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=='));

    // Add to DOM
    document.body.appendChild(video);

    // Attempt autoplay
    video.play().catch(err => {
        console.warn("🔇 Video play failed:", err);
    });

    // Attempt fullscreen
    const requestFS = video.requestFullscreen ||
                      video.webkitEnterFullscreen || // iPhone video element
                      video.webkitRequestFullscreen ||
                      video.msRequestFullscreen;

    if (requestFS) {
        try {
            requestFS.call(video);
        } catch (err) {
            console.warn("❌ Fullscreen failed:", err);
        }
    }

}).catch(e => {
    console.log("mic not open", e);
});



    // mic.open().then(() => {
    //     // promise resolves when input is available
    //     console.log("mic open");
    //     // print the incoming mic levels in decibels
    //     setInterval(() => console.log(meter.getValue()), 100);
    // }).catch(e => {
    //     // promise is rejected when the user doesn't have or allow mic access
    //     console.log("mic not open");
    // });

    const synth = new Tone.MonoSynth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 1,
            decay: 1,
          }
      });

    const gainOne = new Tone.Gain(1).toMaster();
    const gainTwo = new Tone.Gain(1).toMaster();

    synth.volume.value = 1;

    mic.connect(gainOne);
    synth.connect(gainTwo);

    document.querySelector("tone-meter").bind(meter);


    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let microphoneStream = null;
    let analyserNode = audioCtx.createAnalyser()
    let audioData = new Float32Array(analyserNode.fftSize);;
    let corrolatedSignal = new Float32Array(analyserNode.fftSize);;
    let localMaxima = new Array(10);
    const frequencyDisplayElement = document.querySelector('#frequency');

        navigator.mediaDevices.getUserMedia ({audio: true})
            .then((stream) =>
            {
                microphoneStream = audioCtx.createMediaStreamSource(stream);
                microphoneStream.connect(analyserNode);

                audioData = new Float32Array(analyserNode.fftSize);
                corrolatedSignal = new Float32Array(analyserNode.fftSize);

                setInterval(() => {
                    analyserNode.getFloatTimeDomainData(audioData);
                    let pitch = getAutocorrolatedPitch();

                    frequencyDisplayElement.innerHTML = `${pitch}`;
                }, 300);
            })
            .catch((err) =>
            {
                console.log(err);
            });

    function getAutocorrolatedPitch()
    {
        // First: autocorrolate the signal

        let maximaCount = 0;

        for (let l = 0; l < analyserNode.fftSize; l++) {
            corrolatedSignal[l] = 0;
            for (let i = 0; i < analyserNode.fftSize - l; i++) {
                corrolatedSignal[l] += audioData[i] * audioData[i + l];
            }
            if (l > 1) {
                if ((corrolatedSignal[l - 2] - corrolatedSignal[l - 1]) < 0
                    && (corrolatedSignal[l - 1] - corrolatedSignal[l]) > 0) {
                    localMaxima[maximaCount] = (l - 1);
                    maximaCount++;
                    if ((maximaCount >= localMaxima.length))
                        break;
                }
            }
        }

        // Second: find the average distance in samples between maxima

        let maximaMean = localMaxima[0];

        for (let i = 1; i < maximaCount; i++)
            maximaMean += localMaxima[i] - localMaxima[i - 1];

        maximaMean /= maximaCount;

        return audioCtx.sampleRate / maximaMean;
    }


    const loop = new Tone.Loop((time) => {
        let pitch = getAutocorrolatedPitch();
        synth.triggerAttackRelease(pitch, "1n", time);
    }, "1n").start();


    mic.connect(gainOne);
    synth.connect(gainTwo);

    // const signal = new Tone.Signal();
    // const follower = new Tone.Follower();
    // mic.connect(follower);
    // follower.connect(signal);
    // signal.connect(gainTwo.gain);


      Tone.Transport.start();

}

function toneJSstatic() {


    const synth = new Tone.MonoSynth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 1,
            decay: 1,
          }
      }).toMaster();

    // const seq = new Tone.Sequence((time, note) => {
    //     synth.triggerAttackRelease(note, 1, time);
    //     // subdivisions are given as subarrays
    // }, [[261.625, 318.776, 343.228, 318.76, 392], 392, [491.60, 523.25], 261.625], 1).start(0);

    synth.triggerAttackRelease(261.625, 60);
    synth.triggerAttackRelease(318.776, 60, Tone.Time(60));
    synth.triggerAttackRelease(343.228, 60, Tone.Time(120));
    synth.triggerAttackRelease(318.76, 60, Tone.Time(180));
    synth.triggerAttackRelease(392, 180, Tone.Time(240));
    synth.triggerAttackRelease(491.60, 60, Tone.Time(420));
    synth.triggerAttackRelease(523.25, 60, Tone.Time(480));
    synth.triggerAttackRelease(261.625, 120, Tone.Time(540));
}

function toneJSsong() {
    // const player = new Tone.Player("./Layali.mp3").toMaster();
    const player = new Tone.Player("https://andrejs.poikans.com/poznan_web/Layali.mp3").toMaster();
    player.autostart = true;
}


function toneJSfollower() {


    const meter = new Tone.Meter();
    const mic = new Tone.UserMedia().connect(meter);


    mic.open().then(() => {
        // promise resolves when input is available
        console.log("mic open");
        // print the incoming mic levels in decibels
        setInterval(() => console.log(meter.getValue()), 100);
    }).catch(e => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log("mic not open");
    });

    const synth = new Tone.MonoSynth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 1,
            decay: 1,
          }
      });

    const gainOne = new Tone.Gain(1).toMaster();
    const gainTwo = new Tone.Gain(1).toMaster();

    synth.volume.value = 10;

    mic.connect(gainOne);
    synth.connect(gainTwo);

    document.querySelector("tone-meter").bind(meter);


    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let microphoneStream = null;
    let analyserNode = audioCtx.createAnalyser()
    let audioData = new Float32Array(analyserNode.fftSize);;
    let corrolatedSignal = new Float32Array(analyserNode.fftSize);;
    let localMaxima = new Array(10);
    const frequencyDisplayElement = document.querySelector('#frequency');

        navigator.mediaDevices.getUserMedia ({audio: true})
            .then((stream) =>
            {
                microphoneStream = audioCtx.createMediaStreamSource(stream);
                microphoneStream.connect(analyserNode);

                audioData = new Float32Array(analyserNode.fftSize);
                corrolatedSignal = new Float32Array(analyserNode.fftSize);

                setInterval(() => {
                    analyserNode.getFloatTimeDomainData(audioData);
                    let pitch = getAutocorrolatedPitch();

                    frequencyDisplayElement.innerHTML = `${pitch}`;
                }, 300);
            })
            .catch((err) =>
            {
                console.log(err);
            });

    function getAutocorrolatedPitch()
    {
        // First: autocorrolate the signal

        let maximaCount = 0;

        for (let l = 0; l < analyserNode.fftSize; l++) {
            corrolatedSignal[l] = 0;
            for (let i = 0; i < analyserNode.fftSize - l; i++) {
                corrolatedSignal[l] += audioData[i] * audioData[i + l];
            }
            if (l > 1) {
                if ((corrolatedSignal[l - 2] - corrolatedSignal[l - 1]) < 0
                    && (corrolatedSignal[l - 1] - corrolatedSignal[l]) > 0) {
                    localMaxima[maximaCount] = (l - 1);
                    maximaCount++;
                    if ((maximaCount >= localMaxima.length))
                        break;
                }
            }
        }

        // Second: find the average distance in samples between maxima

        let maximaMean = localMaxima[0];

        for (let i = 1; i < maximaCount; i++)
            maximaMean += localMaxima[i] - localMaxima[i - 1];

        maximaMean /= maximaCount;

        return audioCtx.sampleRate / maximaMean;
    }


    const loop = new Tone.Loop((time) => {
        let pitch = getAutocorrolatedPitch();
        synth.triggerAttackRelease(pitch, "1n", time);
    }, "1n").start();


    mic.connect(gainOne);
    synth.connect(gainTwo);

    const signal = new Tone.Signal();
    const follower = new Tone.Follower();
    mic.connect(follower);
    follower.connect(signal);
    signal.connect(gainTwo.gain);


      Tone.Transport.start();

}



// async function toneJSpitch() {
//   await Tone.start(); // ✅ Required for iOS AudioContext

//   // 🔇 Silent video to prevent screen/audio sleep on iOS
//   const silentVid = document.getElementById("stayAwake");
//   if (silentVid) {
//     try {
//       await silentVid.play();
//       console.log("▶️ Silent video playing to keep device awake");
//     } catch (e) {
//       console.warn("🔇 Silent video blocked:", e);
//     }
//   }

//   const meter = new Tone.Meter();
//   const mic = new Tone.UserMedia().connect(meter);

//   try {
//     await mic.open();
//     console.log("🎙️ Mic open");
//   } catch (err) {
//     console.error("❌ Mic failed", err);
//     return;
//   }

//   document.querySelector("tone-meter")?.bind?.(meter);

//   const synth = new Tone.MonoSynth({
//     oscillator: { type: "sine" },
//     envelope: { attack: 1, decay: 1 },
//   }).toMaster();

//   const gainOne = new Tone.Gain(1).toMaster();
//   const gainTwo = new Tone.Gain(1).toMaster();

//   mic.connect(gainOne);
//   synth.connect(gainTwo);

//   // ⚠️ Use Tone's native audio context
//   const audioCtx = Tone.context.rawContext;
//   const analyserNode = audioCtx.createAnalyser();
//   analyserNode.fftSize = 2048;

//   const audioData = new Float32Array(analyserNode.fftSize);
//   const corrolatedSignal = new Float32Array(analyserNode.fftSize);
//   const localMaxima = new Array(10);
//   const frequencyDisplayElement = document.querySelector("#frequency");

//   // ⚠️ Use native MediaStream from Tone.UserMedia
//   const micStream = mic._stream;
//   const micNode = audioCtx.createMediaStreamSource(micStream);
//   micNode.connect(analyserNode);

//   function getAutocorrolatedPitch() {
//     let maximaCount = 0;

//     for (let l = 0; l < analyserNode.fftSize; l++) {
//       corrolatedSignal[l] = 0;
//       for (let i = 0; i < analyserNode.fftSize - l; i++) {
//         corrolatedSignal[l] += audioData[i] * audioData[i + l];
//       }

//       if (
//         l > 1 &&
//         corrolatedSignal[l - 2] < corrolatedSignal[l - 1] &&
//         corrolatedSignal[l - 1] > corrolatedSignal[l]
//       ) {
//         localMaxima[maximaCount++] = l - 1;
//         if (maximaCount >= localMaxima.length) break;
//       }
//     }

//     if (maximaCount === 0) return 0;

//     let maximaMean = localMaxima[0];
//     for (let i = 1; i < maximaCount; i++) {
//       maximaMean += localMaxima[i] - localMaxima[i - 1];
//     }
//     maximaMean /= maximaCount;

//     return Math.round(audioCtx.sampleRate / maximaMean);
//   }

//   setInterval(() => {
//     analyserNode.getFloatTimeDomainData(audioData);
//     const pitch = getAutocorrolatedPitch();
//     frequencyDisplayElement.innerText = isFinite(pitch) ? pitch : "–";
//   }, 300);

//   const loop = new Tone.Loop((time) => {
//     analyserNode.getFloatTimeDomainData(audioData);
//     const pitch = getAutocorrolatedPitch();
//     if (pitch > 50 && pitch < 2000) {
//       synth.triggerAttackRelease(pitch, "8n", time);
//     }
//   }, "1n");

//   loop.start(0);
//   Tone.Transport.start();
// }
