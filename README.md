# showmd
View online markdown docs as a book

## App Config
```js
App = {
    path: "https://raw.githubusercontent.com/rndme/vcc/master/README.md",	//where is the .md file? needs cors.
    theme: "darkly",	// the name of a bootswatch theme
    title: "VCC Docs",	// the title of the project 
    projectName: "VCC",	// the short name of the project
    customCSS: "",	// custom presentation css, a url or actual rule text
  links: {
        "link text": "http://example.com/path/file.ext", // ...
    },
};
```
The config is also settable by the URL as GET parameters, except `links`.

There is a shortcut to [github](https://github.com/) projects in the URL config: queryString as `?author/project`, which sets author, projectName, path (to README.md), and title based on the built URL. You cannot set other options like theme with this shortcut, but it's short and sweet.



## Examples

These examples are hosted from a private site with the contents of this project dumped to a [web folder](http://danml.com/md/).

[React](http://danml.com/md/?facebook/react)

[jQuery](http://danml.com/md/?jquery/jquery)

[VCC](http://danml.com/md/?rndme/vcc)

[Marked](http://danml.com/md/?chjj/marked)

[Redux](http://danml.com/md/?reactjs/redux)


## Hard-coded example
You can hard-code a config object called `App` into the HTML file to specify MD content url, links, theme, and more. Moreover, the URL endpoint is just a simple HTML document shell you can further modify as needed. Specifying these options are hard-coded HTML like `<link>` will also (slightly) decrease the viewer's load time.



This shows the docs for my [VCC project](https://github.com/rndme/vcc/):

```html
<!DOCTYPE html><html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Loading Documentation...</title>
<meta name="description" content="Documentation">
<meta name="author" content="rndme">

<link rel=stylesheet id=themeLink >	
<link rel=stylesheet href=//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/googlecode.min.css>
<link rel=stylesheet href=md.css>
</head>
<body id=body>

  <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" 
				  data-toggle="collapse" data-target="#navbar" 
				  aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#" id=projectName></a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">		
		   <form class="navbar-form navbar-right" >
            	<label id=selThemeBox> <small style='color:#888'>Theme:</small>
			<select id=selTheme onchange=setTheme(value)>
				<option>cerulean</option>
				<option>cosmo</option>
				<option>cyborg</option>
				<option>darkly</option>
				<option>flatly</option>
				<option>journal</option>
				<option>lumen</option>
				<option>paper</option>
				<option>readable</option>
				<option>sandstone</option>
				<option>simplex</option>
				<option>slate</option>
				<option>spacelab</option>
				<option>superhero</option>
				<option>united</option>
				<option>yeti</option>
			</select>
			
		</label>
          </form>
		            <ul class="nav navbar-nav navbar-right" id=mylinks></ul>
		  
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3 col-md-2 sidebar" id=navdrop role="navigation"></div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
  				<div id="content"></div>		  
        </div>
      </div>
    </div>
  

<script>
App = {
	path: "https://raw.githubusercontent.com/rndme/vcc/master/docs.md",
	theme: "darkly",
	title: "VCC Docs",
	projectName: "VCC",
	customCSS: "",
  links: {
		"Component Library": "http://danml.com/vcc/lib/",
		Download: "http://danml.com/bundle/rndme.vcc_.js",
		Plugins: "http://danml.com/vcc/plugins/",
		"Github Project": "https://github.com/rndme/vcc",
	},
};
</script>

<script src=//code.jquery.com/jquery-1.11.1.min.js></script>
<script src=//cdnjs.cloudflare.com/ajax/libs/marked/0.3.5/marked.js></script>
<script src=//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/highlight.min.js></script>
<script src=md.js></script>		  
</body>
</html>
```
