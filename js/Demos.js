
/**
 * Toggle the show or hide of a code snippet.
 * 
 * @param Element button  The button to show or hide.
 * @param Element snippet  The snippet itself.
 * @return
 */
function toggleSnippet(button, snippet) {
    
    if (Element.visible(snippet)) {
        Element.update(button, '(show)');
    } else {
        Element.update(button, '(hide)');
    }
    
    Element.toggle(snippet);
}