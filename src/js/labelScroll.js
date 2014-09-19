var LabelScroll = function(){
	'use strict';
	var self = {
			top : 0,
			winH : 0,
			docH : 0,
			speed : 0,
			elementPos : 0,
			sections : document.querySelectorAll('[data-labelscroll]'),
			defaultText : '......'
		},
		lastPos = 0;
		
	function generateHtmlNode(){
		var node = document.createElement('div');

		node.id = 'labelScroll-element';
		node.innerHTML = self.defaultText;
		self.node = node;

		return node;
	}

	function getSection(){
		var i,
			l = self.sections.length,
			section,
			found = false;
		for(i = 0; i<l;i++){
			section = self.sections[i];
			if(self.elementPos > section.offsetTop && (i === l-1 || self.elementPos < self.sections[i+1].offsetTop)){
				self.element.innerHTML = section.getAttribute('data-labelscroll');
				found = true;
			}
		}
		if(!found){
			self.element.innerHTML = self.defaultText;
		}
	}

	function appendHtml(){
		var node = generateHtmlNode();
		self.element = node;
		document.body.appendChild(node);
	}

	function editStyle(){
		
		var pos = self.top,
			perc = Math.floor(self.top/self.winH*100),
			rel = pos+(self.docH*perc/100),
			margin = (self.winH/self.docH);

		rel += margin;

		self.elementPos = rel;
		self.element.style.top = rel+'px';
	}

	function hideElement(){
		if(Math.abs(self.speed) < 2){
			self.element.className = 'labelScroll-hidden';
		} else {
			self.element.className = '';
		}
	}

	function setWinHeight(){
		var body = document.body,
			html = document.documentElement;
			
			self.winH =  Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			self.docH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	}



	function setSpeed(){
		self.speed = lastPos-self.top;
		lastPos = self.top;

		hideElement();
	}

	function setScrollTop (){
		lastPos = self.top;
		self.top = document.documentElement.scrollTop || document.body.scrollTop;

	}

	function onscroll(){
		setScrollTop();
		
		setSpeed();
		editStyle();

		getSection();

		//console.log(self.top);
	}


	self.init = function(){
		setWinHeight();
		appendHtml();

		setInterval(setSpeed, 500);


		window.onscroll = onscroll;

		console.log('Init');
	};

	return self;
};