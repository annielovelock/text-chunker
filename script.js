// Get the input and output elements from the HTML
const inputBox = document.getElementById('input-box');
const outputContainer = document.getElementById('output-container');

// Add an event listener to the button
const button = document.getElementById('button');
button.addEventListener('click', function() {
  // Get the input text
  const inputText = inputBox.value;

  // Split the input text into chunks of 2000 characters or less
  const chunkSize = 4000;
  const chunks = [];
  let start = 0;
  while (start < inputText.length) {
    let end = start + chunkSize;
    if (end >= inputText.length) {
      chunks.push(inputText.slice(start));
      break;
    }
    // find the last occurrence of ., ?, or ! before the 2000 character mark
    let lastPunctuation = Math.max(
      inputText.lastIndexOf('.', end),
      inputText.lastIndexOf('?', end),
      inputText.lastIndexOf('!', end)
    );
    if (lastPunctuation > start) {
      end = lastPunctuation + 1;
    }
    chunks.push(inputText.slice(start, end));
    start = end;
  }

  // Create a new text area, label, and "Copy" button for each chunk and append them to the output container
  outputContainer.innerHTML = '';
  chunks.forEach((chunk, index) => {
    const chunkLabel = document.createElement('label');
    chunkLabel.textContent = `Chunk ${index + 1}/${chunks.length}`;
    chunkLabel.style.display = 'block';
    chunkLabel.style.marginTop = '40px';
    chunkLabel.style.marginBottom = '10px';
    chunkLabel.style.fontFamily = 'Roboto';
    chunkLabel.style.fontSize = '16px';
    chunkLabel.style.fontWeight = '800';
    outputContainer.appendChild(chunkLabel);

    const outputBox = document.createElement('textarea');
    outputBox.value = chunk;
    outputBox.readOnly = true;
    outputBox.style.width = '100%';
    outputBox.style.height = '150px';
    outputBox.style.border = '1px solid #ccc';
    outputBox.style.borderRadius = '5px';
    outputBox.style.marginBottom = '10px';
    outputContainer.appendChild(outputBox);

    const copyButton = document.createElement('button');
    copyButton.innerText = 'Copy';
    copyButton.style.fontFamily = 'Lilita One';
    copyButton.style.marginBottom = '20px';
    copyButton.style.fontSize = '18px';
    copyButton.style.padding = '10px 20px';
    copyButton.style.backgroundColor = '#5B8E7D';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '5px';
    copyButton.style.cursor = 'pointer';

    
    copyButton.addEventListener('click', function() {
      outputBox.select();
      document.execCommand('copy');
            const copiedSpan = document.createElement('span');
      copiedSpan.textContent = 'Copied!';
      copiedSpan.style.marginLeft = '10px';
      copiedSpan.style.fontFamily = 'Roboto';
      copiedSpan.style.color = '#BB342F';
      copiedSpan.style.fontSize = '14px';
      copiedSpan.style.opacity = '1';
      copiedSpan.style.transition = 'opacity 0.5s';
      outputContainer.insertBefore(copiedSpan, copyButton.nextSibling);
      setTimeout(() => {
        copiedSpan.style.opacity = '0';
        setTimeout(() => {
          outputContainer.removeChild(copiedSpan);
        }, 500);
      }, 1000);
    });
    outputContainer.appendChild(copyButton);
  });
});

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Show or hide the "Scroll to Top" button depending on the current scroll position
  if (window.pageYOffset > 100) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});
// Get the input and output elements from the HTML
const scrollToTopButton = document.getElementById('scroll-to-top');

// Add a scroll event listener to the window
window.addEventListener('scroll', function() {
  // Show or hide the "Scroll to Top" button depending on the current scroll position
  if (window.pageYOffset > 100) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Add an event listener to the "Scroll to Top" button
scrollToTopButton.addEventListener('click', function() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
