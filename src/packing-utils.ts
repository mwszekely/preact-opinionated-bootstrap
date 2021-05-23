
const textDecoder = new TextDecoder('utf-8');

// Functions related to limitations derived from forcing everything into a single file

// Turn any data url into the UTF-8 encoded string it represents (assuming it does, of course)
export async function dataUrlToString(dataUrl: string): Promise<string> {
    const arrayBuffer = await (await fetch(dataUrl)).arrayBuffer();
    return textDecoder.decode(arrayBuffer);
}

// Given a data-url that represents some CSS, decode it and add it to the HTML head (whether it's prepended or appended can be controlled, but it's prepended by default).
export async function addCssToHead(dataUrl: string, position: 'append' | 'prepend' = 'append') {
    const newStyle = document.createElement('style');
    const result = await dataUrlToString(dataUrl);
    newStyle.innerHTML = result;
    document.head[position](newStyle);
}

