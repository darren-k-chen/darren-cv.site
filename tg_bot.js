// Author: Darren K.J. Chen

const src = location.hash.substr(1);
const host_name = location.hostname;
const input = location.search.substr(6);
const send_msg_api_url = "https://api.telegram.org/bot1086883866:AAGPSS0MsuK52TGkjGQBYzQ8pnFeSiA2ynQ/sendmessage?chat_id=992353127&parse_mode=HTML&text=";

function get_datetime() {
	var timestamp = new Date();
	var datetime  = timestamp.getDate() + "/";
		datetime += timestamp.getMonth()+1 + "/";
		datetime += timestamp.getFullYear() + "-";
		datetime += timestamp.getHours() + ":";
		datetime += timestamp.getMinutes() + ":";
		datetime += timestamp.getSeconds();
	return datetime;
}

function visit_site() {
	fetch (
		'https://ipinfo.io/json',
		{
			method: 'GET'
		}
	).then (
		tmp => {
			return tmp.text();
		}
	).then (
		client_info => {
			if ( input != '' && location.search.match('file') != null ) {
				// This function will notice bot if anyone request the file on the site
				fetch (
					send_msg_api_url
					+ " | Someone request the file " + input
					+ "%0A| Click via " + src
					+ "%0A| Request time: " + get_datetime()
					+ "%0A| Site hostname: " + host_name
					+ "%0A%0A" + client_info
				);

				setTimeout (
					function () {
						window.location.href = "assets/" + input;
					}, 500
				);
			} else if ( input != '' && location.search.match('href') != null ) {
				// This function will notice bot if anyone request the url on the site
				fetch (
					send_msg_api_url
					+ " | Someone request the url " + input
					+ "%0A| Click via " + src
					+ "%0A| Request time: " + get_datetime()
					+ "%0A| Site hostname: " + host_name
					+ "%0A%0A" + client_info
				);

				setTimeout (
					function () {
						window.location.href = 'https://' + input;
					}, 500
				);
			} else {
				// This function will notice bot if anyone visit the site
				fetch (
					send_msg_api_url
					+ "%0A| Click via " + src
					+ "%0A| Someone visting your site at: " + get_datetime()
					+ "%0A| Site hostname: " + host_name
					+ "%0A%0A" + client_info
				);

				setTimeout (
					function () {
						if ( src == 'NextBankCV' ) {
							window.location.href = 'https://bank.next.darren-cv.site/';
						} else {
							window.location.href = 'https://www.linkedin.com/in/kuan-ju-chen';
						}
					}, 500
				);
			}
		}
	);
}
