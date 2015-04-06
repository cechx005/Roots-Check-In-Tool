var User = require('../models/user.js');
var Scan = require('../models/scan.js');
var _ = require('lodash');
var moment = require('moment');

var indexController = {
	index: function(req, res, io) {
		res.render('index')
	},
	instructor: function(req, res){
		res.render('instructor');
	},

	success: function(req, res) {
		res.render('success')
	},

	whoops: function(req, res){
		res.render('whoops')
	},

	studentTracker: function(req, res) {
		res.render('student-tracker');
	},

	studentFullSchedule: function(req, res){
		res.render('student-full-schedule');
	},
	groveCalendar: function(req, res){
		res.render('grove-calendar');
	}
};

module.exports = indexController;