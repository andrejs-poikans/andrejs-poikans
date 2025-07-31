
// Load Markdown-It for Markdown rendering
let markdownIt = document.createElement('script');
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownIt);

// Channel details
let channelSlug = 'marta-web-lv';
let title = 'title';
let description = 'description';
let content = 'content';

let web = 'web';
let image = 'image';
let text = 'text';
let audio = 'audio';
let video = 'video';

// Store references to all text sections
let allTextSections = [];

let placeChannelInfo = (data) => {
	let channelDescription = document.getElementById('channel-description')
	let channelLink = document.getElementById('channel-link')

    //make sure md recognizes links and breaks
    const md = window.markdownit({
    html: true,
    linkify: true,
    breaks: true,
    });

    channelDescription.innerHTML = md.render(data.metadata.description || '');
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}

// Modified renderBlock function
let renderBlock = (block, index, md) => {
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
        <li class="${image}">
            <div class = "img-box" data-thumb="${block.image.thumb.url}" data-large="${block.image.large.url}">
                <div class="img-placeholder"></div>
            </div>
            <div class = "comment">
                <p>${block.title || ''}</p>
                <p class = "go"><a href="${ block.image.large.url }" target="_blank">→</a></p>
            </div>
        </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', imageItem);
    }

    // Text blocks
    /*else if (block.class == 'Text') {
        let textItem =
        `
        <li class = "${description}">
            <h1>${block.title || ''}</h1>
            <article>${block.description_html || ''}</article>
            <article>${block.content_html || block.content || ''}</article>
        </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);
    }*/

    /*else if (block.class === 'Text') {
        const title = block.title || '';
        const description = block.description?.toLowerCase() || '';

        // Append the block normally to the main list
        const textItem = `
            <li class = ${text}>
                <h1>${title}</h1>
                <article>${block.content_html || block.content || ''}</article>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);

        // Append only the title (as a <p>) to the appropriate footer section
        if (description.includes('solo')) {
            document.querySelector('.solo').insertAdjacentHTML('beforeend', `<p><button>${title}</button></p>`);
        }

        if (description.includes('collaborative')) {
            document.querySelector('.collaborative').insertAdjacentHTML('beforeend', `<p><button>${title}</button></p>`);
        }
    }*/

        // Modify your renderBlock logic to also store the elements
        else if (block.class === 'Text') {
        const title = block.title || '';
        const description = block.description?.toLowerCase() || '';
        
        // Create a unique ID for each text block
        const sectionId = `section-${allTextSections.length}`;

        // Build the list item with ID
        const textItem = `
            <li class="text" data-section-id="${sectionId}">
            <h1>${title}</h1>
            <article>${block.content_html || block.content || ''}</article>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);

        // Store the index of this <li> so we know where the section starts
        allTextSections.push(sectionId);

        // Add buttons to footer
        const buttonHTML = `<p><button data-target="${sectionId}">${title}</button></p>`;

        if (description.includes('solo')) {
            document.querySelector('.solo').insertAdjacentHTML('beforeend', buttonHTML);
        }
        if (description.includes('collaborative')) {
            document.querySelector('.collaborative').insertAdjacentHTML('beforeend', buttonHTML);
        }
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

// menu logic
const toggleBtn = document.getElementById('toggle-menu');
const footer = document.querySelector('footer');
const main = document.querySelector('main');
const about = document.querySelector('.about');

toggleBtn.addEventListener('click', () => {
footer.classList.toggle('expanded');
main.classList.toggle('reduced');
categories.classList.toggle('visible');
});

const toggleBioBtn = document.getElementById('toggle-bio');
const categories = document.querySelector('.categories');
const blocks = document.querySelector('.blocks');

toggleBioBtn.addEventListener('click', () => {
blocks.classList.toggle('none');
about.classList.toggle('visible');
});


// Run after all blocks have been rendered
function setupSectionNavigation() {
  const allItems = Array.from(document.querySelectorAll('#channel-blocks li'));
  const textBlocks = allItems.filter(li => li.classList.contains('text'));

  // Hide all items except the last text block's section initially
  const lastTextBlock = textBlocks[textBlocks.length - 1];
  showSection(lastTextBlock.dataset.sectionId);

  document.querySelectorAll('.solo button, .collaborative button').forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.target;
      showSection(sectionId);

        // footer.classList.remove('expanded');
        // main.classList.remove('reduced');
        // categories.classList.remove('visible');
        blocks.classList.remove('none');
        about.classList.remove('visible');

          // Instantly scroll to the start of the scroll container
        document.getElementById('channel-blocks').scrollTo({
            left: 0,
            behavior: 'smooth'
        });

    });
  });

  function showSection(sectionId) {
    let inSection = false;

    for (const li of allItems) {
      if (li.classList.contains('text')) {
        inSection = li.dataset.sectionId === sectionId;
      }

      li.style.display = inSection ? 'block' : 'none';
    }
  }
}

// Fetch the data and process the blocks
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
    .then((response) => response.json()) // Return it as JSON data
    .then((data) => { // Do stuff with the data
        console.log(data); // Always good to check your response!
        placeChannelInfo(data); // Pass the data to the first function
        data.contents.reverse().forEach((block, index) => {
            renderBlock(block, index); // Pass the single block data to the render function along with its index
        });
        loadImages(); //scan DOM once and process images
        setupSectionNavigation();
    });


    