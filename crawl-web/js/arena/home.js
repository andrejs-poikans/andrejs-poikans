
// Load Markdown-It for Markdown rendering
let markdownIt = document.createElement('script');
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownIt);

// Channel details
let channelSlug = 'current-zgatrk65fp0';
let title = 'title';
let description = 'description';
let content = 'content';

let directToChannel = `https://www.are.na/channel/${channelSlug}`;

// Function to place channel info
let placeChannelInfo = (data) => {
    let channelLink = document.getElementById('channel-link');
    channelLink.href = `https://www.are.na/channel/${channelSlug}`;
};

// Modified renderBlock function
let renderBlock = (block, index) => {
    let channelBlocks = document.getElementById('channel-blocks');
    let uniqueId = `block-${index}`;

    // Links!
    if (block.class === 'Link') {
        let linkItem = `
            <li id="${uniqueId}" class="${title}">
                <h1>${block.title}</h1>
            </li>
            <li class="${content}">
            <a target = "_blank" href="${ block.source.url }">
                <picture>
                    <source media="(max-width: 428px)" srcset="${block.image.thumb.url}">
                    <source media="(max-width: 640px)" srcset="${block.image.large.url}">
                    <img src="${block.image.original.url}">
                </picture>
            </a>
            </li>
            <li class="${description}">
                <article>${block.description_html}</article>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }


    // Images!
    else if (block.class == 'Image') {
        let imageItem =
        `
        <li id="${uniqueId}" class="${title}">
            <h1>${block.title}</h1>
        </li>
        <li class="${description}">
            <h2>${block.description_html}</h2>
        </li>
        <li class="${content}">
            <img src="${block.image.original.url}">
        </li>
        `;

        channelBlocks.insertAdjacentHTML('beforeend', imageItem);
    }

       // Text blocks
    else if (block.class == 'Text') {
        let textItem =
        `
        <li id="${uniqueId}" class ="${title}">
            <h1>${block.title}</h1>
        </li>

        <li class="${description}">
            <h2>${block.description_html}</h2>
        </li>

        <li class = "${content}">
            <article>${block.content}</article>
        </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);

    }

    // Linked media…
    else if (block.class == 'Media') {
        let embed = block.embed.type;

        // Linked video!
        if (embed.includes('video')) {
            let linkedVideoItem =
            `
            <li id="${uniqueId}" class = "${title}">
                <h1>${block.title}</h1>
            </li>

            <li class = "${content}">
               ${block.embed.html}
            </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
        }

        // Linked audio!
        else if (embed.includes('rich')) {
            let linkedAudioItem =
            `
            <li id="${uniqueId}" class = "${title}">
                <h1>${block.title}</h1>
            </li>

            <li class = "${content}">
                ${block.embed.html}
            </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem);
        }
    }
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