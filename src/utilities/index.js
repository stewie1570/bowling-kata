import _ from 'lodash';

export function mapRight(array, mapper) {
    return _(array).map((element, index) => mapper(element, _(array).takeRight(array.length - index - 1).value()));
}