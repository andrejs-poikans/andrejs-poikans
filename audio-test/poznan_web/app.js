// async function toneJSMIC() {
//   await Tone.start(); // ✅ iOS requires user interaction to start AudioContext

//   const silentVid = document.getElementById("stayAwake");
//   if (silentVid) {
//     silentVid.play().catch((e) => console.warn("🔇 Silent video blocked:", e));
//   }

//   console.log("🔊 AudioContext started");

//   // Mic input and meter
//   const meter = new Tone.Meter();
//   const mic = new Tone.UserMedia().connect(meter);

//   try {
//     await mic.open();
//     console.log("🎙️ Mic open");

//     // Log volume for debug
//     setInterval(() => console.log("Mic level:", meter.getValue()), 100);
//   } catch (err) {
//     console.warn("❌ Mic not open", err);
//     return;
//   }

//   // Synth
//   const synth = new Tone.MonoSynth({
//     oscillator: { type: "sine" },
//     envelope: { attack: 1, decay: 1 },
//   }).toDestination(); // ✅ simpler routing

//   // 🔁 Play tone every second
//   const loop = new Tone.Loop((time) => {
//     synth.triggerAttackRelease("C4", "8n", time);
//   }, "1s");

//   loop.start(0); // ✅ make sure it's scheduled

//   // Start transport AFTER everything is scheduled
//   Tone.Transport.start();

//   // ✅ Optional: meter binding
//   const meterEl = document.querySelector("tone-meter");
//   if (meterEl && meterEl.bind) {
//     meterEl.bind(meter);
//   } else {
//     console.warn("⚠️ No <tone-meter> element or bind() not available");
//   }
// }

// FM Synth
function toneJS1() {
    // Create a synth and connect it to the master output
    const synth = new Tone.FMSynth({
      modulationIndex: 100,
      harmonicity: 3,
      envelope: {
        attack: 0.1,
        decay: 0.5,
      },
      modulation: {
        type: "triangle",
      },
      modulationEnvelope: {
        attack: 0.5,
        decay: 0.01,
      },
    }).toMaster();
  
    // Play a middle 'C' for the duration of four seconds
    synth.triggerAttackRelease("C3", "4");
  }


  function loadUI() {
    // Create envelope
    let env = new Tone.AmplitudeEnvelope({
      attack: 0.11,
      decay: 0.21,
      sustain: 0.5,
      release: 1.2,
    }).toMaster();
  
    // Create an oscillator and connect it to the envelope
    let osc = new Tone.Oscillator({
      partials: [3, 2, 1],
      type: "custom",
      frequency: "C#4",
      volume: -8,
    })
      .connect(env)
      .start();
  
    // Bind the interface
    document.querySelector("tone-envelope").bind(env);
    document.querySelector("tone-oscillator").bind(osc);
  
    document.querySelector("tone-trigger").addEventListener("change", (e) => {
      if (e.detail) {
        env.triggerAttack();
      } else {
        env.triggerRelease();
      }
    });
  }

function toneJSMIC() {

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
          },
      });

    const gainOne = new Tone.Gain(1).toMaster();
    const gainTwo = new Tone.Gain(1).toMaster();

    const signal = new Tone.Signal();
    const follower = new Tone.Follower();
    
    const sideChainRatio = 60;

    const negate = new Tone.Multiply(-sideChainRatio);
    const shift = new Tone.Add(1);

    mic.connect(gainOne);
    synth.connect(gainTwo);

    mic.connect(follower);
    follower.connect(signal);
    signal.connect(gainTwo.gain);
    // signal.connect(negate);
    // negate.connect(shift);
    // shift.connect(gainTwo.gain);

    const loop = new Tone.Loop((time) => {
      synth.triggerAttackRelease("C4", "1n", time);
    }, "1n").start();    

    document.querySelector("tone-meter").bind(meter);

    Tone.Transport.start();
}