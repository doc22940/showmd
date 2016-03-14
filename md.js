
if(!window.App && location.search){
	window.App=parseQS(location.search);
	var r=Object.keys(window.App);
	if(r.length===1 && r[0]==="") window.App={project:window.App[""]};
}


if(!App.path && App.project){
	App.path="https://raw.githubusercontent.com/"+App.project+"/master/README.md";
	App.projectName=App.project.split("/").pop()||"";
	App.author=App.project.split("/")[0]||"";
	if(!App.title) App.title=App.projectName+" - readme";
}

if(localStorage.mdtheme){
	App.theme=localStorage.mdtheme;
}


App.theme=App.theme || "paper";


function aGet(a,cb, headers) {
		var e = new XMLHttpRequest;
		e.onload= function() { try{cb(JSON.parse(e.responseText), e);}catch(y){  cb(e.responseText, e);   }};
		e.open("GET", a, !0);
		if(typeof headers==="object"){
			for(var header in headers) e.setRequestHeader(header, headers[header]);
		}
		e.send();
		return e
	}



selTheme.value=App.theme || "paper";

aGet(App.path, function(s,x){

	themeLink.href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/"+App.theme+"/bootstrap.min.css";

	document.title=App.title;
	projectName.innerHTML=App.projectName || App.project;
	projectName.href="https://github.com/"+App.project;
	mylinks.innerHTML=Object.keys(App.links||{}).map(function(a){
		return "<li>"+ a.link(App.links[a]) +"</li>";
	}).join("");
	if(App.author)authorName.innerHTML=App.author;
	
    document.getElementById('content').innerHTML =  marked(s);
	
	
	///
	$(document).ready(function() {
  $('pre code').each(function(i, block) {
		var lang=block.className.split("-").pop();
	block.parentNode.dataset.title=lang;
    hljs.highlightBlock(block);
  });
	  
	  //spruce up the place:
	   $('table').addClass("table")
	  
//build navigation:
	 
	   function elm(s){return $("<"+s+">")[0];}
	  
	  var lastLevel="H1";
	  var list=elm("ul");
	  list.className="nav nav-sidebar";
	  navdrop.appendChild(list);
	  var current=list;
	  
	  
	   $("h1,h2,h3").toArray().map(function(a,i){
		 
		 		  
	     var s=a.textContent.trim().split("(")[0].trim();
		 var id=a.id;
		 var fs={ H1:20,H2:16,H3:12}[a.tagName];
		 var li=$("<li><a href=#"+id+">"+s+"</a> </li>")[0];
	 
	//	 if(i>2)$(a).append("( Top )".link("#").small());
		 
		 var ht=a.innerHTML.split("(");
		 if(ht[1]){
		   	var tail = ("("+ht.slice(1).join("(")).small();
			a.innerHTML=ht[0]+tail;		   
		 }
		 
		 
		  li.className+=" _"+a.tagName;
		 
		 
		 if(0 && lastLevel!=a.tagName){
		   
		   	console.log("LL", lastLevel, a.tagName, a.tagName>lastLevel);
		  	if(a.tagName > lastLevel) {
				var temp = current;
			  	current=elm("ul");
			  	current.appendChild(li);
			  	temp.appendChild(current);
			}else{
				current = current.parentNode;
			  	current.appendChild(li);
			  
			}
		   
		   lastLevel=a.tagName;
		 }else{
		   current.appendChild(li);		   
		 }

	   	 
	   });
	  
	  setTimeout(function(){
		$("h2,h3").each((i,o)=>{
		  elms[o.id]=o;
		  offsets[o.offsetTop]=o;
		});
	  }, 300);
	  
	  
	var id=location.hash.slice(1);
	var hits= $(".nav a[href='#"+id+"']");
	if(hits[0]){
	  
		setTimeout(function(){	hits[0].click(); setTimeout(rs, 33); setTimeout("wait.hidden=true;", 444); }, 110);
	}
	  
	  setTimeout("document.body.className+=' loaded';", 33);
});
	
	
	

function rs(){
	clearTimeout(rs.timer);
  rs.timer=setTimeout(function(){
  	var elm = whichElmInView();
	if(!elm) return;
	var id=elm.id;
	var hits= $(".nav a[href='#"+id+"']");
	if(hits[0]){
		$(".nav .active").removeClass("active");  
	  	hits.parent().addClass("active");  
	}
	//console.log("scrl", hits, elm, id);
  }, 100 );
}


	
var elms={}, 
	offsets={};
window.elms=elms;
window.offsets=offsets;

function whichElmInView(){
	var st=document.body.scrollTop+70, last;
	for(var it in offsets){
	 // 	console.log(st, it, last);
		if(it > st) break;
	  	last=it;
	}    
   return offsets[last];
}	

	
addEventListener("scroll", rs);

});



// turn URL'QS into an object using a parser. takes full urls...
function parseQS(str){
  var ob={}, float="", key="", dc=decodeURIComponent;

for( var i=0, mx=str.length; i<mx;i++){
  var it=str[i];
    if(it==="="){ key=float; float=""; continue;}
    if(!it.search(/^[?&]/)){ 
        if(it==="&" && str.slice(i+1,i+5)==="amp;"){ i=(i+4);float+="&"; continue;}
        if(key){ob[key]=dc(float);} key=""; float="";  continue;
    }
    float+=it;
}
ob[key]=dc(float);
return ob;
}

function setTheme(theme){
	App.theme=theme;
	localStorage.mdtheme=theme;
	themeLink.href="//cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/"+App.theme+"/bootstrap.min.css";
	setTimeout(function(){
		$("h2,h3").each((i,o)=>{
		  elms[o.id]=o;
		  offsets[o.offsetTop]=o;
		});
	 }, 1300);
	  

}