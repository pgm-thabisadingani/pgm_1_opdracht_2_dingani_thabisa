(() => {
	const app = {
		initialize() {
			console.log('1. Application started');
			this.cacheElements();
			this.buildUI();
			this.registerHTMLForListeners()
			//this.closeArtist()
		},
		cacheElements() {
			console.log('2. cache all existing DOM elements');
			this.$navigation = document.querySelector('.navigation');
			this.$listOfArtist = document.querySelector('.list_of_artist');
			this.$socialIcons = document.querySelector('.social-icons');
			this.$countDown = document.querySelector('.countDown');
			this.$artist__info = document.querySelector('.artist__info');
      this.$button__close = document.querySelector('.delete__artist');
      this.$button = document.querySelector('button');
		},
		buildUI() {
			console.log('3. Build the user interface')
			this.$navigation.innerHTML = this.generateHTMLForNavigation();
			this.$listOfArtist.innerHTML = this.generateHTMLForArtistInfo();
			this.$socialIcons.innerHTML = this.generateHTMLForSocialIcons();
			// add class to button to make it invisible
			//this.$artist__info.innerHTML = this.registerHTMLForListeners();
			setInterval(() => {
				this.tick();
			}, 1000);
		},
		generateHTMLForNavigation() {
			let tempStr = `<div class='nav__title'><div class='title__concert'><h1><span>1-4 July</span><br>Festivalpark<br>Wrechter<br>Belgium</h1></div><ul>`;
			hoofdnavigatie.forEach((word, index) => {
				tempStr += `<li><a href="${word.link}"> ${word.name}</a></li>`;
			});
			tempStr += `</ul></div>`;
			return tempStr;
		},
		getDayOfPerfomance(perfDay) {
			let time = new Date(perfDay);
			let day = time.getDay();
			switch (day) {
				case 0:
					day = 'Sunday'
					break;
				case 1:
					day = 'Tuesday'
					break;
				case 2:
					day = 'Wednesday'
					break;
				case 3:
					day = 'Thursday'
					break;
				case 4:
					day = 'Friday'
					break;
				case 5:
					day = 'Saturday'
					break;
				case 6:
					day = 'Sunday'
					break;
			}
			return day;
		},
		generateHTMLForArtistInfo() {
			tempStr = '';
			lineup.forEach((art, index) => {
				tempStr += `<div class='artist__details'><img  class="artist__details--img"  data-id="${art.id}" src = ${art.artist.picture.small}><div class="details__artistNameDate"><h3><span class='details__firstSpan'>${this.getDayOfPerfomance(art.from)}</span> <span class='details__secondSpan'>${art.place.name}</span></h3><h2 class='artist__name'>${art.artist.name}</h2></div></div>`;
      });
      this.$button.classList.add('hidden');
			return tempStr;
		},
		registerHTMLForListeners() {
			let $artist__infos = document.querySelectorAll('.artist__details--img')
			$artist__infos.forEach((arts, index) => {
				arts.addEventListener('click', (event) => {
					let artist__id = event.currentTarget.dataset.id || event.currentTarget.parentNode.dataset.id;
					// getting Id for artist
					this.showArtistDetails(artist__id);
				});
			});
			this.$button__close.addEventListener('click', (event) => {
        this.closeARtistInfo()
			});
		},
		showArtistDetails(id) {
      let tempStr = '';
			// add class to button to make it visible
			//console.log(lineup[0].artist.synopsis);
			lineup.forEach((moreDetails, index) => {
				if (moreDetails.id == id) {
					tempStr += `<div class="artist__extraInfo" data-id='${moreDetails.id}'><img src ="${moreDetails.artist.picture.small}"><div class='padding__artist'><div class='artistNameDate'><h3><span class='firstSpan'>${this.getDayOfPerfomance(moreDetails.from)}</span><span class='secondSpan'>${moreDetails.place.name}</span></h3><h2>${moreDetails.artist.name}</h2></div><br><p>${moreDetails.artist.synopsis}</p><br><br>${this.getArtistMediaInfo(moreDetails.artist.media)}<br><h3 class='meerArtist'>Meer weten?</h3>${this.getArtistSocialInfo(moreDetails.artist.social)}</div></div>`;
          console.log(moreDetails.id);
				}
      })
      this.$button.classList.remove('hidden');
			this.$artist__info.innerHTML = tempStr;
		},
		closeARtistInfo() {
      //console.log('close button'); 
      this.$button.classList.add('hidden');
			this.$artist__info.innerHTML = '';
			// add class to make button not invisible  
		},
		getArtistMediaInfo(media) {
			let tempStr = '';
			media.forEach((theArtistMedia, index) => {
				if (theArtistMedia.type == 'You Tube') {
					tempStr += `<iframe src="${theArtistMedia.sourceId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
				}
			})
			return tempStr;
		},
		getArtistSocialInfo(social) {
			let tempStr = `<ul>`;
			social.forEach((theLink, index) => {
				tempStr += `<li><a href="${theLink.link}" target= "_blank">${theLink.link}</a></li>`;
			});
			tempStr += `<ul>`;
			return tempStr;
		},
		generateCountdown() {
			let tempStr = '';
			let countDate = new Date(1625148000000);
			let dateNow = new Date();
			daysLeft = countDate - dateNow;
			let seconds = 1000,
				minutes = seconds * 60,
				hours = minutes * 60,
				days = hours * 24;
			let s = Math.floor((daysLeft % (minutes)) / seconds);
			let m = Math.floor((daysLeft % (hours)) / minutes);
			let h = Math.floor((daysLeft % (days)) / hours);
			let d = Math.floor(daysLeft / (days));
			tempStr = `<h2>${toAmountOfDigits(d, 2)} Dagen ${toAmountOfDigits(h, 2)}h ${toAmountOfDigits(m, 2)}m ${toAmountOfDigits(s, 2)}s </h2>`;

			function toAmountOfDigits(number, amount) {
				let str = String(number);
				while (str.length < amount) {
					str = `0${str}`;
				}
				return str;
			}
			return tempStr;
		},
		tick() {
			this.$countDown.innerHTML = this.generateCountdown();
		},
		generateHTMLForSocialIcons() {
			let tempStr = `<ul>`;
			social.forEach((word, index) => {
				tempStr += `<li><a href="${word.link}" target= "_blank"><img src="${word.name}" width='15rem'/></a></li>`;
			});
			tempStr += `<ul>`;
			return tempStr;
		}
	};
	app.initialize();
})();
