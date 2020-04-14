$(function() {
	
	var buildGearOrder = [
		"head",
		"chest",
		"shoulders",
		"arms",
		"belt",
		"legs",
		"feet",
		"necklace",
		"ring1",
		"ring2",
		"frontWeapon1",
		"frontWeapon2",
		"backWeapon1",
		"backWeapon2"
		];
		
	var buildGearDisplayMap = {
		"head": "Head",
		"chest": "Chest",
		"shoulders": "Shoulders",
		"arms": "Arms",
		"belt": "Belt",
		"legs": "Legs",
		"feet": "Feet",
		"necklace": "Necklace",
		"ring1": "Ring 1",
		"ring2": "Ring 2",
		"frontWeapon1": "Front Bar Weapon 1",
		"frontWeapon2": "Front Bar Weapon 2",
		"backWeapon1": "Back Bar Weapon 1",
		"backWeapon2": "Back Bar Weapon 2"
	};
	
	var buildTypeDisplayMap = {
		"pvp": "PvP"
	};
	
	var resourceTypeDisplayMap = {
		"stamina": "Stamina"
	};
	
	var classDisplayMap = {
		"nightblade": "Nightblade"
	};
	
	
	
	function getJSON(url, success)
	{
		if(document.location.protocol == "file:")
		{
			var testData = {
				"id": "test-stamblade",
				"displayName": "Build Display Name",
				"buildType": "pvp",
				"resourceType": "stamina",
				"class": "nightblade",
				"gear": {
					"head": {
						"gearType": "armor",
						"set": "balorgh",
						"weight": "medium",
						"trait": "impenetrable",
						"enchantment": "tri-stat"
					},
					"necklace": {
						"gearType": "jewelry",
						"set": "titanborn-strength",
						"trait": "impenetrable",
						"enchantment": "tri-stat"
					},
					"frontWeapon1": {
						"gearType": "weapon",
						"set": "titanborn-strength",
						"weaponType": "maul",
						"trait": "sharpened",
						"enchantment": "disease"
					}
				}
			}
			
			success(testData);
		}
		else
		{
			$.getJSON(url, success);
		}
	}
	
	function appendGearToBuildTable(buildTableBody, gearSlot, gearData)
	{
		var weightOrType = null;
		switch(gearData.gearType)
		{
			case "armor":
				weightOrType = gearData.weight;
				break;
			case "jewelry":
				weightOrType = gearData.gearType;
				break;
			case "weapon":
				weightOrType = gearData.weaponType;
				break;
		}
		
		var buildTableRow = $("<tr></tr>");
		buildTableRow.append($(`<td>${buildGearDisplayMap[gearSlot]}</td>`));
		buildTableRow.append($(`<td>${gearData.set}</td>`));
		buildTableRow.append($(`<td>${weightOrType}</td>`));
		buildTableRow.append($(`<td>${gearData.trait}</td>`));
		buildTableRow.append($(`<td>${gearData.enchantment}</td>`));
		buildTableBody.append(buildTableRow);
	}
	

	var hash = document.location.hash;
	
	if(hash.length > 0)
	{
		hash = hash.substring(1);
		getJSON(`build-data/${hash}.json`, function(data) {
			$(".build-name").text(data.displayName);
			
			var buildTypeDisplay = buildTypeDisplayMap[data.buildType];
			var resourceTypeDisplay = resourceTypeDisplayMap[data.resourceType];
			var classDisplay = classDisplayMap[data.class];
			$(".build-type").text(`${buildTypeDisplay} ${resourceTypeDisplay} ${classDisplay}`);
			
			var buildTableBody = $("#build-table tbody");
			for(var i = 0; i < buildGearOrder.length; i++)
			{
				var gearSlot = buildGearOrder[i];
				var gearData = data.gear[gearSlot];
				
				if(gearData == null)
					continue;
				
				appendGearToBuildTable(buildTableBody, gearSlot, gearData);				
			}
			console.log(data);
		});
	}

});