function copyToClipboard() {
    const text = document.getElementById('output-text').innerText;
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Copied to clipboard: ' + text);
}

function sendTheMessage() {
	const text = document.getElementById('message').innerText;
	const endvar = document.getElementById('end-variable').value;
  const startvar = document.getElementById('start-variable').value;
  const varnumb = document.getElementById('variable-numbers').value;
  const varname = document.getElementById('variable-name').value;
	const message = document.getElementById('message').value;

  send({
		type: "message",
		data: {
			startvar: startvar,
			endvar: endvar,
			varnumb: varnumb,
			varname: varname,
			message: message
		}
	})
}