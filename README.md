# MMM-RNV

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

It monitors a given station in the RNV traffic network and shows the 10 upcoming departures with destination, type and delay.
It also shows additional information if provided by the vendor.
A valid API key is required, the key can be requested for free here: https://opendata.rnv-online.de/datahub-api

This repository is a fork of the original author's implementation at https://github.com/yawnsde/MMM-RNV.

## Installation
Open a terminal session, navigate to your MagicMirror's `modules` folder and execute `git clone https://github.com/JulianDinter/MMM-RNV.git`, a new folder called MMM-RNV will be created.

Activate the module by adding it to the config.js file as shown below. Of course the position is up to you and the header is optional and customizable.
To find the id of your station take a look here: https://opendata.rnv-online.de/sites/default/files/Haltestellen_16.xml

## Using the module
````javascript
modules: [
		{
			module:	'MMM-RNV',
			header: 'RNV Haltestellenmonitor',
			position:	'top_left',
			config: {
				apiKey: 'ENTER YOUR KEY HERE',
				stationID: 'ENTER YOUR STATION ID HERE',
			}
		},
````
## Configuration options

The following properties can be configured:

|Option|Type|Default|Description|
|:---|:---:|:---:|:---|
|'apiKey'|String|""|Your personal API key|
|'stationID'|String|""|The ID of your station.|
