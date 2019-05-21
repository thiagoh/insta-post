(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    $('#convertButton').click(copyToClipboard);
    $('#post').keydown(textChanged);
  });

  function processText(text, html) {
    if (html) {
      text = text.replace(/\n/g, '<br />');
    }
    text = text.replace(/(?:\r\n|\r|\n)/g, "\u2063\n");
    // text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    // text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
    // console.log(text);
    return text;
  }

  function textChanged() {
    var el = $('#post');
    var text = processText(el.val(), true);
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
      'left': '50%',
      'width': '50%',
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
    var text = processText(el.val(), false);
    var hiddenPostEl = $('#hiddenPost')[0];
    hiddenPostEl.value = text;

    // handle iOS as a special case
    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      // convert to editable with readonly to stop iOS keyboard opening
      hiddenPostEl.contentEditable = true;
      hiddenPostEl.readOnly = true;
    }

    hiddenPostEl.select();

    // execute copy command
    document.execCommand('copy');
    showMessageBoxFor(createMessageBox('Success! The converted caption has been copied to your clipboard, go paste it into Instagram to experience clean and beautiful line-breaks!'), 5000);
  }

}());
