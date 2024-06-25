
const generateId = function(){
    let generatedId = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 8) {
        generatedId += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return generatedId
}

export default generateId