webpackJsonp([1],[function(t,e,i){var n=i(3),s=i(1),r=i(2);i(6),renderProgressBar=function(t){r(".countDown").show();var e=s(new Date);return t&&e.isAfter(t)?null:void r(".timer").countDown({start_time:e,end_time:t||e.add(1,"ms"),progress:r(".progress-bar"),onComplete:function(){r(".timer").show(),r(".timer").replaceWith('<div class="timer ended">Time\'s Up!</div>')},update_progress:function(t,e){50===Math.floor(t)?r(e).removeClass("progress-bar-success").addClass("progress-bar-warning"):75===Math.floor(t)&&r(e).removeClass("progress-bar-warning").addClass("progress-bar-danger"),e.attr("aria-valuenow",Math.floor(t)),e.css("width",Math.floor(t)+"%"),e.text(Math.floor(t)+"%")}})},renderLocationImage=function(t,e,i,n){t&&(r("#locationImage").append(LOCATION_IMAGES[t.toLowerCase()]),r("#locationText").append(t)),e&&ACTIVITY_IMAGES[e.toLowerCase()]?r("#activityImage").append(ACTIVITY_IMAGES[e.toLowerCase()]):r("#activityImage").append(GET_ACTIVITY(e)),r("#activityText").append(e||""),i?r("#creatorImage").append(CREATOR_IMAGES[i]):n&&(r("#creatorImage").append(FOCUS_AREAS[n]),r("#creatorText").append(n))},renderGroveCalendar=function(t,e){r.get("/api/grove/"+e.id,function(t){window.eventData.groveCalendar=t;var i=n.findIndex(t,function(t){return!t.checkedIn});-1===i&&(i=0,t=n.map(t,function(t){return t.checkedIn=!1,t}),r.ajax("/api/grove/"+e.id,{method:"PUT",data:JSON.stringify({calendar:t}),contentType:"application/json",success:function(){},error:function(t,e,i){}}));var s=t[i];s&&renderLocationImage(s.location,s.activity,null,s.focus_area)})},getCalendar=function(t){var e=s().startOf("day").toISOString(),i=s().endOf("day").toISOString();gapi.client.request("https://www.googleapis.com/calendar/v3/calendars/"+t.email+"/events/?singleEvents=true&timeMin="+e+"&timeMax="+i+"&orderBy=startTime").execute(function(e){var i=s(new Date),a=n.map(e.items,function(t){return{eventId:t.id,location:t.location,creator:t.creator.displayName||t.creator.email,start:t.start.dateTime,end:t.end.dateTime,description:t.description,summary:t.summary}});t.calendar=a,window.userData=t,r.ajax({type:"POST",url:"api/user",data:JSON.stringify(t),contentType:"application/json"});var o=n.find(a,function(t){var e=i,n=s(t.start),r=n.diff(e,"ms");return r<=TRANSITION_LENGTH&&r>0}),l=n.find(a,function(t){var e=s(t.end).subtract(TRANSITION_LENGTH,"ms");return i.isBetween(t.start,e)});if(window.eventData={currentEvent:l,nextEvent:o},l)renderLocationImage(l.location,l.summary,l.creator),renderProgressBar();else if(o)renderProgressBar(o.start),renderLocationImage(o.location,o.summary,o.creator);else{for(var u=60/(EVENT_LENGTH/6e4)+1,c=[],d=0;u>d;d++)c.push(s(new Date).startOf("hour").add(d*EVENT_LENGTH-TRANSITION_LENGTH,"ms"));var h=n.find(c,function(t){return i.isBetween(t,s(t).add(EVENT_LENGTH,"ms"))}).add(TRANSITION_LENGTH,"ms");renderProgressBar(h),renderGroveCalendar(1,t)}})},signinCallback=function(t){t.status.signed_in?(r("#signinButton").hide(),r("#main-container").show(),gapi.client.request("https://www.googleapis.com/plus/v1/people/me?fields=name(familyName%2Cformatted%2CgivenName)%2CdisplayName%2Cemails%2Fvalue%2Cimage%2Furl%2Cid").execute(function(t){var e={id:t.id,name:t.displayName,email:t.emails[0].value,image:t.image.url},i=function(e){e.googleId===t.id&&window.close()},n=io.connect();n.on("SCAN!",i),r("#name").append("<h2>"+t.displayName+"'s Next Step</h2>"),r("#scan-button").attr("href","scan://scan?callback=https%3A%2F%2Froots-elementary.herokuapp.com/scanredirect/"+t.id),r(".scan-button").show(),getCalendar(e)})):console.log("Sign-in state: "+t.error)}}]);