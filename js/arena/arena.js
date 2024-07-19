// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



//this is the channel name
let channelSlug = 'andrejs-poikans/default_home_test'
//this is a general let for titles
let titles = 'title'
//this is a general let for descriptions
let description = 'description'
//this is a general let for content
let content = 'content'


// First, let’s lay out some *functions*, starting with our basic metadata:
let placeChannelInfo = (data) => {
	// Target some elements in your HTML:
	// let channelTitle = document.getElementById('channel-title')
	let channelDescription = document.getElementById('channel-description')
	// let channelCount = document.getElementById('channel-count')
	let channelLink = document.getElementById('channel-link')

	// Then set their content/attributes to our data:
	// channelTitle.innerHTML = data.title
	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
	// channelCount.innerHTML = data.length
	channelLink.href = `https://www.are.na/channel/${channelSlug}`
}



// Then our big function for specific-block-type rendering:
let renderBlock = (block) => {
	// To start, a shared `ul` where we’ll insert all our blocks
	let channelBlocks = document.getElementById('channel-blocks')

	// Links!
	if (block.class == 'Link') {
		let linkItem =
        //the title is independent from the block
			`
            <li class = ${titles}>
            	<h1>${ block.title }</h1>
            </li>

			<li class = ${content}>
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


//this needs to be written 
	// Images!
	else if (block.class == 'Image') {
		let imageItem =
		`
        <li class = ${titles}>
        <h3>${ block.title }</h3>
        </li>

		<li class = ${content}>
			<p><em>Image</em></p>
			<img src="${ block.image.original.url }"/>
		</li>
		`
		channelBlocks.insertAdjacentHTML('beforeend', imageItem)
		// this works but needs to be elaborated on
		// description and image size is not solved
	}

	// Text!
	//this is not working
	
	// else if (block.class == 'Text') {
	// 	let textItem =
	// 	`
	// 	<li>
	// 		<p><em>Text</em></p>
	// 		<h3>${ block.source }</h3>
	// 	</li>
	// 	`
	// 	channelBlocks.insertAdjacentHTML('beforeend', textItem)
	// 	// …up to you!
	// }

	// Uploaded (not linked) media…
	else if (block.class == 'Attachment') {
		let attachment = block.attachment.content_type // Save us some repetition

		// Uploaded videos!
		if (attachment.includes('video')) {
			// …still up to you, but we’ll give you the `video` element:
			let videoItem =
				`        
                <li class = ${titles}>
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
			// …up to you!
		}

		// Uploaded audio!
		else if (attachment.includes('audio')) {
			// …still up to you, but here’s an `audio` element:
			let audioItem =
				`
                <li class = ${titles}>
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
                <li class = ${titles}>
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
			// …up to you!
		}
	}
}



// Now that we have said what we can do, go get the data:
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		placeChannelInfo(data) // Pass the data to the first function

		// Loop through the `contents` array (list), backwards. Are.na returns them in reverse!
		data.contents.reverse().forEach((block) => {
			// console.log(block) // The data for a single block
			renderBlock(block) // Pass the single block data to the render function
		})

	})
