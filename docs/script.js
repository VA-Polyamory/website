// This is where custom js will go

const iframe = document.getElementById('librarything-iframe');
const container = document.getElementById('librarything-container');

let lastWidth = container.offsetWidth;

const observer = new ResizeObserver(entries => {
  for (const entry of entries) {
    const newWidth = entry.contentRect.width;
    // Reload iframe if width has changed significantly (e.g. > 50px)
    if (Math.abs(newWidth - lastWidth) > 50) {
      const currentSrc = iframe.src;
      iframe.src = ''; // Force unload
      iframe.src = currentSrc; // Force reload
      lastWidth = newWidth;
    }
  }
});

observer.observe(container);

window.addEventListener('message', (event) => {
  //console.log('Message received:', event);
  // Verify the message type to avoid unwanted messages
  if (event.data?.type === 'librarythingHeight') {
    const iframe = document.getElementById('librarything-iframe');
    if (iframe && event.data.height) {
      iframe.style.height = event.data.height + 'px';
      //console.log('iframe height:',event.data.height);
    }
  }
});

