import _ from 'lodash';

export function mapRight(array, mapper) {
    var i = 1;
    return _(array)
        .zipWith(_(array).map(element => _(array).takeRight(array.length - i++)).value(), mapper)
        .value();
}