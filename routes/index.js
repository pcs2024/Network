
var matching = require('../modules/matching')
/*
 * GET home page.
 */

exports.first_matching = function(req, res){
	matching.first_matching(req, res);
};

exports.fapi = function(req, res){
	var gps_x=req.params.gps_x;
	var gps_y=req.params.gps_y;
	var time_info=req.params.time_info;
	if(gps_x&&gps_y&&time_info)
	res.render('fapi', { app_id: '1451602315119345' }, {gps_x:gps_x},{gps_y:gps_y},{time_info:time_info})
};