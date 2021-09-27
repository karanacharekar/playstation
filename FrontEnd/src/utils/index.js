import {numColumns} from '../constants'

export const decToBin = ( decimalNum ) => decimalNum.toString(2).padStart(numColumns, '0');
export const binToDec = ( binaryNum ) => parseInt(binaryNum, 2)
