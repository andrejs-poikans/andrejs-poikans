// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

//this is the channel name
let channelSlug = 'home-wegnho43tdk'
//this is a general let for titles
let titles = 'title'
//this is a general let for content
let content = 'content'
//description
let description = 'description'

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

	// Images!
	// in this case tehere is also a CV button attached to the bio
	if (block.class == 'Image') {
		let imageItem =
		`
		<li class = ${content} id = "profile">
			<button class="special-button" onClick = "imgTransform()">
				<img src="${ block.image.original.url }"/>
			</button>
		</li>

        <li class = ${description} id = "bio">
		    ${ block.description_html }
			<button class="link-button" id="CV" onclick="openCV()">CV</button>
		</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
	}

		// Uploaded (not linked) media…
		else if (block.class == 'Attachment') {
			let attachment = block.attachment.content_type // Save us some repetition
	
			// Uploaded PDFs!
		    if (attachment.includes('pdf')) {
				let pdfItem =
				`        
				<li class = ${content} id = "CV_file" >
					<iframe id = "CV_iframe" src="${ block.attachment.url }" frameborder="0" allowfullscreen></iframe>	
				</li>
				`
				// …up to you!
				channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
			}
	
		}


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

	})
