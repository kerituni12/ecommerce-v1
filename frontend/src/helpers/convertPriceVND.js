export default function convertPrice(number) {
    let price = number.toString().split("").reverse()
    for (let i = 3; i < price.length; i++) {
        price.splice(i, 0, '.');
        i += 3
    }
    return price.reverse().join('');
}