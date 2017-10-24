Event.observe(window, 'load', function(e) {
    
    // Fade in on link clicking 
    $('content').hide();
    var contentEffectAppear = Effect.Appear($('content'), {
        'duration': 0.5,
        afterFinish: function () {
            // Blink messages
            $$('.message').each(function (s) {
                Effect.Pulsate(s, {pulses: 1, duration: 1.0});
            });
        }
    });
    
    // URL of link, if clicked
    var url = '';
    
    // Link <li> DOM Element, if clicked
    var linkElement = null;
    
    // Link class
    $$('#links #mainLinks a').each(function (s) {
        Element.observe(s, 'click', function (e) {
        	
        	if (e.ctrlKey) {
        		return;
        	}
        	
            $$('#links #mainLinks li').each( function(e) {
            	
                if (e.hasClassName('current-page')) {
                    linkElement = e;
                    e.removeClassName('current-page');
                }
                
            });
            s.up('li').addClassName('current-page');
        });
    });
    
    // Fade out on link clicking!
    $$('#links #mainLinks a, #subLinks a').each(function (s) {
        Element.observe(s, 'click', function(e) {
        	
        	if (e.ctrlKey) {
        		return;
        	}
        	
            e.stop();
            
            url = s;
            
            contentEffectAppear.cancel();
            if (contentEffectFade) {
                contentEffectFade.cancel();
            }
            
            var contentEffectFade = Effect.Fade($('content'), {
                'duration': 0.25,
                'afterFinish': function() {
                    window.location = url;
                }
            });
        });
    });
    
    // Reset states on page back
    Event.observe(window, 'focus', function(e) {
    	if (!$('content').visible() && contentEffectAppear.state == 'finished') {
    		$('content').show();
    	}
    	if (linkElement) {
	    	$$('#links li').invoke('removeClassName', 'current-page');
	    	linkElement.addClassName('current-page');
    	}
    });
});