// Load Markdown-It for Markdown rendering
let markdownIt = document.createElement('script');
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownIt);

// Channel details
let channelSlug = 'news-a_tx0woqtgk';
let title = 'title';
let description = 'description';
let content = 'content';

// Function to place channel info
let placeChannelInfo = (data) => {
    let channelDescription = document.getElementById('channel-description');
    let channelLink = document.getElementById('channel-link');
    channelDescription.innerHTML = window.markdownit().render(data.metadata.description); // Converts Markdown → HTML
    channelLink.href = `https://www.are.na/channel/${channelSlug}`;
};


// Modified renderBlock function to process blocks and append to the DOM
let renderBlock = (block, index) => {
    let channelBlocks = document.getElementById('channel-blocks');
    let uniqueId = `block-${index}`;

       // Text blocks
    if (block.class == 'Text') {
        let textItem =
        `        
        <li id = "${uniqueId}" class = "${content} newslist">
            <article id="newsarticle">${block.content}</article>
        </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);
    }
    // Similar logic can be extended for Text, Media, Attachment, etc.
};

// Fetch the data and process the blocks
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
    .then((response) => response.json()) // Return it as JSON data
    .then((data) => { // Do stuff with the data
        console.log(data); // Always good to check your response!
        placeChannelInfo(data); // Pass the data to the first function
        data.contents.reverse().forEach((block, index) => {
            renderBlock(block, index); // Pass the single block data to the render function along with its index
        });
    });
