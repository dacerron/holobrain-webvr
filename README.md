# A-Frame Project

Built with [A-Frame](https://aframe.io), a web framework for building virtual reality experiences. Make WebVR with HTML and Entity-Component. Works on Vive, Rift, desktop, mobile platforms.

# Server functionality:
* using SOAP to receive the current state of the scene in the teacher front-end to then reflect
this state in several student front-ends
* To differentiate between sessions, on teacher connection a connection ID is generated server side,
then the session can be accessed by student front-ends using this string.
* The actual contents of the scene state are not depended on by the server (within http specifications), only passed along to all members of
the designated session.
* the maximum number of simultaneous waits for data on the same session is 4096. If this number is exceeded,
and empty byte array is passed and the front-end will try to request data again. (waits will be explained in the front-end section)
* for delivery of the actual assets and html pages to front ends, the server gives access to the public directory as a file server.
	* this directory contains:
		assets/: all of the .obj, .gltf, and image files that are used to render the scene
		css/: currently unused as the small amount of css used in the project is inline in index.html
		html/: all the html files except for index.html. (index.html is in the root of the public folder as
			the definition of golang's http package's FileServer function will serve this file automatically
			when a client accesses the the root directory of the server: E.G: access to [IP]:[PORT]/ will serve src/public/index.html
		js/: all a-frame components and javascript files used in the behaviour of the scenes (explained further below)
			
			
# Front end functionality:
* The A-Frame framework is used to be able to define the threejs scene using html elements. A few
publicly available libraries are used to aid with the creation of the experience. These are:
	* aframe-gui component: has some examples of drop-down menus which are used for interacting with the
	brain on the teacher side
	* (more libraries may be included later on, the rest of the components used are created in house)
	
* Teacher-Student communication:
	* On entering the scene, communication of students and teachers is structured as follows:
		* whenever the student requests scene data from the server, the server logs this request in a map
		of requests. The return from this request will not come back until the teacher has sent data.
		* whenever the teacher front end sends scene data to the server, the data is multiplexed to all the request
		buffers, all of the student requests that had been made up until that point finally give a response, and the 
		buffers are cleared and the process begins again
		* because of the way channels work in golang, we can front-load the processing required to register requests and prepare
		responses so that as soon as the data from the teacher is multiplexed to the waiting student channels, all those responses
		channels are unblocked and the reponses sent immediately.
		
		