$(function() {
	
	var hash = document.location.hash;
	
	if(hash.length > 0)
	{
		hash = hash.substring(1);
		$.getJSON(`build-data/${hash}.json`, function(data) {
			console.log(data);
		});
	}

});