// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

//this is the channel name
let channelSlug = 'web_archive'//'default_archive_test'
//this is a general let for titles
let title = 'title'
//this is a general let for descriptions
let description = 'description'
//this is a general let for content
let content = 'content'

let placeChannelInfo = (data) => {
	let channelDescription = document.getElementById('channel-description')
	let channelLink = document.getElementById('channel-link')
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		let linkItem =
			`
            <li class = ${title}>
            	<h1>${ block.title }</h1>
            </li>

			<li class = ${content}>
				<p><em>Link</em></p>
				<picture>
					<source media="(max-width: 428px)" srcset="${ block.image.thumb.url }">
					<source media="(max-width: 640px)" srcset="${ block.image.large.url }">
					<img src="${ block.image.original.url }">
				</picture>
			</li>
			
			<li class = ${description}>
            	<h2>${ block.description_html }</h2>
            </li>
			`
		channelBlocks.insertAdjacentHTML('beforeend', linkItem)
	}

	// Images!
	else if (block.class == 'Image') {
		let imageItem =
		`
		<li class = ${content}>
			<img class="lowquality" src="${ block.image.display.url }"/>
			<img class="highquality" src="${ block.image.original.url }" />
			<div class="textcontent">
			<h1 class="nested_title">${ block.title }</h1>
			<h2 class="nested_description">${ block.description_html }</h2>
			</div>
		</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		// this works but needs to be elaborated on
		// description and image size is not solved
	}

	else if (block.class == 'Text') {
		let textItem =
		`
        <li class = ${title}>
            <h1>${ block.title }</h1>
        </li>
        
		<li class = ${content}>
			<h2>${ block.content }</h2>
		</li>
		`
		// this needs to be continued for tables from md to html
		// if (block.description_html == 'table') {

		// 	`
		// 	<li class = ${title}>
		// 		<h1>${ block.title }</h1>
		// 	</li>

		// 	<li class = ${content}>
		// 		<table>${ block.content }</table>
		// 	</li>
				
		// 	`
		// }
		channelBlocks.insertAdjacentHTML('beforeend', textItem)
	}

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`        
                <li class = ${title}>
                <h3>${ block.title }</h3>
                </li>
                
				<li class = ${content}>
					<p><em>Video</em></p>
					<video controls src="${ block.attachment.url }"></video>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
			// More on video, like the `autoplay` attribute:
			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
		}

		// Uploaded PDFs!
		else if (attachment.includes('pdf')) {
			let pdfItem =
			`        
			<li class = ${title}>
				<h3>${ block.title }</h3>
			</li>
			
			<li class = ${content}>
				<embed src="${ block.attachment.url }" width="1000" height="1000" type="application/pdf">
			</li>
			`
			// …up to you!
			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
                <li class = ${title}>
                <h3>${ block.title }</h3>
                </li>

				<li class = ${content}>
					<p><em>Audio</em></p>
					<audio controls src="${ block.attachment.url }"></audio>
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
			// More on audio: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
		}
	}

	// Linked media…
	else if (block.class == 'Media') {
		let embed = block.embed.type

		// Linked video!
		if (embed.includes('video')) {
			// …still up to you, but here’s an example `iframe` element:
			let linkedVideoItem =
				`
                <li class = ${title}>
                <h3>${ block.title }</h3>
                </li>

				<li class = ${content}>
					<p><em>Linked Video</em></p>
					${ block.embed.html }
				</li>
				`
			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
		}

		// Linked audio!
		else if (embed.includes('rich')) {
			let linkedAudioItem =
			`
			<li class = ${title}>
                <h3>${ block.title }</h3>
            </li>

			<li class = ${content}>
				${ block.embed.html }
			</li>
			`
			channelBlocks.insertAdjacentHTML('beforeend', linkedAudioItem)
		}
	}


}

// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function
		data.contents.reverse().forEach((block) => {
			renderBlock(block) // Pass the single block data to the render function
		})




      insertEmptyListItems();




  
            
	  const items = document.querySelectorAll('.archive li.content');
	  const toggleButton = document.getElementById('toggleButton');
	  const archiveDiv = document.querySelector('.archive');
	  const emptyBgDiv = document.querySelector('.emptybg');

	  const body = document.body;
	  const defaultButtonText = toggleButton.textContent; // Get the default button text from HTML

	  // Function to update the button text and other states
	  function updateButtonText() {
		  const hasOpen = document.querySelector('.archive li.content.open');
		  if (hasOpen) {
			  toggleButton.textContent = 'close'; // Set to lowercase 'close'
			  emptyBgDiv.style.display = 'block'; // Show the emptybg div when an item is open
			  body.style.overflow = 'hidden'; // Disable scrolling on the body

		  } else {
			  toggleButton.textContent = archiveDiv.classList.contains('archivelist') ? 'grid view' : defaultButtonText;
			  emptyBgDiv.style.display = 'none'; // Hide the emptybg div when no item is open
			  body.style.overflow = ''; // Re-enable scrolling on the body
		  }
	  }

	  // Add click event listener to each item
	  items.forEach(item => {
		  item.addEventListener('click', function() {
			  // Remove 'open' and 'fullscreen' classes from all items
			  items.forEach(li => {
				  li.classList.remove('fullscreen');
				  li.classList.remove('open');
			  });

			  // Add 'open' class to the clicked item
			  this.classList.add('open');

			  // Update button text and other states
			  updateButtonText();
		  });

		  // Add click event listener to images within items
		  const img = item.querySelector('img');
		  if (img) {
			  img.addEventListener('click', function(event) {
				  if (window.innerWidth >= 601 && item.classList.contains('open')) {
					  // Add 'fullscreen' class to the clicked item
					  item.classList.add('fullscreen');
					  event.stopPropagation(); // Prevent triggering the item click event
				  }
			  });
		  }
	  });

	  // Add click event listener to the button
	  toggleButton.addEventListener('click', function() {
		  // Check if any item has the 'fullscreen' class
		  const hasFullscreen = document.querySelector('.archive li.content.fullscreen');
		  if (hasFullscreen) {
			  // Remove 'fullscreen' class from all items but keep 'open'
			  items.forEach(li => li.classList.remove('fullscreen'));
		  } else {
			  // If no fullscreen, then check if any item is open
			  const hasOpen = document.querySelector('.archive li.content.open');
			  if (hasOpen) {
				  // Remove 'open' class from all items
				  items.forEach(li => li.classList.remove('open'));
			  } else {
				  // Toggle the 'archivelist' class on the archive div
				  archiveDiv.classList.toggle('archivelist');
			  }
		  }
		  // Update button text and other states
		  updateButtonText();
	  });

	  // Initial button text and other states update
	  updateButtonText();

	})





