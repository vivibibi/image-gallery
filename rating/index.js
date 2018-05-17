var greyBack = document.getElementById("greyBack"),
	defLeft = null,
	defRight = null,
	defTop = null,
	defBottom = null,
	defMargin = null,
	currentDiv = null,
	rating = document.getElementById("rating");

function getID(e) {
	e = e || window.event;
	e = e.target || e.srcElement;
	
	if (e.className == "boxes") {
		zoomIn(e);
		currentDiv = e
	} else if (e.id == "greyBack") {
		zoomOut(currentDiv);
	}
}

function zoomIn(element) {
	defLeft = element.style.left,
	defRight = element.style.right,
	defTop = element.style.top,
	defBottom = element.style.bottom,
	defMargin = element.style.margin;
	
	element.style.position = "absolute"
	element.style.transform = "scale(5)"
	element.style.zIndex = "1"
	element.style.left = "0px"
	element.style.right = "0px"
	element.style.top = "0px"
	element.style.bottom = "0px"
	element.style.margin = "auto"
	
	greyBack.style.zIndex = "0"
	greyBack.style.opacity = "0.75"
	
	rating.style.display = "block"
	rating.style.opacity = "1"
}

function zoomOut(element) {
	element.style.position = "relative"
	element.style.transform = "scale(1)"
	element.style.zIndex = "0"
	element.style.left = defLeft
	element.style.right = defRight
	element.style.top = defTop
	element.style.bottom = defBottom
	element.style.margin = defMargin
	
	greyBack.style.zIndex = "-1"
	greyBack.style.opacity = "0"
	
	rating.style.opacity = "0"
	rating.style.display = "none"
}