var time_split=2;
var gps_split=0.0000001;

var check_even=0;

almost_same=new Array(60/time_split);

function remove_after(array_to_remove,facebook_info,res){
	setTimeout(function(){
		for(var i in array_to_remove){
			if(array_to_remove[i].facebook_info==facebook_info)
				{
					array_to_remove=array_to_remove.splice(i,1);
					break;
				}
		}
		res.json(false);
	},time_split*1000)
}

function remove_now(array_to_remove,facebook_info){
	for(var i in array_to_remove){
		if(array_to_remove[i].facebook_info==facebook_info)
			{
				array_to_remove=array_to_remove.splice(i,1);
				break;
			}
	}

}


function is_location_matching(gps_x1, gps_y1, gps_x2,gps_y2){
	if(Math.abs(gps_x1-gps_x2)<=gps_split&&Math.abs(gps_y1-gps_y2)<=gps_split)
		return true;
	else
		return false;
}


function matching(gps_x, gps_y, time_info,facebook_info,req,res){
	var time_info=parseInt(time_info)
	console.log(almost_same[23])
	for(var i=-time_split; i<=time_split;i++){
		var j=i+time_info;
		if(j/60>1)
		{
			j=j-60;
			
		}else if(j/60<0){
			j=j+60;

		}
		if(almost_same[j]!=undefined&&almost_same[j].length>0)
		{
			for(var inner in almost_same[j]){
				console.log("inner",inner)
				if(is_location_matching(gps_x, gps_y,almost_same[j][inner].gps_x,almost_same[j][inner].gps_y)){
					console.log("in")
					remove_now(almost_same[j][inner],almost_same[j][inner].facebook_info)
					res.json(almost_same[j][inner].facebook_info)
					break;	
				}else if(inner==almost_same.length-1){
					data={}
					data.facebook_info=facebook_info;
					data.gps_x=gps_x;
					data.gps_y=gps_y;
					almost_same[time_info].push(data);
					remove_after(almost_same[time_info],facebook_info,res);
				}	
			}
			console.log("what")
		}else if(i==time_split){
			console.log("out2")
			almost_same[time_info]=[];
			data={}
			data.facebook_info=facebook_info;
			data.gps_x=gps_x;
			data.gps_y=gps_y;
			almost_same[time_info].push(data);
			remove_after(almost_same[time_info],facebook_info,res);
		}
	}
}



exports.first_matching = function(req, res){
	var gps_x=req.body.gps_x;
	var gps_y=req.body.gps_y;
	var time_info=req.body.time_info;
	var facebook_info=req.body.facebook_info;
	matching(gps_x, gps_y, time_info,facebook_info,req,res);
};