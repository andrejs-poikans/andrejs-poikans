function toneJSpitch() {


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