const clipboard = new ClipboardJS('label');

clipboard.on('success', function(e) {
  tippy(e.trigger.querySelector('.fa-copy'), {
    content: 'copied!',
    showOnCreate: true,
    triggerTarget: e.trigger,
    offset: [0, 24],
    trigger: 'click',
    placement: 'bottom'
  });
});
