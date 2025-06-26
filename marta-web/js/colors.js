document.addEventListener('DOMContentLoaded', () => {
  const colorCombos = [
    { bg: '#ffb570', text: '#b09a74' },
    { bg: '#966e23', text: '#ff97ff' },
    // { bg: '#dde684', text: '#ffeb88' },
    { bg: '#745b72', text: '#e7e614' },
    { bg: '#4bb048', text: '#ffd793' },
    // { bg: '#8ed5e4', text: '#8ccb91' },
    { bg: '#9a732c', text: '#00b9ff' }
    // { bg: '#00b9ff', text: '#afa5db' },
    // { bg: '#00a9ff', text: '#9f00ff' },
    // { bg: '#76ffe5', text: '#ffc595' },
    // { bg: '#76ffe5', text: '#442912' },
    // { bg: '#00f5aa', text: '#745b72' }
  ];

  const randomCombo = colorCombos[Math.floor(Math.random() * colorCombos.length)];

  document.body.style.backgroundColor = randomCombo.bg;
  document.body.style.color = randomCombo.text;

  const footer = document.querySelector('footer');
  footer.style.color = randomCombo.bg;
  footer.style.backgroundColor = randomCombo.text;
});
