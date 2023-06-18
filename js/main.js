const shortenUrl = async () => {
    const urlInput = document.getElementById('url-input');
    const shortenResult = document.getElementById('shorten-result');
  
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: urlInput.value })
    });
  
    const data = await response.json();
  
    shortenResult.innerText = `Short URL: ${data.shortUrl}`;
    urlInput.value = '';
  };