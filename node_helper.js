'use strict';

/* Magic Mirror
 * Module: MMM-RNV
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

 import { client } from "./client";
 import gql from "graphql-tag";

const NodeHelper = require('node_helper');
var request = require('request');
var moment = require('moment');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	getData: function() {
		var self = this;

		var currentDate = moment().format('YYYY-MM-DD+hh:mm:ss');
		var myUrl = this.config.apiBase + this.config.requestURL + '?hafasID=' + this.config.stationID + '&time=' + currentDate;

		request({
			url: myUrl,
			method: 'GET',
			headers: { 'RNV_API_TOKEN': this.config.apiKey }
		}, function (error, response, body) {

			if (!error && response.statusCode == 200) {
				self.sendSocketNotification("DATA", body);
			}
		});
		setTimeout(function() { self.getData(); }, this.config.refreshInterval);


		client.query({
			query: gql`
				query {
					stations(first: 3 lat: 49.483076 long: 8.468409 distance:0.5) {
						totalCount
						elements {
							... on Station {
								hafasID
								globalID
								longName
							}
						}
					}
				}
			`,
		}).then(result => console.log(result["data"]));



	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}
});
