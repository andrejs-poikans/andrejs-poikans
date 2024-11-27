// Load Markdown-It for Markdown rendering
let markdownIt = document.createElement('script');
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js';
document.head.appendChild(markdownIt);

// Channel details
let channelSlug = 'curatorial-u-yjm14ig8s';
let title = 'title';
let description = 'description';
let content = 'content';

let directToChannel = `https://www.are.na/channel/${channelSlug}`;

// Function to place channel info
let placeChannelInfo = (data) => {
    let channelDescription = document.getElementById('channel-description');
    let channelLink = document.getElementById('channel-link');
    channelDescription.innerHTML = window.markdownit().render(data.metadata.description); // Converts Markdown → HTML
    channelLink.href = `https://www.are.na/channel/${channelSlug}`;
};

// Select the categories div
let categoriesDiv = document.getElementById('categories');
let workTitlesDiv = document.getElementById('workTitles');

// extending to mobile
let links = document.getElementById("links");
let theme = document.getElementById("mobile-menu");
let arena = document.getElementById("arena");


// Function to check if the title is numeric
let isNumericTitle = (title) => {
    return /^[0-9]+$/.test(title.trim()); // Regular expression to match only digits
};

// Function to append titles to the categories div as buttons
let appendTitlesToCategories = (block, index) => {
    // Only append a button if the block has a title
    if (block.title) {
        let titleButton = document.createElement('button'); // Create a button for the title
        titleButton.innerText = block.title; // Use the actual block title
        titleButton.classList.add('category-button'); // Add a class for styling if needed

        // Check if the title is numeric and apply a specific class
        if (isNumericTitle(block.title)) {
            titleButton.classList.add('numeric-title'); // Add a class for numeric titles
        }

        // Get the computed style for the 'theme' element
        let themeDisplay = window.getComputedStyle(theme).display;
        if (themeDisplay === "block") {
            titleButton.addEventListener('click', () => {
            toggleContent(index);
            // Check if the computed display style is "block"
                workTitlesDiv.style.display = "none";
                links.style.display = "none";
                categoriesDiv.style.display = "none";
                arena.style.display = "block";
            })
        } else {
            titleButton.addEventListener('click', () => {
                toggleContent(index);
                arena.style.display = "grid";
            })
        }

        // categoriesDiv.appendChild(titleButton); // Append the button to the categories div
        workTitlesDiv.appendChild(titleButton); // Append the button to the categories div
    }
};

// Function to toggle content between titles
let toggleContent = (startIndex) => {
    let allContentBlocks = document.querySelectorAll('#channel-blocks > li'); // All list items in the channel-blocks
    let currentIndex = -1;
    let shouldDisplay = true;

    // Loop through all content blocks
    for (let i = 0; i < allContentBlocks.length; i++) {
        let block = allContentBlocks[i];
        
        // Check if the block contains a title (represented by <h1> or <h3> tags)
        if (block.querySelector('h1') || block.querySelector('h3')) {
            currentIndex++;
            // If we encounter a non-numeric title after starting to display, stop displaying
            if (currentIndex > startIndex && !isNumericTitle(block.querySelector('h1').innerText)) {
                shouldDisplay = false;
            }

            // Skip displaying titles
            if (block.querySelector('h1').innerText) {
                block.style.display = 'none'; // Hide title
                continue; // Skip to the next block
            }
        }

        // Show content if it's within the selected section (after the selected title)
        if (currentIndex === startIndex || (currentIndex > startIndex && shouldDisplay)) {
            block.style.display = 'block'; // Show the block
        } else {
            block.style.display = 'none'; // Hide the block
        }
    }
};


// Modified renderBlock function to process blocks and append to the DOM
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
                <h2>${block.description_html}</h2>
            </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', linkItem);

        appendTitlesToCategories(block, index); // Append the title to the categories div
    }


    // Images!
    else if (block.class == 'Image') {
        let imageItem =
        `
        <li id="${uniqueId}" class="${title}">
            <h1>${block.title}</h1>
        </li>
        <li class="${content}">
            <button class="image-button" onclick="openImg('${block.image.original.url}')">
                <img src="${block.image.original.url}">
            </button>
        </li>
        <li class="${description}">
            <h2>${block.description_html}</h2>
        </li>
        `;

        channelBlocks.insertAdjacentHTML('beforeend', imageItem);
        appendTitlesToCategories(block, index); // Append the title to the categories div
    }

       // Text blocks
    else if (block.class == 'Text') {
        let textItem =
        `
        <li id="${uniqueId}" class ="${title}">
            <h1>${block.title}</h1>
        </li>
        
        <li class = "${content}">
            <article>${block.content}</article>
        </li>

        <li class="${description}">
            <h2>${block.description_html}</h2>
        </li>
        `;
        channelBlocks.insertAdjacentHTML('beforeend', textItem);

        // Append the title to the categories div
        appendTitlesToCategories(block, index);
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

            // Append the title to the categories div
            appendTitlesToCategories(block, index);
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

            // Append the title to the categories div
            appendTitlesToCategories(block, index);
        }
    }

    // Similar logic can be extended for Text, Media, Attachment, etc.
};

// Function to group compounds (title + numeric content)
let groupCompounds = () => {
    let allBlocks = document.querySelectorAll('#channel-blocks > li');
    let compounds = []; // To store the grouped compounds
    let currentCompound = null; // Temporary storage for each compound

    allBlocks.forEach((block) => {
        let isTitleBlock = block.querySelector('h1') || block.querySelector('h3');

        // If it's a title block (non-numeric), start a new compound
        if (isTitleBlock && !isNumericTitle(block.querySelector('h1')?.innerText || block.querySelector('h3')?.innerText)) {
            if (currentCompound) {
                compounds.push(currentCompound); // Push the previous compound to the list
            }
            currentCompound = { title: block, contentBlocks: [] }; // Start a new compound with this title
        }

        // If it's a content block (numeric title or description)
        if (currentCompound && (block.classList.contains(content) ||'')) {
            currentCompound.contentBlocks.push(block); // Add this block to the current compound
        }
    });

    // Push the last compound after the loop ends
    if (currentCompound) {
        compounds.push(currentCompound);
    }

    console.log('Compounds:', compounds); // For debugging: check how compounds are grouped

    // Now render the compounds, appending all content to the first content block in each compound
    compounds.forEach((compound) => {
        let firstContentBlock = compound.contentBlocks[0]; // The first content block

        // Append all remaining content blocks' children to the first content block
        for (let i = 1; i < compound.contentBlocks.length; i++) {
            let block = compound.contentBlocks[i];

            while (block.firstChild) {
                firstContentBlock.appendChild(block.firstChild); // Move children to the first block
            }
            block.remove(); // Remove the empty block
        }
    });


    var titleButton = document.getElementsByClassName("category-button");
    let container = document.getElementById("workTitles");

    for (var i = 0; i < titleButton.length; i++) {
        titleButton[i].addEventListener("click", function() {
          var current = container.getElementsByClassName("active");
          // If there's no active class
          if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
          }
          // Add the active class to the current/clicked button
          this.className += " active";
        });
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
        groupCompounds(); // After rendering all blocks, group compounds
    });
    