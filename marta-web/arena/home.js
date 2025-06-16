
// Load Markdown-It for Markdown rendering
let markdownIt = document.createElement('script');
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownIt);

// Channel details
let channelSlug = 'marta-web-eng';
let title = 'title';
let description = 'description';
let content = 'content';

let web = 'web';
let image = 'image';
let text = 'text';
let audio = 'audio';
let video = 'video';

let placeChannelInfo = (data) => {
	let channelDescription = document.getElementById('channel-description')
	let channelLink = document.getElementById('channel-link')
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Modified renderBlock function
let renderBlock = (block, index) => {
    let channelBlocks = document.getElementById('channel-blocks');

    // Links!
    if (block.class === 'Link') {
        let linkItem = `
            <li class = "${content} ${web}">
            <div class = "tag">
                <a target = "_blank" href="${ block.source.url }">
                    <picture>
                        <source media="(max-width: 428px)" srcset="${block.image.thumb.url}">
                        <source media="(max-width: 640px)" srcset="${block.image.large.url}">
                        <img src="${block.image.original.url}">
                    </picture>
                </a>
            </div>
            </li>
            <li class = "${title} note">
                    <h1>${block.title}</h1>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);
    }


    // Images!
    else if (block.class == 'Image') {
        let imageItem =
        `
        <li class ="${title}">
            <h1>${block.title}</h1>
        </li>
        <li class="${description}">
            <article>${block.description_html}</article>
        </li>
        <li class="${block.title} ${image}">
            <div class = "tag">
            <a href="${ block.image.original.url }" target="_blank">
                <img loading="lazy" src="${block.image.original.url}">
            </a>
            </div>
        </li>
        `;

        channelBlocks.insertAdjacentHTML('beforeend', imageItem);
    }

    
       // Text blocks

       //if text article return such elements formated like this and that etc
    else if (block.class == 'Text') {
        let textItem =
        `
        <li class = "${description}">
            <h1>${block.title}</h1>
            <article>${block.content}</article>
            <article>${block.description_html}</article>
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
            <li class = "${content} ${video}">
                <div class = "tag">
                    <a target = "_blank" href="${ block.source.url }">
                    <picture>
                        <source media="(max-width: 350px)" srcset="${block.image.thumb.url}">
                        <source media="(max-width: 640px)" srcset="${block.image.large.url}">
                        <img loading="lazy" src="${block.image.original.url}">
                    </picture>
                    </a>
                </div>
            </li>
            <li class = "${title} note">
                    <h1>${block.title}</h1>
            </li>
            `;
            channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem);
        }

        // Linked audio!
        else if (embed.includes('rich')) {
            let linkedAudioItem =
            `
            <li class = "${content} ${audio}">
                <div class = "tag">
                    <a target = "_blank" href="${ block.source.url }">
                    <picture>
                        <source media="(max-width: 350px)" srcset="${block.image.thumb.url}">
                        <source media="(max-width: 640px)" srcset="${block.image.large.url}">
                        <img loading="lazy" src="${block.image.original.url}">
                    </picture>
                    </a>
                </div>
            </li>
            <li class = "${title} note">
                    <h1>${block.title}</h1>
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


    