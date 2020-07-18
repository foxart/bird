'use strict';
window.addEventListener('load', function() {
	const instance = helperCookie.get('instance');
	if (instance) {
		$(`input:radio[name=instance][value=${instance}]`).attr('checked', true);
	}
	$('input[type=radio][name=instance]').on('change', function() {
		console.log(this.value);
		helperCookie.set('instance', this.value);
	});
}, false);
