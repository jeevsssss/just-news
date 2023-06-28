const apiKey = '6e9d49176f78493fbd33752cfbb2c966';
const content = 'cricket';
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const defaultImageUrl = 'https://t4.ftcdn.net/jpg/04/92/39/11/360_F_492391117_bsAteaWt7I9gCAJY1Mt3QXXxdLXE2Nzq.jpg';

function searchNews() {
  const searchTerm = searchInput.value;
  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    searchTerm
  )}&apiKey=${apiKey}`;

  axios
    .get(apiUrl)
    .then((response) => {
      const articles = response.data.articles;
      newsContainer.innerHTML = ''; // Clear previous search results
      if (articles.length > 0) {
        articles.forEach((article) => {
          const articleElement = document.createElement('div');
          articleElement.classList.add('news-article');

          const imageUrl = article.urlToImage ? article.urlToImage : defaultImageUrl;

          articleElement.innerHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <div class="article-content">
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <a href="${article.url}" target="_blank">Read More</a>
            </div>
          `;
          newsContainer.appendChild(articleElement);
        });
      } else {
        const noResultsElement = document.createElement('p');
        noResultsElement.classList.add('no-results');
        noResultsElement.textContent = 'No results found.';
        newsContainer.appendChild(noResultsElement);
      }
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
    });
}

searchButton.addEventListener('click', searchNews);

// Perform search on Enter key press
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchNews();
  }
});
