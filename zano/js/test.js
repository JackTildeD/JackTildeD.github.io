document.addEventListener( "DOMContentLoaded", () => {
    for (const elem of document.getElementsByClassName("this-is-a-test")) {
        elem.innerHTML = parseCodex(`
<BLOCK POST ALIASED GALLERY>
Click an image below. The window should be filled by a modal showing a larger sized image.
<MODAL https://images.pexels.com/photos/263194/pexels-photo-263194.jpeg aliased GALLERY-ITEM>
<MODAL https://images.pexels.com/photos/248152/pexels-photo-248152.jpeg GALLERY-ITEM>
<MODAL https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg GALLERY-ITEM>
<MODAL https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg GALLERY-ITEM>
<https://images.pexels.com/photos/6684211/pexels-photo-6684211.jpeg GALLERY-ITEM>
<END BLOCK>
        `)
    }
});

