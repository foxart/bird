function helperRequest(path = '', method, data = null) {
	function logRequest(url, method, data = '') {
		data = JSON.stringify(data);
		if (data.length > 100) {
			data = `${data.slice(0, 50)} ... ${data.slice(-50)}`;
		}
		console.log(`[${method.toUpperCase()}] -> ${url}`, data);
	}

	function logResponse(url, code, data = '') {
		data = JSON.stringify(data);
		if (data.length > 100) {
			data = `${data.slice(0, 50)} ... ${data.slice(-50)}`;
		}
		console.log(`[${code}] <- ${url}`, data);
	}

	let url = `http://gcm:3001/proxy/${helperCookie.get('instance')}${path}`;
	// let url = `http://localhost:3001/proxy/${helperCookie.get('instance')}${path}`;
	const request = {
		method,						// *GET, POST, PUT, DELETE, etc.
		mode: 'cors', 				// no-cors, *cors, same-origin
		cache: 'no-cache', 			// *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			// 'Accept-Encoding': 'gzip, deflate',
			'Accept-Encoding': 'identity',
			'Content-Type': 'application/json',
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
	};
	logRequest(url, method, data);
	if (data !== null) {
		if (['post', 'put', 'patch'].indexOf(method) !== -1) {
			request.body = JSON.stringify(data);
		} else {
			url = `${url}?${Object.keys(data).map(key => `${key}=${data[key]}`).join('&')}`;
		}
	}
	return new Promise(function(resolve, reject) {
		fetch(url, request).then(response => {
			response.text().then((text) => {
				let result;
				try {
					result = JSON.parse(text);
				} catch (e) {
					result = text;
				}
				logResponse(url, response.status, result);
				if (response.status === 200) {
					resolve(result);
				} else {
					reject(result);
				}
			}).catch((e) => {
				reject(e);
			});
		});
		// const ajax = $.ajax({
		// 	url: url,
		// 	method: helperRequest.method,
		// 	data: helperRequest.body,
		// 	headers: {
		// 		'Accept-Encoding': 'identity',
		// 		'Content-Type': 'application/json',
		// 	},
		// });
		// ajax.done(function(result) {
		// 	resolve(result);
		// });
		// ajax.fail(function(jqXHR, textStatus) {
		// 	console.log(jqXHR.responseText);
		// 	reject(textStatus);
		// });
	});
}
