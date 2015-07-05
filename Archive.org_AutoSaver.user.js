// ==UserScript==
// @author      PotcFdk
// @name        Archive.org AutoSaver
// @namespace   https://github.com/PotcFdk/ArchiveOrgAutoSaver
// @description Auto-saves all missing pages that you might encounter.
// @include     https://web.archive.org/web/*
// @version     0.0.6
// @grant       none
// @downloadURL https://raw.githubusercontent.com/PotcFdk/ArchiveOrgAutoSaver/master/Archive.org_AutoSaver.user.js
// @updateURL   https://raw.githubusercontent.com/PotcFdk/ArchiveOrgAutoSaver/master/Archive.org_AutoSaver.meta.js
// ==/UserScript==

/*
	Archive.org AutoSaver - Copyright (c) PotcFdk, 2015

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
	http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

var livewebInfo = document.getElementById('livewebInfo');
if (livewebInfo) {
	var saveLink = livewebInfo.getElementsByTagName ("a");
	if (saveLink && saveLink[0] && saveLink[0].textContent
		&& saveLink[0].textContent == "Save this url in the Wayback Machine")
	{
		console.log ("[Archive.org AutoSaver] Detected missing page. Redirecting...");
		window.location.href = saveLink[0].href;
	}
}

var error = document.getElementById ('error');
var form1 = document.getElementsByName ('form1');
if (error && error.textContent
	&& (error.textContent.indexOf ('Wayback Machine doesn\'t have that page archived.') != -1
		|| error.textContent.indexOf ('This url is not available on the live web or can not be archived.') != -1)
	&& form1 && form1[0])
{
	var reqUrlInput = form1[0].getElementsByTagName ('input');
	if (reqUrlInput && reqUrlInput[0] && reqUrlInput[0].value)
	{
		error.innerHTML = error.innerHTML
			+ '<p>[Archive.Org AutoSaver] <a href="//web.archive.org/save/'
			+ reqUrlInput[0].value
			+ '">Click here</a> to try to save this url anyways.</p>';
		console.log ("[Archive.org AutoSaver] Detected not available page. Added save link.");
	}
}

var recordDoneClose = document.getElementById ('__wb_record_done_close')
if (recordDoneClose && __on_wb_record_done_close) {
	__on_wb_record_done_close();
	console.log ("[Archive.org AutoSaver] Closed 'Page saved as' window.");
}

if (go && {}.toString.call (go) == '[object Function]') {
	console.log ("[Archive.org AutoSaver] Speeding up redirect...");
	window.setTimeout (go, 500);
}
