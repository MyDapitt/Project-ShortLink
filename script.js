const form = document.querySelector('form');
const shortenResult = document.querySelector('#shorten-result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const originalUrl = document.querySelector('#original-url').value;

  const response = await fetch('/.netlify/functions/shorten', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ originalUrl })
  });

  const { shortUrl } = await response.json();

  shortenResult.innerHTML = `Shorten Result: <a href="${shortUrl}">${shortUrl}</a>`;
});