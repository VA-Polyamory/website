// This is where custom js will go

window.addEventListener('message', (event) => {
  // Verify the message type to avoid unwanted messages
  if (event.data?.type === 'librarythingHeight') {
    const iframe = document.querySelector('iframe[src="librarything-widget.html"]');
    if (iframe && event.data.height) {
      iframe.style.height = event.data.height + 'px';
    }
  }
});