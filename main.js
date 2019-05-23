(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    $('#convertButton').click(copyToClipboard);
    $('#post').keyup(textChanged);
    textChanged();
  });

  function processText(text) {
    text = text.split('\n')
      .map(_ => _.replace(/^(\s*)(\-)/, "$1\u25B8 "))
      .map(_ => _.replace(/^(\s*)(\*)/, "$1\u2022 "))
      .join('\n');
    text = text.replace(/[ \t]/g, "\u00A0");
    text = text.replace(/\(c\)/g, "\u00A9");
    text = text.replace(/\=>/g, "\u21D2");
    text = text.replace(/\<=/g, "\u21D0");
    text = text.replace(/\@/g, "\u0040");
    return text;
  }

  function textChanged() {
    var el = $('#post');
    var text = processText(el.val());
    $('#output').html(text);
  }

  var messageBoxId = 'copy-login-on-photo-message-box';

  function createMessageBox(message) {
    var messageBox = $('#' + messageBoxId);
    if (messageBox.length >= 1) {
      messageBox.remove();
    }
    messageBox = $('<div id="' + messageBoxId + '">' + message + '</div>');
    messageBox.css({
      'display': 'flex',
      'border-radius': '10px',
      'justify-content': 'center',
      'flex-direction': 'column',
      'background-color': '#5b6dcd',
      'color': '#fff',
      'padding': '10px',
      'position': 'fixed',
      'top': 0,
      'left': '25%',
      'width': '500px',
    });
    messageBox.appendTo(document.body);
    return messageBox;
  }

  function showMessageBoxFor(messageBox, seconds) {
    messageBox.fadeIn(200);
    setTimeout(function () {
      messageBox.fadeOut(500);
    }, seconds);
  }

  function followMeTap() {
    document.location = "instagram://user?username=beautytwins.ca";
    window.open("https://www.instagram.com/beautytwins.ca", '_blank');
  }

  function replaceRange(s, start, end, substitute) {
    return s.substring(0, start) + substitute + s.substring(end);
  }

  function copyToClipboard() {
    var el = $('#post');
    var text = processText(el.val());
    var hiddenPostEl = $('#hiddenPost')[0];
    hiddenPostEl.value = text;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      hiddenPostEl.contentEditable = true;
      hiddenPostEl.readOnly = false;

      var range = document.createRange();
      range.selectNodeContents(hiddenPostEl);

      // select the range
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      hiddenPostEl.setSelectionRange(0, 999999);
    } else {
      hiddenPostEl.select();
    }

    // execute copy command
    document.execCommand('copy');
    showMessageBoxFor(createMessageBox('Success! The converted caption has been copied to your clipboard, go paste it into Instagram to experience clean and beautiful line-breaks!'), 5000);
  }

}());
