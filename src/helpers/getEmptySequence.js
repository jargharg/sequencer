import { SEQUENCE_LENGTH } from '../constants';

export default function getEmptySequence() {
	return Array(SEQUENCE_LENGTH).fill(false);
}
