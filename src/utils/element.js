export const getElementHeight = (id) => {
    const element = document.getElementById(id);
    console.log('element.clientHeight', element.clientHeight)
    return element ? element.clientHeight : 'auto'
}